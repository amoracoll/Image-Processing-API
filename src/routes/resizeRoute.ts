import express, { Request, Response } from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import { imagesDir, cacheDir } from "../utils/dirs";
import { validateParams } from "../utils/validateParams";

const resizeRoute = express.Router();

resizeRoute.get("/", async (req: Request, res: Response): Promise<any> => {
    const { width, height, imageName: fileName } = req.query;

    // Validar parámetros
    if (!width || !height || !fileName || !validateParams(width as string, height as string, fileName as string)) {
        return res.status(400).send("Faltan parámetros o son inválidos. Debe proporcionar imageName, width y height.");
    }

    const imagePath = path.join(imagesDir, fileName as string);
    const cachedImagePath = path.join(cacheDir, `${width}x${height}-${fileName}`);

    // Verificar si la imagen redimensionada ya existe en la caché
    if (fs.existsSync(cachedImagePath)) {
        return res.sendFile(cachedImagePath);
    }

    // Verificar si el archivo existe
    if (!fs.existsSync(imagePath)) {
        return res.status(400).send("El archivo de la imagen no se encontro.");
    }

    try {
        const widthNumber = parseInt(width as string, 10);
        const heightNumber = parseInt(height as string, 10);

        if (isNaN(widthNumber) || isNaN(heightNumber)) {
            return res.status(400).send("Los parámetros width y height deben ser números válidos.");
        }

        // Redimensionar la imagen
        const resizedImage = await sharp(imagePath).resize(widthNumber, heightNumber).toBuffer();

        // Guardar la imagen en la caché
        fs.writeFileSync(cachedImagePath, resizedImage);

        res.type("image/jpeg").send(resizedImage);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al redimensionar la imagen.");
    }
});

export default resizeRoute;

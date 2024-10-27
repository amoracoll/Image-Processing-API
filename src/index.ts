import express, {Request, Response} from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";

// Redimensionar una imagen existente
// http://localhost:3000/resize?width=200&height=300&imageName=fjord.jpg

// Generar una imagen de marcador de posicion
//http://localhost:3000/placeholder/400x300

// Acceder a una imagen original
//http://localhost:3000/assets/images/fjord.jpg

const app = express();
const port = 3000;

// Directorio de imagenes
const imagesDir = path.join(__dirname, "../assets");
const cacheDir = path.join(__dirname, "../cache");

// Assegurar que el directorio de cache exista
if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
}

// Servir archivos estáticos de la carpeta "assets/images"
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Funcion para validar parametros
const validateParams = (width: string, height: string, fileName: string): boolean => {
    return !isNaN(Number(width)) && !isNaN(Number(height)) && fileName.length > 0;
};

// Ruta para redimensionar la imagen
app.get("/resize", async (req: Request, res: Response):Promise<any> => {
    const {width: width, height,  imageName: fileName} = req.query;

    // Validar que los parametros sean validos
    if (!width || !height || !fileName || !validateParams(width as string, height as string, fileName as string)) {
        return res.status(400).send("Faltan parámetros o son inválidos. Debe proporcionar imageName, width y height.");
    }

    const imagePath = path.join(imagesDir, fileName as string);
    const cahedImagedPath = path.join(cacheDir, `${width}x${height}-${fileName}`);

    // Verificar si la imagen redimensionada ya existe en la cache
    if (fs.existsSync(cahedImagedPath)) {
        return res.sendFile(cahedImagedPath);
    }

    // Verificar si el archivo existe
    if (!fs.existsSync(imagePath)) {
        return res.status(400).send("El archivo de la imagen no se encontro.");
    }

    try {
        // Convertir width y height a numeros
        const widthNumber = parseInt(width as string, 10);
        const heightNumber = parseInt(height as string, 10);

        if (isNaN(widthNumber) || isNaN(heightNumber)) {
            return res.status(400).send("Los parametros width y height deben ser numeros validos");
        }

        // Redimensionar la imagen
        const resizedImage = await sharp(imagePath).resize(Number(widthNumber), Number(heightNumber)).toBuffer();

        res.type("image/jpeg").send(resizedImage);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error resizing image");
    }
});

// Ruta para generar una imagen de marcador de posición
app.get("/placeholder/:width(\\d+)x:height(\\d+)", async (req: Request, res: Response) => {
    const { width, height } = req.params;
  
    try {
      const buffer = await sharp({
        create: {
          width: parseInt(width),
          height: parseInt(height),
          channels: 3,
          background: { r: 200, g: 200, b: 200 },
        },
      })
        .jpeg()
        .toBuffer();
  
      res.type("image/jpeg").send(buffer);
    } catch (error) {
      res.status(500).send("Error al generar la imagen de marcador de posición.");
    }
  });

// Start server
app.listen(port, () => {
    console.log(`Example listening on port ${port}`);
});

export default app;
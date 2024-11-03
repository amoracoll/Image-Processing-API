import express, { Request, Response } from "express";
import sharp from "sharp";

const placeholderRoute = express.Router();

placeholderRoute.get("/:width(\\d+)x:height(\\d+)", async (req: Request, res: Response) => {
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
        console.error(error);
        res.status(500).send("Error al generar la imagen de marcador de posición.");
    }
});

export default placeholderRoute;

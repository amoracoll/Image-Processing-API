import express, {Request, Response} from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const app = express();
const port = 3000;

// Servir archivos estáticos de la carpeta "assets/images"
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Ejemplo ruta
// http://localhost:3000/resize?width=200&height=300&imageName=fjord.jpg


// Variables
let imageWidth = 500;
let imageHeight = 500;
let imageName = "fjord.jpg";

// Opcion 1
// app.get(`/filename=${imageName}&widht=${imageWidth}&height=${imageHeight}`, (req: Request, res: Response) => {
//     console.log(path.join(__dirname, "../assets","santamonica.jpg"));

//     res.send(`
//         <h1>Imagen desde Express</h1>
//         <center>
//             <img src="/assets/${imageName}" alt="Mi Imagen" width="${imageWidth}" height="${imageHeight}" />
//         </center>
//     `);
// });

// Opcion 2 con Sharp
app.get("/resize", async (req: Request, res: Response):Promise<any> => {
    const {width: width, height,  imageName: fileName} = req.query;

    // Validar que los parametros sean validos
    if (!width || !height || !fileName) {
        return res.status(400).send("Faltan parametros. Debe proporcionar fileName, width y height");
    }

    const imagePath = path.join(__dirname,"../assets",`${fileName}`);

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

// Start server
app.listen(port, () => {
    console.log(`Example listening on port ${port}`);
});

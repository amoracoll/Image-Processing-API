import express from "express";
// Manejar subida de archivos
import multer from "multer";
// Procesar imagenes
import sharp from "sharp";
import path from "path";

const app = express();
const port = 3000;

// Configuracion de multer para manejar la subida de imagenes
// Almacena los archivos en la memoria RAM
const storage = multer.memoryStorage();

// Creando un middleware de Multer
const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }


    const { width, height } = req.body;

    try {
        const resizedImage = await sharp(req.file.buffer)
            .resize(parseInt(width), parseInt(height))
            .toBuffer();

        res.type(req.file.mimetype).send(resizedImage);
    } catch (error) {
        res.status(500).send("Error processing image.");
    }
});

app.get("/", (req, res) => {
    res.send("Hello world!");
})

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});


// API anterior
// app.get("/", (req, res) => {
//     res.send("Hello world!");
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// })
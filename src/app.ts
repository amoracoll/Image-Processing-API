import express, {Request, Response} from "express";
// Manejar subida de archivos
import multer from "multer";
// Procesar imagenes
import sharp from "sharp";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Configuración de multer para subir archivos
const upload = multer({
    storage: multer.diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
});

// Usar body-parser para parsear el cuerpo de la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Ruta para subir un archivo
app.post("/upload", upload.single("file"), async (req: express.Request, res: express.Response): Promise<void> => {
    if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
    }

    const { width, height } = req.body;

    const parsedWidth = parseInt(String(width));
    const parsedHeight = parseInt(String(height));

    if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
        res.status(400).send("Width and height must be valid numbers.");
        return;
    }

    try {
        const resizedImage = await sharp(req.file.buffer)
            .resize(parseInt(width), parseInt(height))
            .toBuffer();

        res.type(req.file.mimetype).send(resizedImage);
    } catch (error) {
        res.status(500).send("Error processing image.");
    }
});

app.get("/", (req:express.Request, res: express.Response) => {
    res.send("Hello world!");
})

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
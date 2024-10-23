import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

// Servir archivos estáticos de la carpeta "assets/images"
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Ruta para mostrar la imagen
app.get("/", (req: Request, res: Response) => {
    // Imprimir la ruta
    console.log(path.join(__dirname, "../assets","santamonica.jpg"));
    res.send(`
        <h1>Imagen desde Express</h1>
        <img src="/assets/santamonica.jpg" alt="Mi Imagen" />
    `);
});

app.listen(port, () => {
    console.log(`Example listening on port ${port}`);
});

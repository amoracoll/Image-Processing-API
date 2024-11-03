import express from "express";
import path from "path";
import fs from "fs";
import { cacheDir, imagesDir, ensureCacheDirExists } from "./utils/dirs";
import resizeRoute from "./routes/resizeRoute";
import placeholderRoute from "./routes/placeholderRoute";

// Redimensionar una imagen existente
// http://localhost:3000/resize?width=200&height=300&imageName=fjord.jpg

// Generar una imagen de marcador de posicion
//http://localhost:3000/placeholder/400x300

// Acceder a una imagen original
//http://localhost:3000/assets/fjord.jpg

const app = express();
const port = 3000;

// Asegurar que el directorio de caché exista
ensureCacheDirExists();

// Servir archivos estáticos de la carpeta "assets/images"
app.use("/assets", express.static(imagesDir));

// Configurar las rutas
app.use("/resize", resizeRoute);
app.use("/placeholder", placeholderRoute);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

export default app;
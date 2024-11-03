import path from "path";
import fs from "fs";

// Directorios de imágenes y caché
export const imagesDir = path.join(__dirname, "../../assets");
export const cacheDir = path.join(__dirname, "../../cache");

// Función para asegurar que el directorio de caché exista
export const ensureCacheDirExists = () => {
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
    }
};

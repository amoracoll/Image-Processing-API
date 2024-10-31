import supertest from "supertest";
import app from "../src/index";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const request = supertest(app);
const testImagePath = path.join(__dirname, "../assets/fjord.jpg");
const cacheImagePath = path.join(__dirname, "../cache/200x300-fjord.jpg");

describe("Pruebas del punto final /resize", () => {

  beforeAll(() => {
    // Limpiar cache antes de ejecutar las pruebas
    if (fs.existsSync(cacheImagePath)) {
      fs.unlinkSync(cacheImagePath);
    }
  });

  it("debería redimensionar una imagen existente con parámetros validos", async () => {
    const response = await request.get("/resize?width=200&height=300&imageName=fjord.jpg");

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toContain("image/jpeg");
  });

  it("debería devolver un error 400 si faltan parametros", async () => {
    const response = await request.get("/resize?width=200&height=300");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Faltan parámetros o son inválidos. Debe proporcionar imageName, width y height.");
  });

  it("debería devolver un error 400 si el archivo de la imagen no existe", async () => {
    const response = await request.get("/resize?width=200&height=300&imageName=noexiste.jpg");
    expect(response.status).toBe(400);
    expect(response.text).toBe("El archivo de la imagen no se encontro.");
  });
});

describe("Pruebas de la generación de imágenes de marcador de posición", () => {
  it("debería generar una imagen de marcador de posición con las dimensiones proporcionadas", async () => {
    const response = await request.get("/placeholder/400x300");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("image/jpeg");
  });

  it("debería devolver un error 500 si se proporciona un tamaño no válido", async () => {
    const response = await request.get("/placeholder/abcx300");
    expect(response.status).toBe(404); // Ya que la ruta no matcheará
  });
});

describe("Nuevos tests", () => {
  it("debería servir la imagen desde la caché si ya ha sido redimensionada", async () => {
    // Realizar la primera solicitud que redimensiona la imagen
    await request.get("/resize?width=200&height=300&imageName=fjord.jpg");
    
    // Ahora solicitar la imagen de nuevo para comprobar que se sirve desde la caché
    const cachedResponse = await request.get("/resize?width=200&height=300&imageName=fjord.jpg");
    
    expect(cachedResponse.status).toBe(200);
    expect(cachedResponse.header["content-type"]).toContain("image/jpeg");
    
    // Verificar que el archivo en caché realmente existe
    expect(fs.existsSync(cacheImagePath)).toBe(true);
  });

  it("debería redimensionar la imagen a diferentes dimensiones correctamente", async () => {
    const response = await request.get("/resize?width=100&height=150&imageName=fjord.jpg");
    
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toContain("image/jpeg");
    
    // Aquí puedes comprobar que la imagen redimensionada tiene el tamaño esperado
    // Esto podría implicar analizar el buffer de la imagen resultante con sharp
    const resizedImage = await sharp(response.body).metadata();
    
    expect(resizedImage.width).toBe(100);
    expect(resizedImage.height).toBe(150);
  });

  it("debería devolver un error 400 si se proporciona un ancho negativo", async () => {
    const response = await request.get("/resize?width=-200&height=300&imageName=fjord.jpg");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Los parámetros width y height deben ser números válidos.");
  });
  
  it("debería devolver un error 400 si se proporciona un ancho no numérico", async () => {
    const response = await request.get("/resize?width=abc&height=300&imageName=fjord.jpg");
    expect(response.status).toBe(400);
    expect(response.text).toBe("Los parámetros width y height deben ser números válidos.");
  });
})

afterAll(() => {
  // Limpiar cache después de ejecutar todas las pruebas
  if (fs.existsSync(cacheImagePath)) {
    fs.unlinkSync(cacheImagePath);
  }
});
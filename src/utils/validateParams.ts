// Función para validar parámetros
export const validateParams = (width: string, height: string, fileName: string): boolean => {
    return !isNaN(Number(width)) && !isNaN(Number(height)) && fileName.length > 0;
};

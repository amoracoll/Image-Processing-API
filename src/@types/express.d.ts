import * as multer from "multer";

// Extender la interfaz Request de Express para incluir la propiedad file.
declare global {
    namespace Express {
        interface Request {
            file?: Multer.File;
            body: Record<string, any>
        }
        interface Response {
            status : (code: number) => Response;
            type: (type: string) => Response;
        }
    }
}
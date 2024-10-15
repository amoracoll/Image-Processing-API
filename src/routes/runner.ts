import express, { NextFunction, Request, Response } from "express";
const runner = express.Router();

// Extender la interfaz Request para incluir la propiedad requestTime
declare global {
    namespace Express {
        interface Request {
            requestTime?: number;
        }
    }
}

// Función middleware. Imprime "LOGGED" cuando pasa por ella una solicitud a la aplicación
const myLogger = function(req: Request, res: Response, next: NextFunction){
    console.log("LOGGED")
    next()
};

const requestTime = function(req: Request, res: Response, next: NextFunction) {
    req.requestTime = Date.now()
    next()
};

// runner.use(myLogger);
// runner.get("/", (req: Request,res: Response) => {
//     res.send("Hello world")
// });

runner.use(requestTime);

runner.get("/", (req: Request, res: Response) => {
    let responseText = 'Hello World!<br>'
    responseText += `<small>Requested at: ${req.requestTime}</small>`
    res.send(responseText)
})

export default runner;
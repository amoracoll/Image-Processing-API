import express from "express";
import csv from "csvtojson";
import path from "path";
import {promises as fsPromises} from "fs";

const convertCsvToJsonExercise = express.Router();

const csvFilePath = path.join(__dirname,"C:\\Users\\arnau.mora_modelical\\Desktop\\UDACITY\\csvFile.csv");
const outputFile = "users.json";

convertCsvToJsonExercise.get("/",(req, res) => {
    res.send("converting in process!");
    csv()
    .fromFile(csvFilePath)
    .then((data) => {
        let newData = data.map((item: {
            first_name: string; 
            last_name:string;
            phone: string;}) => {
                let first = item.first_name;
                let last = item.last_name;
                let phone = item.phone;
                if (item.phone === ""){
                    phone = "missing data";
                }
                return {first,last,phone};
            });
            fsPromises.writeFile(outputFile, JSON.stringify(newData));
    });
});

export default convertCsvToJsonExercise;

// Crear la ruta

// csv().fromFile(csvFilePath).then((jsonObj) => {
//     console.log(jsonObj);
// });
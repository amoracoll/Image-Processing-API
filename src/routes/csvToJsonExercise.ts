import express from "express";
import csv from "csvtojson";
import path from "path";

// Crear la ruta
const csvFilePath = path.join(__dirname,"C:\Users\arnau.mora_modelical\Desktop\UDACITY\csvFile.csv");

csv().fromFile(csvFilePath).then((jsonObj) => {
    console.log(jsonObj);
});
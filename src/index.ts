import express from "express";
import routes from "./routes/index";
import student from "./routes/student";
import teacher from "./routes/teacher";
import runner from "./routes/runner";

const app = express();
const port = 3000;

app.use('/api', routes);
app.use('/student', student);
app.use('/teacher', teacher);
app.use('/runner', runner);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
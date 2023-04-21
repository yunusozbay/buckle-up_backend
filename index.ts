import express, {Express, Request, Response} from "express";
const port = 3000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send('Hello');
});

app.get("/welcome", (req: Request, res: Response) => {
    res.send('Welcome User');
});

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
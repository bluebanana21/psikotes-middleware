import express, { type Request, type Response } from "express";
import bookRoutes from "./routes/bookRoutes.ts";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", bookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Node.js + typescript API");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

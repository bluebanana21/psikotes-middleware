import express, { type Request, type Response } from "express";
import bookRoutes from "./routes/bookRoutes.ts";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.ts";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

app.use("/api", bookRoutes);
app.use("/api", authRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Node.js + typescript API");
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction)=>{
  console.error(err.stack);
  res.status(500).json({
    'status': 'error',
    'message': 'internal server error'
  })
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

export default app;
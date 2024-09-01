import express, { Application, Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middlewares/notFound";
import { ProductsRoutes } from "./app/modules/products/products.route";
import { UsersRoutes } from "./app/modules/users/users.route";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import { authRoutes } from "./app/modules/auth/auth.route";


const app: Application = express();


// cors and middlewares for data
app.use(express.json());
app.use(cors());

//routes 
app.use("/api/products", ProductsRoutes);
app.use("/api/user", UsersRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Amaze commerce server site");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;

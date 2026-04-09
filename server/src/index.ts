import express from "express";
import { adminRouter } from "./routes/admin";
import { connectMongoDB } from "./config/connection";
import { logReqRes } from "./middleware";

const app = express();
const PORT = process.env.PORT || 3000;

//connection
connectMongoDB(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio-admin");

//Middleware
app.use(express.json()); // Parse JSON bodies
app.use(logReqRes("log.txt"));

//Routes
app.use("/admin", adminRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

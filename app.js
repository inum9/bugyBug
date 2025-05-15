import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app= express();
app.use(cors({
    origin: process.env.CORS,
    credentials: true
}))

app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//routes
import rout from "./src/routes/user.routes.js";
import issueRoutes from "./src/routes/issues.routes.js"
import projectRoutes from "./src/routes/project.routes.js";
app.use("/api/v1/user",rout);
app.use("/api/v1/issue",issueRoutes);
app.use("/api/v1/project", projectRoutes);
export default app;
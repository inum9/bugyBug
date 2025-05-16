import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import rout from "./src/routes/user.routes.js";
import issueRoutes from "./src/routes/issues.routes.js";
import projectRoutes from "./src/routes/project.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";
import notificRoutes from "./src/routes/notification.routes.js";
import dashboardRoutes from "./src/routes/dashboard.routes.js";
import attachRoute from "./src/routes/attachment.routes.js"

app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/user", rout);
app.use("/api/v1/issue", issueRoutes);
app.use("/api/v1/project", projectRoutes);      //"682762da5ee52f32709b12c8",projectId
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/notification", notificRoutes);
app.use("/api/v1/attachment",attachRoute);
export default app;

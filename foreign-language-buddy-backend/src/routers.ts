import express from "express";
import controller from "./controller";
const routers = express.Router();

routers.post("/sign-up", controller.signUp);
routers.post("/login", controller.login);

routers.get("/get-courses", controller.getCourses);
// routers.post("/add-course", controller.addCourse);

routers.post("/chat/send-message", controller.sendMessage);
routers.post("/chat/get-history", controller.getHistory);
routers.post("/chat/delete-history", controller.deleteHistory);

export default routers;


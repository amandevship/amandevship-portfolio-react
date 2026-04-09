import express from "express";
import { handleCreateNewAdmin, handleUpdateAdmin, handleGetAllAdmin, handleGetAdminById, handleDeleteAdmin } from "../controllers/admin";

const adminRouter = express.Router();

adminRouter.route("/").post(handleCreateNewAdmin).get(handleGetAllAdmin);
adminRouter.route("/:id").put(handleUpdateAdmin).get(handleGetAdminById).delete(handleDeleteAdmin);

export { adminRouter };
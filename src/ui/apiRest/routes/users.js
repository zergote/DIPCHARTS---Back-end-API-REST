import { UserController } from "../controller";
import express from "express";

const router = express.Router();

router
  .route("/all")
  /** GET /api/users - Get list of users */
  .get(UserController.getAllUsers);
//.get(UserController.loginRequired, UserController.getAllUsers)
router.route("/register").post(UserController.registerUser);

router.route("/signin").post(UserController.signInUser);

router
  .route("/:userID")
  /** GET /api/users/:userId - Get user */
  .get(UserController.getUser)
  /** PUT /api/users/:userId - Update user */
  .put(UserController.updateUser)
  /** DELETE /api/users/:userId - Delete user */
  .delete(UserController.removeUser);

export default router;

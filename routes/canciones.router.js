import Router from "express";
import CancionController from "../controllers/canciones.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken,CancionController.getCanciones);
router.post("/escucho", verifyToken,CancionController.escuchoCancion);
router.post("/", verifyToken, verifyAdmin, CancionController.postCancion);
router.put("/:id", verifyToken, verifyAdmin, CancionController.putCancion);
router.delete("/:id", verifyToken, verifyAdmin, CancionController.deleteCancion);

export default router;
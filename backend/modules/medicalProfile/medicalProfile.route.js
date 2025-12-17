import express from "express";
import { MedicalProfileController } from "./medicalProfile.controller.js";
import { MedicalProfileService } from "./medicalProfile.service.js";
import { MedicalProfileRepository } from "./medicalProfile.repository.js";

const router = express.Router();

const repository = new MedicalProfileRepository();
const service = new MedicalProfileService(repository);
const controller = new MedicalProfileController(service);

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;

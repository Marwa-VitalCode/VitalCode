import express from "express";
import { MedicalTreatmentController } from "./medicalTreatment.controller.js";
import { MedicalTreatmentService } from "./medicalTreatment.service.js";
import { MedicalTreatmentRepository } from "./medicalTreatment.repository.js";

const router = express.Router();

const repository = new MedicalTreatmentRepository();
const service = new MedicalTreatmentService(repository);
const controller = new MedicalTreatmentController(service);

router.get("/", controller.getAll);
// router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.patch("/:profile_id/:treatment_id", controller.update);
router.delete("/:profile_id/:treatment_id", controller.delete);

export default router;

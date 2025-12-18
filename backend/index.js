import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import errorHandler from "./middlewares/error.middleware.js";

// routes
import MedicalProfileRoutes from "./modules/medicalProfile/medicalProfile.route.js";
import MedicalTreatmentRoutes from "./modules/medicalTreatment/medicalTreatment.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ status: "OK", service: "Vital Code Backend" });
});

app.use("/api/v1/medical_profiles", MedicalProfileRoutes);
app.use("/api/v1/medical_treatments", MedicalTreatmentRoutes);

// Middleware global d'erreur : **toujours en dernier**
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
export default app;

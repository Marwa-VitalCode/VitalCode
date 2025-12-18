import AppError from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";

import { MedicalTreatmentSchema } from "./medicalTreatment.validator.js";

export class MedicalTreatmentService {
  constructor(medicalTreatmentRepository) {
    this.medicalTreatmentRepository = medicalTreatmentRepository;
  }

  // ! we need to check the medical profile existance !

  async getAll(profile_id) {
    const treatments = await this.medicalTreatmentRepository.getAll(profile_id);
    if (treatments.length === 0) {
      throw new AppError("Aucun traitement médical trouvé", 404);
    }

    return treatments;
  }

  async getById(profile_id, treatment_id) {
    const treatment = await this.medicalTreatmentRepository.getOne(
      profile_id,
      treatment_id
    );
    if (!treatment) {
      throw new AppError("Traitement médical non trouvé", 404);
    }

    return treatment;
  }

  async create(profile_id, data) {
    const { value, error } = MedicalTreatmentSchema.validate(data, {
      abortEarly: false,
      convert: true,
    });

    if (error) {
      throw new AppError(
        "Données de traitement médical invalides",
        400,
        error.details.map((d) => d.message).join(", ")
      );
    }
    // todo update doctor info if included in data
    const { doctor, ...treatment } = value;
    const new_treatment = await prisma.$transaction(async (tx) => {
      // 1️ Create Doctor
      const new_doctor = await tx.doctor.create({
        data: doctor,
      });

      // 2️ Create Treatment
      const new_treatment = await tx.medicalTreatment.create({
        data: {
          ...treatment,
          medical_profile_id: profile_id,
          doctor_id: new_doctor.id,
        },
      });

      return new_treatment;
    });

    return new_treatment;
  }

  async updateById(profile_id, treatment_id, data) {
    const treatment = await this.getById(profile_id, treatment_id);
    if (!treatment) {
      throw new AppError("Traitement médical non trouvé", 404);
    }

    const { value, error } = MedicalTreatmentSchema.validate(data, {
      abortEarly: false,
      convert: true,
    });

    if (error) {
      throw new AppError(
        "Données de traitement médical invalides",
        400,
        error.details.map((d) => d.message).join(", ")
      );
    }

    const updated_treatment = await this.medicalTreatmentRepository.updateOne(
      profile_id,
      treatment_id,
      value
    );

    return updated_treatment;
  }

  async deleteById(profile_id, treatment_id) {
    // const profile = await this.getById(user_id, profile_id);
    // if (!profile) {
    //   throw new AppError("Profile médical non trouvé", 404);
    // }
    const treatment = await this.getById(profile_id, treatment_id);
    if (!treatment) {
      throw new AppError("Traitement médical non trouvé", 404);
    }
    // todo delete associated doctor ?
    const deleted_treatment = await this.medicalTreatmentRepository.deleteOne(
      profile_id,
      treatment_id
    );
    if (!deleted_treatment) {
      throw new AppError("Traitement médical non trouvé", 404);
    }
    return deleted_treatment;
  }
}

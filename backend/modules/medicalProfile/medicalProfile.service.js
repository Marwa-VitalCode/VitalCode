import AppError from "../../errors/AppError.js";
import { prisma } from "../../lib/prisma.js";

import { MedicalProfileSchema } from "./medicalProfile.validator.js";

import { TreatmentsArraySchema } from "../medicalTreatment/medicalTreatment.validator.js";

export class MedicalProfileService {
  constructor(medicalProfileRepository) {
    this.medicalProfileRepository = medicalProfileRepository;
  }

  async getAll(user_id) {
    const medical_profiles = await this.medicalProfileRepository.getAll(
      user_id
    );
    if (medical_profiles.length === 0) {
      throw new AppError("Aucun profile médical trouvé", 404);
    }

    return medical_profiles;
  }

  async getById(user_id, profile_id) {
    const profile = await this.medicalProfileRepository.getOne(
      user_id,
      profile_id
    );
    if (!profile) {
      throw new AppError("Profile médical non trouvé", 404);
    }

    return profile;
  }

  async create(user_id, data) {
    const { medical_treatments = [], ...profile_data } = data;
    const { value: medical_profile_value, error: medical_profile_error } =
      MedicalProfileSchema.validate(profile_data, {
        abortEarly: false,
        convert: true,
      });

    if (medical_profile_error) {
      throw new AppError(
        "Données de profil médical invalides",
        400,
        medical_profile_error.details.map((d) => d.message).join(", ")
      );
    }

    const { value: treatments_value, error: treatments_error } =
      TreatmentsArraySchema.validate(medical_treatments, {
        abortEarly: false,
        convert: true,
      });

    if (treatments_error) {
      throw new AppError(
        "Données de traitement médical invalides",
        400,
        treatments_error.details.map((d) => d.message).join(", ")
      );
    }
    const profile = await prisma.$transaction(async (tx) => {
      // 1️ Create Medical Profile
      const profile = await tx.medicalProfile.create({
        data: {
          ...medical_profile_value,
          user_id: user_id,
        },
      });

      if (treatments_value.length !== 0) {
        // 2️ Treatments + Doctors
        for (const t of treatments_value) {
          let { doctor, ...treatment } = t;

          // 2.1 Create Doctor
          doctor = await tx.doctor.create({
            data: doctor,
          });

          // 2.1 Create Treatment
          await tx.medicalTreatment.create({
            data: {
              ...treatment,
              medical_profile_id: profile.id,
              doctor_id: doctor.id,
            },
          });
        }
      }

      return profile;
    });

    return profile;
  }

  async updateById(user_id, profile_id, data) {
    const profile = await this.getById(user_id, profile_id);
    if (!profile) {
      throw new AppError("Profile médical non trouvé", 404);
    }

    const { value, error } = MedicalProfileSchema.validate(data, {
      abortEarly: false,
      convert: true,
    });

    if (error) {
      throw new AppError(
        "Données de profil médical invalides",
        400,
        error.details.map((d) => d.message).join(", ")
      );
    }

    const updated_profile = await this.medicalProfileRepository.updateOne(
      user_id,
      profile_id,
      value
    );

    return updated_profile;
  }

  async deleteById(user_id, profile_id) {
    const profile = await this.getById(user_id, profile_id);
    if (!profile) {
      throw new AppError("Profile médical non trouvé", 404);
    }
    const deleted_profile = await this.medicalProfileRepository.deleteOne(
      user_id,
      profile_id
    );
    if (!deleted_profile) {
      throw new AppError("Profile médical non trouvé", 404);
    }
    return deleted_profile;
  }
}

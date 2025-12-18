import { prisma } from "../../lib/prisma.js";

export class MedicalTreatmentRepository {
  getAll(profile_id) {
    const treatments = prisma.medicalTreatment.findMany({
      where: {
        medical_profile_id: profile_id,
      },
      orderBy: { created_at: "desc" },
      include: {
        doctor: true,
      },
    });

    return treatments;
  }

  getOne(profile_id, treatment_id) {
    const medical_profile = prisma.medicalTreatment.findFirst({
      where: {
        id: treatment_id,
        medical_profile_id: profile_id,
      },
    });

    return medical_profile;
  }

  updateOne(profile_id, treatment_id, data) {
    // todo update doctor info if included in data
    const updated_treatment = prisma.medicalTreatment.update({
      where: {
        id: treatment_id,
        medical_profile_id: profile_id,
      },
      data: data,
    });
    return updated_treatment;
  }

  deleteOne(profile_id, treatment_id) {
    const deleted_profile = prisma.medicalTreatment.delete({
      where: {
        id: treatment_id,
        medical_profile_id: profile_id,
      },
    });
    return deleted_profile;
  }
}

import { prisma } from "../../lib/prisma.js";

export class MedicalProfileRepository {
  getAll(user_id) {
    const medical_profiles = prisma.medicalProfile.findMany({
      where: {
        user_id: user_id,
      },
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        blood_type: true,
        sex: true,
      },
    });

    return medical_profiles;
  }

  getOne(user_id, profile_id) {
    const medical_profile = prisma.medicalProfile.findFirst({
      where: {
        id: profile_id,
        user_id: user_id,
      },
      // include: {
      //   // medicalTreatments: true,
      //   // qr_code: true,
      // },
    });

    return medical_profile;
  }

  updateOne(user_id, profile_id, data) {
    const updated_profile = prisma.medicalProfile.update({
      where: {
        id: profile_id,
        user_id: user_id,
      },
      data: data,
    });
    return updated_profile;
  }

  deleteOne(user_id, profile_id) {
    const deleted_profile = prisma.medicalProfile.delete({
      where: {
        id: profile_id,
        user_id: user_id,
      },
    });
    return deleted_profile;
  }
}

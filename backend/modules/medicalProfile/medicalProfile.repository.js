import { prisma } from "../../lib/prisma.js";

export class MedicalProfileRepository {
  getAll(userId) {
    const medical_profiles = prisma.medicalProfile.findMany({
      where: {
        user_id: userId,
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
    const medical_profile = prisma.medicalProfile.findUnique({
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

import asyncHandler from "../../utils/asyncHandler.js";

export class MedicalTreatmentController {
  constructor(medicalTreatmentService) {
    this.medicalTreatmentService = medicalTreatmentService;
  }

  getAll = asyncHandler(async (req, res) => {
    // const user_id = req.user.id;
    const profile_id = req.params.id;
    const treatments = await this.medicalTreatmentService.getAll(profile_id);
    res.status(200).json({ success: true, data: treatments });
  });

  // getOne = asyncHandler(async (req, res) => {
  //   const user_id = req.user.id;
  //   const profile_id = req.params.id;
  //   const profile = await this.medicalTreatmentService.getById(
  //     user_id,
  //     profile_id
  //   );
  //   res.status(200).json({ success: true, data: profile });
  // });

  create = asyncHandler(async (req, res) => {
    // const user_id = req.user.id;
    const profile_id = req.params.id;
    const data = req.body;
    const new_treatment = await this.medicalTreatmentService.create(
      profile_id,
      data
    );
    res.status(201).json({ success: true, data: new_treatment });
  });

  update = asyncHandler(async (req, res) => {
    const profile_id = req.params.profile_id;
    const treatment_id = req.params.treatment_id;
    const data = req.body;
    const updated_treatment = await this.medicalTreatmentService.updateById(
      profile_id,
      treatment_id,
      data
    );
    res.status(200).json({ success: true, data: updated_treatment });
  });

  delete = asyncHandler(async (req, res) => {
    //! @relation(..., onDelete: Cascade)
    // const user_id = req.user.id;
    const profile_id = req.params.id;
    const treatment_id = req.params.treatment_id;
    const deleted_treatment = await this.medicalTreatmentService.deleteById(
      profile_id,
      treatment_id
    );
    res.status(200).json({ success: true, data: deleted_treatment });
  });
}

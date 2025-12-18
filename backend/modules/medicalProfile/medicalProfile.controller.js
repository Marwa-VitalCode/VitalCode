import asyncHandler from "../../utils/asyncHandler.js";

export class MedicalProfileController {
  constructor(medicalProfileService) {
    this.medicalProfileService = medicalProfileService;
  }

  getAll = asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const profiles = await this.medicalProfileService.getAll(user_id);
    res.status(200).json({ success: true, data: profiles });
  });

  getOne = asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const profile_id = req.params.id;
    const profile = await this.medicalProfileService.getById(
      user_id,
      profile_id
    );
    res.status(200).json({ success: true, data: profile });
  });

  create = asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const data = req.body;
    const new_profile = await this.medicalProfileService.create(user_id, data);
    res.status(201).json({ success: true, data: new_profile });
  });

  update = asyncHandler(async (req, res) => {
    const user_id = req.user.id;
    const profile_id = req.params.id;
    const data = req.body;
    const updated_profile = await this.medicalProfileService.updateById(
      user_id,
      profile_id,
      data
    );
    res.status(200).json({ success: true, data: updated_profile });
  });

  delete = asyncHandler(async (req, res) => {
    //! @relation(..., onDelete: Cascade)
    const user_id = req.user.id;
    const profile_id = req.params.id;
    const deleted_profile = await this.medicalProfileService.deleteById(
      user_id,
      profile_id
    );
    res.status(200).json({ success: true, data: deleted_profile });
  });
}

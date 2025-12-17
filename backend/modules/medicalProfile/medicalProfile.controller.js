import asyncHandler from "../../utils/asyncHandler.js";

export class MedicalProfileController {
  constructor(medicalProfileService) {
    this.medicalProfileService = medicalProfileService;
  }

  getAll = asyncHandler(async (req, res) => {
    const profiles = await this.medicalProfileService.getAll("0");
    res.status(200).json({ success: true, data: profiles });
  });

  getOne = asyncHandler(async (req, res) => {
    const profile = await this.medicalProfileService.getById("1", "1");
    res.status(200).json({ success: true, data: profile });
  });

  create = asyncHandler(async (req, res) => {
    // const user_id = req.user.id;
    const data = req.body;
    const new_profile = await this.medicalProfileService.create(
      "user_id",
      data
    );
    res.status(201).json({ success: true, data: new_profile });
  });

  update = asyncHandler(async (req, res) => {
    // const newProfile = await this.service.create(req.user.id, req.body);
    // res.status(201).json(newProfile);
  });

  delete = asyncHandler(async (req, res) => {
    const deleted_profile = await this.medicalProfileService.deleteById(
      "1",
      "1"
    );
    res.status(200).json({ success: true, data: deleted_profile });
  });
}

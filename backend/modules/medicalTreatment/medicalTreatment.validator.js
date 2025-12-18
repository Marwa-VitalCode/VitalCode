import Joi from "joi";

// Schéma pour les traitements médicaux
export const MedicalTreatmentSchema = Joi.object({
  disease_name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Le nom de la maladie est obligatoire",
    "string.min": "Le nom de la maladie doit contenir au moins 2 caractères",
    "string.max": "Le nom de la maladie est trop long",
    "any.required": "Le nom de la maladie est obligatoire",
  }),

  medication_name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Le nom du médicament est obligatoire",
    "string.min": "Le nom du médicament doit contenir au moins 2 caractères",
    "string.max": "Le nom du médicament est trop long",
    "any.required": "Le nom du médicament est obligatoire",
  }),

  dosage: Joi.string().trim().max(100).required().messages({
    "string.empty": "La posologie est obligatoire",
    "string.max": "La posologie est trop longue",
    "any.required": "La posologie est obligatoire",
  }),

  frequency: Joi.string().trim().max(100).required().messages({
    "string.empty": "La fréquence est obligatoire",
    "string.max": "La fréquence est trop longue",
    "any.required": "La fréquence est obligatoire",
  }),

  start_date: Joi.date().optional().allow(null).messages({
    "date.base": "La date de début est invalide",
  }),
  end_date: Joi.date().optional().allow(null).messages({
    "date.base": "La date de fin est invalide",
  }),
  notes: Joi.string().trim().max(500).optional().allow(null).messages({
    "string.max": "Les notes ne doivent pas dépasser 500 caractères",
  }),
  is_active: Joi.boolean().optional(),
  is_visible: Joi.boolean().optional(),

  doctor: Joi.object({
    first_name: Joi.string()
      .trim()
      .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
      .min(2)
      .max(50)
      .required()
      .messages({
        "string.empty": "Le prénom du médecin est obligatoire",
        "string.alphanum":
          "Le prénom du médecin contient des caractères invalides",
        "string.min":
          "Le prénom du médecin doit contenir au moins 2 caractères",
        "string.max": "Le prénom du médecin est trop long",
        "any.required": "Le prénom du médecin est obligatoire",
      }),

    last_name: Joi.string()
      .trim()
      .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
      .min(2)
      .max(50)
      .required()
      .messages({
        "string.empty": "Le nom du médecin est obligatoire",
        "string.alphanum":
          "Le nom du médecin contient des caractères invalides",
        "string.min": "Le nom du médecin doit contenir au moins 2 caractères",
        "string.max": "Le nom du médecin est trop long",
        "any.required": "Le nom du médecin est obligatoire",
      }),

    specialty: Joi.string()
      .valid(
        "GENERAL_PRACTITIONER",
        "PEDIATRICIAN",
        "CARDIOLOGIST",
        "DERMATOLOGIST",
        "NEUROLOGIST",
        "PSYCHIATRIST",
        "PSYCHOLOGIST",
        "ENDOCRINOLOGIST",
        "GASTROENTEROLOGIST",
        "PULMONOLOGIST",
        "NEPHROLOGIST",
        "RHEUMATOLOGIST",
        "ONCOLOGIST",
        "HEMATOLOGIST",
        "INFECTIOUS_DISEASE",
        "ALLERGIST",
        "OPHTHALMOLOGIST",
        "OTOLARYNGOLOGIST",
        "ORTHOPEDIST",
        "TRAUMATOLOGIST",
        "SURGEON",
        "ANESTHESIOLOGIST",
        "RADIOLOGIST",
        "EMERGENCY_PHYSICIAN",
        "SPORTS_MEDICINE",
        "GYNECOLOGIST",
        "OBSTETRICIAN",
        "UROLOGIST",
        "DENTIST",
        "PHARMACOLOGIST",
        "OTHER"
      )
      .required()
      .messages({
        "any.only": "La spécialité du médecin est invalide",
        "any.required": "La spécialité du médecin est obligatoire",
      }),

    phone: Joi.string()
      .trim()
      .pattern(/^[0-9+()\s-]{5,15}$/)
      .required()
      .messages({
        "string.empty": "Le téléphone du médecin est obligatoire",
        "string.pattern.base": "Le téléphone du médecin est invalide",
        "any.required": "Le téléphone du médecin est obligatoire",
      }),

    email: Joi.string().trim().email().max(100).optional().messages({
      "string.email": "L'email du médecin est invalide",
      "string.max": "L'email du médecin est trop long",
    }),
  })
    .required()
    .messages({ "any.required": "Le médecin est obligatoire" }),
});
// Schéma pour les traitements médicaux (tableau)
export const TreatmentsArraySchema = Joi.array().items(MedicalTreatmentSchema);

import Joi from "joi";

// Schéma pour le profil médical
export const MedicalProfileSchema = Joi.object({
  first_name: Joi.string()
    .trim()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Le prénom est obligatoire",
      "string.pattern.base":
        "Le prénom ne doit contenir que des lettres, espaces, tirets ou apostrophes",
      "string.min": "Le prénom doit contenir au moins 2 caractères",
      "string.max": "Le prénom doit contenir au maximum 50 caractères",
      "any.required": "Le prénom est obligatoire",
    }),

  last_name: Joi.string()
    .trim()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Le nom de famille est obligatoire",
      "string.pattern.base":
        "Le nom de famille ne doit contenir que des lettres, espaces, tirets ou apostrophes",
      "string.min": "Le nom de famille doit contenir au moins 2 caractères",
      "string.max": "Le nom de famille doit contenir au maximum 50 caractères",
      "any.required": "Le nom de famille est obligatoire",
    }),

  address: Joi.string().trim().min(5).max(255).required().messages({
    "string.empty": "L'adresse est obligatoire",
    "string.min": "L'adresse est trop courte",
    "string.max": "L'adresse est trop longue",
    "any.required": "L'adresse est obligatoire",
  }),

  birth_date: Joi.date().less("now").required().messages({
    "date.base": "La date de naissance est invalide",
    "date.less": "La date de naissance doit être dans le passé",
    "any.required": "La date de naissance est obligatoire",
  }),

  size: Joi.number().precision(2).positive().required().messages({
    "number.base": "La taille doit être un nombre",
    "number.positive": "La taille doit être positive",
    "any.required": "La taille est obligatoire",
  }),

  weight: Joi.number().precision(2).positive().required().messages({
    "number.base": "Le poids doit être un nombre",
    "number.positive": "Le poids doit être positif",
    "any.required": "Le poids est obligatoire",
  }),

  blood_type: Joi.string()
    .valid(
      "A_POSITIVE",
      "A_NEGATIVE",
      "B_POSITIVE",
      "B_NEGATIVE",
      "O_POSITIVE",
      "O_NEGATIVE"
    )
    .required()
    .messages({
      "any.only": "Le groupe sanguin est invalide",
      "any.required": "Le groupe sanguin est obligatoire",
    }),

  sex: Joi.string().valid("MALE", "FEMALE").required().messages({
    "any.only": "Le sexe doit être MALE ou FEMALE",
    "any.required": "Le sexe est obligatoire",
  }),

  allergies: Joi.array()
    .items(
      Joi.string().trim().max(255).messages({
        "string.max": "Chaque allergie doit contenir au maximum 255 caractères",
      })
    )
    .max(20)
    .messages({
      "array.max": "Vous ne pouvez pas ajouter plus de 20 allergies",
    }),

  emergency_contact: Joi.object({
    first_name: Joi.string()
      .trim()
      .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
      .max(100)
      .required()
      .messages({
        "string.empty": "Le prénom du contact d'urgence est obligatoire",
        "string.max": "Le prénom du contact d'urgence est trop long",
        "string.pattern.base":
          "Le prénom ne doit contenir que des lettres, espaces, tirets ou apostrophes",
        "any.required": "Le prénom du contact d'urgence est obligatoire",
      }),
    last_name: Joi.string()
      .trim()
      .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
      .max(100)
      .required()
      .messages({
        "string.empty": "Le nom du contact d'urgence est obligatoire",
        "string.max": "Le nom du contact d'urgence est trop long",
        "string.pattern.base":
          "Le nom ne doit contenir que des lettres, espaces, tirets ou apostrophes",
        "any.required": "Le nom du contact d'urgence est obligatoire",
      }),
    phone: Joi.string()
      .trim()
      .pattern(/^[0-9+()\s-]{5,15}$/)
      .required()
      .messages({
        "string.empty":
          "Le numéro de téléphone du contact d'urgence est obligatoire",
        "string.pattern.base": "Le numéro de téléphone du contact est invalide",
        "any.required":
          "Le numéro de téléphone du contact d'urgence est obligatoire",
      }),
  })
    .required()
    .messages({
      "any.required": "Le contact d'urgence est obligatoire",
    }),

  alzheimer: Joi.boolean()
    .required()
    .messages({ "any.required": "Le champ alzheimer est obligatoire" }),

  epilepsy: Joi.boolean()
    .required()
    .messages({ "any.required": "Le champ epilepsy est obligatoire" }),
});

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

export const TreatmentsArraySchema = Joi.array().items(MedicalTreatmentSchema);

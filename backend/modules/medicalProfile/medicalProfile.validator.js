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

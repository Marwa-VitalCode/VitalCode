import AppError from "../errors/AppError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err); // pour les logs serveur

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error_code: err.statusCode,
      details: err.details || null,
    });
  }

  // Erreur inconnue (bug)
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;

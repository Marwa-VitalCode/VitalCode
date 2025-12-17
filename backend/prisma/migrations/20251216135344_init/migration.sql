-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "QrStatus" AS ENUM ('PENDING', 'IN_PROCESS', 'ACTIVE', 'REVOKED');

-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('SCHOOL', 'NGO', 'GYM', 'HOSPITAL', 'OTHER');

-- CreateEnum
CREATE TYPE "DoctorSpecialty" AS ENUM ('GENERAL_PRACTITIONER', 'PEDIATRICIAN', 'CARDIOLOGIST', 'DERMATOLOGIST', 'NEUROLOGIST', 'PSYCHIATRIST', 'PSYCHOLOGIST', 'ENDOCRINOLOGIST', 'GASTROENTEROLOGIST', 'PULMONOLOGIST', 'NEPHROLOGIST', 'RHEUMATOLOGIST', 'ONCOLOGIST', 'HEMATOLOGIST', 'INFECTIOUS_DISEASE', 'ALLERGIST', 'OPHTHALMOLOGIST', 'OTOLARYNGOLOGIST', 'ORTHOPEDIST', 'TRAUMATOLOGIST', 'SURGEON', 'ANESTHESIOLOGIST', 'RADIOLOGIST', 'EMERGENCY_PHYSICIAN', 'SPORTS_MEDICINE', 'GYNECOLOGIST', 'OBSTETRICIAN', 'UROLOGIST', 'DENTIST', 'PHARMACOLOGIST', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "hash_password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalProfile" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "size" DECIMAL(5,2) NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL,
    "blood_type" "BloodType" NOT NULL,
    "sex" "Sex" NOT NULL,
    "allergies" JSONB NOT NULL,
    "alzheimer" BOOLEAN NOT NULL,
    "epilepsy" BOOLEAN NOT NULL,
    "emergency_contact" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "MedicalProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalTreatment" (
    "id" TEXT NOT NULL,
    "disease_name" VARCHAR(100) NOT NULL,
    "medication_name" VARCHAR(100) NOT NULL,
    "dosage" VARCHAR(100) NOT NULL,
    "frequency" VARCHAR(100) NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "medical_profile_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,

    CONSTRAINT "MedicalTreatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "specialty" "DoctorSpecialty" NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrCode" (
    "id" TEXT NOT NULL,
    "status" "QrStatus" NOT NULL,
    "hash_signature" VARCHAR(255) NOT NULL,
    "scan_count" INTEGER NOT NULL DEFAULT 0,
    "last_scanned_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medical_profile_id" TEXT NOT NULL,

    CONSTRAINT "QrCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PartnerType" NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "partner_id" TEXT,
    "user_id" TEXT NOT NULL,
    "medical_profile_id" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "QrCode_medical_profile_id_key" ON "QrCode"("medical_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_medical_profile_id_key" ON "Order"("medical_profile_id");

-- AddForeignKey
ALTER TABLE "MedicalProfile" ADD CONSTRAINT "MedicalProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalTreatment" ADD CONSTRAINT "MedicalTreatment_medical_profile_id_fkey" FOREIGN KEY ("medical_profile_id") REFERENCES "MedicalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalTreatment" ADD CONSTRAINT "MedicalTreatment_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrCode" ADD CONSTRAINT "QrCode_medical_profile_id_fkey" FOREIGN KEY ("medical_profile_id") REFERENCES "MedicalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_medical_profile_id_fkey" FOREIGN KEY ("medical_profile_id") REFERENCES "MedicalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

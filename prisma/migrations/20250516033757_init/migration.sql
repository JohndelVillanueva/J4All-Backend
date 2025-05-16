-- CreateTable
CREATE TABLE `employers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `company_name` VARCHAR(191) NOT NULL,
    `company_description` VARCHAR(191) NULL,
    `industry` VARCHAR(191) NULL,
    `company_size` VARCHAR(191) NULL,
    `website_url` VARCHAR(191) NULL,
    `logo_path` VARCHAR(191) NULL,
    `founded_year` INTEGER NULL,

    UNIQUE INDEX `employers_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_applications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_id` INTEGER NOT NULL,
    `seeker_id` INTEGER NOT NULL,
    `employer_id` INTEGER NOT NULL,
    `application_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cover_letter` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_listings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employer_id` INTEGER NOT NULL,
    `job_title` VARCHAR(191) NOT NULL,
    `job_description` VARCHAR(191) NULL,
    `job_requirements` VARCHAR(191) NULL,
    `job_location` VARCHAR(191) NULL,
    `job_type` VARCHAR(191) NULL,
    `salary_range_min` DOUBLE NULL,
    `salary_range_max` DOUBLE NULL,
    `posted_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiration_date` DATETIME(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_required_skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_id` INTEGER NOT NULL,
    `skill_id` INTEGER NOT NULL,
    `is_required` BOOLEAN NOT NULL DEFAULT true,
    `importance_level` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_seekers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `resume_text` VARCHAR(191) NULL,
    `resume_file_path` VARCHAR(191) NULL,
    `education` VARCHAR(191) NULL,
    `experience_years` INTEGER NULL,
    `current_job_title` VARCHAR(191) NULL,
    `desired_job_title` VARCHAR(191) NULL,
    `desired_salary` DOUBLE NULL,
    `location_preference` VARCHAR(191) NULL,

    UNIQUE INDEX `job_seekers_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_seekers_skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seeker_id` INTEGER NOT NULL,
    `skill_id` INTEGER NOT NULL,
    `proficiency_level` INTEGER NULL DEFAULT 1,
    `years_of_experience` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saved_jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seeker_id` INTEGER NOT NULL,
    `job_id` INTEGER NOT NULL,
    `saved_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `saved_jobs_seeker_id_job_id_key`(`seeker_id`, `job_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `skill_name` VARCHAR(191) NOT NULL,
    `skill_category` VARCHAR(191) NULL,

    UNIQUE INDEX `skills_skill_name_key`(`skill_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `user_type` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_login` DATETIME(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `job_applications` ADD CONSTRAINT `fk_job_listing_app` FOREIGN KEY (`job_id`) REFERENCES `job_listings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_applications` ADD CONSTRAINT `fk_seeker_app` FOREIGN KEY (`seeker_id`) REFERENCES `job_seekers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_applications` ADD CONSTRAINT `fk_employer_app` FOREIGN KEY (`employer_id`) REFERENCES `employers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_listings` ADD CONSTRAINT `fk_employer_listing` FOREIGN KEY (`employer_id`) REFERENCES `employers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_required_skills` ADD CONSTRAINT `fk_job_required_skill` FOREIGN KEY (`job_id`) REFERENCES `job_listings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_required_skills` ADD CONSTRAINT `fk_required_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_seekers_skills` ADD CONSTRAINT `fk_seeker_skill` FOREIGN KEY (`seeker_id`) REFERENCES `job_seekers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_seekers_skills` ADD CONSTRAINT `fk_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Enterprise Group PM Suite - MySQL Database DDL & Seed Script
-- Database Name: epm_suite_db

CREATE DATABASE IF NOT EXISTS `epm_suite_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `epm_suite_db`;

-- 1. Companies Table
CREATE TABLE IF NOT EXISTS `companies` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `tagline` TEXT,
  `logo` VARCHAR(50) DEFAULT '🏢',
  `team_size` INT DEFAULT 0,
  `active_apps` INT DEFAULT 0,
  `projects_count` INT DEFAULT 0,
  `departments` JSON,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `role` VARCHAR(50) NOT NULL DEFAULT 'Developer',
  `role_key` VARCHAR(50) NOT NULL DEFAULT 'developer',
  `company_id` VARCHAR(50),
  `department` VARCHAR(100),
  `designation` VARCHAR(100),
  `avatar` TEXT,
  `active_projects_count` INT DEFAULT 0,
  `pending_tasks_count` INT DEFAULT 0,
  `completed_tasks_count` INT DEFAULT 0,
  `status` VARCHAR(20) DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS `projects` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `company_id` VARCHAR(50),
  `company_name` VARCHAR(255),
  `description` TEXT,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Development',
  `progress` INT DEFAULT 0,
  `manager` VARCHAR(100) DEFAULT 'Super Admin',
  `assigned_tester_id` VARCHAR(50),
  `assigned_tester_name` VARCHAR(100),
  `platform` VARCHAR(100) DEFAULT 'Web Application',
  `testing_url` TEXT,
  `release_url` TEXT,
  `version` VARCHAR(50),
  `due_date` DATE,
  `last_updated` VARCHAR(100),
  `failed_reason` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Applications Table
CREATE TABLE IF NOT EXISTS `applications` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) DEFAULT 'Web Portal',
  `company_id` VARCHAR(50),
  `company_name` VARCHAR(255),
  `version` VARCHAR(50) DEFAULT 'v1.0.0',
  `platform` VARCHAR(100) DEFAULT 'Web Application',
  `technology` VARCHAR(255) DEFAULT 'React 19 + Node.js',
  `production_url` TEXT,
  `developer` VARCHAR(100) DEFAULT 'Super Admin',
  `status` VARCHAR(50) DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Releases Table
CREATE TABLE IF NOT EXISTS `releases` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `app_name` VARCHAR(255) NOT NULL,
  `company_id` VARCHAR(50),
  `version` VARCHAR(50) NOT NULL,
  `build_number` INT DEFAULT 100,
  `platform` VARCHAR(100) DEFAULT 'Web Application',
  `release_notes` TEXT,
  `production_url` TEXT,
  `uploaded_by` VARCHAR(100) DEFAULT 'Super Admin',
  `status` VARCHAR(50) DEFAULT 'Published',
  `release_date` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Issues Table
CREATE TABLE IF NOT EXISTS `issues` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `severity` VARCHAR(50) DEFAULT 'Medium',
  `status` VARCHAR(50) DEFAULT 'Open',
  `project_id` VARCHAR(50),
  `project_name` VARCHAR(255),
  `reported_by` VARCHAR(100),
  `assigned_to` VARCHAR(100),
  `created_date` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Activities Log Table
CREATE TABLE IF NOT EXISTS `activities` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `user` VARCHAR(100) NOT NULL,
  `user_avatar` TEXT,
  `action` TEXT NOT NULL,
  `module` VARCHAR(100) DEFAULT 'System Governance',
  `time` VARCHAR(100) DEFAULT 'Just now',
  `company` VARCHAR(255) DEFAULT 'Apex Tech Solutions',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Initial Seed Companies
INSERT IGNORE INTO `companies` (`id`, `name`, `code`, `tagline`, `logo`, `team_size`, `active_apps`, `projects_count`, `departments`) VALUES
('comp-1', 'Apex Tech Solutions', 'APEX', 'Enterprise Web Applications & Cloud Services', '⚡', 2, 1, 1, '["Executive Management", "Software Engineering", "DevOps & Cloud", "QA Automation"]'),
('comp-2', 'Nexus Digital Systems', 'NEXUS', 'Mobile Apps, Android APK Releases & iOS Platforms', '🌐', 1, 1, 1, '["Android Development", "iOS Development", "UI/UX Design"]'),
('comp-3', 'CyberPulse Security', 'CYBER', 'Infrastructure Maintenance & Penetration Testing', '🛡️', 1, 0, 1, '["Cybersecurity", "Infrastructure", "Database Ops"]');

-- Initial Seed Accounts (admin, manager, tester, developer, simbunew)
INSERT IGNORE INTO `users` (`id`, `username`, `password_hash`, `password`, `name`, `email`, `role`, `role_key`, `company_id`, `department`, `designation`, `status`) VALUES
('usr-1', 'admin', 'Admin@123', 'Admin@123', 'Super Admin', 'admin@apexgroup.com', 'Super Admin', 'admin', 'comp-1', 'Executive Management', 'VP of Technology & Operations', 'Active'),
('usr-2', 'manager', 'Manager@123', 'Manager@123', 'Sarah Jenkins', 'manager@apexgroup.com', 'Project Manager', 'manager', 'comp-1', 'Software Engineering', 'Senior Project Manager', 'Active'),
('usr-3', 'tester', 'Tester@123', 'Tester@123', 'Alex Rivera', 'tester@apexgroup.com', 'QA Engineer', 'qa', 'comp-2', 'QA Automation', 'Lead QA Engineer', 'Active'),
('usr-4', 'developer', 'Developer@123', 'Developer@123', 'David Chen', 'dev@apexgroup.com', 'Developer', 'developer', 'comp-3', 'Software Engineering', 'Full Stack Engineer', 'Active'),
('usr-5', 'simbunew', 'Simbunew@123', 'Simbunew@123', 'Simbu New User', 'simbunew@apexgroup.com', 'Super Admin', 'admin', 'comp-1', 'Executive Management', 'Senior Lead Specialist', 'Active');

-- Initial Seed Projects
INSERT IGNORE INTO `projects` (`id`, `name`, `company_id`, `company_name`, `description`, `status`, `progress`, `manager`, `assigned_tester_id`, `assigned_tester_name`, `platform`, `testing_url`, `due_date`, `last_updated`) VALUES
('proj-101', 'Enterprise ERP Suite v2.4', 'comp-1', 'Apex Tech Solutions', 'Core financial governance and resource planning module with real-time analytics.', 'Testing In Progress', 65, 'Super Admin', 'usr-1', 'Super Admin', 'Web Application', 'https://staging.erp.apexgroup.com', '2026-09-15', '2026-08-12 14:00'),
('proj-102', 'Mobile Banking Portal (APK & iOS)', 'comp-2', 'Nexus Digital Systems', 'Secure native mobile banking application supporting biometrics and transaction alerts.', 'Release Pending', 85, 'Super Admin', 'usr-1', 'Super Admin', 'Android & iOS', 'https://staging-banking.nexusdigital.com', '2026-08-30', '2026-08-12 11:30'),
('proj-103', 'Zero-Trust Shield Gateway', 'comp-3', 'CyberPulse Security', 'Intrusion detection system and automated pentesting protocol analyzer.', 'Development', 30, 'Super Admin', '', '', 'Cloud Infrastructure', 'https://staging.cyberpulse.io', '2026-10-01', '2026-08-11 16:45');

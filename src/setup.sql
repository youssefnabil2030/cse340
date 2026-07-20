-- ====================================================================
-- 1. Create Organizations Table
-- ====================================================================
CREATE TABLE IF NOT EXISTS organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- 2. Create Projects Table (Belongs to an Organization)
-- ====================================================================
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    organization_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id) 
        REFERENCES organizations(id)
        ON DELETE SET NULL
);

-- ====================================================================
-- 3. Create Categories Table
-- ====================================================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ====================================================================
-- 4. Create Junction Table (Many-to-Many Link)
-- ====================================================================
CREATE TABLE IF NOT EXISTS project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project 
        FOREIGN KEY (project_id) 
        REFERENCES projects(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_category 
        FOREIGN KEY (category_id) 
        REFERENCES categories(id) 
        ON DELETE CASCADE
);

-- ====================================================================
-- 5. Seed Data (Ensures your EJS pages pull valid rows)
-- ====================================================================

-- Seed Organizations
INSERT INTO organizations (name, description) VALUES
    ('Hope Worldwide', 'Global non-profit focused on community development.'),
    ('EcoGuardians', 'Action-driven environmental protection group.')
ON CONFLICT (name) DO NOTHING;

-- Seed Projects (Using subqueries to safely match IDs dynamically)
INSERT INTO projects (name, description, organization_id) VALUES
    ('City Food Drive', 'Distributing meals to local shelters.', (SELECT id FROM organizations WHERE name = 'Hope Worldwide')),
    ('River Cleanup Initiative', 'Removing plastics from the local riverbed.', (SELECT id FROM organizations WHERE name = 'EcoGuardians')),
    ('Green Space Development', 'Planting trees and creating urban community gardens.', (SELECT id FROM organizations WHERE name = 'EcoGuardians'))
;

-- Seed Categories
INSERT INTO categories (name) VALUES 
    ('Community Outreach'),
    ('Environmental Cleanup'),
    ('Education & Tutoring'),
    ('Disaster Relief')
ON CONFLICT (name) DO NOTHING;

-- Seed Associations
INSERT INTO project_categories (project_id, category_id) VALUES
    ((SELECT id FROM projects WHERE name = 'City Food Drive'), (SELECT id FROM categories WHERE name = 'Community Outreach')),
    ((SELECT id FROM projects WHERE name = 'River Cleanup Initiative'), (SELECT id FROM categories WHERE name = 'Environmental Cleanup')),
    ((SELECT id FROM projects WHERE name = 'Green Space Development'), (SELECT id FROM categories WHERE name = 'Community Outreach')),
    ((SELECT id FROM projects WHERE name = 'Green Space Development'), (SELECT id FROM categories WHERE name = 'Environmental Cleanup'))
ON CONFLICT DO NOTHING;

-- ====================================================================
-- 1. Create Categories Table
-- ====================================================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ====================================================================
-- 2. Create Junction Table (Many-to-Many Link)
-- ====================================================================
CREATE TABLE IF NOT EXISTS project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    -- Assuming your existing project table is named 'projects' and has primary key 'id'
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
-- 3. Seed Category Data (At least 3 relevant categories)
-- ====================================================================
INSERT INTO categories (name) VALUES 
    ('Community Outreach'),
    ('Environmental Cleanup'),
    ('Education & Tutoring'),
    ('Disaster Relief')
ON CONFLICT (name) DO NOTHING;

-- ====================================================================
-- 4. Associate Projects with Categories (Seed Associations)
-- ====================================================================
-- Note: Replace the project_ids (1, 2, 3) with valid IDs from your projects table.
INSERT INTO project_categories (project_id, category_id) VALUES
    (1, 1), -- Project 1 is 'Community Outreach'
    (1, 2), -- Project 1 is ALSO 'Environmental Cleanup' (demonstrates many-to-many)
    (2, 2), -- Project 2 is 'Environmental Cleanup'
    (3, 3)  -- Project 3 is 'Education & Tutoring'
ON CONFLICT DO NOTHING;

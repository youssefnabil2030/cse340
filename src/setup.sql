-- ====================================================================
-- 1. Create Clean Slate (Drop existing tables in reverse order of dependencies)
-- ====================================================================
DROP TABLE IF EXISTS public.project_categories;
DROP TABLE IF EXISTS public.categories;
DROP TABLE IF EXISTS public.projects;
DROP TABLE IF EXISTS public.organizations;

-- ====================================================================
-- 2. Create Base Tables
-- ====================================================================
CREATE TABLE public.organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE public.projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    organization_id INT REFERENCES public.organizations(id) ON DELETE SET NULL
);

CREATE TABLE public.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ====================================================================
-- 3. Create Many-to-Many Junction Table
-- ====================================================================
CREATE TABLE public.project_categories (
    project_id INT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- ====================================================================
-- 4. Seed Data (Ensures no empty arrays pass to your EJS files)
-- ====================================================================
INSERT INTO public.organizations (name, description) VALUES
    ('Hope Worldwide', 'Global non-profit focused on community development.'),
    ('EcoGuardians', 'Action-driven environmental protection group.');

INSERT INTO public.projects (name, description, organization_id) VALUES
    ('City Food Drive', 'Distributing meals to local shelters.', 1),
    ('River Cleanup Initiative', 'Removing plastics from the local riverbed.', 2),
    ('Green Space Development', 'Planting trees and creating urban community gardens.', 2);

INSERT INTO public.categories (name) VALUES 
    ('Community Outreach'),
    ('Environmental Cleanup'),
    ('Education & Tutoring'),
    ('Disaster Relief');

-- Associate each project with at least one category
INSERT INTO public.project_categories (project_id, category_id) VALUES
    (1, 1), -- Food Drive -> Community Outreach
    (2, 2), -- River Cleanup -> Environmental Cleanup
    (3, 1), -- Green Space -> Community Outreach
    (3, 2); -- Green Space -> Environmental Cleanup

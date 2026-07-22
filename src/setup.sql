-- ====================================================================
-- 1. Create Clean Slate
-- ====================================================================
DROP TABLE IF EXISTS public.project_categories CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.organizations CASCADE;

-- ====================================================================
-- 2. Create Base Tables (Updated with ALL Required Rubric Columns)
-- ====================================================================
CREATE TABLE public.organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,
    contact_email VARCHAR(150) NOT NULL,
    logo_filename VARCHAR(255) DEFAULT 'default-logo.png',
    location VARCHAR(150) NOT NULL,
    date_created DATE DEFAULT CURRENT_DATE
);

CREATE TABLE public.projects (
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    start_date DATE DEFAULT CURRENT_DATE,
    organization_id INT REFERENCES public.organizations(organization_id) ON DELETE SET NULL
);

CREATE TABLE public.categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ====================================================================
-- 3. Create Junction Table
-- ====================================================================
CREATE TABLE public.project_categories (
    project_id INT NOT NULL REFERENCES public.projects(project_id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES public.categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- ====================================================================
-- 4. Seed Data (Fully populated with emails, logos, locations, & dates)
-- ====================================================================
INSERT INTO public.organizations (name, description, contact_email, logo_filename, location, date_created) VALUES
    ('Hope Worldwide', 'Global non-profit focused on community development.', 'contact@hopeworldwide.org', 'hope-logo.png', 'Salt Lake City, UT', '2024-01-15'),
    ('EcoGuardians', 'Action-driven environmental protection group.', 'info@ecoguardians.org', 'eco-logo.png', 'Boise, ID', '2024-03-22');

INSERT INTO public.projects (name, description, start_date, organization_id) VALUES
    ('City Food Drive', 'Distributing meals to local shelters.', '2024-05-10', 1),
    ('River Cleanup Initiative', 'Removing plastics from the local riverbed.', '2024-06-01', 2),
    ('Green Space Development', 'Planting trees and creating urban community gardens.', '2024-06-15', 2);

INSERT INTO public.categories (name) VALUES 
    ('Community Outreach'),
    ('Environmental Cleanup'),
    ('Education & Tutoring'),
    ('Disaster Relief');

INSERT INTO public.project_categories (project_id, category_id) VALUES
    (1, 1),
    (2, 2),
    (3, 1),
    (3, 2);

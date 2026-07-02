/*
  # Create TK Architects tables

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `category` (text, not null)
      - `description` (text)
      - `image_url` (text)
      - `year` (int)
      - `location` (text)
      - `featured` (boolean, default false)
      - `sort_order` (int, default 0)
      - `created_at` (timestamptz)
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `phone` (text)
      - `subject` (text)
      - `message` (text, not null)
      - `read` (boolean, default false)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Projects: anyone can read, only authenticated can write
    - Contact messages: anyone can insert, only authenticated can read
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Residential',
  description text DEFAULT '',
  image_url text DEFAULT '',
  year int DEFAULT EXTRACT(YEAR FROM NOW())::int,
  location text DEFAULT '',
  featured boolean DEFAULT false,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text DEFAULT '',
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample projects
INSERT INTO projects (title, category, description, image_url, year, location, featured, sort_order) VALUES
  ('The Glass Pavilion', 'Residential', 'A stunning glass-walled residence that dissolves the boundary between interior living and the surrounding forest landscape.', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 2024, 'Portland, OR', true, 1),
  ('Urban Nexus Tower', 'Commercial', 'A 40-story mixed-use tower featuring a triple-height lobby and sky gardens on every tenth floor.', 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 2023, 'Chicago, IL', true, 2),
  ('Serenity Wellness Center', 'Healthcare', 'A wellness retreat center designed with biophilic principles, integrating natural light and organic materials throughout.', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 2024, 'Sedona, AZ', true, 3),
  ('Harbor Loft Residences', 'Residential', 'Converted waterfront warehouses transformed into luxury loft apartments preserving industrial character.', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 2022, 'Boston, MA', false, 4),
  ('Meridian Cultural Center', 'Cultural', 'A civic cultural center with a cantilevered performance hall and open-air sculpture garden.', 'https://images.pexels.com/photos/3610160/pexels-photo-3610160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 2023, 'Austin, TX', false, 5),
  ('Solstice Office Campus', 'Commercial', 'A net-zero office campus with living walls, rainwater harvesting, and cross-laminated timber structure.', 'https://images.pexels.com/photos/374847/pexels-photo-374847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 2024, 'Denver, CO', false, 6);

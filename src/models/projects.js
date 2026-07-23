import db from '../db.js';

// Default pool of high-res community project images
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80"
];

class Project {
  static async getAll() {
    try {
      const sql = "SELECT * FROM public.projects ORDER BY name ASC";
      const result = await db.query(sql);

      // Map rows and attach an image_url if missing in DB
      return result.rows.map((project, index) => ({
        ...project,
        image_url: project.image_url || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]
      }));
    } catch (error) {
      console.error("Error inside Project.getAll model: ", error);
      throw error;
    }
  }
}

export default Project;

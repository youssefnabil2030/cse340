import db from '../db.js'; // Go up one directory level

const Project = {};

Project.getAll = async function() {
  try {
    const sql = "SELECT * FROM public.projects ORDER BY name ASC";
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error inside Project.getAll model: ", error);
    throw error;
  }
};

export default Project;

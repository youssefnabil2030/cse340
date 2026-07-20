// ❌ If it was: import db from './db.js'; -> Change it to go up one level:
import db from '../db.js'; 

const Category = {};

Category.getAll = async function() {
  try {
    const sql = "SELECT * FROM public.categories ORDER BY name ASC";
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error inside Category.getAll model: ", error);
    throw error;
  }
};

export default Category;

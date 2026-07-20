import db from './db.js'; // Ensure the .js extension is present for ESM

const Category = {};

/* ******************************************
 * Get all categories from the database
 * **************************************** */
Category.getAll = async function() {
  try {
    const sql = "SELECT * FROM public.categories ORDER BY name ASC";
    const result = await db.query(sql);
    return result.rows; // Returns an array of objects: [{id: 1, name: '...'}, ...]
  } catch (error) {
    console.error("Error inside Category.getAll model: ", error);
    throw error;
  }
};

export default Category;

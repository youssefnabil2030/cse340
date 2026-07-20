import db from '../db.js'; // Go up one directory level

const Organization = {};

Organization.getAll = async function() {
  try {
    const sql = "SELECT * FROM public.organizations ORDER BY name ASC";
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error inside Organization.getAll model: ", error);
    throw error;
  }
};

export default Organization;

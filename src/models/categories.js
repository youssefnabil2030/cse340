const db = require("./db")

const Category = {}

/* ******************************************
 * Get all categories from the database
 * **************************************** */
Category.getAll = async function() {
  try {
    const sql = "SELECT * FROM public.categories ORDER BY name ASC"
    const result = await db.query(sql)
    return result.rows
  } catch (error) {
    console.error("Error inside Category.getAll model: " + error)
    throw error
  }
}

module.exports = Category

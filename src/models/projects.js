const db = require("./db.js")

const Project = {}

Project.getAll = async function() {
  try {
    const sql = "SELECT * FROM public.projects ORDER BY name ASC"
    const result = await db.query(sql)
    return result.rows
  } catch (error) {
    console.error("Error inside Project.getAll model: " + error)
    throw error
  }
}

module.exports = Project

import pool from '../db.js'; // Adjust this path to your database configuration file

/**
 * Fetch all categories from the database, ordered alphabetically
 * @returns {Promise<Array>} Array of category objects { id, name }
 */
export async function getAllCategories() {
    const queryText = 'SELECT id, name FROM categories ORDER BY name ASC;';
    try {
        const { rows } = await pool.query(queryText);
        return rows;
    } catch (error) {
        console.error('Error in getAllCategories model:', error);
        throw error;
    }
}
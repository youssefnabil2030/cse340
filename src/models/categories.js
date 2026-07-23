import db from '../db.js';

// Map specific category names to unique high-res Unsplash URLs
const CATEGORY_IMAGES = {
  'Environmental Cleanup': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80',
  'Environment': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80',
  'Education & Tutoring': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=80',
  'Education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=80',
  'Community Outreach': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&auto=format&fit=crop&q=80',
  'Disaster Relief': 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&auto=format&fit=crop&q=80',
  'Social Welfare': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=80',
  'Animal Welfare': 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=500&auto=format&fit=crop&q=80'
};

// Fallback pool if the category name doesn't match the dictionary above
const FALLBACK_POOL = [
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&auto=format&fit=crop&q=80'
];

const Category = {};

Category.getAll = async function() {
  try {
    const sql = "SELECT * FROM public.categories ORDER BY name ASC";
    const result = await db.query(sql);

    // Attach a distinct image URL to each category object
    return result.rows.map((category, index) => {
      // 1. Check if category already has an image_url in DB
      // 2. Check dictionary match
      // 3. Fallback to index-based unique pool image
      const matchedImage = CATEGORY_IMAGES[category.name] || FALLBACK_POOL[index % FALLBACK_POOL.length];
      
      return {
        ...category,
        image_url: category.image_url || matchedImage
      };
    });
  } catch (error) {
    console.error("Error inside Category.getAll model: ", error);
    throw error;
  }
};

export default Category;

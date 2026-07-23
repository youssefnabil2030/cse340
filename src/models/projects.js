import db from '../db.js'; // Go up one directory level

const projects = [
  {
    id: 1,
    title: "Urban Tree Canopy Initiative",
    category: "Environment",
    organization: "GreenEarth Foundation",
    description: "Planting 1,000 indigenous trees in metropolitan parks to improve air quality and reduce urban heat islands.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    id: 2,
    title: "Community Food Pantry & Distribution",
    category: "Social Welfare",
    organization: "Hope Community Center",
    description: "Providing fresh, organic meals and essential groceries weekly to low-income families and seniors.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
    status: "Active"
  },
  {
    id: 3,
    title: "Coastal Plastic Clean-Up Drive",
    category: "Environment",
    organization: "Ocean Clean Project",
    description: "Organizing weekend shoreline cleanups and plastic recycling workshops along local beaches.",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&auto=format&fit=crop&q=80",
    status: "Completed"
  },
  {
    id: 4,
    title: "Emergency Medical & Relief Logistics",
    category: "Disaster Relief",
    organization: "Global Aid Network",
    description: "Sorting, packing, and dispatching crucial medical supplies and hygiene kits to disaster-affected zones.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80",
    status: "Active"
  }
];


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

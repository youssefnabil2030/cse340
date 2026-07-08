import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Replicate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static middleware to serve the public folder (CSS and Images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes using async/await arrow functions
app.get('/', async (req, res) => {
    try {
        res.render('home', { pageTitle: 'Home' });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.get('/organizations', async (req, res) => {
    try {
        res.render('organizations', { pageTitle: 'Organizations' });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.get('/projects', async (req, res) => {
    try {
        res.render('projects', { pageTitle: 'Service Projects' });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.get('/categories', async (req, res) => {
    try {
        const projectCategories = [
            'Environmental',
            'Educational',
            'Community Service',
            'Health and Wellness'
        ];
        res.render('categories', { 
            pageTitle: 'Categories', 
            categories: projectCategories 
        });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running locally at http://localhost:${port}`);
});

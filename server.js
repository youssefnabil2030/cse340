import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Replicate __dirname for ESM syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the dynamic template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets out of the public directory
app.use(express.static(path.join(__dirname, 'public')));

// 1) Home Route using async/await arrow function syntax
app.get('/', async (req, res) => {
    try {
        res.render('home', { pageTitle: 'Home' });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

// 2) Organizations Route
app.get('/organizations', async (req, res) => {
    try {
        res.render('organizations', { pageTitle: 'Organizations' });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

// 3) Projects Route
app.get('/projects', async (req, res) => {
    try {
        res.render('projects', { pageTitle: 'Service Projects' });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

// 4) Categories Route (Explicit assignment requirement)
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
    console.log(`Application is running on port ${port}`);
});

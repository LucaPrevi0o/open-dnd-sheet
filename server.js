import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());

// Basic route to check if server is running
app.get('/', (req, res) => {
    res.send('Open D&D Sheet is running!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
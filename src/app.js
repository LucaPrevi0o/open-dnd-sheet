import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createSheetRouter } from './routes/sheetRoutes.js';
import { renderPage } from './views/renderPage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(express.static(path.join(projectRoot, 'public')));

    app.get('/', async (req, res, next) => {
        try {
            res.type('html').send(await renderPage(projectRoot));
        } catch (error) {
            next(error);
        }
    });

    app.use('/api/sheet', createSheetRouter(projectRoot));

    return app;
}
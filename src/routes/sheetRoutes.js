import express from 'express';
import { compileCharacterSheet } from '../services/sheetCompiler.js';

export function createSheetRouter(projectRoot) {
    const router = express.Router();

    router.get('/example', async (req, res) => {
        try {
            res.json(await compileCharacterSheet(projectRoot, 'example'));
        } catch (error) {
            console.error('Error generating sheet:', error);
            res.status(500).json({ error: 'Failed to generate character sheet' });
        }
    });

    return router;
}
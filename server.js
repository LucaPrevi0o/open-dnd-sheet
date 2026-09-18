import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// API Endpoint to compile and view an example character sheet
app.get('/api/sheet/example', async (req, res) => {
    try {
        // 1. Read character base properties
        const charPath = path.join(__dirname, 'content/characters/example.json');
        const charData = JSON.parse(await fs.readFile(charPath, 'utf8'));

        // 2. Read stat behavior modules dynamically
        const statsDir = path.join(__dirname, 'content/stats');
        const statFiles = await fs.readdir(statsDir);
        
        const statConfigs = {};
        for (const file of statFiles) {
            if (file.endsWith('.js')) {
                const statModule = await import(`file://${path.join(statsDir, file)}`);
                statConfigs[statModule.default.id] = statModule.default;
            }
        }

        // 3. Compile stats and calculate modifiers
        const compiledStats = [];
        for (const [statId, score] of Object.entries(charData.stats)) {
            const config = statConfigs[statId];
            if (config) {
                const rawMod = config.calculateModifier(score);
                const modifier = rawMod >= 0 ? `+${rawMod}` : `${rawMod}`;
                compiledStats.push({
                    id: config.id,
                    name: config.name,
                    score: score,
                    modifier: modifier,
                    abilities: config.abilities
                });
            }
        }

        // 4. Send structured payload
        res.json({
            name: charData.name,
            health: charData.health,
            stats: compiledStats
        });
    } catch (error) {
        console.error("Error generating sheet:", error);
        res.status(500).json({ error: "Failed to generate character sheet" });
    }
});
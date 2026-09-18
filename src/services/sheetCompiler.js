import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

async function loadStatConfigs(statsDir) {
    const statFiles = await fs.readdir(statsDir);
    const statConfigs = {};

    for (const file of statFiles) {
        if (file.endsWith('.js')) {
            const statModule = await import(pathToFileURL(path.join(statsDir, file)));
            statConfigs[statModule.default.id] = statModule.default;
        }
    }

    return statConfigs;
}

export async function compileCharacterSheet(projectRoot, characterId) {
    const characterPath = path.join(projectRoot, 'content/characters', `${characterId}.json`);
    const character = JSON.parse(await fs.readFile(characterPath, 'utf8'));
    const statConfigs = await loadStatConfigs(path.join(projectRoot, 'content/stats'));

    const stats = Object.entries(character.stats).flatMap(([statId, score]) => {
        const config = statConfigs[statId];
        if (!config) return [];

        const rawModifier = config.calculateModifier(score);
        return [{
            id: config.id,
            name: config.name,
            score,
            modifier: rawModifier >= 0 ? `+${rawModifier}` : `${rawModifier}`,
            abilities: config.abilities
        }];
    });

    return { name: character.name, health: character.health, stats };
}
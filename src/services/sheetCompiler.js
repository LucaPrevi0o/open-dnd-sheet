import fs from 'fs/promises';
import path from 'path';
import { loadStatConfigs } from '../integrations/stats/statLoader.js';
import {
    compileSavingThrows,
    compileSkills,
    compileStats
} from '../integrations/stats/statsCompiler.js';

export async function compileCharacterSheet(projectRoot, characterId) {
    const characterPath = path.join(projectRoot, 'content/characters', `${characterId}.json`);
    const character = JSON.parse(await fs.readFile(characterPath, 'utf8'));
    const statConfigs = await loadStatConfigs(path.join(projectRoot, 'content/stats'));

    const stats = compileStats(character, statConfigs);

    return {
        version: 1,
        name: character.name,
        health: character.health,
        stats,
        skills: compileSkills(character, statConfigs),
        savingThrows: compileSavingThrows(character, statConfigs)
    };
}
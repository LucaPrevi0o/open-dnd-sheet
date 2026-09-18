import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

const configCache = new Map();

export async function loadStatConfigs(statsDir) {
    if (!configCache.has(statsDir)) {
        configCache.set(statsDir, loadStatConfigsFromDisk(statsDir));
    }

    return configCache.get(statsDir);
}

async function loadStatConfigsFromDisk(statsDir) {
    const statFiles = (await fs.readdir(statsDir))
        .filter(file => file.endsWith('.js'))
        .sort();
    const statConfigs = {};

    for (const file of statFiles) {
        const statModule = await import(pathToFileURL(path.join(statsDir, file)));
        const config = statModule.default;

        if (!config?.id || typeof config.calculateModifier !== 'function') {
            throw new Error(`Invalid stat configuration: ${file}`);
        }

        statConfigs[config.id] = config;
    }

    return statConfigs;
}
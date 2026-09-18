function formatModifier(value) {
    return value >= 0 ? `+${value}` : `${value}`;
}

function getProficiencies(character) {
    return character.proficiencies ?? {};
}

function getProficiencyBonus(character) {
    return character.proficiencyBonus ?? 0;
}

function getProficiencyState(character, id) {
    const proficiencies = getProficiencies(character);
    const proficient = proficiencies.skills?.includes(id) || false;
    const expertise = proficiencies.expertise?.includes(id) || false;
    return { proficient, expertise };
}

function calculateProficientModifier(baseModifier, character, id) {
    const { proficient, expertise } = getProficiencyState(character, id);
    const multiplier = expertise ? 2 : proficient ? 1 : 0;
    return baseModifier + getProficiencyBonus(character) * multiplier;
}

export function compileStats(character, statConfigs) {
    return Object.entries(character.stats).flatMap(([statId, score]) => {
        const config = statConfigs[statId];
        if (!config) return [];

        const rawModifier = config.calculateModifier(score);
        return [{
            id: config.id,
            name: config.name,
            score,
            modifier: formatModifier(rawModifier),
            savingThrow: config.savingThrow === true,
            abilities: config.abilities
        }];
    });
}

export function compileSkills(character, statConfigs) {
    return Object.values(statConfigs).flatMap(config => {
        const score = character.stats[config.id];
        if (score === undefined) return [];

        const baseModifier = config.calculateModifier(score);
        return config.abilities.map(ability => {
            const { proficient, expertise } = getProficiencyState(character, ability.id);
            const modifier = calculateProficientModifier(baseModifier, character, ability.id);

            return {
                id: ability.id,
                name: ability.name,
                abilityId: config.id,
                abilityName: config.name,
                modifier: formatModifier(modifier),
                proficient,
                expertise
            };
        });
    });
}

export function compileSavingThrows(character, statConfigs) {
    return Object.values(statConfigs)
        .filter(config => config.savingThrow === true && character.stats[config.id] !== undefined)
        .map(config => {
            const baseModifier = config.calculateModifier(character.stats[config.id]);
            const proficient = getProficiencies(character).savingThrows?.includes(config.id) || false;
            const modifier = baseModifier + (proficient ? getProficiencyBonus(character) : 0);

            return {
                id: config.id,
                name: config.name,
                modifier: formatModifier(modifier),
                proficient
            };
        });
}
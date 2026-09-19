function renderSkill(skill) {
    const status = skill.expertise ? 'expertise' : skill.proficient ? 'proficient' : 'untrained';

    return `
        <div class="ability" style="--stat-color: ${skill.abilityColor}">
            <span class="ability-name">${skill.name}</span>
            <span class="proficiency-indicator ${status}" title="${status}"></span>
            <strong class="ability-modifier">${skill.modifier}</strong>
        </div>`;
}

function renderSavingThrow(savingThrow) {
    const status = savingThrow.expertise ? 'expertise' : savingThrow.proficient ? 'proficient' : 'untrained';

    return `
        <div class="saving-throw" style="--stat-color: ${savingThrow.color}">
            <span>Saving throw</span>
            <span class="proficiency-indicator ${status}" title="${status}"></span>
            <strong class="ability-modifier">${savingThrow.modifier}</strong>
        </div>`;
}

function renderStat(stat, savingThrows) {
    const savingThrow = savingThrows.find(item => item.id === stat.id);

    return `
        <div class="stat-box" style="--stat-color: ${stat.color}">
            <span class="stat-abbreviation">${stat.abbreviation}</span>
            <span class="stat-score">${stat.score}</span>
            <span class="modifier">${stat.modifier}</span>
            <span class="stat-name">${stat.name}</span>
            ${savingThrow ? renderSavingThrow(savingThrow) : ''}
        </div>`;
}

function renderSkillSidebar(data) {
    return `
        <aside class="skills-sidebar">
            <div class="sidebar-heading">
                <h4>Skills</h4>
                <span>Modifiers</span>
            </div>
            <div class="skills-list">${data.skills.map(renderSkill).join('')}</div>
        </aside>`;
}

function renderSheet(data) {
    return `
        <div class="sheet-header">
            <h3>${data.name}</h3>
            <p>Health: <strong>${data.health.current} / ${data.health.max}</strong></p>
        </div>
        <div class="sheet-layout">
            ${renderSkillSidebar(data)}
            <div class="sheet-main">
                <div class="stats-grid">${data.stats.map(stat => renderStat(stat, data.savingThrows)).join('')}</div>
            </div>
        </div>`;
}

async function loadExampleSheet(container) {
    container.innerHTML = '<p class="sheet-message">Loading character parchment...</p>';

    try {
        const response = await fetch('/api/sheet/example');
        if (!response.ok) throw new Error('Sheet request failed');
        container.innerHTML = renderSheet(await response.json());
    } catch (error) {
        container.innerHTML = '<p class="sheet-error">Failed to load example sheet data.</p>';
    }
}

const loadSheetButton = document.getElementById('loadSheetBtn');
const sheetContainer = document.getElementById('sheetContainer');
loadSheetButton.addEventListener('click', () => loadExampleSheet(sheetContainer));
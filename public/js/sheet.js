function renderSkill(skill) {
    const status = skill.expertise ? 'Expertise' : skill.proficient ? 'Proficient' : '';
    const statusMarkup = status ? `<span class="skill-status">${status}</span>` : '';

    return `
        <div class="ability">
            <span class="ability-name">${skill.name}</span>
            ${statusMarkup}
            <strong class="ability-modifier">${skill.modifier}</strong>
        </div>`;
}

function renderSavingThrow(savingThrow) {
    const status = savingThrow.proficient ? 'Proficient' : '';
    const statusMarkup = status ? `<span class="skill-status">${status}</span>` : '';

    return `
        <div class="saving-throw">
            <span>Saving throw</span>
            ${statusMarkup}
            <strong class="ability-modifier">${savingThrow.modifier}</strong>
        </div>`;
}

function renderStat(stat, skills, savingThrows) {
    const statSkills = skills
        .filter(skill => skill.abilityId === stat.id)
        .map(renderSkill)
        .join('');
    const savingThrow = savingThrows.find(item => item.id === stat.id);

    return `
        <div class="stat-box">
            <div class="stat-heading">
                <span class="stat-name">${stat.name}</span>
                <span class="modifier">${stat.modifier}</span>
            </div>
            <p class="score">Score: ${stat.score}</p>
            <div class="abilities-list">
                <span class="abilities-label">Skills</span>
                ${statSkills || '<span class="empty-state">No associated skills</span>'}
            </div>
            ${savingThrow ? `<div class="saving-throws-list">${renderSavingThrow(savingThrow)}</div>` : ''}
        </div>`;
}

function renderSheet(data) {
    return `
        <div class="sheet-header">
            <h3>${data.name}</h3>
            <p>Health: <strong>${data.health.current} / ${data.health.max}</strong></p>
        </div>
        <div class="stats-grid">${data.stats.map(stat => renderStat(stat, data.skills, data.savingThrows)).join('')}</div>`;
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
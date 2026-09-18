function renderStat(stat) {
    const abilities = stat.abilities
        .map(ability => `<span class="ability">${ability.name}</span>`)
        .join('');

    return `
        <div class="stat-box">
            <div class="stat-heading">
                <span class="stat-name">${stat.name}</span>
                <span class="modifier">${stat.modifier}</span>
            </div>
            <p class="score">Score: ${stat.score}</p>
            <div class="abilities-list">
                <span class="abilities-label">Scaled Abilities: </span>${abilities}
            </div>
        </div>`;
}

function renderSheet(data) {
    return `
        <div class="sheet-header">
            <h3>${data.name}</h3>
            <p>Health: <strong>${data.health.current} / ${data.health.max}</strong></p>
        </div>
        <div class="stats-grid">${data.stats.map(renderStat).join('')}</div>`;
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
import fs from 'fs/promises';
import path from 'path';

async function readView(projectRoot, viewName) {
    return fs.readFile(path.join(projectRoot, 'src/views', viewName), 'utf8');
}

export async function renderPage(projectRoot) {
    const [layout, header, main, footer] = await Promise.all([
        readView(projectRoot, 'layout.html'),
        readView(projectRoot, 'partials/header.html'),
        readView(projectRoot, 'partials/main.html'),
        readView(projectRoot, 'partials/footer.html')
    ]);

    return layout
        .replace('<!-- PARTIAL:header -->', header)
        .replace('<!-- PARTIAL:main -->', main)
        .replace('<!-- PARTIAL:footer -->', footer);
}
const DEFAULT_DATA = {
    numExperts: 7,
    alphaKe: 0.8,
    vValue: 0.5,
    phiMax: 9,
    phiValues: [3.5, 4.5, 5.0, 8.0, 9.0, 2.5, 4.5],
    expertNames: [
        "Коваленко Андрій",
        "Мельник Олена",
        "Петренко Дмитро",
        "Шевченко Марія",
        "Бондар Роман",
        "Іванченко Наталія",
        "Сидоренко Віктор"
    ],
    educationHeaders: ["Не проживав", "≤6 міс", "6–12 міс", "1–2 роки", "2–5 років", "5–10 років", ">10 років"],
    expertPositions: [
        "1–2 країни",
        "3–5 країн",
        "6–10 країн",
        "11–20 країн",
        "21–30 країн",
        "31–50 країн",
        ">50 країн"
    ],
    qualificationScale: [
        [1, 1.5, 1.75, 2, 2.25, 2.75, 3],
        [1.5, 2, 2.5, 3, 3.5, 4, 4.5],
        [2, 2.5, 3, 3.5, 4, 4.5, 5],
        [2.5, 3, 3.5, 4, 4.5, 5, 5.5],
        [3, 4, 4.5, 5, 5.5, 6, 6.5],
        [3.5, 4.5, 5, 6, 7, 8, 8.5],
        [4, 4.8, 5.6, 6.5, 7.4, 8.2, 9]
    ],
    informationSourceInfluence: [
        { name: "Особистий аналіз країн проживання", high: 0.35, medium: 0.25, low: 0.15, note: "" },
        { name: "Статистика ООН та OECD", high: 0.30, medium: 0.20, low: 0.10, note: "" },
        { name: "Індекси якості життя", high: 0.25, medium: 0.15, low: 0.08, note: "" },
        { name: "Індекси безпеки", high: 0.25, medium: 0.15, low: 0.08, note: "" },
        { name: "Економічні рейтинги", high: 0.20, medium: 0.12, low: 0.06, note: "" },
        { name: "Медичні рейтинги", high: 0.18, medium: 0.10, low: 0.05, note: "" },
        { name: "Екологічні звіти", high: 0.15, medium: 0.10, low: 0.05, note: "" },
        { name: "Досвід знайомих мігрантів", high: 0.12, medium: 0.08, low: 0.04, note: "" },
        { name: "Міграційні форуми", high: 0.10, medium: 0.06, low: 0.03, note: "" },
        { name: "Офіційні державні портали", high: 0.22, medium: 0.15, low: 0.08, note: "" }
    ],
    selfAssessmentValues: [
        [0.28, 0.30, 0.25, 0.32, 0.35, 0.20, 0.28],
        [0.12, 0.10, 0.15, 0.10, 0.12, 0.10, 0.12],
        [0.08, 0.10, 0.10, 0.08, 0.07, 0.08, 0.08],
        [0.07, 0.08, 0.10, 0.08, 0.06, 0.07, 0.07],
        [0.06, 0.07, 0.05, 0.06, 0.05, 0.06, 0.06],
        [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
        [0.04, 0.05, 0.05, 0.04, 0.04, 0.04, 0.04],
        [0.03, 0.04, 0.03, 0.03, 0.03, 0.03, 0.03],
        [0.02, 0.03, 0.02, 0.02, 0.02, 0.02, 0.02],
        [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05]
    ],
    alternatives: [
        "Німеччина", "Польща", "Канада", "Чехія", "Іспанія", "Норвегія", "Португалія", "Швейцарія"
    ],
    criteria: [
        "Якість життя",
        "Рівень безпеки",
        "Економічна стабільність",
        "Доступність медицини",
        "Екологічний стан",
        "Міграційна політика",
        "Вартість життя",
        "Освітні можливості",
        "Соціальна адаптація",
        "Державні сервіси"
    ],
    criteriaOptimization: ["max", "max", "max", "max", "max", "max", "min", "max", "max", "max"],
    criteriaPriorities: ["2–3", "4–5", "1", "1–2", "2", "5–6", "3–4", "6", "7", "8"],
    criteriaWeights: [],
    expertEstimates: [
        // Німеччина
        [
            [4, 4, 5, 5, 4, 3, 2, 5, 4, 5],
            [5, 4, 5, 4, 4, 3, 2, 5, 4, 5],
            [4, 3, 5, 4, 3, 3, 2, 4, 3, 4],
            [5, 4, 5, 5, 4, 4, 2, 5, 4, 5],
            [4, 4, 4, 4, 3, 3, 3, 4, 4, 4],
            [5, 4, 5, 5, 4, 3, 2, 5, 4, 5],
            [4, 3, 4, 4, 3, 3, 2, 4, 3, 4]
        ],
        // Польща
        [
            [4, 4, 4, 4, 3, 4, 4, 4, 5, 4],
            [4, 4, 3, 4, 3, 4, 4, 4, 5, 4],
            [3, 4, 3, 3, 3, 4, 4, 3, 4, 3],
            [4, 5, 4, 4, 3, 4, 4, 4, 5, 4],
            [3, 4, 3, 3, 3, 3, 4, 3, 4, 3],
            [4, 4, 4, 4, 3, 4, 4, 4, 5, 4],
            [3, 4, 3, 3, 3, 3, 4, 3, 4, 3]
        ],
        // Канада
        [
            [5, 4, 5, 4, 5, 5, 2, 5, 5, 5],
            [5, 4, 4, 4, 5, 5, 2, 5, 5, 4],
            [4, 4, 4, 3, 4, 5, 2, 4, 4, 4],
            [5, 5, 5, 4, 5, 5, 2, 5, 5, 5],
            [4, 4, 4, 3, 4, 4, 2, 4, 4, 4],
            [5, 4, 5, 4, 5, 5, 2, 5, 5, 5],
            [4, 4, 4, 3, 4, 4, 2, 4, 4, 4]
        ],
        // Чехія
        [
            [4, 5, 4, 4, 4, 4, 4, 4, 5, 4],
            [4, 5, 4, 4, 4, 4, 4, 4, 5, 4],
            [3, 4, 3, 3, 3, 3, 4, 3, 4, 3],
            [4, 5, 4, 4, 4, 4, 4, 4, 5, 4],
            [3, 4, 3, 3, 3, 3, 4, 3, 4, 3],
            [4, 5, 4, 4, 4, 4, 4, 4, 5, 4],
            [3, 4, 3, 3, 3, 3, 4, 3, 4, 3]
        ],
        // Іспанія
        [
            [4, 4, 3, 4, 4, 4, 4, 4, 5, 4],
            [5, 4, 3, 4, 5, 4, 4, 4, 5, 4],
            [4, 3, 3, 3, 4, 4, 4, 3, 4, 3],
            [5, 4, 4, 4, 5, 4, 4, 4, 5, 4],
            [4, 3, 3, 3, 4, 3, 4, 3, 4, 3],
            [5, 4, 4, 4, 5, 4, 4, 4, 5, 4],
            [4, 3, 3, 3, 4, 3, 4, 3, 4, 3]
        ],
        // Норвегія
        [
            [5, 5, 5, 5, 5, 3, 1, 5, 4, 5],
            [5, 5, 5, 5, 5, 3, 1, 5, 4, 5],
            [4, 4, 4, 4, 5, 3, 1, 4, 3, 4],
            [5, 5, 5, 5, 5, 4, 1, 5, 4, 5],
            [4, 4, 4, 4, 5, 3, 1, 4, 3, 4],
            [5, 5, 5, 5, 5, 3, 1, 5, 4, 5],
            [4, 4, 4, 4, 5, 3, 1, 4, 3, 4]
        ],
        // Португалія
        [
            [4, 5, 3, 4, 4, 5, 4, 3, 5, 4],
            [5, 5, 3, 4, 5, 5, 4, 3, 5, 4],
            [4, 4, 3, 3, 4, 4, 4, 3, 4, 3],
            [5, 5, 4, 4, 5, 5, 4, 4, 5, 4],
            [4, 4, 3, 3, 4, 4, 4, 3, 4, 3],
            [5, 5, 4, 4, 5, 5, 4, 4, 5, 4],
            [4, 4, 3, 3, 4, 4, 4, 3, 4, 3]
        ],
        // Швейцарія
        [
            [5, 5, 5, 5, 5, 3, 1, 5, 4, 5],
            [5, 5, 5, 5, 5, 3, 1, 5, 4, 5],
            [4, 4, 4, 4, 4, 3, 1, 4, 3, 4],
            [5, 5, 5, 5, 5, 4, 1, 5, 4, 5],
            [4, 4, 4, 4, 4, 3, 1, 4, 3, 4],
            [5, 5, 5, 5, 5, 3, 1, 5, 4, 5],
            [4, 4, 4, 4, 4, 3, 1, 4, 3, 4]
        ]
    ]
};

let currentData = JSON.parse(JSON.stringify(DEFAULT_DATA));

function initializeEstimates() {
    if (!currentData.expertEstimates || currentData.expertEstimates.length === 0) {
        currentData.expertEstimates = [];
        const numExperts = document.getElementById('numExperts') ? parseInt(document.getElementById('numExperts').value) : DEFAULT_DATA.numExperts;

        for (let i = 0; i < currentData.alternatives.length; i++) {
            const altEstimates = [];
            for (let j = 0; j < numExperts; j++) {
                const expertScores = new Array(currentData.criteria.length).fill(3);
                altEstimates.push(expertScores);
            }
            currentData.expertEstimates.push(altEstimates);
        }
    }
}

function generateTable1() {
    const table = document.getElementById('table1');
    let html = '<thead><tr>';
    html += '<th>Посада</th>';
    for (let i = 0; i < currentData.educationHeaders.length; i++) {
        html += `<th class="editable" contenteditable="true" data-header-idx="${i}" onblur="updateEducationHeader(this)">${currentData.educationHeaders[i]}</th>`;
    }
    html += '</tr></thead><tbody>';

    const positions = currentData.expertPositions;

    for (let i = 0; i < positions.length; i++) {
        html += '<tr>';
        html += `<th class="editable text-left" contenteditable="true" data-pos-idx="${i}" onblur="updatePositionName(this)">${positions[i]}</th>`;
        for (let j = 0; j < currentData.qualificationScale[i].length; j++) {
            html += `<td class="editable" contenteditable="true" data-row="${i}" data-col="${j}" onblur="updateQualificationValue(this)">${currentData.qualificationScale[i][j]}</td>`;
        }
        html += '</tr>';
    }

    html += '</tbody>';
    table.innerHTML = html;
}

function updateScaleUIControls() {
    const table1 = document.getElementById('table1');
    const rowControl1 = document.getElementById('scaleRowControl');
    if (table1 && rowControl1) {
        rowControl1.style.height = table1.offsetHeight + 'px';
    }

    const table2 = document.getElementById('table2');
    const rowControl2 = document.getElementById('sourceRowControl');
    if (table2 && rowControl2) {
        rowControl2.style.height = table2.offsetHeight + 'px';
    }
}

function addScaleRow() {
    if (currentData.expertPositions.length >= 10) return;
    currentData.expertPositions.push(`Посада ${currentData.expertPositions.length + 1}`);
    currentData.qualificationScale.push(new Array(currentData.educationHeaders.length).fill(0));
    autoFillScale();
    updateTables();
    updateScaleUIControls();
}

function removeScaleRow() {
    if (currentData.expertPositions.length <= 3) return;
    currentData.expertPositions.pop();
    currentData.qualificationScale.pop();
    autoFillScale();
    updateTables();
    updateScaleUIControls();
}

function addScaleColumn() {
    if (currentData.educationHeaders.length >= 10) return;
    currentData.educationHeaders.push(`Освіта ${currentData.educationHeaders.length + 1}`);
    currentData.qualificationScale.forEach(row => row.push(0));
    autoFillScale();
    updateTables();
    updateScaleUIControls();
}

function removeScaleColumn() {
    if (currentData.educationHeaders.length <= 3) return;
    currentData.educationHeaders.pop();
    currentData.qualificationScale.forEach(row => row.pop());
    autoFillScale();
    updateTables();
    updateScaleUIControls();
}

function autoFillScale() {
    const rows = currentData.expertPositions.length;
    const cols = currentData.educationHeaders.length;
    if (rows < 2 || cols < 2) return;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const rowStep = 3 / (rows - 1);
            const colStep = 5 / (cols - 1);
            const val = 1 + (i * rowStep) + (j * colStep);
            currentData.qualificationScale[i][j] = Math.round(val * 100) / 100;
        }
    }
}


function updateEducationHeader(cell) {
    const idx = parseInt(cell.dataset.headerIdx);
    const value = cell.textContent.trim();
    if (value) {
        currentData.educationHeaders[idx] = value;
    } else {
        cell.textContent = currentData.educationHeaders[idx];
    }
}

function updatePositionName(cell) {
    const idx = parseInt(cell.dataset.posIdx);
    const value = cell.textContent.trim();
    if (value) {
        currentData.expertPositions[idx] = value;
    } else {
        cell.textContent = currentData.expertPositions[idx];
    }
}

function updateQualificationValue(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const value = parseFloat(cell.textContent.trim());

    if (!isNaN(value)) {
        currentData.qualificationScale[row][col] = value;
    } else {
        cell.textContent = currentData.qualificationScale[row][col];
    }
}

function generateTable2() {
    const table = document.getElementById('table2');
    let html = '<thead><tr>';
    html += '<th>№<br>п/п</th>';
    html += '<th class="th-wide">Джерело аргументації</th>';
    html += '<th colspan="3">Ступінь впливу джерела на вашу думку</th>';
    html += '</tr><tr>';
    html += '<th></th><th></th>';
    html += '<th>В (висока)</th>';
    html += '<th>С (середня)</th>';
    html += '<th>Н (низька)</th>';
    html += '</tr></thead><tbody>';

    for (let i = 0; i < currentData.informationSourceInfluence.length; i++) {
        const source = currentData.informationSourceInfluence[i];
        html += '<tr>';
        html += `<td>${i + 1}.</td>`;
        html += `<td class="editable text-left" contenteditable="true" data-source-idx="${i}" onblur="updateSourceName(this)">${source.name}</td>`;
        html += `<td class="editable" contenteditable="true" data-idx="${i}" data-level="high" onblur="updateInfluenceValue(this)">${source.high}</td>`;
        html += `<td class="editable" contenteditable="true" data-idx="${i}" data-level="medium" onblur="updateInfluenceValue(this)">${source.medium}</td>`;
        html += `<td class="editable" contenteditable="true" data-idx="${i}" data-level="low" onblur="updateInfluenceValue(this)">${source.low}</td>`;
        html += '</tr>';
    }

    html += '</tbody>';
    table.innerHTML = html;
}

function addSourceRow() {
    if (currentData.informationSourceInfluence.length >= 10) return;
    currentData.informationSourceInfluence.push({
        name: `Джерело ${currentData.informationSourceInfluence.length + 1}`,
        high: 0.1,
        medium: 0.05,
        low: 0.02,
        note: ""
    });
    const numExperts = parseInt(document.getElementById('numExperts').value) || currentData.numExperts;
    currentData.selfAssessmentValues.push(new Array(numExperts).fill(0.05));
    updateTables();
}

function removeSourceRow() {
    if (currentData.informationSourceInfluence.length <= 1) return;
    currentData.informationSourceInfluence.pop();
    currentData.selfAssessmentValues.pop();
    updateTables();
}



function updateInfluenceValue(cell) {
    const idx = parseInt(cell.dataset.idx);
    const level = cell.dataset.level;
    const text = cell.textContent.trim();

    const cleanText = text.replace('*', '');
    const value = parseFloat(cleanText);

    if (!isNaN(value)) {
        currentData.informationSourceInfluence[idx][level] = value;
        if (idx === 0 && level === 'high') {
            cell.textContent = value + '*';
        } else {
            cell.textContent = value;
        }
    } else {
        const oldValue = currentData.informationSourceInfluence[idx][level];
        cell.textContent = (idx === 0 && level === 'high') ? oldValue + '*' : oldValue;
    }
}

function generateTable3() {
    const table = document.getElementById('table3');
    const numExperts = parseInt(document.getElementById('numExperts').value) || currentData.numExperts;

    while (currentData.phiValues.length < numExperts) {
        currentData.phiValues.push(2.0);
    }

    const phiMax = Math.max(...currentData.phiValues.slice(0, numExperts));

    let html = '<thead><tr>';
    html += '<th>№<br>експерту</th>';
    for (let i = 0; i < numExperts; i++) {
        const expertName = currentData.expertNames[i] || `Експерт ${i + 1}`;
        html += `<th>${expertName}</th>`;
    }
    html += '</tr></thead><tbody>';

    html += '<tr>';
    html += '<td><i>φ<sub>ij</sub></i></td>';
    for (let i = 0; i < numExperts; i++) {
        html += `<td class="editable" contenteditable="true" data-expert="${i}" onblur="updatePhiValue(this)">${currentData.phiValues[i]}</td>`;
    }
    html += '</tr>';

    html += '<tr>';
    html += `<td colspan="${numExperts + 1}" class="text-center"><i>φ<sub>max</sub></i> = ${phiMax}</td>`;
    html += '</tr>';

    html += '<tr>';
    html += '<td><i>K<sup>(ij)</sup><sub>ke</sub></i></td>';
    for (let i = 0; i < numExperts; i++) {
        const kValue = currentData.phiValues[i] / phiMax;
        const roundedK = Math.round(kValue * 100) / 100;
        html += `<td class="calculated">${roundedK}</td>`;
    }
    html += '</tr>';

    html += '</tbody>';

    const tableSettings = document.getElementById('table3_settings');
    const tableVikor = document.getElementById('table3');
    if (tableSettings) tableSettings.innerHTML = html;
    if (tableVikor) tableVikor.innerHTML = html.replace(/class="editable[^"]*"/g, 'style="color: #e4e4e7;"').replace(/contenteditable="true"/g, '').replace(/onblur="[^"]+"/g, '');
}

function generateTable4() {
    const table = document.getElementById('table4');
    const numExperts = parseInt(document.getElementById('numExperts').value) || currentData.numExperts;
    const numSources = currentData.informationSourceInfluence.length;

    while (currentData.selfAssessmentValues.length < numSources) {
        currentData.selfAssessmentValues.push(new Array(numExperts).fill(0.05));
    }
    for (let i = 0; i < numSources; i++) {
        while (currentData.selfAssessmentValues[i].length < numExperts) {
            currentData.selfAssessmentValues[i].push(0.05);
        }
    }

    let html = '<thead><tr>';
    html += '<th rowspan="2"></th>';
    html += `<th colspan="${numExperts}">Міра впливу джерела на думку</th>`;
    html += '</tr><tr>';
    for (let i = 0; i < numExperts; i++) {
        const expertName = currentData.expertNames[i] || `Експерт ${i + 1}`;
        html += `<th>${expertName}</th>`;
    }
    html += '</tr></thead><tbody>';

    const sums = new Array(numExperts).fill(0);

    for (let i = 0; i < numSources; i++) {
        html += '<tr>';
        html += `<td class="text-left">${currentData.informationSourceInfluence[i].name}</td>`;
        for (let j = 0; j < numExperts; j++) {
            const val = currentData.selfAssessmentValues[i][j];
            html += `<td class="editable" contenteditable="true" data-source="${i}" data-expert="${j}" onblur="updateSelfAssessmentValue(this)">${val}</td>`;
            sums[j] += val;
        }
        html += '</tr>';
    }

    html += '<tr>';
    html += '<td><b>∑ a<sub>n</sub></b></td>';
    for (let i = 0; i < numExperts; i++) {
        html += `<td class="calculated">${Math.round(sums[i] * 100) / 100}</td>`;
    }
    html += '</tr></tbody>';

    const tableSettings = document.getElementById('table4_settings');
    const tableVikor = document.getElementById('table4');
    if (tableSettings) tableSettings.innerHTML = html;
    if (tableVikor) tableVikor.innerHTML = html.replace(/class="editable[^"]*"/g, 'style="color: #e4e4e7;"').replace(/contenteditable="true"/g, '').replace(/onblur="[^"]+"/g, '');
}

function updateSelfAssessmentValue(cell) {
    const sourceIdx = parseInt(cell.dataset.source);
    const expertIdx = parseInt(cell.dataset.expert);
    const value = parseFloat(cell.textContent.trim().replace(',', '.'));

    if (!isNaN(value)) {
        currentData.selfAssessmentValues[sourceIdx][expertIdx] = value;
        updateTables();
    } else {
        cell.textContent = currentData.selfAssessmentValues[sourceIdx][expertIdx];
    }
}

function updatePhiValue(cell) {
    const expertIdx = parseInt(cell.dataset.expert);
    const value = parseFloat(cell.textContent.trim());

    if (!isNaN(value) && value > 0) {
        currentData.phiValues[expertIdx] = value;
        updateTables();
    } else {
        cell.textContent = currentData.phiValues[expertIdx];
    }
}

function updateSourceName(cell) {
    const idx = parseInt(cell.dataset.sourceIdx);
    const value = cell.textContent.trim();
    if (value) {
        currentData.informationSourceInfluence[idx].name = value;
        generateTable4();
    } else {
        cell.textContent = currentData.informationSourceInfluence[idx].name;
    }
}

function updateExpertNameInputs() {
    const numExperts = parseInt(document.getElementById('numExperts').value) || 6;
    const container = document.getElementById('expertNameInputs');

    while (currentData.expertNames.length < numExperts) {
        currentData.expertNames.push(`Експерт ${currentData.expertNames.length + 1}`);
    }
    while (currentData.phiValues.length < numExperts) {
        currentData.phiValues.push(2.0);
    }
    for (let i = 0; i < currentData.selfAssessmentValues.length; i++) {
        while (currentData.selfAssessmentValues[i].length < numExperts) {
            currentData.selfAssessmentValues[i].push(0.05);
        }
    }

    let html = '';
    for (let i = 0; i < numExperts; i++) {
        html += `<div>`;
        html += `<input type="text" value="${currentData.expertNames[i]}" `;
        html += `onchange="updateExpertName(${i}, this.value)" `;
        html += `class="expert-name-input" placeholder="Експерт ${i + 1}">`;
        html += `</div>`;
    }
    container.innerHTML = html;
}

function updateExpertName(idx, value) {
    if (value.trim()) {
        currentData.expertNames[idx] = value.trim();
        generateTable3();
        generateTable4();
    }
}

function generateTable5() {
    const calculationContainer = document.getElementById('coefficient-calculations');
    const table = document.getElementById('table5');
    const numExperts = parseInt(document.getElementById('numExperts').value) || currentData.numExperts;

    // Validate alphaKe (0 to 1)
    const alphaKeInput = document.getElementById('alphaKe');
    let alphaKe = currentData.alphaKe;
    if (alphaKeInput) {
        const val = parseFloat(alphaKeInput.value);
        if (!isNaN(val)) {
            if (val < 0) {
                alphaKe = 0;
                alphaKeInput.value = 0;
            } else if (val > 1) {
                alphaKe = 1;
                alphaKeInput.value = 1;
            } else {
                alphaKe = val;
            }
        }
        currentData.alphaKe = alphaKe;

        // Update display span in VIKOR tab
        const alphaDisplay = document.getElementById('display-alphake');
        if (alphaDisplay) {
            alphaDisplay.innerText = alphaKe;
        }
    }

    while (currentData.phiValues.length < numExperts) {
        currentData.phiValues.push(2.0);
    }
    const phiMax = Math.max(...currentData.phiValues.slice(0, numExperts));

    const numSources = currentData.informationSourceInfluence.length;
    while (currentData.selfAssessmentValues.length < numSources) {
        currentData.selfAssessmentValues.push(new Array(numExperts).fill(0.05));
    }
    for (let i = 0; i < numSources; i++) {
        while (currentData.selfAssessmentValues[i].length < numExperts) {
            currentData.selfAssessmentValues[i].push(0.05);
        }
    }

    const sumsAn = new Array(numExperts).fill(0);
    for (let j = 0; j < numExperts; j++) {
        for (let i = 0; i < numSources; i++) {
            sumsAn[j] += currentData.selfAssessmentValues[i][j];
        }
    }

    let calcHtml = '<details><summary style="cursor: pointer; font-weight: bold; margin-bottom: 10px;">Розрахуємо підсумкові коефіцієнти компетентності кожного експерта:</summary>';
    const KnValues = [];

    for (let i = 0; i < numExperts; i++) {
        const phi = currentData.phiValues[i];
        const sumAn = sumsAn[i];

        const term1 = alphaKe * (phi / phiMax);
        const term2 = (1 - alphaKe) * sumAn;
        const Kn = term1 + term2;
        KnValues.push(Kn);

        const roundedKn = Math.round(Kn * 1000) / 1000;
        const roundedSumAn = Math.round(sumAn * 100) / 100;

        calcHtml += `<div class="calc-formula">
            K<sub>${i + 1}</sub> = α<sub>кв</sub> · (φ<sub>ij</sub> / φ<sub>max</sub>) + (1 - α<sub>кв</sub>) · ∑a<sub>n</sub> = 
            ${alphaKe} · (${phi} / ${phiMax}) + (1 - ${alphaKe}) · ${roundedSumAn} = 
            <b>${roundedKn}</b>
        </div>`;
    }

    const sumKn = KnValues.reduce((a, b) => a + b, 0);

    calcHtml += `<div class="calc-formula calc-formula-group">
        Нормалізуємо ці значення так, щоб ∑K<sub>n</sub> = 1. Для цього застосуємо формулу: 
        K<sub>норм</sub> = K<sub>n</sub> / ∑K<sub>n</sub><br>
        ∑K<sub>n</sub> = ${Math.round(sumKn * 1000) / 1000}
    </div></details>`;

    if (calculationContainer) {
        calculationContainer.innerHTML = calcHtml;
    }

    let tableHtml = '<thead><tr>';
    for (let i = 0; i < numExperts; i++) {
        const expertName = currentData.expertNames[i] || `Експерт ${i + 1}`;
        tableHtml += `<th>${expertName}</th>`;
    }
    tableHtml += '</tr></thead><tbody><tr>';

    for (let i = 0; i < numExperts; i++) {
        let normK = 0;
        if (sumKn !== 0) {
            normK = KnValues[i] / sumKn;
        }
        tableHtml += `<td class="calculated bold-cell">${Math.round(normK * 100) / 100}</td>`;
    }
    tableHtml += '</tr></tbody>';

    const tableSettings = document.getElementById('table5_settings');
    const tableVikor = document.getElementById('table5');
    if (tableSettings) tableSettings.innerHTML = tableHtml;
    if (tableVikor) tableVikor.innerHTML = tableHtml;

    // Save normalized weights for later use
    currentData.normalizedExpertWeights = KnValues.map(k => sumKn !== 0 ? k / sumKn : 0);
    generateTable1_8();
}

function generateTable1_8() {
    const table = document.getElementById('table1_8');
    if (!table) return;

    const numExperts = parseInt(document.getElementById('numExperts').value) || currentData.numExperts;
    const weights = currentData.normalizedExpertWeights || new Array(numExperts).fill(1 / numExperts);

    let html = '<thead><tr>';
    html += '<th>Мобільні пристрої</th>';
    currentData.criteria.forEach(crit => {
        html += `<th>${crit}</th>`;
    });
    html += '</tr></thead><tbody>';

    currentData.alternatives.forEach((alt, altIdx) => {
        html += '<tr>';
        html += `<td class="text-left bold-cell">${alt}</td>`;

        for (let c = 0; c < currentData.criteria.length; c++) {
            let aggregatedScore = 0;
            for (let e = 0; e < numExperts; e++) {
                const expertScore = currentData.expertEstimates[altIdx]?.[e]?.[c] ?? 0;
                const expertWeight = weights[e] || 0;
                aggregatedScore += expertScore * expertWeight;
            }

            const roundedScore = Math.round(aggregatedScore * 100) / 100;
            html += `<td class="calculated">${roundedScore}</td>`;
        }
        html += '</tr>';
    });

    html += '</tbody>';
    table.innerHTML = html;
}

function updateCriteriaInputs() {
    const numCriteria = parseInt(document.getElementById('numCriteria').value) || 6;
    const container = document.getElementById('criteriaInputs');


    if (!currentData.criteriaOptimization) {
        currentData.criteriaOptimization = new Array(currentData.criteria.length).fill('max');
    }


    while (currentData.criteria.length < numCriteria) {
        currentData.criteria.push(`Q${currentData.criteria.length + 1}`);
        currentData.criteriaPriorities.push('');
        currentData.criteriaOptimization.push('max');
    }
    while (currentData.criteria.length > numCriteria) {
        currentData.criteria.pop();
        currentData.criteriaPriorities.pop();
        currentData.criteriaOptimization.pop();
    }


    let html = '';
    for (let i = 0; i < numCriteria; i++) {
        const opt = currentData.criteriaOptimization[i] || 'max';
        html += `<div style="display: flex; gap: 5px; margin-bottom: 5px;">`;
        html += `<input type="text" value="${currentData.criteria[i]}" `;
        html += `onchange="updateCriterionName(${i}, this.value)" `;
        html += `class="criterion-name-input" placeholder="Q${i + 1}" style="flex-grow: 1;">`;
        html += `<select onchange="updateCriterionOptimization(${i}, this.value)" style="width: 70px; padding: 5px; border-radius: 3px; border: 1px solid #ddd;">`;
        html += `<option value="max" ${opt === 'max' ? 'selected' : ''}>max</option>`;
        html += `<option value="min" ${opt === 'min' ? 'selected' : ''}>min</option>`;
        html += `</select>`;
        html += `</div>`;
    }
    container.innerHTML = html;
}

function updateCriterionOptimization(index, value) {
    if (!currentData.criteriaOptimization) {
        currentData.criteriaOptimization = [];
    }
    currentData.criteriaOptimization[index] = value;
    updateTables();
}

function updateAlternativesInputs() {
    const numAlternatives = parseInt(document.getElementById('numAlternatives').value) || 7;
    const container = document.getElementById('alternativesInputs');


    while (currentData.alternatives.length < numAlternatives) {
        currentData.alternatives.push(`Альтернатива ${currentData.alternatives.length + 1}`);
    }
    while (currentData.alternatives.length > numAlternatives) {
        currentData.alternatives.pop();
    }


    let html = '';
    for (let i = 0; i < numAlternatives; i++) {
        html += `<div>`;
        html += `<input type="text" value="${currentData.alternatives[i]}" `;
        html += `onchange="updateAlternativeName(${i}, this.value)" `;
        html += `class="alternative-name-input" placeholder="Альт. ${i + 1}">`;
        html += `</div>`;
    }
    container.innerHTML = html;
}

function generateAlternativesTables() {
    const container = document.getElementById('alternatives-tables-container-settings');
    const numExperts = parseInt(document.getElementById('numExperts').value) || currentData.numExperts;

    initializeEstimates();
    while (currentData.expertEstimates.length < currentData.alternatives.length) {
        const newAltEst = [];
        for (let e = 0; e < numExperts; e++) newAltEst.push(new Array(currentData.criteria.length).fill(3));
        currentData.expertEstimates.push(newAltEst);
    }
    for (let i = 0; i < currentData.expertEstimates.length; i++) {
        while (currentData.expertEstimates[i].length < numExperts) {
            currentData.expertEstimates[i].push(new Array(currentData.criteria.length).fill(3));
        }
        for (let j = 0; j < currentData.expertEstimates[i].length; j++) {
            while (currentData.expertEstimates[i][j].length < currentData.criteria.length) {
                currentData.expertEstimates[i][j].push(3);
            }
        }
    }

    let html = '';

    currentData.alternatives.forEach((alt, altIdx) => {
        html += `<div class="section">`;
        html += `<div class="method-badge method-badge-all">Усі методи</div>`;
        html += `<h2>Експертні оцінки ${alt}</h2>`;
        html += `<table><thead><tr>`;
        html += `<th>${alt}</th>`;
        currentData.criteria.forEach((crit, cIdx) => {
            html += `<th>${crit}</th>`;
        });
        html += `</tr></thead><tbody>`;

        for (let e = 0; e < numExperts; e++) {
            const expertName = currentData.expertNames[e] || `Експерт ${e + 1}`;
            html += `<tr>`;
            html += `<td>${expertName}</td>`;
            for (let c = 0; c < currentData.criteria.length; c++) {
                const val = currentData.expertEstimates[altIdx]?.[e]?.[c] ?? 0;
                html += `<td class="editable" contenteditable="true" data-alt="${altIdx}" data-expert="${e}" data-crit="${c}" onblur="updateEstimateValue(this)">${val}</td>`;
            }
            html += `</tr>`;
        }

        html += `</tbody></table>`;
        html += `</div>`;
    });

    container.innerHTML = html;
}

function updateCriterionName(idx, value) {
    if (value.trim()) {
        currentData.criteria[idx] = value.trim();
        generateAlternativesTables();
    }
}

function updateAlternativeName(idx, value) {
    if (value.trim()) {
        currentData.alternatives[idx] = value.trim();
        generateAlternativesTables();
    }
}

function updateEstimateValue(cell) {
    const altIdx = parseInt(cell.dataset.alt);
    const expIdx = parseInt(cell.dataset.expert);
    const critIdx = parseInt(cell.dataset.crit);
    const val = parseFloat(cell.textContent.trim());

    if (!isNaN(val)) {
        currentData.expertEstimates[altIdx][expIdx][critIdx] = val;
        updateTables();
    } else {
        cell.textContent = currentData.expertEstimates[altIdx][expIdx][critIdx];
    }
}

function updateCriteriaPriority(idx, value) {
    currentData.criteriaPriorities[idx] = value.trim();
    updateTables();
}

function generateTable1_10() {
    const table = document.getElementById('table1_10');
    if (!table) return;

    const numCriteria = currentData.criteria.length;

    let htmlSettings = `<thead>
        <tr>
            <th>Критерій</th>
            <th>Пріоритетність критерію</th>
        </tr>
    </thead><tbody>`;

    let htmlVikor = `<thead>
        <tr>
            <th>Критерій</th>
            <th>Пріоритетність критерію</th>
            <th>Загальна кількість балів</th>
            <th>Середнє число балів</th>
            <th>Вага w<sub>j</sub> </th>
        </tr>
    </thead><tbody>`;

    let rawData = [];
    let totalAveragePoints = 0;

    currentData.criteria.forEach((crit, idx) => {
        const priorityStr = currentData.criteriaPriorities[idx] || '';
        let ranks = [];


        if (priorityStr.match(/[-–]/)) {
            const parts = priorityStr.split(/[-–]/).map(s => parseInt(s.trim()));
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                const minRank = Math.min(parts[0], parts[1]);
                const maxRank = Math.max(parts[0], parts[1]);
                for (let r = minRank; r <= maxRank; r++) {
                    ranks.push(r);
                }
            }
        } else {
            const r = parseInt(priorityStr);
            if (!isNaN(r)) ranks.push(r);
        }

        let totalPoints = 0;
        let pointsPerRank = [];

        ranks.forEach(rank => {
            const points = numCriteria - rank + 1;
            pointsPerRank.push(points);
            totalPoints += points;
        });

        const avgPoints = ranks.length > 0 ? totalPoints / ranks.length : 0;
        totalAveragePoints += avgPoints;


        let pointsSumStr = '';
        if (pointsPerRank.length > 1) {
            pointsSumStr = `${pointsPerRank.join(' + ')} = ${totalPoints}`;
        } else if (pointsPerRank.length === 1) {
            pointsSumStr = `${totalPoints}`;
        } else {
            pointsSumStr = '0';
        }

        let avgPointsStr = '';
        if (ranks.length > 1) {

            avgPointsStr = `${totalPoints} / ${ranks.length} = ${parseFloat(avgPoints.toFixed(2))}`;
        } else if (ranks.length === 1) {
            avgPointsStr = `${totalPoints}`;
        } else {
            avgPointsStr = '0';
        }

        rawData.push({
            crit,
            priorityStr,
            totalPoints,
            avgPoints,
            pointsSumStr,
            avgPointsStr,
            originalIndex: idx
        });
    });

    currentData.criteriaWeights = [];
    let sumWeights = 0;

    rawData.forEach(item => {
        const weight = totalAveragePoints > 0 ? item.avgPoints / totalAveragePoints : 0;
        currentData.criteriaWeights.push(weight);
        sumWeights += weight;

        const weightStr = totalAveragePoints > 0
            ? `w<sub>${item.originalIndex + 1}</sub> = ${item.avgPoints.toFixed(1)} / ${totalAveragePoints.toFixed(1)} = ${weight.toFixed(2)}`
            : '0';

        htmlSettings += `<tr>
            <td class="text-left">${item.crit}</td>
            <td class="editable" contenteditable="true" onblur="updateCriteriaPriority(${item.originalIndex}, this.innerText)">${item.priorityStr}</td>
        </tr>`;

        htmlVikor += `<tr>
            <td class="text-left">${item.crit}</td>
            <td style="color: #e4e4e7;">${item.priorityStr}</td>
            <td class="calculated">${item.pointsSumStr}</td>
            <td class="calculated">${item.avgPointsStr}</td>
            <td class="calculated">${weightStr}</td>
        </tr>`;
    });


    let sumPriorityDisplay = '';
    rawData.forEach(item => {
        if (item.priorityStr.includes('-')) {
            const parts = item.priorityStr.split('-').map(s => parseInt(s.trim()));

        }
    });

    htmlVikor += `<tr style="font-weight: bold; background-color: rgba(255, 255, 255, 0.05);">
        <td>Σ</td>
        <td></td>
        <td></td>
        <td>${totalAveragePoints.toFixed(1)}</td>
        <td>Σ w<sub>j</sub> = ${sumWeights.toFixed(2)}</td>
    </tr>`;

    htmlSettings += '</tbody>';
    htmlVikor += '</tbody>';

    const tableSettings = document.getElementById('table1_10_settings');
    const tableVikor = document.getElementById('table1_10');
    if (tableSettings) tableSettings.innerHTML = htmlSettings;
    if (tableVikor) tableVikor.innerHTML = htmlVikor;
}

function generateTable1_11() {
    const table = document.getElementById('table1_11');
    if (!table) return;

    const numExperts = parseInt(document.getElementById('numExperts').value) || currentData.numExperts;
    const weights = currentData.normalizedExpertWeights || new Array(numExperts).fill(1 / numExperts);

    let html = '<thead><tr>';
    html += '<th></th>';
    currentData.criteria.forEach(crit => {
        html += `<th>${crit}</th>`;
    });
    html += '</tr></thead><tbody>';

    currentData.alternatives.forEach((alt, altIdx) => {
        html += '<tr>';
        html += `<td class="text-left">${alt}</td>`;

        for (let c = 0; c < currentData.criteria.length; c++) {
            let aggregatedScore = 0;
            for (let e = 0; e < numExperts; e++) {
                const expertScore = currentData.expertEstimates[altIdx]?.[e]?.[c] ?? 0;
                const expertWeight = weights[e] || 0;
                aggregatedScore += expertScore * expertWeight;
            }
            const roundedScore = Math.round(aggregatedScore * 100) / 100;
            html += `<td class="calculated">${parseFloat(roundedScore.toFixed(2))}</td>`;
        }
        html += '</tr>';
    });

    html += '<tr>';
    html += `<td class="text-center"><i>w<sub>j</sub></i></td>`;
    for (let c = 0; c < currentData.criteria.length; c++) {
        const w = currentData.criteriaWeights[c] !== undefined ? currentData.criteriaWeights[c] : 0;
        html += `<td class="calculated">${w.toFixed(2).replace('.', ',')}</td>`;
    }
    html += '</tr>';

    html += '</tbody>';
    table.innerHTML = html;
}

function generateTable1_12() {
    const table = document.getElementById('table1_12');
    if (!table) return;

    const numExperts = parseInt(document.getElementById('numExperts').value) || currentData.numExperts;
    const weights = currentData.normalizedExpertWeights || new Array(numExperts).fill(1 / numExperts);
    const numCriteria = currentData.criteria.length;


    const scoresPerCriterion = Array.from({ length: numCriteria }, () => []);

    currentData.alternatives.forEach((alt, altIdx) => {
        for (let c = 0; c < numCriteria; c++) {
            let aggregatedScore = 0;
            for (let e = 0; e < numExperts; e++) {
                const expertScore = currentData.expertEstimates[altIdx]?.[e]?.[c] ?? 0;
                const expertWeight = weights[e] || 0;
                aggregatedScore += expertScore * expertWeight;
            }

            aggregatedScore = parseFloat(aggregatedScore.toFixed(2));
            scoresPerCriterion[c].push(aggregatedScore);
        }
    });


    currentData.fStar = [];
    currentData.fMinus = [];

    for (let c = 0; c < numCriteria; c++) {
        const scores = scoresPerCriterion[c];
        const optimization = currentData.criteriaOptimization && currentData.criteriaOptimization[c] ? currentData.criteriaOptimization[c] : 'max';
        let maxVal = Math.max(...scores);
        let minVal = Math.min(...scores);

        if (optimization === 'min') {

            currentData.fStar.push(minVal);
            currentData.fMinus.push(maxVal);
        } else {

            currentData.fStar.push(maxVal);
            currentData.fMinus.push(minVal);
        }
    }

    let html = '<thead><tr>';
    html += '<th></th>';
    currentData.criteria.forEach(crit => {
        html += `<th>${crit}</th>`;
    });
    html += '</tr></thead><tbody>';

    // f* row
    html += '<tr>';
    html += `<td class="text-center"><i>f<sub>j</sub><sup>*</sup></i></td>`;
    currentData.fStar.forEach(val => {
        html += `<td class="calculated">${val}</td>`;
    });
    html += '</tr>';

    // f- row
    html += '<tr>';
    html += `<td class="text-center"><i>f<sub>j</sub><sup>-</sup></i></td>`;
    currentData.fMinus.forEach(val => {
        html += `<td class="calculated">${val}</td>`;
    });
    html += '</tr>';

    html += '</tbody>';
    table.innerHTML = html;
}

function generateTable1_13() {
    const table = document.getElementById('table1_13');
    if (!table) return;

    const numExperts = parseInt(document.getElementById('numExperts').value) || currentData.numExperts;
    const weights = currentData.normalizedExpertWeights || new Array(numExperts).fill(1 / numExperts);
    const criteriaWeights = currentData.criteriaWeights || [];
    const fStar = currentData.fStar || [];
    const fMinus = currentData.fMinus || [];


    currentData.S = [];
    currentData.R = [];

    let html = '<thead><tr>';
    html += '<th rowspan="2">Альтернатива</th>';
    html += `<th colspan="${currentData.criteria.length}">w<sub>i</sub>(f<sub>i</sub><sup>*</sup> - f<sub>ij</sub>) / (f<sub>i</sub><sup>*</sup> - f<sub>i</sub><sup>-</sup>)</th>`;
    html += '<th rowspan="2">S<sub>j</sub></th>';
    html += '<th rowspan="2">R<sub>j</sub></th>';
    html += '</tr><tr>';
    currentData.criteria.forEach(crit => {
        html += `<th>${crit}</th>`;
    });
    html += '</tr></thead><tbody>';

    currentData.alternatives.forEach((alt, altIdx) => {
        html += '<tr>';
        html += `<td class="text-left">${alt}</td>`;

        let Sj = 0;
        let Rj = -Infinity;

        for (let c = 0; c < currentData.criteria.length; c++) {

            let fij = 0;
            for (let e = 0; e < numExperts; e++) {
                const expertScore = currentData.expertEstimates[altIdx]?.[e]?.[c] ?? 0;
                const expertWeight = weights[e] || 0;
                fij += expertScore * expertWeight;
            }
            fij = parseFloat(fij.toFixed(2));

            const f_star_val = fStar[c];
            const f_minus_val = fMinus[c];
            const w_i = criteriaWeights[c] || 0;

            let deviation = 0;
            if ((f_star_val - f_minus_val) !== 0) {
                deviation = w_i * ((f_star_val - fij) / (f_star_val - f_minus_val));
            }



            Sj += deviation;
            if (deviation > Rj) Rj = deviation;

            html += `<td class="calculated">${parseFloat(deviation.toFixed(3))}</td>`;
        }

        currentData.S.push(Sj);
        currentData.R.push(Rj);

        html += `<td class="bold-cell calculated">${parseFloat(Sj.toFixed(3))}</td>`;
        html += `<td class="bold-cell calculated">${parseFloat(Rj.toFixed(3))}</td>`;
        html += '</tr>';
    });


    const sValues = currentData.S;
    const rValues = currentData.R;

    const S_star = Math.min(...sValues);
    const S_minus = Math.max(...sValues);
    const R_star = Math.min(...rValues);
    const R_minus = Math.max(...rValues);

    currentData.vValues = { S_star, S_minus, R_star, R_minus };

    html += `<tr><td class="text-right bold-cell" colspan="${currentData.criteria.length + 1}">S<sup>*</sup></td><td colspan="2" class="calculated">${parseFloat(S_star.toFixed(3))}</td></tr>`;
    html += `<tr><td class="text-right bold-cell" colspan="${currentData.criteria.length + 1}">S<sup>-</sup></td><td colspan="2" class="calculated">${parseFloat(S_minus.toFixed(3))}</td></tr>`;
    html += `<tr><td class="text-right bold-cell" colspan="${currentData.criteria.length + 1}">R<sup>*</sup></td><td colspan="2" class="calculated">${parseFloat(R_star.toFixed(3))}</td></tr>`;
    html += `<tr><td class="text-right bold-cell" colspan="${currentData.criteria.length + 1}">R<sup>-</sup></td><td colspan="2" class="calculated">${parseFloat(R_minus.toFixed(3))}</td></tr>`;

    html += '</tbody>';
    table.innerHTML = html;
}

function updateVValue(val) {
    let v = parseFloat(val);
    const vInput = document.getElementById('vValue');

    if (isNaN(v)) {

        v = currentData.vValue !== undefined ? currentData.vValue : 0.5;
    } else {
        if (v < 0) {
            v = 0;
            if (vInput) vInput.value = 0;
        } else if (v > 1) {
            v = 1;
            if (vInput) vInput.value = 1;
        }
    }

    currentData.vValue = v;

    // Update display span in VIKOR tab
    const vDisplay = document.getElementById('display-vvalue');
    if (vDisplay) {
        vDisplay.innerText = v;
    }

    updateTables();
}

function generateTable1_14() {
    const table = document.getElementById('table1_14');
    if (!table) return;

    const vInput = document.getElementById('vValue');
    if (vInput && currentData.vValue !== undefined) {

    }

    const v = currentData.vValue !== undefined ? currentData.vValue : 0.5;
    const S = currentData.S || [];
    const R = currentData.R || [];
    const { S_star, S_minus, R_star, R_minus } = currentData.vValues || { S_star: 0, S_minus: 0, R_star: 0, R_minus: 0 };


    let qValues = [];
    currentData.Q = [];
    currentData.alternatives.forEach((alt, idx) => {
        let Sj = S[idx] !== undefined ? S[idx] : 0;
        let Rj = R[idx] !== undefined ? R[idx] : 0;
        let Q = 0;

        const term1_denom = (S_minus - S_star);
        const term2_denom = (R_minus - R_star);

        let term1 = 0;
        let term2 = 0;

        if (term1_denom !== 0) term1 = (Sj - S_star) / term1_denom;
        if (term2_denom !== 0) term2 = (Rj - R_star) / term2_denom;

        Q = v * term1 + (1 - v) * term2;

        currentData.Q.push(Q);
        qValues.push({ idx, Q, Sj, Rj });
    });


    const sortedQ = [...qValues].sort((a, b) => a.Q - b.Q);

    sortedQ.forEach((item, rankIdx) => {
        item.rank = rankIdx + 1;
    });

    let rankMap = {};
    sortedQ.forEach(item => rankMap[item.idx] = item.rank);

    currentData.rankings = currentData.rankings || {};
    currentData.rankings.vikor = rankMap;

    let html = '<thead><tr>';
    html += '<th class="text-left">Альтернатива</th>';
    html += '<th>S<sub>j</sub></th>';
    html += '<th>R<sub>j</sub></th>';
    html += '<th>Q<sub>j</sub></th>';
    html += '<th>Ранг</th>';
    html += '</tr></thead><tbody>';

    currentData.alternatives.forEach((alt, idx) => {
        const item = qValues[idx];
        const rank = rankMap[idx];

        html += '<tr>';
        html += `<td class="text-left">${alt}</td>`;
        html += `<td class="calculated">${parseFloat(item.Sj.toFixed(3))}</td>`;
        html += `<td class="calculated">${parseFloat(item.Rj.toFixed(3))}</td>`;

        html += `<td class="calculated">${parseFloat(item.Q.toFixed(3))}</td>`;
        html += `<td class="calculated bold-cell">${rank}</td>`;
        html += '</tr>';
    });

    html += '</tbody>';
    table.innerHTML = html;
}

function generateTable1_15() {
    const table = document.getElementById('table1_15');
    const conditionsDiv = document.getElementById('vikor-conditions');
    if (!table) return;

    const S = currentData.S || [];
    const R = currentData.R || [];
    const Q = currentData.Q || [];
    const numAlts = currentData.alternatives.length;


    const getRankingString = (values) => {

        const indexed = values.map((val, idx) => ({ val, idx: idx + 1 }));

        indexed.sort((a, b) => a.val - b.val);

        return indexed.map(item => `E<sub>${item.idx}</sub>`).join(' ≻ ');
    };

    const rankingS = getRankingString(S);
    const rankingR = getRankingString(R);
    const rankingQ = getRankingString(Q);


    let html = '<thead><tr>';
    html += '<th></th>';
    for (let i = 0; i < numAlts; i++) {
        const altName = currentData.alternatives[i] || '';
        html += `<th>E<sub>${i + 1}</sub><br><span style="font-size: 0.8em; opacity: 0.8; font-weight: normal;">${altName}</span></th>`;
    }
    html += '<th style="min-width: 150px;">Ранжування</th>';
    html += '</tr></thead><tbody>';

    // Row S
    html += '<tr>';
    html += `<td class="text-center bold-cell"><i>S<sub>j</sub></i></td>`;
    for (let i = 0; i < numAlts; i++) {
        html += `<td class="calculated">${parseFloat((S[i] || 0).toFixed(3))}</td>`;
    }
    html += `<td>${rankingS}</td>`;
    html += '</tr>';

    // Row R
    html += '<tr>';
    html += `<td class="text-center bold-cell"><i>R<sub>j</sub></i></td>`;
    for (let i = 0; i < numAlts; i++) {
        html += `<td class="calculated">${parseFloat((R[i] || 0).toFixed(3))}</td>`;
    }
    html += `<td>${rankingR}</td>`;
    html += '</tr>';

    // Row Q
    html += '<tr>';
    html += `<td class="text-center bold-cell"><i>Q</i></td>`;
    for (let i = 0; i < numAlts; i++) {
        html += `<td class="calculated">${parseFloat((Q[i] || 0).toFixed(3))}</td>`;
    }
    html += `<td>${rankingQ}</td>`;
    html += '</tr>';

    html += '</tbody>';
    table.innerHTML = html;


    if (conditionsDiv) {
        if (numAlts < 2) {
            conditionsDiv.innerHTML = '<p>Недостатньо альтернатив для розрахунку умов.</p>';
        } else {
            const sortedQ_Full = Q.map((val, idx) => ({ val, idx, name: currentData.alternatives[idx] }))
                .sort((a, b) => a.val - b.val);
            const sortedS_Full = S.map((val, idx) => ({ val, idx, name: currentData.alternatives[idx] }))
                .sort((a, b) => a.val - b.val);
            const sortedR_Full = R.map((val, idx) => ({ val, idx, name: currentData.alternatives[idx] }))
                .sort((a, b) => a.val - b.val);

            const A1 = sortedQ_Full[0];
            const A2 = sortedQ_Full[1];

            const DQ = 1 / (numAlts - 1);

            const diff = A2.val - A1.val;
            const cond1_status = diff >= DQ;

            const isBestInS = Math.abs(S[A1.idx] - sortedS_Full[0].val) < 0.0001;
            const isBestInR = Math.abs(R[A1.idx] - sortedR_Full[0].val) < 0.0001;
            const cond2_status = isBestInS || isBestInR;

            let conditionsHtml = ``;

            const comparisonSign = cond1_status ? "≥" : "<";
            conditionsHtml += `<div class="calc-formula" style="text-align: left; margin-bottom: 10px;">
                1) <i>Q</i>(<i>A</i><sup>(2)</sup>) – <i>Q</i>(<i>A</i><sup>(1)</sup>) ${comparisonSign} Δ<i>Q</i><br>
                ${parseFloat(A2.val.toFixed(3))} – ${parseFloat(A1.val.toFixed(3))} ${comparisonSign} ${parseFloat(DQ.toFixed(3))}<br>
                Δ<i>Q</i> = 1 / (${numAlts} – 1) = ${parseFloat(DQ.toFixed(3))}.
            </div>`;

            let cond2_text = "";
            let bestInList = [];
            if (isBestInS) bestInList.push("<i>S<sub>j</sub></i>");
            if (isBestInR) bestInList.push("<i>R<sub>j</sub></i>");

            if (cond2_status) {
                cond2_text = `Альтернатива <b>${A1.name}</b> є найкращою за ${bestInList.join(" та ")}`;
            } else {
                cond2_text = `Альтернатива <b>${A1.name}</b> НЕ є найкращою ні за <i>S<sub>j</sub></i>, ні за <i>R<sub>j</sub></i>`;
            }

            conditionsHtml += `<div class="calc-formula" style="text-align: left; margin-bottom: 10px;">
                2) ${cond2_text}
            </div>`;

            conditionsDiv.innerHTML = conditionsHtml;
        }
    }
    generatePyramidVisualization();
}

function generatePyramidVisualization() {
    const container = document.getElementById('pyramid-container');
    if (!container) return;

    const S = currentData.S || [];
    const R = currentData.R || [];
    const Q = currentData.Q || [];
    const alternatives = currentData.alternatives || [];

    if (S.length === 0 || R.length === 0 || Q.length === 0) {
        container.innerHTML = '';
        return;
    }


    const sortedS = S.map((val, idx) => ({ val, idx, name: alternatives[idx] }))
        .sort((a, b) => a.val - b.val);
    const sortedR = R.map((val, idx) => ({ val, idx, name: alternatives[idx] }))
        .sort((a, b) => a.val - b.val);
    const sortedQ = Q.map((val, idx) => ({ val, idx, name: alternatives[idx] }))
        .sort((a, b) => a.val - b.val);

    const numLevels = alternatives.length;

    let html = '';

    for (let level = 0; level < numLevels; level++) {
        const altsAtLevel = [];

        if (sortedS[level]) {
            altsAtLevel.push({ name: sortedS[level].name, type: 'S' });
        }
        if (sortedR[level]) {
            altsAtLevel.push({ name: sortedR[level].name, type: 'R' });
        }
        if (sortedQ[level]) {
            altsAtLevel.push({ name: sortedQ[level].name, type: 'Q' });
        }

        const grouped = {};
        altsAtLevel.forEach(alt => {
            if (!grouped[alt.name]) {
                grouped[alt.name] = [];
            }
            grouped[alt.name].push(alt.type);
        });

        const baseLevelWidth = 400;
        const widthIncrement = 80;
        const currentLevelWidth = baseLevelWidth + (level * widthIncrement);

        html += `<div class="pyramid-level" style="width: ${currentLevelWidth}px;">`;
        html += `<div class="pyramid-level-number">${level + 1}</div>`;

        for (const [name, types] of Object.entries(grouped)) {


            const colors = [];
            if (types.includes('S')) colors.push('rgba(63, 81, 181, 0.4)'); // Indigo
            if (types.includes('R')) colors.push('rgba(76, 175, 80, 0.4)'); // Green
            if (types.includes('Q')) colors.push('rgba(156, 39, 176, 0.4)'); // Purple

            let bgStyle;
            if (colors.length === 1) {
                bgStyle = `background-color: ${colors[0]}; border-color: ${colors[0].replace('0.4', '0.6')}`;
            } else if (colors.length === 2) {
                bgStyle = `background: linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%); border-color: rgba(255,255,255,0.2)`;
            } else {
                bgStyle = `background: linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%); border-color: rgba(255,255,255,0.2)`;
            }

            html += `<div class="pyramid-item" style="${bgStyle}; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 0 5px;" title="${name}">
                        ${name}
                     </div>`;
        }

        html += `</div>`;
    }

    container.innerHTML = html;
}

function buildPyramidHtml(S, R, Q, alternatives, baseLevelWidth, widthIncrement) {
    if (S.length === 0 || R.length === 0 || Q.length === 0) return '';

    const sortedS = S.map((val, idx) => ({ val, idx, name: alternatives[idx] })).sort((a, b) => a.val - b.val);
    const sortedR = R.map((val, idx) => ({ val, idx, name: alternatives[idx] })).sort((a, b) => a.val - b.val);
    const sortedQ = Q.map((val, idx) => ({ val, idx, name: alternatives[idx] })).sort((a, b) => a.val - b.val);
    const numLevels = alternatives.length;
    let html = '';

    for (let level = 0; level < numLevels; level++) {
        const altsAtLevel = [];
        if (sortedS[level]) altsAtLevel.push({ name: sortedS[level].name, type: 'S' });
        if (sortedR[level]) altsAtLevel.push({ name: sortedR[level].name, type: 'R' });
        if (sortedQ[level]) altsAtLevel.push({ name: sortedQ[level].name, type: 'Q' });

        const grouped = {};
        altsAtLevel.forEach(alt => {
            if (!grouped[alt.name]) grouped[alt.name] = [];
            grouped[alt.name].push(alt.type);
        });

        const currentLevelWidth = baseLevelWidth + (level * widthIncrement);
        html += `<div class="pyramid-level" style="width: ${currentLevelWidth}px;">`;
        html += `<div class="pyramid-level-number">${level + 1}</div>`;

        for (const [name, types] of Object.entries(grouped)) {
            const colors = [];
            if (types.includes('S')) colors.push('rgba(63, 81, 181, 0.4)');
            if (types.includes('R')) colors.push('rgba(76, 175, 80, 0.4)');
            if (types.includes('Q')) colors.push('rgba(156, 39, 176, 0.4)');

            let bgStyle;
            if (colors.length === 1) bgStyle = `background-color: ${colors[0]}; border-color: ${colors[0].replace('0.4', '0.6')}`;
            else if (colors.length === 2) bgStyle = `background: linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%); border-color: rgba(255,255,255,0.2)`;
            else bgStyle = `background: linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%); border-color: rgba(255,255,255,0.2)`;

            html += `<div class="pyramid-item" style="${bgStyle}; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 0 5px;" title="${name}">${name}</div>`;
        }
        html += `</div>`;
    }
    return html;
}

function updateTables() {
    updateExpertNameInputs();
    updateCriteriaInputs();
    updateAlternativesInputs();
    generateTable1();
    generateTable2();
    generateTable3();
    generateTable4();
    generateTable5();
    generateTable1_10();
    generateTable1_11();
    generateTable1_12();
    generateTable1_13();
    generateTable1_14();
    generateTable1_15();
    generateAlternativesTables();
    updateScaleUIControls();
    generateTopsisTables();
    if (typeof generateMooraTables === "function") {
        generateMooraTables();
    }
    if (typeof generateSawTables === "function") {
        generateSawTables();
    }

    // Generate comparison tab after all methods
    generateComparison();
}

function generateComparison() {
    const table = document.getElementById('table_comparison_summary');
    if (!table) return;

    const rankings = currentData.rankings || {};
    const alts = currentData.alternatives || [];
    const vikorRanks = rankings.vikor || {};
    const topsisRanks = rankings.topsis || {};
    const mooraRanks = rankings.moora || {};
    const sawRanks = rankings.saw || {};

    let html = '<thead><tr>';
    html += '<th class="text-left">Альтернатива</th>';
    html += '<th>VIKOR (Q)</th>';
    html += '<th>TOPSIS (C<sub>i</sub>)</th>';
    html += '<th>MOORA (D<sub>i</sub><sup>*</sup>)</th>';
    html += '<th>SAW (S<sub>i</sub><sup>*</sup>)</th>';
    html += '<th>Середній ранг</th>';
    html += '</tr></thead><tbody>';

    const comparisonData = [];

    alts.forEach((alt, idx) => {
        const rVikor = vikorRanks[idx] || 0;
        const rTopsis = topsisRanks[idx] || 0;
        const rMoora = mooraRanks[idx] || 0;
        const rSaw = sawRanks[idx] || 0;

        const avg = (rVikor + rTopsis + rMoora + rSaw) / 4;
        comparisonData.push({ alt, avg, rVikor, rTopsis, rMoora, rSaw });
    });

    comparisonData.sort((a, b) => a.avg - b.avg);

    comparisonData.forEach(item => {
        html += '<tr>';
        html += `<td class="text-left bold-cell">${item.alt}</td>`;
        html += `<td class="calculated">${item.rVikor}</td>`;
        html += `<td class="calculated">${item.rTopsis}</td>`;
        html += `<td class="calculated">${item.rMoora}</td>`;
        html += `<td class="calculated">${item.rSaw}</td>`;
        html += `<td class="calculated bold-cell" style="color: #ffffff;">${item.avg.toFixed(2)}</td>`;
        html += '</tr>';
    });

    html += '</tbody>';
    table.innerHTML = html;

    // Generate comparison chart
    const chartContainer = document.getElementById('comparison-bars-container');
    if (chartContainer) {
        let chartHtml = '';
        const maxAvg = comparisonData.length > 0 ? comparisonData[comparisonData.length - 1].avg : 1;

        comparisonData.forEach(item => {
            // we want smaller ranks to be "better", so maybe reverse the bar width, 
            // but typical bar chart for rank: smaller bar = better rank. Or larger bar = better rank.
            // Let's make the bar proportional to (maxAvg - item.avg + 1) to show "better" as "larger"
            const range = Math.max(maxAvg - 1, 1);
            const score = maxAvg - item.avg + 1;
            const widthPct = Math.max(5, (score / (maxAvg)) * 100);

            chartHtml += `<div class="topsis-bar-row">
                <div class="topsis-bar-label">${item.alt}</div>
                <div class="topsis-bar-wrapper">
                    <div class="topsis-bar-fill" style="width: ${widthPct}%; background-color: rgba(255, 87, 34, 0.8);">
                        <span class="topsis-bar-value">${item.avg.toFixed(2)}</span>
                    </div>
                </div>
            </div>`;
        });
        chartContainer.innerHTML = chartHtml;
    }

    // Clone charts for side-by-side comparison
    const updateClone = (srcId, destId) => {
        const src = document.getElementById(srcId);
        const dest = document.getElementById(destId);
        if (src && dest) {
            dest.innerHTML = src.innerHTML;
        }
    };

    updateClone('topsis-bars-container', 'topsis-bars-container-dup');
    updateClone('moora-bars-container', 'moora-bars-container-dup');
    updateClone('saw-bars-container', 'saw-bars-container-dup');

    // Render VIKOR (Q) bar chart for comparison (smaller Q = better, so we invert bar width)
    const vikorBarsContainer = document.getElementById('vikor-bars-container-dup');
    if (vikorBarsContainer) {
        const Q = currentData.Q || [];
        const alternatives = currentData.alternatives || [];
        if (Q.length > 0 && alternatives.length > 0) {
            const qItems = alternatives.map((alt, idx) => ({ alt, qVal: Q[idx] !== undefined ? Q[idx] : 0 }));
            qItems.sort((a, b) => a.qVal - b.qVal); // sort ascending (best first)
            const maxQ = Math.max(...qItems.map(it => it.qVal));
            const minQ = Math.min(...qItems.map(it => it.qVal));
            const range = maxQ - minQ || 1;

            let vikorChartHtml = '';
            qItems.forEach(item => {
                // Invert: smaller Q gets wider bar (better rank = larger bar visually)
                const widthPct = Math.max(5, ((maxQ - item.qVal) / range) * 95 + 5);
                vikorChartHtml += `<div class="topsis-bar-row">
                    <div class="topsis-bar-label">${item.alt}</div>
                    <div class="topsis-bar-wrapper">
                        <div class="topsis-bar-fill" style="width: ${widthPct}%; background: linear-gradient(90deg, rgba(156,39,176,0.85), rgba(103,58,183,0.7));">
                            <span class="topsis-bar-value">${item.qVal.toFixed(4)}</span>
                        </div>
                    </div>
                </div>`;
            });
            vikorBarsContainer.innerHTML = vikorChartHtml;
        }
    }


}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    document.getElementById('tab-' + tabId).classList.add('active');
    document.querySelectorAll(`.tab-btn[data-tab="${tabId}"]`).forEach(el => el.classList.add('active'));

    // Always scroll to top instantly when switching tabs
    window.scrollTo({ top: 0 });
}

// TOPSIS logic has been moved to topsis.js
function resetToDefaults() {
    currentData = JSON.parse(JSON.stringify(DEFAULT_DATA));

    // Reset inputs to default values
    if (document.getElementById('numExperts')) document.getElementById('numExperts').value = DEFAULT_DATA.numExperts;
    if (document.getElementById('numCriteria')) document.getElementById('numCriteria').value = DEFAULT_DATA.criteria.length;
    if (document.getElementById('numAlternatives')) document.getElementById('numAlternatives').value = DEFAULT_DATA.alternatives.length;
    if (document.getElementById('alphaKe')) document.getElementById('alphaKe').value = DEFAULT_DATA.alphaKe;
    if (document.getElementById('vValue')) document.getElementById('vValue').value = DEFAULT_DATA.vValue;

    initializeEstimates();
    updateTables();
}

window.onload = function () {

    document.getElementById('numCriteria').value = currentData.criteria.length;
    document.getElementById('numAlternatives').value = currentData.alternatives.length;

    initializeEstimates();
    updateExpertNameInputs();
    updateCriteriaInputs();
    updateAlternativesInputs();
    updateTables();
};

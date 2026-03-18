function generateTopsisTables() {
    const numExperts = parseInt(document.getElementById('numExperts').value) || currentData.numExperts;
    const weights = currentData.normalizedExpertWeights || new Array(numExperts).fill(1 / numExperts);
    const numCriteria = currentData.criteria.length;
    const numAlts = currentData.alternatives.length;

    
    const X = [];
    currentData.alternatives.forEach((alt, altIdx) => {
        const row = [];
        for (let c = 0; c < numCriteria; c++) {
            let aggregatedScore = 0;
            for (let e = 0; e < numExperts; e++) {
                const expertScore = currentData.expertEstimates[altIdx]?.[e]?.[c] ?? 0;
                const expertWeight = weights[e] || 0;
                aggregatedScore += expertScore * expertWeight;
            }
            row.push(aggregatedScore);
        }
        X.push(row);
    });

    
    let html1 = '<thead><tr><th>Альтернатива</th>'; 
    currentData.criteria.forEach(crit => html1 += `<th>${crit}</th>`);
    html1 += '</tr></thead><tbody>';
    for (let i = 0; i < numAlts; i++) {
        html1 += `<tr><td class="text-left bold-cell">${currentData.alternatives[i]}</td>`;
        for (let j = 0; j < numCriteria; j++) {
            html1 += `<td class="calculated">${X[i][j].toFixed(2)}</td>`;
        }
        html1 += `</tr>`;
    }
    html1 += '</tbody>';
    const t1 = document.getElementById('table_topsis_1');
    if (t1) t1.innerHTML = html1;

    
    const w = currentData.criteriaWeights || new Array(numCriteria).fill(1 / numCriteria);
    let htmlW = '<thead><tr><th>Критерій</th>';
    currentData.criteria.forEach(crit => htmlW += `<th>${crit}</th>`);
    htmlW += '</tr></thead><tbody><tr><td class="text-left bold-cell">Ваговий коефіцієнт</td>';
    for (let j = 0; j < numCriteria; j++) {
        const wj = w[j] !== undefined ? w[j] : 0;
        htmlW += `<td class="calculated">${wj.toFixed(2).replace('.', ',')}</td>`;
    }
    htmlW += '</tr></tbody>';
    const tW = document.getElementById('table_topsis_1_weights');
    if (tW) tW.innerHTML = htmlW;

    
    const sumSq = new Array(numCriteria).fill(0);
    for (let j = 0; j < numCriteria; j++) {
        for (let i = 0; i < numAlts; i++) {
            sumSq[j] += X[i][j] * X[i][j];
        }
    }

    const R = [];
    for (let i = 0; i < numAlts; i++) {
        const row = [];
        for (let j = 0; j < numCriteria; j++) {
            const denom = Math.sqrt(sumSq[j]);
            row.push(denom !== 0 ? X[i][j] / denom : 0);
        }
        R.push(row);
    }

    
    let html2 = '<thead><tr><th>Альтернатива</th>';
    currentData.criteria.forEach(crit => html2 += `<th>${crit}</th>`);
    html2 += '</tr></thead><tbody>';
    for (let i = 0; i < numAlts; i++) {
        html2 += `<tr><td class="text-left bold-cell">${currentData.alternatives[i]}</td>`;
        for (let j = 0; j < numCriteria; j++) {
            html2 += `<td class="calculated">${R[i][j].toFixed(4)}</td>`;
        }
        html2 += `</tr>`;
    }
    html2 += '</tbody>';
    const t2 = document.getElementById('table_topsis_2');
    if (t2) t2.innerHTML = html2;

    
    const V = [];
    for (let i = 0; i < numAlts; i++) {
        const row = [];
        for (let j = 0; j < numCriteria; j++) {
            const wj = w[j] !== undefined ? w[j] : 0;
            row.push(R[i][j] * wj);
        }
        V.push(row);
    }

    
    let html3 = '<thead><tr><th>Альтернатива</th>';
    currentData.criteria.forEach(crit => html3 += `<th>${crit}</th>`);
    html3 += '</tr></thead><tbody>';
    for (let i = 0; i < numAlts; i++) {
        html3 += `<tr><td class="text-left bold-cell">${currentData.alternatives[i]}</td>`;
        for (let j = 0; j < numCriteria; j++) {
            html3 += `<td class="calculated">${V[i][j].toFixed(4)}</td>`;
        }
        html3 += `</tr>`;
    }
    html3 += '</tbody>';
    const t3 = document.getElementById('table_topsis_3');
    if (t3) t3.innerHTML = html3;

    
    const A_plus = [];
    const A_minus = [];
    for (let j = 0; j < numCriteria; j++) {
        const colVals = V.map(row => row[j]);
        const maxVal = Math.max(...colVals);
        const minVal = Math.min(...colVals);
        const opt = currentData.criteriaOptimization?.[j] || 'max';
        if (opt === 'min') {
            A_plus.push(minVal);
            A_minus.push(maxVal);
        } else {
            A_plus.push(maxVal);
            A_minus.push(minVal);
        }
    }

    
    let html4 = '<thead><tr><th></th>';
    currentData.criteria.forEach(crit => html4 += `<th>${crit}</th>`);
    html4 += '</tr></thead><tbody>';
    html4 += `<tr><td class="text-center bold-cell"><i>A⁺</i></td>`;
    for (let j = 0; j < numCriteria; j++) html4 += `<td class="calculated">${A_plus[j].toFixed(4)}</td>`;
    html4 += `</tr><tr><td class="text-center bold-cell"><i>A⁻</i></td>`;
    for (let j = 0; j < numCriteria; j++) html4 += `<td class="calculated">${A_minus[j].toFixed(4)}</td>`;
    html4 += `</tr></tbody>`;
    const t4 = document.getElementById('table_topsis_4');
    if (t4) t4.innerHTML = html4;

    
    const S_plus = [];
    const S_minus_dist = [];
    for (let i = 0; i < numAlts; i++) {
        let sumSqPlus = 0;
        let sumSqMinus = 0;
        for (let j = 0; j < numCriteria; j++) {
            sumSqPlus += Math.pow(V[i][j] - A_plus[j], 2);
            sumSqMinus += Math.pow(V[i][j] - A_minus[j], 2);
        }
        S_plus.push(Math.sqrt(sumSqPlus));
        S_minus_dist.push(Math.sqrt(sumSqMinus));
    }

    
    let html5 = '<thead><tr><th>Альтернатива</th><th>D⁺</th><th>D⁻</th></tr></thead><tbody>';
    for (let i = 0; i < numAlts; i++) {
        html5 += `<tr><td class="text-left bold-cell">${currentData.alternatives[i]}</td>`;
        html5 += `<td class="calculated">${S_plus[i].toFixed(4)}</td>`;
        html5 += `<td class="calculated">${S_minus_dist[i].toFixed(4)}</td>`;
        html5 += `</tr>`;
    }
    html5 += '</tbody>';
    const t5 = document.getElementById('table_topsis_5');
    if (t5) t5.innerHTML = html5;

    
    const C = [];
    const rankedItems = [];
    for (let i = 0; i < numAlts; i++) {
        const cVal = S_minus_dist[i] / (S_plus[i] + S_minus_dist[i] || Number.EPSILON);
        C.push(cVal);
        rankedItems.push({ idx: i, alt: currentData.alternatives[i], cVal });
    }

    rankedItems.sort((a, b) => b.cVal - a.cVal);
    let rankMap = {};
    rankedItems.forEach((item, rIdx) => { rankMap[item.idx] = rIdx + 1; });

    currentData.rankings = currentData.rankings || {};
    currentData.rankings.topsis = rankMap;

    
    let html6 = '<thead><tr><th>Альтернатива</th><th>C<sub>i</sub></th><th>Ранг</th></tr></thead><tbody>';
    for (let i = 0; i < numAlts; i++) {
        html6 += `<tr><td class="text-left">${currentData.alternatives[i]}</td>`;
        html6 += `<td class="calculated">${C[i].toFixed(4)}</td>`;
        html6 += `<td class="calculated bold-cell">${rankMap[i]}</td>`;
        html6 += `</tr>`;
    }
    html6 += '</tbody>';
    const t6 = document.getElementById('table_topsis_6');
    if (t6) t6.innerHTML = html6;

    
    const chartContainer = document.getElementById('topsis-bars-container');
    if (chartContainer) {
        let chartHtml = '';
        const maxC = rankedItems.length > 0 ? rankedItems[0].cVal : 1;

        rankedItems.forEach(item => {
            const widthPct = maxC > 0 ? (item.cVal / maxC) * 100 : 0;
            chartHtml += `<div class="topsis-bar-row">
                <div class="topsis-bar-label">${item.alt}</div>
                <div class="topsis-bar-wrapper">
                    <div class="topsis-bar-fill" style="width: ${widthPct}%;">
                        <span class="topsis-bar-value">${item.cVal.toFixed(4)}</span>
                    </div>
                </div>
            </div>`;
        });
        chartContainer.innerHTML = chartHtml;
    }
}

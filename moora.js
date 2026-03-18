function generateMooraTables() {
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

    
    let html1 = '<thead><tr><th>Країна</th>';
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
    const t1 = document.getElementById('table_moora_1');
    if (t1) t1.innerHTML = html1;

    
    const w = currentData.criteriaWeights || new Array(numCriteria).fill(1 / numCriteria);
    let htmlW = '<thead><tr><th>Критерій</th>';
    currentData.criteria.forEach(crit => htmlW += `<th>${crit}</th>`);
    htmlW += '</tr></thead><tbody><tr><td class="text-left bold-cell">Ваговий коефіцієнт <i>w<sub>j</sub></i></td>';
    for (let j = 0; j < numCriteria; j++) {
        const wj = w[j] !== undefined ? w[j] : 0;
        htmlW += `<td class="calculated">${wj.toFixed(3).replace('.', ',')}</td>`;
    }
    htmlW += '</tr></tbody>';
    const tW = document.getElementById('table_moora_1_weights');
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

    
    let html2 = '<thead><tr><th>Країна</th>';
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
    const t2 = document.getElementById('table_moora_2');
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

    
    const A_star = [];
    for (let j = 0; j < numCriteria; j++) {
        let best = V[0][j];
        const opt = currentData.criteriaOptimization?.[j] || 'max';
        for (let i = 1; i < numAlts; i++) {
            if (opt === 'max') {
                if (V[i][j] > best) best = V[i][j];
            } else {
                if (V[i][j] < best) best = V[i][j];
            }
        }
        A_star.push(best);
    }

    
    const D_star = [];
    const rankedItems = [];
    for (let i = 0; i < numAlts; i++) {
        let sumDev = 0;
        for (let j = 0; j < numCriteria; j++) {
            sumDev += Math.abs(V[i][j] - A_star[j]);
        }
        D_star.push(sumDev);
        rankedItems.push({ idx: i, alt: currentData.alternatives[i], dVal: sumDev });
    }

    rankedItems.sort((a, b) => a.dVal - b.dVal); 
    let rankMap = {};
    rankedItems.forEach((item, rIdx) => { rankMap[item.idx] = rIdx + 1; });

    currentData.rankings = currentData.rankings || {};
    currentData.rankings.moora = rankMap;

    
    let html3 = '<thead><tr><th>Країна</th>';
    currentData.criteria.forEach(crit => html3 += `<th>${crit}</th>`);
    html3 += '<th>D<sub>i</sub><sup>*</sup></th><th>Ранг</th></tr></thead><tbody>';
    for (let i = 0; i < numAlts; i++) {
        html3 += `<tr><td class="text-left bold-cell">${currentData.alternatives[i]}</td>`;
        for (let j = 0; j < numCriteria; j++) {
            html3 += `<td class="calculated">${V[i][j].toFixed(4)}</td>`;
        }
        html3 += `<td class="calculated bold-cell">${D_star[i].toFixed(4)}</td>`;
        html3 += `<td class="calculated bold-cell">${rankMap[i]}</td>`;
        html3 += `</tr>`;
    }
    html3 += `<tr><td class="text-left bold-cell"><i>w<sub>j</sub></i></td>`;
    for (let j = 0; j < numCriteria; j++) {
        const wj = w[j] !== undefined ? w[j] : 0;
        html3 += `<td class="calculated">${wj.toFixed(4)}</td>`;
    }
    html3 += `<td colspan="2"></td></tr>`;
    html3 += `<tr><td class="text-left bold-cell"><i>A<sup>*</sup></i></td>`;
    for (let j = 0; j < numCriteria; j++) {
        html3 += `<td class="calculated">${A_star[j].toFixed(4)}</td>`;
    }
    html3 += `<td colspan="2"></td></tr>`;
    html3 += '</tbody>';
    const t3 = document.getElementById('table_moora_3');
    if (t3) t3.innerHTML = html3;

    
    const chartContainer = document.getElementById('moora-bars-container');
    if (chartContainer) {
        let chartHtml = '';
        const maxD = Math.max(...D_star);
        const minD = Math.min(...D_star);
        const range = maxD - minD || 1;
        
        rankedItems.forEach(item => {
            
            const widthPct = Math.max(5, 100 - ((item.dVal - minD) / range) * 90);
            chartHtml += `<div class="topsis-bar-row">
                <div class="topsis-bar-label">${item.alt}</div>
                <div class="topsis-bar-wrapper">
                    <div class="topsis-bar-fill" style="width: ${widthPct}%; background-color: rgba(63, 81, 181, 0.8);">
                        <span class="topsis-bar-value">${item.dVal.toFixed(4)}</span>
                    </div>
                </div>
            </div>`;
        });
        chartContainer.innerHTML = chartHtml;

    }
}

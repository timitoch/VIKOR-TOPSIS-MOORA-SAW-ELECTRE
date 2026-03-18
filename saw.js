function generateSawTables() {
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
    const t1 = document.getElementById('table_saw_1');
    if (t1) t1.innerHTML = html1;

    
    const w = currentData.criteriaWeights || new Array(numCriteria).fill(1 / numCriteria);
    let htmlW = '<thead><tr><th>Критерій</th>';
    currentData.criteria.forEach(crit => htmlW += `<th>${crit}</th>`);
    htmlW += '</tr></thead><tbody><tr><td class="text-left bold-cell"><i>w<sub>j</sub></i></td>';
    for (let j = 0; j < numCriteria; j++) {
        const wj = w[j] !== undefined ? w[j] : 0;
        
        htmlW += `<td class="calculated">${wj.toFixed(3).replace('.', ',')}</td>`;
    }
    htmlW += '</tr></tbody>';
    const tW = document.getElementById('table_saw_1_weights');
    if (tW) tW.innerHTML = htmlW;

    
    const maxVals = [];
    const minVals = [];
    for (let j = 0; j < numCriteria; j++) {
        let maxV = -Infinity;
        let minV = Infinity;
        for (let i = 0; i < numAlts; i++) {
            if (X[i][j] > maxV) maxV = X[i][j];
            if (X[i][j] < minV) minV = X[i][j];
        }
        maxVals.push(maxV);
        minVals.push(minV);
    }

    const R = [];
    for (let i = 0; i < numAlts; i++) {
        const row = [];
        for (let j = 0; j < numCriteria; j++) {
            const opt = currentData.criteriaOptimization?.[j] || 'max';
            if (opt === 'max') {
                row.push(X[i][j] / maxVals[j]);
            } else {
                row.push(minVals[j] / X[i][j]);
            }
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
    
    
    let optRow = `<tr style="font-weight: bold; background-color: rgba(255, 255, 255, 0.05);"><td class="text-left">Max/Min</td>`;
    for (let j = 0; j < numCriteria; j++) {
        const opt = currentData.criteriaOptimization?.[j] || 'max';
        const val = opt === 'max' ? maxVals[j] : minVals[j];
        optRow += `<td class="calculated">${val.toFixed(2)} (${opt})</td>`;
    }
    optRow += `</tr>`;
    html2 += optRow;
    html2 += '</tbody>';
    const t2 = document.getElementById('table_saw_2');
    if (t2) t2.innerHTML = html2;

    
    const V = [];
    const S_star = [];
    const rankedItems = [];

    for (let i = 0; i < numAlts; i++) {
        const row = [];
        let s_val = 0;
        for (let j = 0; j < numCriteria; j++) {
            const wj = w[j] !== undefined ? w[j] : 0;
            const v_ij = R[i][j] * wj;
            row.push(v_ij);
            s_val += v_ij;
        }
        V.push(row);
        S_star.push(s_val);
        rankedItems.push({ idx: i, alt: currentData.alternatives[i], sVal: s_val });
    }

    
    rankedItems.sort((a, b) => b.sVal - a.sVal);
    let rankMap = {};
    rankedItems.forEach((item, rIdx) => { rankMap[item.idx] = rIdx + 1; });

    currentData.rankings = currentData.rankings || {};
    currentData.rankings.saw = rankMap;

    
    let html3 = '<thead><tr><th>Країна</th>';
    currentData.criteria.forEach(crit => html3 += `<th>${crit}</th>`);
    html3 += '<th>S<sub>i</sub><sup>*</sup></th><th>Ранг</th></tr></thead><tbody>';
    for (let i = 0; i < numAlts; i++) {
        html3 += `<tr><td class="text-left bold-cell">${currentData.alternatives[i]}</td>`;
        for (let j = 0; j < numCriteria; j++) {
            html3 += `<td class="calculated">${V[i][j].toFixed(4)}</td>`;
        }
        html3 += `<td class="calculated bold-cell">${S_star[i].toFixed(4)}</td>`;
        html3 += `<td class="calculated bold-cell">${rankMap[i]}</td>`;
        html3 += `</tr>`;
    }
    
    html3 += `<tr><td class="text-left bold-cell"><i>w<sub>j</sub></i></td>`;
    for (let j = 0; j < numCriteria; j++) {
        const wj = w[j] !== undefined ? w[j] : 0;
        html3 += `<td class="calculated"><i>${wj.toFixed(4)}</i></td>`;
    }
    html3 += `<td colspan="2"></td></tr>`;
    html3 += '</tbody>';
    const t3 = document.getElementById('table_saw_3');
    if (t3) t3.innerHTML = html3;

    
    const chartContainer = document.getElementById('saw-bars-container');
    if (chartContainer) {
        let chartHtml = '';
        const maxS = rankedItems.length > 0 ? rankedItems[0].sVal : 1;
        const minS = rankedItems.length > 0 ? rankedItems[rankedItems.length - 1].sVal : 0;
        const range = maxS - Math.min(minS, 0) || 1;

        rankedItems.forEach(item => {
            const widthPct = Math.max(5, ((item.sVal - Math.min(minS, 0)) / range) * 100);
            chartHtml += `<div class="topsis-bar-row">
                <div class="topsis-bar-label">${item.alt}</div>
                <div class="topsis-bar-wrapper">
                    <div class="topsis-bar-fill" style="width: ${widthPct}%; background-color: rgba(76, 175, 80, 0.8);">
                        <span class="topsis-bar-value">${item.sVal.toFixed(4)}</span>
                    </div>
                </div>
            </div>`;
        });
        chartContainer.innerHTML = chartHtml;

    }
}

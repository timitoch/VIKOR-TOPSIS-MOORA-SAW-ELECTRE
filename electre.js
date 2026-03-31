function generateElectreTables() {
    const numExperts = parseInt(document.getElementById('numExperts').value) || currentData.numExperts;
    const weights = currentData.normalizedExpertWeights || new Array(numExperts).fill(1 / numExperts);
    const numCriteria = currentData.criteria.length;
    const numAlts = currentData.alternatives.length;

    // ===== КРОК 1: Матриця рішень (агреговані оцінки) =====
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

    // Таблиця 1: Матриця рішень
    let html1 = '<thead><tr><th>Альтернатива</th>';
    currentData.criteria.forEach(crit => html1 += `<th>${crit}</th>`);
    html1 += '</tr></thead><tbody>';
    for (let i = 0; i < numAlts; i++) {
        html1 += `<tr><td class="text-left bold-cell">${currentData.alternatives[i]}</td>`;
        for (let j = 0; j < numCriteria; j++) {
            html1 += `<td class="calculated">${X[i][j].toFixed(2)}</td>`;
        }
        html1 += '</tr>';
    }
    html1 += '</tbody>';
    const t1 = document.getElementById('table_electre_1');
    if (t1) t1.innerHTML = html1;

    // Таблиця ваг
    const w = currentData.criteriaWeights || new Array(numCriteria).fill(1 / numCriteria);
    let htmlW = '<thead><tr><th>Критерій</th>';
    currentData.criteria.forEach(crit => htmlW += `<th>${crit}</th>`);
    htmlW += '</tr></thead><tbody><tr><td class="text-left bold-cell">Ваговий коефіцієнт <i>w<sub>j</sub></i></td>';
    for (let j = 0; j < numCriteria; j++) {
        const wj = w[j] !== undefined ? w[j] : 0;
        htmlW += `<td class="calculated">${wj.toFixed(3).replace('.', ',')}</td>`;
    }
    htmlW += '</tr></tbody>';
    const tW = document.getElementById('table_electre_1_weights');
    if (tW) tW.innerHTML = htmlW;

    // ===== КРОК 2: Нормалізована матриця (векторна нормалізація) =====
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

    // Таблиця 2: Нормалізована матриця
    let html2 = '<thead><tr><th>Альтернатива</th>';
    currentData.criteria.forEach(crit => html2 += `<th>${crit}</th>`);
    html2 += '</tr></thead><tbody>';
    for (let i = 0; i < numAlts; i++) {
        html2 += `<tr><td class="text-left bold-cell">${currentData.alternatives[i]}</td>`;
        for (let j = 0; j < numCriteria; j++) {
            html2 += `<td class="calculated">${R[i][j].toFixed(4)}</td>`;
        }
        html2 += '</tr>';
    }
    html2 += '</tbody>';
    const t2 = document.getElementById('table_electre_2');
    if (t2) t2.innerHTML = html2;

    // ===== КРОК 3: Зважена нормалізована матриця =====
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
        html3 += '</tr>';
    }
    // Рядок ваг
    html3 += `<tr><td class="text-left bold-cell"><i>w<sub>j</sub></i></td>`;
    for (let j = 0; j < numCriteria; j++) {
        const wj = w[j] !== undefined ? w[j] : 0;
        html3 += `<td class="calculated">${wj.toFixed(4)}</td>`;
    }
    html3 += '</tr></tbody>';
    const t3 = document.getElementById('table_electre_3');
    if (t3) t3.innerHTML = html3;

    // ===== КРОК 4-5: Матриці узгодженості та неузгодженості =====
    // Concordance matrix C(k,l) = sum of w_j for j where v_kj >= v_lj
    const concordanceMatrix = [];
    const discordanceMatrix = [];

    for (let k = 0; k < numAlts; k++) {
        const cRow = [];
        const dRow = [];
        for (let l = 0; l < numAlts; l++) {
            if (k === l) {
                cRow.push(null);
                dRow.push(null);
                continue;
            }

            // Concordance set: criteria where v_kj >= v_lj (considering optimization direction)
            let concordanceSum = 0;
            let maxNumerator = 0;
            let maxDenominator = 0;

            for (let j = 0; j < numCriteria; j++) {
                const opt = currentData.criteriaOptimization?.[j] || 'max';
                let kBetter;
                if (opt === 'max') {
                    kBetter = V[k][j] >= V[l][j];
                } else {
                    kBetter = V[k][j] <= V[l][j];
                }

                if (kBetter) {
                    const wj = w[j] !== undefined ? w[j] : 0;
                    concordanceSum += wj;
                }

                // For discordance
                const diff = Math.abs(V[k][j] - V[l][j]);
                if (!kBetter) {
                    if (diff > maxNumerator) maxNumerator = diff;
                }
                if (diff > maxDenominator) maxDenominator = diff;
            }

            cRow.push(concordanceSum);

            // Discordance: max deviation where k is worse / max deviation overall
            const discordance = maxDenominator !== 0 ? maxNumerator / maxDenominator : 0;
            dRow.push(discordance);
        }
        concordanceMatrix.push(cRow);
        discordanceMatrix.push(dRow);
    }

    // Таблиця 4: Матриця узгодженості
    let html4 = '<thead><tr><th></th>';
    for (let i = 0; i < numAlts; i++) {
        html4 += `<th>E<sub>${i + 1}</sub></th>`;
    }
    html4 += '</tr></thead><tbody>';
    for (let k = 0; k < numAlts; k++) {
        html4 += `<tr><td class="bold-cell">E<sub>${k + 1}</sub></td>`;
        for (let l = 0; l < numAlts; l++) {
            if (k === l) {
                html4 += '<td style="background-color: rgba(255,255,255,0.05);">—</td>';
            } else {
                html4 += `<td class="calculated">${concordanceMatrix[k][l].toFixed(3)}</td>`;
            }
        }
        html4 += '</tr>';
    }
    html4 += '</tbody>';
    const t4 = document.getElementById('table_electre_4');
    if (t4) t4.innerHTML = html4;

    // Таблиця 5: Матриця неузгодженості
    let html5 = '<thead><tr><th></th>';
    for (let i = 0; i < numAlts; i++) {
        html5 += `<th>E<sub>${i + 1}</sub></th>`;
    }
    html5 += '</tr></thead><tbody>';
    for (let k = 0; k < numAlts; k++) {
        html5 += `<tr><td class="bold-cell">E<sub>${k + 1}</sub></td>`;
        for (let l = 0; l < numAlts; l++) {
            if (k === l) {
                html5 += '<td style="background-color: rgba(255,255,255,0.05);">—</td>';
            } else {
                html5 += `<td class="calculated">${discordanceMatrix[k][l].toFixed(3)}</td>`;
            }
        }
        html5 += '</tr>';
    }
    html5 += '</tbody>';
    const t5 = document.getElementById('table_electre_5');
    if (t5) t5.innerHTML = html5;

    // ===== КРОК 6: Порогові значення =====
    let sumC = 0, countC = 0;
    let sumD = 0, countD = 0;
    for (let k = 0; k < numAlts; k++) {
        for (let l = 0; l < numAlts; l++) {
            if (k !== l) {
                sumC += concordanceMatrix[k][l];
                sumD += discordanceMatrix[k][l];
                countC++;
                countD++;
            }
        }
    }
    const cThreshold = countC > 0 ? sumC / countC : 0;
    const dThreshold = countD > 0 ? sumD / countD : 0;

    // Показати порогові значення
    const thresholdDiv = document.getElementById('electre-thresholds');
    if (thresholdDiv) {
        thresholdDiv.innerHTML = `
            <div class="calc-formula" style="text-align: left; margin-bottom: 10px;">
                Порогове значення узгодженості: <b>c̄</b> = Σc<sub>kl</sub> / n(n-1) = ${sumC.toFixed(3)} / ${countC} = <b>${cThreshold.toFixed(3)}</b>
            </div>
            <div class="calc-formula" style="text-align: left;">
                Порогове значення неузгодженості: <b>d̄</b> = Σd<sub>kl</sub> / n(n-1) = ${sumD.toFixed(3)} / ${countD} = <b>${dThreshold.toFixed(3)}</b>
            </div>
        `;
    }

    // ===== КРОК 7: Матриці домінування =====
    // Матриця домінування за узгодженістю: F(k,l) = 1 if c(k,l) >= c̄
    const F = [];
    for (let k = 0; k < numAlts; k++) {
        const row = [];
        for (let l = 0; l < numAlts; l++) {
            if (k === l) { row.push(null); continue; }
            row.push(concordanceMatrix[k][l] >= cThreshold ? 1 : 0);
        }
        F.push(row);
    }

    // Матриця домінування за неузгодженістю: G(k,l) = 1 if d(k,l) <= d̄
    const G = [];
    for (let k = 0; k < numAlts; k++) {
        const row = [];
        for (let l = 0; l < numAlts; l++) {
            if (k === l) { row.push(null); continue; }
            row.push(discordanceMatrix[k][l] <= dThreshold ? 1 : 0);
        }
        G.push(row);
    }

    // Таблиця 6: Матриця домінування за узгодженістю
    let html6 = '<thead><tr><th></th>';
    for (let i = 0; i < numAlts; i++) html6 += `<th>E<sub>${i + 1}</sub></th>`;
    html6 += '</tr></thead><tbody>';
    for (let k = 0; k < numAlts; k++) {
        html6 += `<tr><td class="bold-cell">E<sub>${k + 1}</sub></td>`;
        for (let l = 0; l < numAlts; l++) {
            if (k === l) {
                html6 += '<td style="background-color: rgba(255,255,255,0.05);">—</td>';
            } else {
                const val = F[k][l];
                const style = val === 1 ? 'color: #81c784; font-weight: bold;' : 'color: #e57373;';
                html6 += `<td class="calculated" style="${style}">${val}</td>`;
            }
        }
        html6 += '</tr>';
    }
    html6 += '</tbody>';
    const t6 = document.getElementById('table_electre_6');
    if (t6) t6.innerHTML = html6;

    // Таблиця 7: Матриця домінування за неузгодженістю
    let html7 = '<thead><tr><th></th>';
    for (let i = 0; i < numAlts; i++) html7 += `<th>E<sub>${i + 1}</sub></th>`;
    html7 += '</tr></thead><tbody>';
    for (let k = 0; k < numAlts; k++) {
        html7 += `<tr><td class="bold-cell">E<sub>${k + 1}</sub></td>`;
        for (let l = 0; l < numAlts; l++) {
            if (k === l) {
                html7 += '<td style="background-color: rgba(255,255,255,0.05);">—</td>';
            } else {
                const val = G[k][l];
                const style = val === 1 ? 'color: #81c784; font-weight: bold;' : 'color: #e57373;';
                html7 += `<td class="calculated" style="${style}">${val}</td>`;
            }
        }
        html7 += '</tr>';
    }
    html7 += '</tbody>';
    const t7 = document.getElementById('table_electre_7');
    if (t7) t7.innerHTML = html7;

    // ===== КРОК 8: Загальна матриця домінування E(k,l) = F(k,l) * G(k,l) =====
    const E = [];
    const domScores = []; // Sum of row = how many alternatives this one dominates
    for (let k = 0; k < numAlts; k++) {
        const row = [];
        let score = 0;
        for (let l = 0; l < numAlts; l++) {
            if (k === l) { row.push(null); continue; }
            const val = F[k][l] * G[k][l];
            row.push(val);
            score += val;
        }
        E.push(row);
        domScores.push(score);
    }

    // Таблиця 8: Загальна матриця домінування
    let html8 = '<thead><tr><th></th>';
    for (let i = 0; i < numAlts; i++) html8 += `<th>E<sub>${i + 1}</sub></th>`;
    html8 += '<th>Σ рядка</th></tr></thead><tbody>';
    for (let k = 0; k < numAlts; k++) {
        html8 += `<tr><td class="bold-cell">E<sub>${k + 1}</sub><br><span style="font-size:0.75em;opacity:0.7;">${currentData.alternatives[k]}</span></td>`;
        for (let l = 0; l < numAlts; l++) {
            if (k === l) {
                html8 += '<td style="background-color: rgba(255,255,255,0.05);">—</td>';
            } else {
                const val = E[k][l];
                const style = val === 1 ? 'color: #81c784; font-weight: bold;' : 'color: #e57373;';
                html8 += `<td class="calculated" style="${style}">${val}</td>`;
            }
        }
        html8 += `<td class="calculated bold-cell" style="color: #ffffff;">${domScores[k]}</td>`;
        html8 += '</tr>';
    }
    html8 += '</tbody>';
    const t8 = document.getElementById('table_electre_8');
    if (t8) t8.innerHTML = html8;

    // ===== Ранжування за ELECTRE =====
    const rankedItems = currentData.alternatives.map((alt, idx) => ({
        idx, alt, score: domScores[idx]
    }));
    rankedItems.sort((a, b) => b.score - a.score);

    let rankMap = {};
    let currentRank = 1;
    for (let i = 0; i < rankedItems.length; i++) {
        if (i > 0 && rankedItems[i].score < rankedItems[i - 1].score) {
            currentRank = i + 1;
        }
        rankMap[rankedItems[i].idx] = currentRank;
    }

    currentData.rankings = currentData.rankings || {};
    currentData.rankings.electre = rankMap;

    // Таблиця 9: Ранжування
    let html9 = '<thead><tr><th class="text-left">Альтернатива</th><th>Кількість домінувань</th><th>Ранг</th></tr></thead><tbody>';
    rankedItems.forEach(item => {
        const isBest = rankMap[item.idx] === 1;
        const rowStyle = isBest ? 'background-color: rgba(76, 175, 80, 0.15);' : '';
        html9 += `<tr style="${rowStyle}">`;
        html9 += `<td class="text-left bold-cell">${item.alt}</td>`;
        html9 += `<td class="calculated">${item.score}</td>`;
        html9 += `<td class="calculated bold-cell">${rankMap[item.idx]}</td>`;
        html9 += '</tr>';
    });
    html9 += '</tbody>';
    const t9 = document.getElementById('table_electre_9');
    if (t9) t9.innerHTML = html9;

    // ===== Візуалізація =====
    const chartContainer = document.getElementById('electre-bars-container');
    if (chartContainer) {
        let chartHtml = '';
        const maxScore = rankedItems.length > 0 ? rankedItems[0].score : 1;

        rankedItems.forEach(item => {
            const widthPct = maxScore > 0 ? Math.max(5, (item.score / maxScore) * 100) : 5;
            chartHtml += `<div class="topsis-bar-row">
                <div class="topsis-bar-label">${item.alt}</div>
                <div class="topsis-bar-wrapper">
                    <div class="topsis-bar-fill" style="width: ${widthPct}%; background: linear-gradient(90deg, rgba(255, 152, 0, 0.85), rgba(255, 87, 34, 0.7));">
                        <span class="topsis-bar-value">${item.score} домін.</span>
                    </div>
                </div>
            </div>`;
        });
        chartContainer.innerHTML = chartHtml;
    }
}

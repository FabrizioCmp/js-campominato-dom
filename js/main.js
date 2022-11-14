// dichiarazioni costanti/variabili globali
const btnGenerate = document.querySelector(".btn_generate");
const difficultyEl = document.getElementById("difficulty");
const resultsEl = document.querySelector(".results");
const numeroDiBombe = 16;
let celleScoperte = [];
let punteggio = 0;
let endGame = false;


// al click del bottone genera il campo richesto
btnGenerate.addEventListener("click", function () {
    generateCampo(parseInt(difficultyEl.value));
})

// quando scopro tutte le celle il gioco finisce




// DICHIARAZIONE FUNZIONI *************************

/**
 * genera campo con numero di caselle totali specificato e bombe
 * @param {number} numCelle -caselle totali
 */
function generateCampo(numCelle) {
    const campoEl = document.querySelector(".campo");
    const cellePerRiga = Math.sqrt(numCelle);
    endGame = false;

    campoEl.innerHTML = "";
    campoEl.classList.add("campo_border");
    resultsEl.classList.remove("results_transition");
    punteggio = 0;

    // generazione lista con posizione delle bombe
    const bombsList = generateBombs(numeroDiBombe);
    console.log(bombsList);

    // creazione delle singole celle
    for (let i = 0; i < numCelle; i++) {
        const newCell = document.createElement("div");


        campoEl.append(newCell);

        newCell.style.width = `calc(100% / ${cellePerRiga})`;
        newCell.classList.add(`cella`);
        newCell.dataset.numCella = i + 1;



        //Al click sulla cella: effetti grafici & controllo bomba
        newCell.addEventListener("click", function () {
            if (!endGame) {
                this.classList.toggle(`cell_selected`);
                punteggio++;
                const cellSelected = parseInt(this.dataset.numCella);
                if (bombsList.includes(cellSelected)) {
                    lost = true;
                    this.classList.add("bomb_explosion", "bkg_bomb");

                    // controllo bomba positivo --> effetti fine gioco
                    for (let i = 1; i < parseInt(difficultyEl.value); i++) {
                        const currentCell = document.querySelector(`[data-num-cella="${i}"]`);
                        if (bombsList.includes(parseInt(currentCell.dataset.numCella))) {
                            currentCell.classList.add("bkg_bomb");
                            resultsEl.innerHTML = `<h2> Punteggio: ${punteggio}`;
                            resultsEl.classList.add("results_transition");
                            endGame = true;
                        }
                    }
                } else if (!celleScoperte.includes(cellSelected)) {
                    celleScoperte.push(cellSelected);
                }
            }
            if (celleScoperte.length === (parseInt(difficultyEl.value) - numeroDiBombe)) {

                celleScoperte = [];
                endGame = true;  // così le celle non sono più selezionabili
                resultsEl.innerHTML = `<h2> HAI VINTO! `;
                resultsEl.classList.add("results_transition");
                for (let i = 0; i < bombsList.length; i++) {
                    document.querySelector(`[data-num-cella="${bombsList[i]}"]`).classList.add("bkg_bomb")
                }
            }            
        });
    }
}

/**
 * restituisce un array contenente i numeri delle caselle con le bombe
 * in base al livello di difficoltà selezionato
 * @param {number} numBombs 
 */
function generateBombs(numBombs) {
    let i = 1;
    const cellsWithBombs = [];
    while (i <= numBombs) {
        let nextbomb = Math.floor(Math.random() * parseInt(difficultyEl.value) + 1);
        if (!cellsWithBombs.includes(nextbomb)) {
            cellsWithBombs.push(nextbomb);
            i++;
        }
    }
    return cellsWithBombs;
}



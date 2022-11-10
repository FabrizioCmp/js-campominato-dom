// dichiarazioni costanti/variabili globali
const btnGenerate = document.querySelector(".btn_generate");
const difficultyEl = document.getElementById("difficulty");

// al click del bottone genera il campo richesto
btnGenerate.addEventListener("click", function () {
    generateCampo(parseInt(difficultyEl.value));
})




// DICHIARAZIONE FUNZIONI *************************

/**
 * genera campo con numero di caselle totali specificato e bombe
 * @param {number} numCelle -caselle totali
 */
function generateCampo(numCelle) {
    const campoEl = document.querySelector(".campo");
    const cellePerRiga = Math.sqrt(numCelle);
    let lost = false;

    campoEl.innerHTML = "";
    campoEl.classList.add("campo_border");


    // generazione lista con posizione delle bombe
    const bombsList = generateBombs(16);
    console.log(bombsList);

    // creazione delle singole celle
    for (let i = 0; i < numCelle; i++) {
        const newCell = document.createElement("div");


        campoEl.append(newCell);

        newCell.style.width = `calc(100% / ${cellePerRiga})`;
        newCell.classList.add(`cella`);
        newCell.dataset.numCella = i + 1;

        newCell.addEventListener("click", function () {
            if (!lost) {
                this.classList.toggle(`cell_selected`);
                const cellSelected = parseInt(this.dataset.numCella);
                if (bombsList.includes(cellSelected)) {
                    lost = true;
                    console.log("bomba trovata");
                    this.classList.add("bomb_explosion", "bkg_bomb");
                    for (let i = 1; i < parseInt(difficultyEl.value); i++) {
                        const currentCell = document.querySelector(`[data-num-cella="${i}"]`);
                        if (bombsList.includes(parseInt(currentCell.dataset.numCella))) {
                            currentCell.classList.add("bkg_bomb");
                            console.log(currentCell.dataset.numCella);
                        }
                    }
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



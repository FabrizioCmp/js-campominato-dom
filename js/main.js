// dichiarazioni costanti/variabili globali
const btnGenerate = document.querySelector(".btn_generate");
const difficultyEl = document.getElementById("difficulty");


// al click del bottone genera il campo richesto
btnGenerate.addEventListener("click", function(){
    generateCampo(parseInt(difficultyEl.value));
})



// DICHIARAZIONE FUNZIONI *************************

/**
 * genera campo con numero di caselle totali specificato e bombe
 * @param {number} numCelle -caselle totali
 */
function generateCampo(numCelle){
    const campoEl = document.querySelector(".campo");
    const cellePerRiga = Math.sqrt(numCelle);

    campoEl.innerHTML = "";
    campoEl.classList.add("campo_border");


    // generazione lista con posizione delle bombe
    const bombsList = generateBombs(16);
    console.log(bombsList);

    // creazione delle singole celle
    for(let i = 0; i < numCelle; i++){
        const newCell = document.createElement("div");


        campoEl.append(newCell);

        newCell.style.width = `calc(100% / ${cellePerRiga})`;
        newCell.classList.add(`cella`);
        // newCell.innerHTML = `<div>${i+1}</div>`;
        newCell.dataset.numCella = i+1;

        newCell.addEventListener("click", function(){
            this.classList.toggle(`cell_selected`);
        })
    }
}

/**
 * restituisce un array contenente i numeri delle caselle con le bombe 
 * @param {number} numBombs 
 */
function generateBombs(numBombs){
    let i = 1 ;
    const cellsWithBombs = [];
    while (i <= numBombs ) {
        let nextbomb = Math.floor(Math.random() * 100 + 1);
        if(!cellsWithBombs.includes(nextbomb)){
            cellsWithBombs.push(nextbomb);
            i++;
        }
    }
    return cellsWithBombs;
}
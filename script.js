// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 
//Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

const gridContainer = document.getElementById('container');

const easyBtn = document.getElementById("btnEasy");
const mediumBtn = document.getElementById("btnMedium");
const hardBtn = document.getElementById("btnHard");

let difficultyNum = '';

let points = 0;

const loseAlert = document.getElementById('lose');
const winAlert = document.getElementById('win');

easyBtn.addEventListener('click', 
    function() {
        difficultyNum = 100;
        points = 0;
        loseAlert.style.display = 'none';
        winAlert.style.display = 'none';

        gridContainer.innerHTML = "";

        gridDifficulty(difficultyNum, "squareEasy")

        squareClick('[class^="square"]', 'bombPlace')
    }
);

mediumBtn.addEventListener('click', 
    function() {
        difficultyNum = 81;
        points = 0;
        loseAlert.style.display = 'none';
        winAlert.style.display = 'none';

        gridContainer.innerHTML = "";

        gridDifficulty(difficultyNum, "squareMedium") 

        squareClick('[class^="square"]', 'bombPlace')
    }
    
);

hardBtn.addEventListener('click', 
    function() {
        difficultyNum = 49;
        points = 0;
        loseAlert.style.display = 'none';
        winAlert.style.display = 'none';

        gridContainer.innerHTML = "";

        gridDifficulty(difficultyNum, "squareHard")

        squareClick('[class^="square"]', 'bombPlace')
    }
);


function squareGenerator(x, y) {
    let gridSquare = document.createElement(x);
    gridSquare.classList.add(y);
    return gridSquare
}

function gridDifficulty(x, y) {
    for (let i = 0; i < x; i++) {
        let newElem = squareGenerator("div", y);
        gridContainer.appendChild(newElem);
    }

    let squareSelector = document.querySelectorAll('[class^="square"]');
    let squareArr = [];
    for (let i = 0; i < squareSelector.length; i++) {
        squareSelector[i].innerText = i + 1;
        squareArr.push(i + 1);
    }
    console.log(squareSelector);

    let bombArray = [];
    while (bombArray.length < 16) {
        let bombNum = Math.floor(Math.random() * difficultyNum) + 1;
        if (bombArray.includes(bombNum) == false) {
            bombArray.push(bombNum);
        }
    }
    console.log(bombArray);

    for (i = 0; i < squareArr.length; i++) {
        if (bombArray.includes(squareArr[i]))
        squareSelector[i].classList.add('bombPlace');
    }
}



function squareClick(x, y) {
    let squareSelector = document.querySelectorAll(x);
    let bombSelector = [];
    console.log(squareSelector);

    
    
    for (let i = 0; i < squareSelector.length; i++) {
        if (squareSelector[i].classList.contains(y)) {
            bombSelector.push(squareSelector[i]);
        }
    }
    
    console.log(bombSelector);


    for (let i = 0; i < squareSelector.length; i++) {

        function activeClick() {
            squareSelector[i].classList.add('active');
            points++

            if (points == difficultyNum - 16) {
                winAlert.style.display = 'block';
                winAlert.innerHTML = `Hai vinto! Hai evitato tutte le bombe ottenendo ${points} punti.`
            }
            
            console.log(points);
            squareSelector[i].removeEventListener('click', activeClick);
        
        }

        if (squareSelector[i].classList.contains(y)) {
            squareSelector[i].addEventListener('click',
                function() {
                    for (let i = 0; i < bombSelector.length; i++) {
                        bombSelector[i].classList.add('bomb');
                    }
                    loseAlert.style.display = 'block';
                    loseAlert.innerHTML = `Hai perso! Il tuo punteggio è ${points}`
                }
            );
        } else {
            squareSelector[i].addEventListener('click', activeClick);
        }
    }

}

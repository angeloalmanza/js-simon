// Prelevo i valori dall'html
const startGame = document.getElementById("start-game");
const numbers = document.getElementById("number");
const counterElem = document.getElementById("counter");
const startBtn = document.getElementById("start-btn");
const inputArea = document.getElementById("input-area");
const inputs = document.querySelectorAll("input");
const userBtn = document.getElementById("user-btn");
const result = document.getElementById("result");

const randomNumbers = [];

/** funzione che genera numeri casuali e li salva in un array */
const generateNumbers = () => {
    for (let i = 0; i < 5; i++) {
        const curNumber = Math.floor(Math.random() * 99) + 1;
        randomNumbers.push(curNumber);

        numbers.innerHTML += `<span>${curNumber} </span>`;
    }
}


let intervalId = null;
let counter = 0;

// Genera i numeri e parte il contatore fino a 30 secondi
startBtn.addEventListener("click", function () {
    generateNumbers();

    if (intervalId === null) {
      counter = 0;
      intervalId = setInterval(function () {
        counter++;
        counterElem.innerHTML = `Tempo : ${counter}`;
        if(counter === 30){
            counterElem.innerHTML = "Fine del tempo!";
            clearInterval(intervalId);
            intervalId = null;
            setTimeout(function(){
                startGame.classList.add("d-none");
                inputArea.classList.remove("d-none");
            }, 1000);
        }
      }, 1000);
    }
});

// Confronto numeri random con numeri dell'utente e stampa del risultato
userBtn.addEventListener("click", function () {
    const userNumbers = [];
    const correctNumbers = [];
    const wrongNumbers = [];

    for (let i = 0; i < inputs.length; i++) {
        const userGuess = parseInt(inputs[i].value);
        userNumbers.push(userGuess);

        if (randomNumbers.includes(userGuess)) {
            correctNumbers.push(userGuess);
        }else{
            wrongNumbers.push(userGuess);
        }
    }

    if (correctNumbers.length > 0) {
        result.innerHTML = `Hai indovinato ${correctNumbers.length} numero/i: ${correctNumbers.join(", ")}`;
    } else {
        result.innerHTML = "Non hai indovinato nessun numero.";
    }

    result.innerHTML += `<div>Numeri inseriti: ${userNumbers.join(", ")}</div>`;
    result.innerHTML += `<div>Numeri sbagliati: ${wrongNumbers.join(", ")}</div>`;
});

const textContainer = document.getElementById("text-container");
const inputField = document.getElementById("input");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const rankDisplay = document.getElementById("rank");
const restartBtn = document.getElementById("restart");
const timeButtons = document.querySelectorAll(".time-btn");

const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed tests are a fun way to improve your skills.",
    "Javascript and HTML make web games powerful and interactive.",
    "Coding every day helps in mastering programming concepts.",
    "A smooth sea never made a skilled sailor."
];

let originalText = "";
let timer = 60;
let isPlaying = false;
let interval;
let correctChars = 0;
let totalChars = 0;

function startGame() {
    originalText = texts[Math.floor(Math.random() * texts.length)];
    textContainer.innerHTML = originalText
        .split("")
        .map(char => `<span class="gray">${char}</span>`)
        .join("");

    inputField.value = "";
    isPlaying = true;
    correctChars = 0;
    totalChars = 0;
    rankDisplay.innerText = "-";
    updateStats();

    clearInterval(interval);
    interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timer > 0) {
        timer--;
        timerDisplay.innerText = timer;
    } else {
        endGame();
    }
}

function updateTyping() {
    const typedText = inputField.value;
    const spans = textContainer.querySelectorAll("span");

    totalChars = typedText.length;
    correctChars = 0;

    spans.forEach((span, index) => {
        if (index < typedText.length) {
            if (typedText[index] === originalText[index]) {
                span.style.color = "lightgreen";
                correctChars++;
            } else {
                span.style.color = "red";
            }
        } else {
            span.style.color = "gray";
        }
    });

    updateStats();
}

function updateStats() {
    let wordsTyped = totalChars / 5;
    let minutes = (60 - timer) / 60;
    let wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
    let accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    wpmDisplay.innerText = wpm;
    accuracyDisplay.innerText = accuracy;

    // Rank System
    if (wpm < 20) {
        rankDisplay.innerText = "🐢 Turtle";
        rankDisplay.style.color = "orange";
    } else if (wpm >= 20 && wpm < 40) {
        rankDisplay.innerText = "🏃 Runner";
        rankDisplay.style.color = "yellow";
    } else if (wpm >= 40 && wpm < 60) {
        rankDisplay.innerText = "⚡ Cheetah";
        rankDisplay.style.color = "lightblue";
    } else {
        rankDisplay.innerText = "🔥 Lightning";
        rankDisplay.style.color = "red";
    }
}

function endGame() {
    isPlaying = false;
    clearInterval(interval);
    rankDisplay.style.fontSize = "24px";
    rankDisplay.style.textShadow = "0 0 10px white";
}

timeButtons.forEach(button => {
    button.addEventListener("click", function() {
        timer = parseInt(this.getAttribute("data-time"));
        timerDisplay.innerText = timer;
        startGame();
    });
});

restartBtn.addEventListener("click", startGame);
inputField.addEventListener("input", updateTyping);

window.onload = startGame;

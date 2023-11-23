let audio = new Audio();
let soundSelected = '';
let timerTimeOut;
let minutes = 25;
let seconds = 0;
const minutesSelector = document.getElementById('minutes');
const secondsSelector = document.getElementById('seconds');
const playSelector = document.getElementById('play');
const stopSelector = document.getElementById('stop');
const moreSelector = document.getElementById('more');
const lessSelector = document.getElementById('less');

function timerPlay() {
    countdown();
    playSelector.disabled = true;
    moreSelector.disabled = true;
    lessSelector.disabled = true;
}

function timerStop() {
    clearTimeout(timerTimeOut);
    minutes = 25;
    updateDisplay(minutes, seconds);
    playSelector.disabled = false;
    moreSelector.disabled = false;
    lessSelector.disabled = false;
}

function timerMore() {
    minutes = minutes + 5;
    updateDisplay(minutes, seconds);
}

function timerLess() {
    if (minutes >= 10) {
        minutes = minutes - 5;
        updateDisplay(minutes, seconds);
    }
}

function selectSound(sound = '') {
    audio.pause();
    clearSelectedSound();
    const list = {
        floresta: '/assets/audio/floresta.wav',
        chuva: '/assets/audio/chuva.wav',
        cafeteria: '/assets/audio/cafeteria.wav',
        lareira: '/assets/audio/lareira.wav'
    };
    if (sound !== soundSelected) {
        soundSelected = sound;
        audio = new Audio(list[soundSelected]);
        document.getElementById(soundSelected).classList.add('active');
        audio.play();
    }
}

function clearSelectedSound() {
    document.getElementById('floresta').classList.remove('active');
    document.getElementById('chuva').classList.remove('active');
    document.getElementById('cafeteria').classList.remove('active');
    document.getElementById('lareira').classList.remove('active');
}

function updateDisplay(newMinutes, newSeconds) {
    newMinutes = newMinutes === undefined ? minutes : newMinutes;
    newSeconds = newSeconds === undefined ? seconds : newSeconds;
    minutesSelector.textContent = String(newMinutes).padStart(2, '0');
    secondsSelector.textContent = String(newSeconds).padStart(2, '0');
}

function countdown() {
    timerTimeOut = setTimeout(function () {
        let m = Number(minutesSelector.textContent);
        let s = Number(secondsSelector.textContent);
        let end = m <= 0 && s <= 0;

        if (end) {
            done();
            return;
        }

        if (s <= 0) {
            s = 60;
            --m;
        }
        updateDisplay(m, String(s - 1));

        countdown();
    }, 1000);
}

function done() {
    alert("Seu timer chegou ao fim.");
    clearTimeout(timerTimeOut);
    updateDisplay(minutes, seconds);
    playSelector.disabled = false;
    moreSelector.disabled = false;
    lessSelector.disabled = false;
}
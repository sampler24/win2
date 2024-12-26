const buttonGetSignal = document.getElementById("get-signal");
buttonGetSignal.innerText = language === "ru" ? "получить сигнал" : "get signal";

const signalText = document.getElementById('signalText');
const luckyJetDisplayBg = document.getElementById('luckyJetDisplayBg');
const clickSoundEffect = document.getElementById('clickSoundEffect');
clickSoundEffect.volume = 0.2;

// Функция для генерации случайного числа
function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

// Таймер на 20 секунд
function startCooldown(seconds) {
    let remainingTime = seconds;
    
    buttonGetSignal.disabled = true;
    const interval = setInterval(() => {
        remainingTime--;
        buttonGetSignal.innerText = language === "ru" ? `Подождите ${remainingTime} сек` : `Wait ${remainingTime} sec`;

        if (remainingTime <= 0) {
            clearInterval(interval);
            buttonGetSignal.innerText = language === "ru" ? "получить сигнал" : "get signal";
            buttonGetSignal.disabled = false;
        }
    }, 1000);
}

buttonGetSignal.onclick = function() {
    clickSoundEffect.play();

    let receivingSignal = getRandomFloat(1.20, 3.99, 2);

    if (receivingSignal.toString().length == 3) {
        receivingSignal += "0";
    }
    if (receivingSignal.toString().length == 1) {
        receivingSignal += ".00";
    }
    signalText.innerHTML = `${receivingSignal}${"x"}`;

    buttonGetSignal.classList.add("hidden");
    buttonGetSignal.disabled = true;

    const reloadDuration = 3000;
    luckyJetDisplayBg.style.animation = `spin ${reloadDuration}ms linear infinite`;
    luckyJetDisplayBg.style.opacity = 0.5;

    setTimeout(() => {
        buttonGetSignal.classList.remove("hidden");
        luckyJetDisplayBg.style.animation = "none";
        luckyJetDisplayBg.style.opacity = 1;

        // Запускаем таймер на 20 секунд
        startCooldown(20);
    }, reloadDuration);
}


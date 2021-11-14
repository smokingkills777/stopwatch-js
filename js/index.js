'use strict'

window.addEventListener('DOMContentLoaded', () => {
    let buttonStartIsActive = false,
        buttonWaitIsActive = false,

        // Store stopwatch values
        secondsValue = 0,
        minutesValue = 0,
        hoursValue = 0,

        // Remember values when stopwatch waits
        secondsCurrentValue = 0,
        minutesCurrentValue = 0,
        hoursCurrentValue = 0,

        stopwatch;

    // Button START / STOP action 
    document.querySelector('#start-stop').addEventListener('click', () => {
        if (!buttonStartIsActive) {
            secondsValue = secondsCurrentValue;
            minutesValue = minutesCurrentValue;
            hoursValue = hoursCurrentValue;

            stopwatch = setInterval(() => {
                secondsValue++;
                if (secondsValue > 59) {
                    secondsValue = 0;
                    minutesValue++;
                }
                if (minutesValue > 59) {
                    minutesValue = 0;
                    hoursValue++;
                }
            getResults(secondsValue, minutesValue, hoursValue);
            }, 5);

            buttonStartIsActive = true;
        } else {
            buttonStartIsActive = false;
            clearInterval(stopwatch);

            secondsValue = 0;
            minutesValue = 0;
            hoursValue = 0;

            secondsCurrentValue = 0;
            minutesCurrentValue = 0;
            hoursCurrentValue = 0;

            getResults(secondsValue, minutesValue, hoursValue);
        }
    });
    
    // Button WAIT action 
    document.querySelector('#wait').addEventListener('click', () => {
        if (buttonStartIsActive && !buttonWaitIsActive) {
            secondsCurrentValue = secondsValue;
            minutesCurrentValue = minutesValue;
            hoursCurrentValue = hoursValue;

            buttonStartIsActive = false;
            clearInterval(stopwatch);
        }
    });

    // Button RESET action 
    document.querySelector('#reset').addEventListener('click', () => {
        if (buttonStartIsActive) {
            secondsValue = 0;
            minutesValue = 0;
            hoursValue = 0;
        }
    });
})

function addZero (num) {
    return num < 10 ? `0${num}` : num;
}

function getResults (seconds, minutes, hours) {
    document.querySelector('#seconds').innerHTML = addZero(seconds);
    document.querySelector('#minutes').innerHTML = addZero(minutes);
    document.querySelector('#hours').innerHTML = addZero(hours);
}

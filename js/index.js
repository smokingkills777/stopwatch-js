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
            }, 1000);

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
    
    let clickCount = 0,
        timeoutID = null;

    // Button WAIT action 
    document.querySelector('#wait').addEventListener('click', () => {
        clickCount++;
        console.log(clickCount);
        timeoutID = setTimeout(() => {
            if (clickCount >= 2) {
                if (buttonStartIsActive) {
                    secondsCurrentValue = secondsValue;
                    minutesCurrentValue = minutesValue;
                    hoursCurrentValue = hoursValue;
        
                    buttonStartIsActive = false;
                    clearInterval(stopwatch);
                }
                clickCount = 0;
            } else {
                clickCount = 0;
            }
            clearTimeout(timeoutID);
        }, 300);
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
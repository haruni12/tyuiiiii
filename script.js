// Pomodoro Timer with Smart Breaks and Notification Sound
let minutes = 25;  // Pomodoro duration in minutes
let seconds = 0;   // Initial seconds
let isPomodoro = true; // Track if the timer is in Pomodoro or Break mode
let interval;

// DOM Elements
const timerMinutes = document.getElementById('minutes');
const timerSeconds = document.getElementById('seconds');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const statusMessage = document.getElementById('statusMessage');

// Load notification sound from Freesound.org link (replace this with your link)
const notificationSound = new Audio('http://soundbible.com/grab.php?id=529&type=mp3');  // Replace with your sound URL

// Timer Function
function startTimer() {
    interval = setInterval(function() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(interval); // Stop the timer
                notificationSound.play();  // Play sound when time is up
                toggleMode();  // Switch to Break or Pomodoro mode
                return;
            }
            minutes--;  // Decrease minutes
            seconds = 59;
        } else {
            seconds--;  // Decrease seconds
        }

        // Update the timer display
        timerMinutes.textContent = formatTime(minutes);
        timerSeconds.textContent = formatTime(seconds);
    }, 1000);
}

// Reset Timer
function resetTimer() {
    clearInterval(interval);
    minutes = 25;
    seconds = 0;
    isPomodoro = true;
    timerMinutes.textContent = formatTime(minutes);
    timerSeconds.textContent = formatTime(seconds);
    statusMessage.textContent = 'Focus on your task!';
}

// Toggle between Pomodoro and Break Mode
function toggleMode() {
    if (isPomodoro) {
        // Switch to Break Mode
        isPomodoro = false;
        minutes = 5;  // Short break duration (5 minutes)
        statusMessage.textContent = 'Time for a short break!';
    } else {
        // Switch back to Pomodoro Mode
        isPomodoro = true;
        minutes = 25;  // Pomodoro duration (25 minutes)
        statusMessage.textContent = 'Focus on your task!';
    }
    startTimer();  // Start the new timer
}

// Format the time (e.g., 25 minutes becomes 25:00)
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

// Button Event Listeners
startButton.addEventListener('click', function() {
    startTimer();
    startButton.disabled = true;
    resetButton.disabled = false;
});

resetButton.addEventListener('click', function() {
    resetTimer();
    startButton.disabled = false;
    resetButton.disabled = true;
});
// Set your birthday
const birthYear = 2009;
const birthMonth = 9; // October (0-indexed, so 9 = October)
const birthDay = 9;

let birthdayMessageShown = false;

function updateCountdown() {
    const now = new Date();
    let nextBirthday = new Date(now.getFullYear(), birthMonth, birthDay);

    if (now > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const timeDifference = nextBirthday - now;
    const totalSeconds = Math.floor(timeDifference / 1000);
    
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Update the countdown timer
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // Calculate the percentage for the circular progress bar
    const totalDaysInYear = 365;
    const percentage = ((totalDaysInYear - days) / totalDaysInYear) * 100;
    document.querySelector('.circle').style.background = `conic-gradient(red ${percentage}%, blue ${percentage}%)`;

    // Update days left in the center of the circle
    document.getElementById('days-left').textContent = days;

    // If it's your birthday, display a message
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0 && !birthdayMessageShown) {
        birthdayMessageShown = true;
        showPopup("Happy Birthday!");
    }
}

function showPopup(message) {
    document.getElementById('popup-message').textContent = message;
    document.getElementById('popup').style.display = 'flex';
}

function updateAge() {
    const now = new Date();
    const birthDate = new Date(birthYear, birthMonth, birthDay);

    let ageYears = now.getFullYear() - birthDate.getFullYear();
    let ageMonths = now.getMonth() - birthDate.getMonth();
    let ageDays = now.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    document.getElementById('current-age').textContent = `${ageYears} years, ${ageMonths} months, ${ageDays} days`;
}

// Handle button click for next steps in popup
document.getElementById('next-button').addEventListener('click', function() {
    const currentMessage = document.getElementById('popup-message').textContent;

    if (currentMessage === "Happy Birthday to me ") {
        showPopup("I love you Modu ");
    } else if (currentMessage === "I love you Modu") {
        showPopup("Waiting for your next birthday.");
    } else if (currentMessage === "Waiting for my next birthday.") {
        birthdayMessageShown = false; // Reset for the next year
        document.getElementById('popup').style.display = 'none'; // Close popup
    }
});

// Update the countdown and age every second
setInterval(() => {
    updateCountdown();
    updateAge();
}, 1000);
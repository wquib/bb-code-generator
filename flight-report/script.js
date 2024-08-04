var image = [];
var notableImage = [];
var activeNotable = 0;

function generateBBCode() {
    document.getElementById('text-formatted').value = '';

    let patrolPartner = document.getElementById('patrol-partner').value.trim();
    image[0] = document.getElementById('takeOffImg').value.trim();
    image[1] = document.getElementById('landingImg').value.trim();
    let date = document.getElementById('date-input').value;
    let reportNumber = document.getElementById('report-number').value;
    let patrolUnit = document.getElementById('patrol-unit').value;
    let startAt = document.getElementById('start-time').value;
    let endAt = document.getElementById('end-time').value;

    // Initialize notable URL from Input to notableImage array
    const inputs = document.querySelectorAll('.dynamic-input');
    notableImage = [];
    inputs.forEach(input => {
        values = input.value.trim();
        if(values !== '') {
            notableImage.push(values);
        }
    });
    
    if (patrolPartner.trim() === '' || 
        date.trim() === '' ||
        reportNumber.trim() === '' ||
        patrolPartner.trim() === '' ||
        startAt.trim() === '' ||
        endAt.trim() === ''
    ) return;

    let duration = timeDifference(startAt, endAt);

    let imgNotHTML = '';
    if (notableImage.length > 0) {
        for (let i = 0; i < notableImage.length; i++) {
            imgNotHTML += `[img]${notableImage[i]}[/img]\n`;
        }
    } else {
        imgNotHTML = 'N/A'
    }
    let format  = '[divbox=white][center][list][/list][img]https://i.postimg.cc/QCfJqFnW/ASD-Header.png[/img]\n';
        format += '[divbox=black][/divbox][/center]\n';
        format += `[b]Date:[/b] ${dateFormat(date)}\n`;
        format += `[b]Report Number:[/b] #${reportNumber}\n`;
        format += `[b]Duration:[/b] ${duration}\n`;
        format += `[b]Unit Callsign:[/b] ${patrolUnit}\n`;
        format += `[b]Patrol Partner:[/b] ${patrolPartner}\n`;
        format += '[b]Activity:[/b]\n';
        format += '[list]\n';
        format += '[*] Take Off\n';
        format += `[spoiler][img]${image[0]}[/img][/spoiler]\n`;
        format += '[*] Notable Situation (Optional)\n';
        format += `[spoiler]${imgNotHTML}[/spoiler]\n`;
        format += '[*] Landing\n';
        format += `[spoiler][img]${image[1]}[/img][/spoiler]\n`;
        format += '[/list]\n';
        format += '[/divbox]';
    document.getElementById('text-formatted').value = format;

    let copyBtn = document.getElementById('copy-btn')
    copyBtn.hidden = false;
}

const inputContainer = document.getElementById('inputContainer');
const addInputBtn = document.getElementById('addInputBtn');
const getValuesBtn = document.getElementById('getValuesBtn');

// Fungsi untuk menambahkan input baru
addInputBtn.addEventListener('click', function() {
    const newInputContainer = document.createElement('div');
    newInputContainer.className = 'input-container';
    newInputContainer.innerHTML = '<input class="form-control dynamic-input mb-2" type="url" placeholder="https:://i.imgur.com/image.png">';
    inputContainer.appendChild(newInputContainer);

    const newInput = newInputContainer.querySelector('.dynamic-input');
    newInput.focus();
});

function copyBBCode() {
    let BBCodeText = document.getElementById('text-formatted');
    if (BBCodeText && BBCodeText.value) {
        navigator.clipboard.writeText(BBCodeText.value)
            .then(() => {
                alert('Text copied to clipboard');
            })
            .catch(err => {
                alert('Failed to copy text: ' + err);
            });
    } else {
        alert('No text to copy');
    }
}

function dateFormat(value) {
    let dateInput = value;
    let dateParts = dateInput.split('-');

    let year = dateParts[0];
    let month = dateParts[1];
    let day = dateParts[2];

    return `${day}/${month}/${year}`;
}

function formatTime(input) {
    let value = input.value.replace(/[^0-9]/g, '');

    if (value.length >= 3 && value[2] !== ':') {
        value = value.slice(0, 2) + ':' + value.slice(2);
    }

    if (value.length > 5) {
        value = value.slice(0, 8);
    }

    const parts = value.split(':');
    if (parts.length > 0 && parts[0].length === 2) {
        let hours = parseInt(parts[0]);
        if (hours > 23) {
            hours = 23;
        }
        parts[0] = hours.toString().padStart(2, '0');
    }
    if (parts.length > 1 && parts[1].length === 2) {
        let minutes = parseInt(parts[1]);
        if (minutes > 59) {
            minutes = 59;
        }
        parts[1] = minutes.toString().padStart(2, '0');
    }

    input.value = parts.join(':');
}

function timeDifference(timeA, timeB) {
    // Function to convert time in HH:MM format to minutes
    function convertToMinutes(time) {
        let [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    // Convert both times to minutes
    let minutesA = convertToMinutes(timeA);
    let minutesB = convertToMinutes(timeB);

    // Check if timeB is less than timeA, implying it's the next day
    if (minutesB < minutesA) {
        minutesB += 24 * 60; // Add 24 hours worth of minutes to timeB
    }

    // Calculate the difference in minutes
    let diffMinutes = Math.abs(minutesB - minutesA);

    // Convert difference in minutes to hours and minutes
    let hours = Math.floor(diffMinutes / 60);
    let minutes = diffMinutes % 60;

    if (minutes > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}, and ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
}

// Function to format date to YYYY-MM-DD
function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-based
    let year = date.getFullYear();

    // Pad single digit day and month with leading zero
    if(day < 10) day = '0' + day;
    if(month < 10) month = '0' + month;

    return year + '-' + month + '-' + day;
}

function formatNumber(number) {
    number = parseInt(number);
    if (number >= 1) {
        return number.toString().padStart(3, '0');
    } else {
        return number;
    }
}

let reportNumberForm = document.getElementById('report-number');
reportNumberForm.addEventListener("input", function () {
    let number = reportNumberForm.value.replace(/^0+/, '');
    if (number.length > 3) {
        number = reportNumberForm.value.slice(0, -1);
        reportNumberForm.value = number;
    }
    reportNumberForm.value = formatNumber(number);
});

// Get today's date
let today = new Date();

// Set the value of the date input to today's date
document.getElementById('date-input').value = formatDate(today);
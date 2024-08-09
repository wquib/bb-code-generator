function updateRadioValue(input, id) {
    let radio = document.getElementById(id);
    // let input = document.getElementById(`input-${id}`);
    radio.value = input.value;
}

function activeRadio(id) {
    let radio = document.getElementById(id);
    radio.checked = true;
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
let reportNumberForm = document.getElementById('case');
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




function generateBBCode() {
    document.getElementById('text-formatted').value = '';

    const 
        date        = document.getElementById('date-input').value,
        caseNumber  = document.getElementById('case').value,
        location    = document.getElementById('location').value,
        type        = document.getElementById('type').value,
        suspectName = document.getElementById('suspectName').value,
        reason      = document.getElementById('reason').value,
        weapon      = getRadioValue('weapon'),
        influence   = getRadioValue('influence'),
        injured     = getRadioValue('injured'),
        treatedBy   = getRadioValue('treatedBy'),
        officerName = document.getElementById('officerName').value,
        picName     = document.getElementById('picName').value,
        uniform     = getRadioValue('uniform'),
        weaponUsed  = getRadioValue('weaponUsed')
    ;

    const idCardImg = document.getElementById('idCardImg').value;
    const inputs = document.querySelectorAll('.dynamic-input');
    let evidanceImage = [];
    inputs.forEach(input => {
        values = input.value.trim();
        if(values !== '') {
            evidanceImage.push(values);
        }
    });
    const arrestImg = document.getElementById('arrestImg').value;
    const footage = document.getElementById('footage').value;
    
    // if (patrolPartner.trim() === '' || 
    //     date.trim() === '' ||
    //     reportNumber.trim() === '' ||
    //     patrolPartner.trim() === '' ||
    //     startAt.trim() === '' ||
    //     endAt.trim() === ''
    // ) return;


    let imgNotHTML = '';
    if (evidanceImage.length > 0) {
        for (let i = 0; i < evidanceImage.length; i++) {
            imgNotHTML += `[img]${evidanceImage[i]}[/img]\n`;
        }
    } else {
        imgNotHTML = 'N/A'
    }
    let format  = 
`[divbox=transparent]

[size=95]
[center][img]https://i.imgur.com/2Zt5baY.png[/img]

[b]INCIDENT REPORT[/b][/center]
[aligntable=left,250,15,0,0,0,transparent][b]CASE #:[/b] ${caseNumber}
[b]Type:[/b] ${type}[/aligntable][aligntable=right,200,0,15,0,0,transparent][right][b]LOCATION:[/b] ${location.trim()}
[b]DATE:[/b] ${dateFormat(date)}
[/aligntable]

[hr][/hr]
[center][b][size=80]SUSPECT INFORMATION[/b][/size][/center]
[hr][/hr]

[aligntable=middle,0,15,15,0,0,transparent]
Fullname: ${suspectName.trim()}
Precise activity prior to use of foce: (i.e. assaulting, fleeing, passive resistances, etc.)
${reason.trim()}
Weapon(s):	[${weapon.id == 'sw-0' ? 'X' : ' '}] N/A	[${weapon.id == 'sw-1' ? 'X' : ' '}] Knife	[${weapon.id == 'sw-2' ? 'X' : ' '}] Vehicle	[${weapon.id == 'sw-3' ? 'X' : ' '}] Bite
[list=none]	[${weapon.id == 'sw-4' ? 'X' : ' '}] Firearm (type): ${weapon.id == 'sw-4' ? weapon.value : ''}
	[${weapon.id == 'sw-5' ? 'X' : ' '}] Blunt object (type): ${weapon.id == 'sw-5' ? weapon.value : ''}
	[${weapon.id == 'sw-6' ? 'X' : ' '}] Hands/feet (technique): ${weapon.id == 'sw-6' ? weapon.value : ''}
	[${weapon.id == 'sw-7' ? 'X' : ' '}] Other: ${weapon.id == 'sw-7' ? weapon.value : ''}[/list] 
Under Influence: [${influence.id == 'i-0' ? 'X' : ' '}] Alcohol	[${influence.id == 'i-1' ? 'X' : ' '}] Drugs	[${influence.id == 'i-2' ? 'X' : ' '}] Unknown	[${influence.id == 'i-3' ? 'X' : ' '}] N/A

Injured: [${injured.id == 'ij-0' ? 'X' : ' '}] No	[${injured.id == 'ij-1' ? 'X' : ' '}] Yes${injured.id == 'ij-1' ? `, ${injured.value}` : ' '}
Treated by: [${treatedBy.id == 't-0' ? 'X' : ' '}] Officer	[${treatedBy.id == 't-1' ? 'X' : ' '}] Fire department	[${treatedBy.id == 't-2' ? 'X' : ' '}] Emergency room	[${treatedBy.id == 't-3' ? 'X' : ' '}] N/A
[/aligntable]
[hr][/hr]
[center][b][size=80]OFFICER INFORMATION[/b][/size][/center]
[hr][/hr]
[aligntable=middle,0,15,15,0,0,transparent]
Fullname: ${officerName.trim()}
Person in-charge of use of force: ${picName.trim()}
Uniform: [${uniform.id == 'u-0' ? 'X' : ' '}] Patrol uniform	[${uniform.id == 'u-1' ? 'X' : ' '}] Tactical	[${uniform.id == 'u-2' ? 'X' : ' '}] Plain clothes
Weapon used at time of incident: [${weaponUsed.id == 'wu-0' ? 'X' : ' '}] Handgun	[${weaponUsed.id == 'wu-1' ? 'X' : ' '}] Rubber shotgun	[${weaponUsed.id == 'wu-2' ? 'X' : ' '}] Lethal shotgun [${weaponUsed.id == 'wu-3' ? 'X' : ' '}] Submachine guns [${weaponUsed.id == 'wu-4' ? 'X' : ' '}] Automatic rifle [${weaponUsed.id == 'wu-5' ? 'X' : ' '}] Tazer [${weaponUsed.id == 'wu-6' ? 'X' : ' '}] Spike Strip
[/aligntable]

[hr][/hr]
[center][b][size=80]RESOURCE INFORMATION[/b][/size][/center]
[hr][/hr]

[aligntable=middle,0,15,15,0,0,transparent]
[secspoiler=ID Card][img]${idCardImg.trim()}[/img][/secspoiler]
[secspoiler=Evidence Record]${imgNotHTML}[/secspoiler]
[secspoiler=Arrest Record/ICD Record][img]${arrestImg.trim()}[/img][/secspoiler]
[secspoiler=Video/Dashcam Footage, if available]${footage.trim() == '' ? 'N/A' : footage.trim()}[/secspoiler]
[/aligntable]


[space][/space]
[/divbox]`;
    document.getElementById('text-formatted').value = format;

    document.getElementById('copy-btn').hidden = false;
    document.getElementById('title-body').hidden = false;

    let title = `Case #${caseNumber} - ${type} - ${officerName} - ${dateFormat(date)}`;
    document.getElementById('title-text').innerHTML = title;

}

function copyBBCode() {
    let BBCodeText = document.getElementById('text-formatted');
    if (BBCodeText && BBCodeText.value) {
        navigator.clipboard.writeText(BBCodeText.value)
            .then(() => {
                // alert('Text copied to clipboard');
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

function getRadioValue(name) {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    const checkedRadio = Array.from(radios).find(radio => radio.checked);
    if (checkedRadio) {
        const checkedValue = checkedRadio.value.trim();
        const checkedId = checkedRadio.id.trim();

        if (checkedValue === null) checkedValue = '';
        return {
            value: checkedValue,
            id: checkedId,
        }
    } else return {
        value: '',
        id: '',
    }
}

function viewData() {
    const 
        date        = document.getElementById('date-input').value,
        caseNumber  = document.getElementById('case').value,
        location    = document.getElementById('location').value,
        type        = document.getElementById('type').value,
        suspectName = document.getElementById('suspectName').value,
        reason      = document.getElementById('reason').value,
        weapon      = getRadioValue('weapon'),
        influence   = getRadioValue('influence'),
        injured     = getRadioValue('injured'),
        treatedBy   = getRadioValue('treatedBy'),
        officerName = document.getElementById('officerName').value,
        picName     = document.getElementById('picName').value,
        uniform     = getRadioValue('uniform'),
        weaponUsed  = getRadioValue('weaponUsed')
    ;

    const idCardImg = document.getElementById('idCardImg').value;
    const inputs = document.querySelectorAll('.dynamic-input');
    let evidanceImage = [];
    inputs.forEach(input => {
        values = input.value.trim();
        if(values !== '') {
            evidanceImage.push(values);
        }
    });
    const arrestImg = document.getElementById('arrestImg').value;
    const footage = document.getElementById('footage').value;
    
    console.clear();

    console.log(`date: ${dateFormat(date)}`);
    console.log(`caseNumber: ${caseNumber}`);
    console.log(`location: ${location}`);
    console.log(`type: ${type}`);
    
    console.log('=================');
    console.log(`suspectName: ${suspectName}`);
    console.log(`reason: ${reason}`);
    console.log(`weapon: ${weapon.value} ID: ${weapon.id}`);
    console.log(`influence: ${influence.value} ID: ${influence.id}`);
    console.log(`injured: ${injured.value} ID: ${injured.id}`);
    console.log(`treatedBy: ${treatedBy.value} ID: ${treatedBy.id}`);
    
    console.log('=================');
    console.log(`officerName: ${officerName}`);
    console.log(`picName: ${picName}`);
    console.log(`uniform: ${uniform.value} ID: ${uniform.id}`);
    console.log(`weaponUsed: ${weaponUsed.value} ID: ${weaponUsed.id}`);
    
    console.log('=================');
    console.log(`idCardImg: ${idCardImg}`);
    console.log(`notableImage: ${evidanceImage}`);
    console.log(`arrestImg: ${arrestImg}`);
    console.log(`footage: ${footage}`);

}
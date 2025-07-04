// HTML preconnect:
const last_toggle = document.getElementById("last_toggle");
const cpu_img = document.getElementById("cpu_img");
const buttons = document.querySelectorAll(".player_button");
const winState = document.getElementById("winstate");

// Var init:
let isLizspock = false;
let last_turn = "";

// Image value-pairs:
const sources = {
    'r': "assets/rock.jpg",
    'p': "assets/paper.jpg",
    's': "assets/scissors.jpg",
    'l': "assets/lizard.jpg",
    'sp': "assets/spock.jpg"
}

// Value arrays:
const choice_array1 = ['r', 'p', 's'];
const choice_array2 = ['r', 'p', 's', 'l', 'sp'];

// RPSLSp win-condition map:
const beats = new Map([
  ['r', new Set(['s', 'l'])],
  ['p', new Set(['r', 'sp'])],
  ['s', new Set(['p', 'l'])],
  ['l', new Set(['p', 'sp'])],
  ['sp', new Set(['r', 's'])]
]);

// Link buttons to JS function:
window.addEventListener("DOMContentLoaded", () => {
    buttons.forEach(button => {
        button.addEventListener('click', (event) => CPU_turn(event.target))
    });
    if (window.location.pathname.endsWith("lizspock.html")) {
        isLizspock = true;
    };
})

// CPU random turn function:
function CPU_turn(player_button) {
    const player_value = player_button.dataset.value;
    let CPU_value = "";

    // console.log(isLizspock);
    // console.log("is toggle checked = ", last_toggle.checked)
    // console.log(player_value);

    // 'Last played turn' Version:
    if (last_toggle.checked) {
        // console.log("last turn = ", last_turn)
        if (last_turn == "") {
            if (!isLizspock) {
                CPU_value = choice_array1[Math.floor((Math.random()*3))];
            } else {
                CPU_value = choice_array2[Math.floor((Math.random()*5))];
            }
        } else {
            CPU_value = last_turn;
        }
        last_turn = player_value;
    } 
    // Standard Version:
    else if (!isLizspock) {
        CPU_value = choice_array1[Math.floor((Math.random()*3))];
    } 
    // Lizard/Spock Version:
    else {
        CPU_value = choice_array2[Math.floor((Math.random()*5))];
    }

    // Update CPU display:
    cpu_img.src = sources[CPU_value];
    cpu_img.alt = CPU_value;
    cpu_img.style.display = 'block';
    // console.log(CPU_value);

    // Win conditions:
    if (player_value === CPU_value) {
        winState.innerHTML = 'You Draw!';
    } else if (beats.get(player_value).has(CPU_value)) {
        winState.innerHTML = 'You Win!';
    } else {
        winState.innerHTML = 'You Lose!';
    }
    
}
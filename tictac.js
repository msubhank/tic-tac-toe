let boxes = document.querySelectorAll(".box");
let resetbutton = document.querySelector("#reset-button");
let newgamebutton = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");

let turnO = true;
let clickCount = 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


function resetGame() {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
    clickCount = 0;

}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO === true) {
            box.innerText = "O";
            box.style.color = "red";
            turnO = false;
        }
        else {
            box.innerText = "X";
            box.style.color = "blue";
            turnO = true;
        }
        box.disabled = true;
        clickCount++;

        checkWinner();
        checkDraw();
    })
})

function enableBoxes() {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
function disableBoxes() {
    for (let box of boxes) {
        box.disabled = true;
    }
}

function checkDraw() {
    if (clickCount === 9) {
        for (let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    return; // There is a winner, no need to declare a draw
                }
            }
        }
        msg.innerText = 'It\'s a draw! Nobody wins.';
        msgcontainer.classList.remove("hide");
        disableBoxes();
    }
}
function showWinner(Winner) {
    msg.innerText = 'Congratulations, the Winner is ' + Winner;
    //  msg.innerText=Winner;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {

            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }

        }


    }
}

newgamebutton.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);
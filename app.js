const winningPatters = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9],
]

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msg-container");

let turnX = true;
let count = 0;
let winner = false;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Tile was flipped");
        if (turnX) {
            box.innerText = "X";
            turnX = false;
            box.classList.add("red")
        } else {
            box.innerText = "O";
            turnX = true;
            box.classList.add("green")
        }
        box.disabled = true;
        count++;

        if (count >= 5) {
            winner = checkWinner();
        }
        if (count == 9 && winner == false) {
            msg.innerText = `It's a DRAW`;
            msgContainer.classList.remove("hide");
        }
    })
})

function checkWinner() {
    for (let pattern of winningPatters) {
        let pos1Value = boxes[pattern[0] - 1].innerText;
        let pos2Value = boxes[pattern[1] - 1].innerText;
        let pos3Value = boxes[pattern[2] - 1].innerText;

        if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
            if (pos1Value === pos2Value && pos1Value == pos3Value) {
                console.log("Winner", pos1Value);
                showWinner(pos1Value);
                return true;
            }
        }
    }
    return false;
}

function disableBtns() {
    for (let box of boxes) {
        box.disabled = true;
    }
}

function showWinner(winner) {
    if (winner === "X") {
        msg.innerText = `Congratulations! Winner is Player 1.`;
    }
    else {
        msg.innerText = `Congratulations! Winner is Player 2.`;
    }
    msgContainer.classList.remove("hide");
    disableBtns();
}



resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        count = 0;
        box.disabled = false;
        msg.innerText = "";
        turnX = true;
        msgContainer.classList.add("hide");
        box.classList.remove("red")
        box.classList.remove("green")
    })
})

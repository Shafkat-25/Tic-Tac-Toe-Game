let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGamebtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnmsg = document.querySelector("#turnmsg");

let count = 0;//to track draw

let turnO = true;//player x, player y

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

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnmsg.innerText="First Player is O";

}

const drawGame = () => {
        msg.innerText = "Draw. Play Again";
        msgContainer.classList.remove("hide");
    
}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnO) {
           turnmsg.innerText="Player 2's Turn"
           box.innerText= "O";
           turnO = false;
        }else{
            turnmsg.innerText="Player 1's Turn"
            box.innerText= "X";
            turnO = true;
        }
        box.disabled = true;
        let isWinner = checkWinner();
        count++;
        if(count === 9 && !isWinner) {
            drawGame();
        }
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner= (winner) => {
    let playerChoice = winner;
    if (winner === "O"){
        winner = "Player 1";
    }else {
        winner = "Player 2";
    }
    msg.innerText = `Congratulations, Winner is ${winner} (${playerChoice}).`
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val=== pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
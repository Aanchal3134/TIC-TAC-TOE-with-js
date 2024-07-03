let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //plpayerX, playerO
let count = 0;
//8 winning patterns stored in a 2d array
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
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
      
        if(turnO) { 
            //playerO 
            let input1 = box.innerText = "O";
            let result1 = input1.fontcolor("red");
            turnO = false;
        } else {
            //playerX
            let input = box.innerText = "X";
            let result = input.fontcolor("green");
            turnO = true;
        }
        //to avoid over riding of turns..i.e one box can only be clicked once

        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner) {
            gameDraw();
        }
    });
});
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

//boxes is the variable used for button array
const checkWinner = () => {
    for(let pattern of winPatterns) {
        
        
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;
    

            if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
                if(pos1Val === pos2Val && pos2Val === pos3Val) {
                    console.log("winner", pos1Val);
                    showWinner(pos1Val);
                    return true;
                }
            }   
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

///FUNCTIONALITY I CAN ADD ON MY OWN IS : A POP UP SHOWING WHO WON 
// AND ASKING THE USER IF THEY WANT TO CONTINIE THE GAME
// also this can be a two player game with like 5 games insides
//the player with the maximum score out of 5 wins and if there is a tie 2=2 score and 1 tie match.
//earn coins on winning a match to player x or player y


//last prac problem - implement logic for draw condition
//prac prob - O AND X with different colors
//go on leetcode to study dsa problem of "find winner on a tic tac toe"

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector(".msg");
let newBtn = document.querySelector(".newBtn");

let turnO = true;
let count = 0;

boxes.forEach((box) => {                           
    box.addEventListener("click", () => {
        if (turnO) {                      
            box.innerText = "O";
            box.style.color = "#292929";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#e23235";
            turnO = true;
        }
        count++;
        box.disabled = true;                        
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
        drawGame();
        }
    });
});

const winPatterns = [                             
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const drawGame = () => {
        msg.innerText = "Game Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
};
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const resetGame = () => {
       turnO = true;
       enableBoxes();
       msgContainer.classList.add("hide");
       count = 0;
};
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;         
        let pos2Val = boxes[pattern[1]].innerText;          
        let pos3Val = boxes[pattern[2]].innerText;       

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (
                pos1Val === pos2Val &&
                pos2Val === pos3Val
            ){
                showWinner(pos1Val);    
                return true;
            }
    }
    } return false;
};  
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
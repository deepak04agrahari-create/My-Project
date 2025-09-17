let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset_btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer =document.querySelector(".msg-container");
let msg =document.querySelector("#msg");
let turn0=true;
const winPatterns=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const resetGame=()=>{   //to restart the game
    turn0=true; //agar initial 0 to fir 0 ho jaye
    enableBoxes();
    msgContainer.classList.add("hide");
}
boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turn0){
            box.innerText="o";
            turn0=false;
        }
        else{
           box.innerText="x";
           turn0=true;
        }
        box.disabled=true;
        checkWinner();
    });
});
const disableBoxes=()=>{   // to disable all boxes after winning the game
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{   // to enable all boxes after restart  the game
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";  //remove all text from boxes after restart the game
    }
};
const showWinner=(winner)=>{
    msg.innerText=`Congrustulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide") 
    disableBoxes();
};
const showDraw=()=>{
    msg.innerText="😐 The game is a Draw!";
    msgContainer.classList.remove("hide") 
};
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
             if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
             }
        }
    }
 // check for draw (if all boxes are filled and no winner)
    let allFilled = true;
    boxes.forEach((box)=>{
        if(box.innerText === ""){
            allFilled = false;
        }
    });

    if(allFilled){
        showDraw();
    }
};
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame); 
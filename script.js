
document.addEventListener('DOMContentLoaded',()=>{

const menusection=document.getElementById("menu");
const playerVSplayerbtn=document.getElementById("player-vs-player-btn");
const computerVSplayerbtn=document.getElementById("computer-vs-player-btn");


const playerVSplayer=document.getElementById("player-vs-player");
const computerVSplayer=document.getElementById("computer-vs-player");
const startplayersbtn=document.getElementById("start-players-btn");
const computerplayersbtn=document.getElementById("start-computer-btn");

const player1name = document.getElementById('player-1-name');
const player2name = document.getElementById('player-2-name');
const playername = document.getElementById('player-name');

const boardGame = document.getElementById('Board-game');
let box=document.querySelectorAll(".cell");
let resultText=document.querySelector('.result-text');
let resetbtn=document.querySelector('#reset-button');

let playerbackbutton=document.getElementById("player-back-button");
let computerbackbutton=document.getElementById("computer-back-button");
let boardbackbutton=document.getElementById("board-back-button");

const displaybox=document.getElementById("display-box");
const displaywinningcount=document.getElementById("display-winning-count");
const continuegame=document.getElementById("continue-game");
const displaybackbutton=document.getElementById("display-back-button");

const playererrormsg=document.getElementById("player-name-error");
const computererrormsg=document.getElementById("computer-name-error");


let turn="X";
let GameOver=false;
let iscomputerVsplayer=false;
let player1wins=0;
let player2wins=0;
let computerwins=0;
let playerwins=0;



playerVSplayerbtn.addEventListener("click",()=>{
    menusection.style.display="none";
    playerVSplayer.style.display="flex";
    iscomputerVsplayer=false;
    resetgame();

});

computerVSplayerbtn.addEventListener("click",()=>{
    menusection.style.display="none";
    computerVSplayer.style.display="flex";
    iscomputerVsplayer=true;
    resetgame();
});

startplayersbtn.addEventListener("click",()=>{
    let player1nameInput=player1name.value;
    let player2nameInput=player2name.value;
    if(player1nameInput && player2nameInput){
        playerVSplayer.style.display="none";
        boardGame.style.display="block";
    }
    else{
        playererrormsg.innerHTML="please enter players name!";
    }
   
});

computerplayersbtn.addEventListener("click",()=>{
    let playernameInput=playername.value;
    if(playernameInput){
        computerVSplayer.style.display="none";
        boardGame.style.display="block";
    }
    else{
        computererrormsg.innerHTML="please enter player name!";
    }
});

playerbackbutton.addEventListener("click",()=>{
    menusection.style.display="flex";
    playerVSplayer.style.display="none";
    resetgame();

});

computerbackbutton.addEventListener("click",()=>{
    menusection.style.display="flex";
    computerVSplayer.style.display="none";
    resetgame();

});

boardbackbutton.addEventListener("click",()=>{
    menusection.style.display="flex";
    boardGame.style.display="none";
    resetgame();


});

displaybackbutton.addEventListener("click",()=>{
    menusection.style.display="flex";
    boardGame.style.display="none";
    displaybox.style.display="none";
    resetgame();

});


box.forEach(c =>{
    c.innerHTML = "";
    c.addEventListener("click", ()=>{
        if(!GameOver && c.innerHTML === ""){
            c.innerHTML = turn;
            checkWinner();
            checkDraw();
            checkTurn();
            if(!GameOver && iscomputerVsplayer && turn==="O"){
                setTimeout(computerGame,500);
            }
        }
    });
});

function checkTurn(){
    if(turn==="X"){
        turn="O";
        document.querySelector(".Turn-Grid-bg").style.left="85px";
    }
    else{
        turn="X";
        document.querySelector(".Turn-Grid-bg").style.left="0";
    }
}


function checkWinner(){
    const winningChance=[
        [0,1,2],[3,4,5],[6,7,8],
        [0,4,8],[2,4,6],
        [0,3,6],[1,4,7],[2,5,8]
    ];
    for(let i=0; i<winningChance.length;i++){
        let c0=box[winningChance[i][0]].innerHTML;
        let c1=box[winningChance[i][1]].innerHTML;
        let c2=box[winningChance[i][2]].innerHTML;

        if(c0 !="" && c0===c1 && c0===c2){
            GameOver=true;
            resultText.innerHTML=turn+" "+ "WINS THE MATCH";
            for(j=0;j<3;j++){
                box[winningChance[i][j]].style.backgroundcolor="blue";
                box[winningChance[i][j]].style.color="green";
                document.getElementById("victory").play();

            }
            if(!iscomputerVsplayer){
                if(turn==="X"){
                    player1wins++;
                }else{
                    player2wins++;
                }
                setTimeout(winnerdisplaycount,900);

            }else{
                if(turn==="X"){
                    playerwins++;
                }else{
                    computerwins++;
                }
                setTimeout(computerplayercount,900)
            }
            return;
        }
    }
}

function checkDraw(){
    if(!GameOver){
        let MatchDraw=true;
        box.forEach(c=>{
            if(c.innerHTML==="") MatchDraw =false;
        });

        if(MatchDraw){
            GameOver=true;
            resultText.innerHTML="MATCH DRAW";
            document.getElementById("draw").play();

        }
    }
}

function computerGame(){
    let remainingCells=[];
    box.forEach((c,index)=>{
        if(c.innerHTML==="")remainingCells.push(index);
    });
    if(remainingCells.length>0){
        let move=remainingCells[Math.floor(Math.random()*remainingCells.length)];
        box[move].innerHTML="O";
        checkWinner();
        checkTurn();
        checkDraw();
    }
}

function winnerdisplaycount(){
    displaywinningcount.innerHTML=`${player1name.value}: ${player1wins} WINS <br>${player2name.value}: ${player2wins} WINS`;
    displaybox.style.display="block";
    boardGame.style.display="none";
}

function computerplayercount(){
    displaywinningcount.innerHTML=`${playername.value}: ${playerwins} WINS <br> COMPUTER: ${computerwins} WINS`;
    displaybox.style.display="block";
    boardGame.style.display="none";

}


continuegame.onclick=()=>{
    displaybox.style.display="none";
    boardGame.style.display="block";
    resetgame();
};


function resetgame(){
    GameOver=false;
    turn="X";
    document.querySelector(".Turn-Grid-bg").style.left="0";
    resultText.innerHTML="";
    box.forEach(c=>{
        c.innerHTML="";
        c.style.backgroundcolor="";
        c.style.color="";
    });

}
resetbtn.onclick=()=>{
    resetgame();
}
});










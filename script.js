let clicks = 0;
let time = 0;
let timerId = null;
let scrambling = true;

function swapTiles(a, b){
    const cellA = document.getElementById("cell" + a);
    const cellB = document.getElementById("cell" + b);
    
    const classA = cellA.className; 
    const classB = cellB.className;

    cellA.className = classB;
    cellB.className = classA;

    if (scrambling){
        return;
    }

    let weWon = true;

    for (let i = 1; i <= 16; i++){
        if (document.getElementById("cell" + i).className !== "tile" + i){
            weWon = false;
            break;
        }
    }

    if (weWon){
        stopTimer();

        setTimeout(() => {
            if (confirm("Winner winner chicken dinner! Hit ok to restart")){
                newGame();
            }
        }, 100)
    }
}

function getSides(n){
    const s = [];

    if (n % 4 !== 0){
        s.push(n + 1);
    }

    if (n % 4 !== 1){
        s.push(n - 1);
    }

    if (n + 4 <= 16){
        s.push(n + 4);
    }

    if (n - 4 >= 1){
        s.push(n - 4);
    }

    return s;
}

function scramble(n){
    scrambling = true;

    for (let i = 1; i <= 16; i++){
        document.getElementById("cell" + i).className = "tile" + i;
    }

    let empty = 16;

    for (let i = 0; i < n; i++){
        const sides = getSides(empty);
        const swap = sides[Math.floor(Math.random() * sides.length)];
        swapTiles(empty, swap);
        empty = swap;
    }

    clicks = 0;
    document.getElementById("moves").textContent = clicks;

    stopTimer();
    time = 0;
    document.getElementById("timer").textContent = time;
    
    timerId = setInterval(() => {
        time++;
        document.getElementById("timer").textContent = time;
    }, 1000)

    scrambling = false;
}

function stopTimer(){
    clearInterval(timerId);
}

function clickTile(cell){
    const sides = getSides(cell);

    for (let i = 0; i < sides.length; i++){
        if (document.getElementById("cell" + sides[i]).className == "tile16"){
            swapTiles(cell, sides[i]);
            clicks++;
            document.getElementById("moves").textContent = clicks;
            break;
        }
    }
}

function newGame(){
    scramble(100);
}

function simpleGame(){
    scramble(1);
}

scramble(100);
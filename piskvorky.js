let player = 'X';
let X_score = 0;
let O_score = 0;
let ai = false;
let isGameActive = true;

let krizek = "<img src='img/krizek.png'>";
let kolecko = "<img src='img/kolecko.png'>";
let result;
let scores = {
    X: -10,
    O: 10,
    tie: 0
};

var A1, A2, A3, B1, B2, B3, C1, C2, C3;

/*  
    [A1] [A2] [A3]

    [B1] [B2] [B3]

    [C1] [C2] [C3]
*/

/* Získání políček herního pole z html */
function getTiles() {
    A1 = document.getElementById("A1");
    A2 = document.getElementById("A2");
    A3 = document.getElementById("A3");
    B1 = document.getElementById("B1");
    B2 = document.getElementById("B2");
    B3 = document.getElementById("B3");
    C1 = document.getElementById("C1");
    C2 = document.getElementById("C2");
    C3 = document.getElementById("C3");
}

/* Kontrola výhry za hry */
function checkWinner() {
    getTiles();
    if (A1.classList == 'X' && A2.classList == 'X' && A3.classList == 'X' ||
        B1.classList == 'X' && B2.classList == 'X' && B3.classList == 'X' ||
        C1.classList == 'X' && C2.classList == 'X' && C3.classList == 'X' ||
        A1.classList == 'X' && B1.classList == 'X' && C1.classList == 'X' ||
        A2.classList == 'X' && B2.classList == 'X' && C2.classList == 'X' ||
        A3.classList == 'X' && B3.classList == 'X' && C3.classList == 'X' ||
        A1.classList == 'X' && B2.classList == 'X' && C3.classList == 'X' ||
        A3.classList == 'X' && B2.classList == 'X' && C1.classList == 'X') {
	    isGameActive = false;
        X_score++;
        document.getElementById("winner").innerHTML = "HRÁČ X VYHRÁL";
        document.getElementById("score__X").innerHTML = X_score;
        document.getElementById("restart").style.display = "block";
        return;
	}
    
    if (A1.classList == 'O' && A2.classList == 'O' && A3.classList == 'O' ||
        B1.classList == 'O' && B2.classList == 'O' && B3.classList == 'O' ||
        C1.classList == 'O' && C2.classList == 'O' && C3.classList == 'O' ||
        A1.classList == 'O' && B1.classList == 'O' && C1.classList == 'O' ||
        A2.classList == 'O' && B2.classList == 'O' && C2.classList == 'O' ||
        A3.classList == 'O' && B3.classList == 'O' && C3.classList == 'O' ||
        A1.classList == 'O' && B2.classList == 'O' && C3.classList == 'O' ||
        A3.classList == 'O' && B2.classList == 'O' && C1.classList == 'O') {
	    isGameActive = false;
        O_score++;
        result = 'O';
        document.getElementById("winner").innerHTML = "HRÁČ O VYHRÁL";
        document.getElementById("score__O").innerHTML = O_score;
        document.getElementById("restart").style.display = "block";
        return;
	}
    
    if (A1.classList != "" && A2.classList != "" && A3.classList != "" &&
        B1.classList != "" && B2.classList != "" && B3.classList != "" &&
        C1.classList != "" && C2.classList != "" && C3.classList != "") {
        isGameActive = false;
        result = "tie";
        document.getElementById("winner").innerHTML = "REMÍZA";
        document.getElementById("restart").style.display = "block";
        return;
    }
}

/* Kontrola možné výhry v rámci minimax algoritmu */
function minimaxWinner() {
    if (A1.classList == 'X' && A2.classList == 'X' && A3.classList == 'X' ||
        B1.classList == 'X' && B2.classList == 'X' && B3.classList == 'X' ||
        C1.classList == 'X' && C2.classList == 'X' && C3.classList == 'X' ||
        A1.classList == 'X' && B1.classList == 'X' && C1.classList == 'X' ||
        A2.classList == 'X' && B2.classList == 'X' && C2.classList == 'X' ||
        A3.classList == 'X' && B3.classList == 'X' && C3.classList == 'X' ||
        A1.classList == 'X' && B2.classList == 'X' && C3.classList == 'X' ||
        A3.classList == 'X' && B2.classList == 'X' && C1.classList == 'X') {
	    return 'X';
	}
    
    if (A1.classList == 'O' && A2.classList == 'O' && A3.classList == 'O' ||
        B1.classList == 'O' && B2.classList == 'O' && B3.classList == 'O' ||
        C1.classList == 'O' && C2.classList == 'O' && C3.classList == 'O' ||
        A1.classList == 'O' && B1.classList == 'O' && C1.classList == 'O' ||
        A2.classList == 'O' && B2.classList == 'O' && C2.classList == 'O' ||
        A3.classList == 'O' && B3.classList == 'O' && C3.classList == 'O' ||
        A1.classList == 'O' && B2.classList == 'O' && C3.classList == 'O' ||
        A3.classList == 'O' && B2.classList == 'O' && C1.classList == 'O') {
	    return 'O';
	}
    
    if (A1.classList != "" && A2.classList != "" && A3.classList != "" &&
        B1.classList != "" && B2.classList != "" && B3.classList != "" &&
        C1.classList != "" && C2.classList != "" && C3.classList != "") {
        return 'tie';
    }

    return null;
}

/* Funkce pro umístění znaku na nejvýhodnější polohu */
function playAI() {
    if (isGameActive == false) return;
    
    getTiles();

    let tiles = [A1, A2, A3, B1, B2, B3, C1, C2, C3];
    let X_arrow = document.getElementById("arrow__X");
    let O_arrow = document.getElementById("arrow__O");
    let bestScore = -Infinity;
    let move = 0;

    // Cyklus projde všechny potencionální polohy tahu a
    // minimax algoritmus zjistí, která z nich je nejvýhodnější.
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].classList == '') {
            tiles[i].classList = 'O';
            let score = minimax(tiles, 0, false);
            tiles[i].classList = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            } 
        }
    }

    tiles[move].classList = 'O';
    tiles[move].innerHTML = kolecko;
    O_arrow.style.opacity = "0";
    X_arrow.style.opacity = "1";
    player = 'X'
    checkWinner();
}

/* Algoritmus pro výpočet nejvýhodnější polohy tahu */
function minimax(tiles, depth, isMaximizing) {
    let result = minimaxWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].classList == '') {
                tiles[i].classList = 'O';
                let score = minimax(tiles, depth + 1, false);
                tiles[i].classList = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].classList == '') {
                tiles[i].classList = 'X';
                let score = minimax(tiles, depth + 1, true);
                tiles[i].classList = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

/* Funkce na umístění znaku hráčem */
function play(name) {
	if (isGameActive == false) return;
	if (document.getElementById(name).classList != "") return;

    let clickedTile = document.getElementById(name);
    let X_arrow = document.getElementById("arrow__X");
    let O_arrow = document.getElementById("arrow__O");

    if (player == 'X') {
        clickedTile.innerHTML = krizek;
        clickedTile.classList.add("X");
        O_arrow.style.opacity = "1";
        X_arrow.style.opacity = "0";
        player = 'O';
    } else if (player == 'O') {
        clickedTile.innerHTML = kolecko;
        clickedTile.classList.add("O");
        O_arrow.style.opacity = "0";
        X_arrow.style.opacity = "1";
        player = 'X';
    }

    checkWinner();
    if (ai == true) playAI();
}

/* Restartování hry */
function restart() {
    getTiles();

    A1.classList = A2.classList = A3.classList = B1.classList = B2.classList = B3.classList = C1.classList = C2.classList = C3.classList = "";
    A1.innerHTML = A2.innerHTML = A3.innerHTML = B1.innerHTML = B2.innerHTML = B3.innerHTML = C1.innerHTML = C2.innerHTML = C3.innerHTML = "";

    document.getElementById("winner").innerHTML = "";
    document.getElementById("arrow__X").style.opacity = "1";
    document.getElementById("arrow__O").style.opacity = "0";
    document.getElementById("restart").style.display = "none";

    result = null;
    isGameActive = true;
    player = 'X';
}

/* Zapnutí a vypnutí AI oponenta */
function checkboxAI(){
    let checkbox = document.getElementById("activateAI");
    if (ai == false) {
        ai = true;
        checkbox.style.backgroundColor = "#323c3c";
        restart();
    } else {
        ai = false;
        checkbox.style.backgroundColor = "";
        restart();
    }
}
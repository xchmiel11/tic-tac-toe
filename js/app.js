const x = 'X';
const o = 'O';

const combinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9], 
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
]

let moveElement = x;
let movesX = [];
let movesO = [];
let startGame = false;
let endGame = false;
let availablePositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let isComputerPlay = false;
let computerTurn = false;

const initGame = (type) => {
    moveElement = x;
    movesX = [];
    movesO = [];
    startGame = true;
    endGame = false;
    availablePositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    isComputerPlay = false;
    computerTurn = false;

    $('.item').empty();

    moveElement == 'X' ? $('h1').text('X turn') : $('h1').text('O turn');

    if(type == 'computer') {
        isComputerPlay = true;
        $('p').text('Playing vs computer');

        $('button').eq(0).attr('onclick', 'initGame("computer")').text('Restart');
        $('button').eq(1).attr('onclick', 'initGame("friend")').text('Play vs friend');
    } else {
        $('p').text('Playing vs friend');
        $('button').eq(0).attr('onclick', 'initGame("friend")').text('Restart');
        $('button').eq(1).attr('onclick', 'initGame("computer")').text('Play vs computer');
    }
}

const computerMove = () => {
    if(!endGame) {
        const position = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    
        $('.item').eq(position - 1).text() == '' ? $('.item').eq(position - 1).text(moveElement) : computerMove();
    
        moveElement == 'X' ? movesX.push(position) : movesO.push(position);

        availablePositions.splice(availablePositions.indexOf(position), 1);
    
        checkWin(moveElement);
    
        if(!endGame) {
            checkDraw();
        }
    
        moveElement == 'X' ? moveElement = 'O' : moveElement = 'X';
    
        moveElement == 'X' ? $('h1').text('X turn') : $('h1').text('O turn');
    
        computerTurn = false;
    }
}

$('.item').each((index, element) => {
    $(element).click(() => {
        if($(element).text() == '' && endGame == false && startGame == true && computerTurn == false) {
            const position = $(element).index()+1;

            availablePositions.splice(availablePositions.indexOf(position), 1);
            
            $(element).text(moveElement);

            moveElement == 'X' ? movesX.push(position) : movesO.push(position);

            checkWin(moveElement);

            if(!endGame) {
                checkDraw();
            }
    
            moveElement == 'X' ? moveElement = 'O' : moveElement = 'X';

            moveElement == 'X' ? $('h1').text('X turn') : $('h1').text('O turn');

            if(isComputerPlay) {
                computerTurn = true;
                computerMove();
            }
        }
    })
})

const checkWin = (option) => {
    let points = 0;

    if(option == 'X') {
        combinations.map(item => {
            item.some(x => {
                movesX.includes(x) == true ? ++points : points = 0;
            });

            if(points == 3) {
                endGame = true;
                
                setTimeout(() => {
                    Swal.fire({
                        title: 'X won!',
                        position: 'top',
                        confirmButtonText: 'Cool!',
                        confirmButtonColor: '#2e89ff'
                    }).then(() => {
                        isComputerPlay ? initGame('computer') : initGame('friend');
                    })
                }, 1);
            }
        })
    } else {
        combinations.map(item => {
            item.some(o => {
                movesO.includes(o) == true ? ++points : points = 0;
            });

            if(points == 3) {
                endGame = true;
                
                setTimeout(() => {
                    Swal.fire({
                        title: 'O won!',
                        position: 'top',
                        confirmButtonText: 'Cool!',
                        confirmButtonColor: '#2e89ff'
                    }).then(() => {
                        isComputerPlay ? initGame('computer') : initGame('friend');
                    })
                }, 1);
            }
        })
    }
}

const checkDraw = () => {
    if(availablePositions.length == 0) {
        Swal.fire({
            title: 'Draw!',
            position: 'top',
            confirmButtonText: 'Cool!',
            confirmButtonColor: '#2e89ff'
        }).then(() => {
            isComputerPlay ? initGame('computer') : initGame('friend');
        })
    }
}
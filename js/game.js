'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '0'
const CHERRY = '$'

const gGame = {
    score: 0,
    isOn: false,
    foodCount: 0
}
var gSize = 10
var gBoard
var gCherryInterval
function onInit() {
    console.log('hello')
    document.querySelector('.restart-game').classList.add('hidden')
    document.querySelector('.board-container').classList.remove('hidden')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    setCherry()
    gCherryInterval = setInterval(setCherry, 15000)
}

function buildBoard() {
    const board = []

    for (var i = 0; i < gSize; i++) {
        board.push([])
        for (var j = 0; j < gSize; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === gSize - 1 ||
                j === 0 || j === gSize - 1 ||
                (j === 3 && i > 4 && i < gSize - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    board[1][8] = SUPER_FOOD
    board[1][1] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    gGame.foodCount -= 5
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    document.querySelector('.restart-game').classList.remove('hidden')
}


function foodCheck() {
    var board = gBoard
    const emptyCells = []
    for (var i = 1; i < gSize - 1; i++) {
        for (var j = 1; j < gSize - 1; j++) {
            if (board[i][j] === FOOD) {
                emptyCells.push({ i, j })
            }
        }
    }
    return emptyCells
}

function isVictory() {
    clearInterval(gIntervalGhosts)
    gameOver.isOn = false
    document.querySelector('.restart-game').classList.remove('hidden')
    document.querySelector('.board-container').classList.add('hidden')
    document.querySelector('h3').innerText = 'Victory!.'
}

function getEmptyCells() {
    var board = gBoard
    const emptyCells = []
    for (var i = 1; i < gSize - 1; i++) {
        for (var j = 1; j < gSize - 1; j++) {
            if (board[i][j] === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    return emptyCells
}

function isAteAllFood(emptyCells) {
    if (emptyCells.length === 1) {
        return true
    }
}

function setCherry() {
    const emptyCells = getEmptyCells()
    if (emptyCells.length <= 0) return

        const location = emptyCells[getRandomInt(0, emptyCells.length - 1)]
        gBoard[location.i][location.j] = CHERRY
        console.log({ i: location.i, j: location.j })
        renderCell(location, CHERRY)
        setTimeout(() => {
            if(gBoard[location.i][location.j] === CHERRY){
                gBoard[location.i][location.j] = EMPTY
                renderCell(location, EMPTY)
            }  
        },15000)
    }



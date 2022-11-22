'use strict'

const GHOST = '&#9781'
var gGhosts = []
var gIntervalGhosts
var gRemovedGhosts = []

function createGhosts(board) {
    gGhosts = []
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < 2; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 4,
            j: 4
        },
        currCellContent: FOOD,
        color: randomColor()

    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    console.log('')

}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if(!gPacman.isSuper)
        gameOver()
        return
    }


    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function killGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) {
            if(gGhosts[i].currCellContent === FOOD){
                gGhosts[i].currCellContent = null
                gGame.foodCount--
                if(gGame.foodCount === 0){
                    isVictory()
                }
            }
            gRemovedGhosts.push(gGhosts[i])
            gGhosts.splice(i, 1)
        }
    }
}

function reviveGhost() {
    for (var i = 0; i < gRemovedGhosts.length; i++) {
        const ghost = gRemovedGhosts[i]
        gGhosts.push(ghost)
    }
    gRemovedGhosts = []
}

function getGhostHTML(ghost) {
    var color = (gPacman.isSuper) ? color = 'blue' : ghost.color
    return `<span class='ghost' style='color: ${color};'>${GHOST}</span>`
}
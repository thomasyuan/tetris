'use strict'

class TetrisView {

  constructor() {
    this.colors = new Array(8)
    this.colors[0] = 'red'
    this.colors[1] = 'yellow'
    this.colors[2] = 'blue'
    this.colors[3] = 'green'
    this.colors[4] = 'magenta'
    this.colors[5] = 'Cyan'
    this.colors[6] = 'White'
  }

  renderBoard(board) {
    console.log(`TetrisView renderBoard: ${board}`)
  }

  renderNextShape(shape, colorCode) {
    console.log(`TetrisView renderNextShape: ${shape}, ${colorCode}`)
  }

  renderPoints(points) {
    console.log(`TetrisView renderPoints: ${points}`)
  }

  renderLevel(level) {
    console.log(`TetrisView renderLevel: ${level}`)
  }

  renderShape(from, to, colorCode) {
    console.log(`TetrisView renderShape from ${from} to ${to}, ${colorCode}`)
  }

  renderStatus(status) {
    console.log(`TetrisView renderLevel: ${status}`)
  }
}

module.exports = TetrisView
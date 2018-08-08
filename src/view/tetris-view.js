'use strict'

class TetrisView {

  constructor() {
  }

  renderBoard(board) {
    console.log(`TetrisView renderBoard: ${board}`)
  }

  renderNextShape(shape, color) {
    console.log(`TetrisView renderNextShape: ${shape}, ${color}`)
  }

  renderPoints(points) {
    console.log(`TetrisView renderPoints: ${points}`)
  }

  renderLevel(level) {
    console.log(`TetrisView renderLevel: ${level}`)
  }

  renderShape(from, to, color) {
    console.log(`TetrisView renderShape from ${from} to ${to}, ${color}`)
  }

  renderStatus(status) {
    console.log(`TetrisView renderLevel: ${status}`)
  }
}

module.exports = TetrisView
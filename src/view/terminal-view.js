'use strict'

const Canvas = require('terminal-canvas')
const canvas = new Canvas().reset().hideCursor()

const TetrisView = require('./tetris-view')

class TerminalView extends TetrisView {

  constructor() {
    super()
    this.colors = new Array(8)
    this.colors[0] = 'red'
    this.colors[1] = 'yellow'
    this.colors[2] = 'blue'
    this.colors[3] = 'green'
    this.colors[4] = 'magenta'
    this.colors[5] = 'cyan'
    this.colors[6] = 'orange'
  }

  renderNextShape(shape, color) {
    //console.log(`TerminalView renderNextShape: ${shape}`)
    canvas.moveTo(40, 3).background(false).write("Next Shape:")
    canvas.erase(40, 4, 48, 5)
    shape.forEach((v) => canvas.moveTo(40 + v[0] * 2, 4 + v[1]).background(this.colors[color]).write('  ').flush())
  }

  renderBoard(board) {
    //console.log(`TerminalView renderBoard: ${board}`)
  }

  renderPoints(points) {
    //console.log(`TerminalView renderPoints: ${points}`)
    canvas.moveTo(40, 9).background(false).write(`Points: ${points}`).flush()
  }

  renderLevel(level) {
    //console.log(`TerminalView renderLevel: ${level}`)
    canvas.moveTo(40, 8).background(false).write(`Level: ${level}`).flush()

  }

  renderShape(from, to, color) {
    //console.log(`TetrisView renderShape from ${from} to ${to}`)
    if (from) {
      from.forEach((v) => canvas.erase(v[0] * 2, v[1], v[0] * 2 + 1, v[1]))
    }
    to.reverse().forEach((v) => canvas.moveTo(v[0] * 2, v[1]).background(this.colors[color]).write('  ').flush())
  }

  renderStatus(status) {
    if (status.length !== 0) {
      canvas.moveTo(40, 1).background(false).write(`${status.toUpperCase()}`).flush()
      return
    }
    canvas.erase(40, 1, 54, 1).flush()
  }
}

module.exports = TerminalView
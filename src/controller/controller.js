'use strict'

const Board = require('../model/gameboard')
const Observer = require('../model/gameboard-observer')

const TIMER_INTERVAL = 1000

class TetrisController extends Observer {
  constructor(view) {
    super()
    this.board = new Board(this)
    this.view = view
    this.interval = TIMER_INTERVAL
  }

  timeout() {
    this.board.moveDown()
  }

  initTimer() {
    this.interval = TIMER_INTERVAL
    for (let i = 1; i < this.board.level; ++i) {
      this.interval = this.interval * 0.9
    }
    this.timer = setInterval(this.timeout.bind(this), this.interval)
  }

  start(level = 1) {
    this.board.setLevel(level)

    setTimeout(() => {
      this.view.renderLevel(this.board.level)
      this.view.renderPoints(this.board.points)
      this.view.renderNextShape(this.board.nextShape.shape(), this.board.nextShape.colorCode)
      this.view.renderBoard(this.board.board)
    }, 0)

    this.initTimer()
  }

  stop() {
    clearInterval(this.timer)
  }

  pause() {
    clearInterval(this.timer)
    this.paused = true
    setTimeout(() => {
      this.view.renderStatus('paused')
    }, 0)
  }

  resume() {
    this.initTimer()
    this.paused = false
    setTimeout(() => {
      this.view.renderStatus('')
    }, 0)
  }

  moveLeft() {
    if (this.paused) return
    this.board.moveLeft()
  }

  moveRight() {
    if (this.paused) return
    this.board.moveRight()
  }

  moveDown() {
    if (this.paused) return
    this.board.moveDown()
  }

  rotate() {
    if (this.paused) return
    this.board.rotate()
  }

  onPointsChanged(point) {
    this.view.renderPoints(point)
  }

  onNextShapeChanged(shape) {
    this.view.renderNextShape(shape, this.board.nextShape.colorCode)
  }

  onShapeMoved(from, to) {
    this.view.renderShape(from, to, this.board.shape.colorCode)
  }
}


module.exports = TetrisController
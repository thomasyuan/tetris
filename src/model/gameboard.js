'use strict'

const ShapeFactory = require('./shape-factory')

const WIDTH = 12
const HEIGHT = 20
const LEVEL_UP_LINES = 40

class GameBoard {

  constructor(observer, width = WIDTH, height = HEIGHT) {
    this.observer = observer
    this.width = width
    this.height = height
    this.init()
  }

  init() {
    this.rotateClockWise = true
    this.level = 1
    this.points = 0
    this.clearLines = 0
    this.shape = ShapeFactory.newShape()
    this.nextShape = ShapeFactory.newShape()
    this.initShapePosition()
    this.board = Array.from(new Array(this.width), () => new Array(this.height).fill(0))
    const pos = this.shape.shape().map((v) => [this.x + v[0], this.y + v[1]])
    setTimeout(() => this.observer.onShapeMoved(null, pos, this.shape.colorCode))
    // console.log(`init board, width: ${this.width}, height: ${this.height}`)
    // console.log(this.board)

  }

  initShapePosition() {
    this.x = this.width / 2 - 1
    this.y = 0
  }

  setLevel(level) {
    this.level = level
    this.observer.onLevelChanged(level)
  }

  collisionDetection(x, y) {
    return this.shape.shape().some((v) => {
      const xp = x + v[0]
      const yp = y + v[1]
      //console.log(`x: ${this.x}, y: ${this.y}; check x: ${xp}, y: ${yp}`)
      if (xp < 0 || xp >= this.width
        || yp < 0 || yp >= this.height
        || this.board[xp][yp] > 0) {
          return true
      }

      return false
    })
  }

  moveLeft() {
    if (this.collisionDetection(this.x - 1, this.y)) {
      return
    }
    const from = this.shape.shape().map((v) => [this.x + v[0], this.y + v[1]])
    const to = from.map((v) => [v[0] - 1, v[1]])
    this.x -= 1
    setTimeout(() => {
      this.observer.onShapeMoved(from, to, this.shape.colorCode)
    })
  }

  moveRight() {
    if (this.collisionDetection(this.x + 1, this.y)) {
      return
    }
    const from = this.shape.shape().map((v) => [this.x + v[0], this.y + v[1]])
    const to = from.map((v) => [v[0] + 1, v[1]])
    this.x += 1
    setTimeout(() => {
      this.observer.onShapeMoved(from, to, this.shape.colorCode)
    })
  }

  rotate() {
    const from = this.shape.shape().map((v) => [this.x + v[0], this.y + v[1]])
    //console.log(from)
    const changed = this.shape.rotateClockwise()
    if (!changed) {
      return
    }
    if (this.collisionDetection(this.x, this.y)) {
      this.shape.rotateAnticlockwise()
      return
    }
    const to = this.shape.shape().map((v) => [this.x + v[0], this.y + v[1]])
    //console.log(to)
    setTimeout(() => {
      this.observer.onShapeMoved(from, to, this.shape.colorCode)
    })
  }

  solidShape() {
    this.shape.shape().forEach((v) => {
      this.board[this.x + v[0]][this.y + v[1]] = 1
    })
  }

  moveDown() {
    if (this.collisionDetection(this.x, this.y + 1)) {
      this.points += 10
      this.observer.onPointsChanged(this.points)

      // this.clearLines += 1
      // if (this.clearLines > LEVEL_UP_LINES) {
      //   this.clearLines = 0
      //   this.setLevel(this.level + 1)
      // }
      this.solidShape()
      //console.log('solid')
      this.shape = this.nextShape
      this.nextShape = ShapeFactory.newShape()
      this.observer.onNextShapeChanged(this.nextShape.shape(), this.nextShape.colorCode)
      this.initShapePosition()
      return
    }
    const from = this.shape.shape().map((v) => [this.x + v[0], this.y + v[1]])
    const to = from.map((v) => [v[0], v[1] + 1])
    this.y += 1
    setTimeout(() => {
      this.observer.onShapeMoved(from, to, this.shape.colorCode)
    })
  }

  move2Bottom() {

  }

  changeRotate() {
    this.rotateClockWise = !this.rotateClockWise
  }

}


module.exports = GameBoard
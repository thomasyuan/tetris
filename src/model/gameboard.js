"use strict";

const EventEmitter = require("events");
const ShapeFactory = require("./shape-factory");

const WIDTH = 12;
const HEIGHT = 20;
const LEVEL_UP_LINES = 40;
const POINTS = [0, 10, 30, 60, 100];

class GameBoard extends EventEmitter {
  constructor(width = WIDTH, height = HEIGHT) {
    super();
    this.width = width;
    this.height = height;
  }

  init() {
    this.level = 1;
    this.points = 0;
    this.clearLines = 0;
    this.board = Array.from(new Array(this.height), () =>
      new Array(this.width).fill(0)
    );
    this.shape = ShapeFactory.newShape();
    this.initShapePosition();
    this.nextShape = ShapeFactory.newShape();
    this.emit(
      "nextShapeChanged",
      this.nextShape.coordinates(),
      this.nextShape.colorCode
    );
    this.setLevel(this.level);
    this.emit("pointsChanged", this.points);
  }

  initShapePosition() {
    this.x = this.width / 2 - 1;
    this.y = 0;
    if (this.collisionDetection(this.x, this.y)) {
      this.emit("gameOver");
      return;
    }

    const pos = this.shape
      .coordinates()
      .map(v => [this.x + v[0], this.y + v[1]]);
    this.emit("shapeMoved", null, pos, this.shape.colorCode);
    // setTimeout(() =>
    //   this.observer.onShapeMoved(null, pos, this.shape.colorCode)
    // );
  }

  setLevel(level) {
    this.level = level;
    this.emit("levelChanged", this.level);
    // setTimeout(() => this.observer.onLevelChanged(this.level));
  }

  addPoint(point) {
    this.points += point;
    this.emit("pointsChanged", this.points);
    // setTimeout(() => this.observer.onPointsChanged(this.points));
  }

  collisionDetection(x, y) {
    return this.shape.coordinates().some(v => {
      const xp = x + v[0];
      const yp = y + v[1];
      //console.log(`x: ${this.x}, y: ${this.y}; check x: ${xp}, y: ${yp}`)
      if (
        xp < 0 ||
        xp >= this.width ||
        yp < 0 ||
        yp >= this.height ||
        this.board[yp][xp] > 0
      ) {
        return true;
      }

      return false;
    });
  }

  moveLeft() {
    if (this.collisionDetection(this.x - 1, this.y)) {
      return;
    }
    const from = this.shape
      .coordinates()
      .map(v => [this.x + v[0], this.y + v[1]]);
    const to = from.map(v => [v[0] - 1, v[1]]);
    this.x -= 1;
    this.emit("shapeMoved", from, to, this.shape.colorCode);
    // setTimeout(() =>
    //   this.observer.onShapeMoved(from, to, this.shape.colorCode)
    // );
  }

  moveRight() {
    if (this.collisionDetection(this.x + 1, this.y)) {
      return;
    }
    const from = this.shape
      .coordinates()
      .map(v => [this.x + v[0], this.y + v[1]]);
    const to = from.map(v => [v[0] + 1, v[1]]);
    this.x += 1;
    this.emit("shapeMoved", from, to, this.shape.colorCode);
    // setTimeout(() =>
    //   this.observer.onShapeMoved(from, to, this.shape.colorCode)
    // );
  }

  rotate() {
    const from = this.shape
      .coordinates()
      .map(v => [this.x + v[0], this.y + v[1]]);
    const changed = this.shape.rotateClockwise();
    if (!changed) {
      return;
    }
    if (this.collisionDetection(this.x, this.y)) {
      this.shape.rotateAnticlockwise();
      return;
    }
    const to = this.shape
      .coordinates()
      .map(v => [this.x + v[0], this.y + v[1]]);
    //console.log(to)
    this.emit("shapeMoved", from, to, this.shape.colorCode);
    // setTimeout(() =>
    //   this.observer.onShapeMoved(from, to, this.shape.colorCode)
    // );
  }

  solidShape() {
    this.shape
      .coordinates()
      .forEach(
        v => (this.board[this.y + v[1]][this.x + v[0]] = this.shape.colorCode)
      );
  }

  removeLines() {
    let lines = [];
    for (let y = 0; y < this.board.length; ++y) {
      if (this.board[y].every(v => v > 0)) {
        lines.push(y);
      }
    }

    for (const x of lines) {
      for (let i = x - 1; i >= 0; --i) {
        this.board[i + 1] = this.board[i].map(v => v);
      }
      this.board[0].fill(0);
    }
    return lines.length;
  }

  moveDown(steps = 1) {
    if (this.collisionDetection(this.x, this.y + 1)) {
      this.solidShape();
      const lines = this.removeLines();
      if (lines > 0) {
        this.clearLines += lines;
        this.addPoint(POINTS[lines]);
        this.emit("boardChanged", this.board.map(v => v));
        // setTimeout(() => {
        //   this.observer.onBoardChanged(this.board.map(v => v));
        // });
      }

      if (this.clearLines > LEVEL_UP_LINES) {
        this.clearLines = 0;
        this.setLevel(this.level + 1);
      }

      delete this.shape;
      this.shape = this.nextShape;
      this.initShapePosition();
      this.nextShape = ShapeFactory.newShape();
      this.emit(
        "nextShapeChanged",
        this.nextShape.coordinates(),
        this.nextShape.colorCode
      );
      // setTimeout(() =>
      //   this.observer.onNextShapeChanged(
      //     this.nextShape.coordinates(),
      //     this.nextShape.colorCode
      //   )
      // );
      return;
    }

    const from = this.shape
      .coordinates()
      .map(v => [this.x + v[0], this.y + v[1]]);
    const to = from.map(v => [v[0], v[1] + steps]);
    this.y += steps;
    this.emit("shapeMoved", from, to, this.shape.colorCode);
    // setTimeout(() =>
    //   this.observer.onShapeMoved(from, to, this.shape.colorCode)
    // );
  }

  moveDown2Bottom() {
    let steps = 1;
    while (!this.collisionDetection(this.x, this.y + steps)) {
      ++steps;
    }
    this.moveDown(--steps);
  }
}

module.exports = GameBoard;

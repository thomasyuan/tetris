"use strict";

const Board = require("../model/gameboard");

const TIMER_INTERVAL = 1000;

class TetrisController {
  constructor(view) {
    this.board = new Board();
    this.view = view;

    this.board.on("pointsChanged", point => {
      this.view.renderPoints(point);
    });

    this.board.on("levelChanged", level => {
      this.view.renderLevel(level);
    });

    this.board.on("boardChanged", board => {
      this.view.renderBoard(board);
    });

    this.board.on("nextShapeChanged", (shape, color) => {
      this.view.renderNextShape(shape, color);
    });

    this.board.on("shapeMoved", (from, to, color) => {
      this.view.renderShape(from, to, color);
    });

    this.board.on("gameOver", () => {
      this.view.renderGameOver();
      this.stop();
      process.exit(0);
    });

    this.board.init();
  }

  timeout() {
    this.board.moveDown();
  }

  initTimer() {
    this.interval = TIMER_INTERVAL;
    for (let i = 1; i < this.board.level; ++i) {
      this.interval = this.interval * 0.9;
    }
    this.timer = setInterval(this.timeout.bind(this), this.interval);
  }

  start(level = 1) {
    this.board.setLevel(level);
    this.initTimer();
  }

  stop() {
    clearInterval(this.timer);
  }

  pause() {
    clearInterval(this.timer);
    this.paused = true;
    setTimeout(() => this.view.renderStatus("paused"));
  }

  resume() {
    this.initTimer();
    this.paused = false;
    setTimeout(() => this.view.renderStatus(""));
  }

  moveLeft() {
    if (this.paused) return;
    this.board.moveLeft();
  }

  moveRight() {
    if (this.paused) return;
    this.board.moveRight();
  }

  moveDown2Bottom() {
    if (this.paused) return;
    this.board.moveDown2Bottom();
  }

  rotate() {
    if (this.paused) return;
    this.board.rotate();
  }
}

module.exports = TetrisController;

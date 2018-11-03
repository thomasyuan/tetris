"use strict";

const Board = require("../model/gameboard");
const Observer = require("../model/gameboard-observer");

const TIMER_INTERVAL = 1000;

class TetrisController extends Observer {
  constructor(view) {
    super();
    this.board = new Board(this);
    this.view = view;
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

  // moveDown() {
  //   if (this.paused) return
  //   this.board.moveDown()
  // }

  moveDown2Bottom() {
    if (this.paused) return;
    this.board.moveDown2Bottom();
  }

  rotate() {
    if (this.paused) return;
    this.board.rotate();
  }

  onPointsChanged(point) {
    this.view.renderPoints(point);
  }

  onLevelChanged(level) {
    this.view.renderLevel(level);
  }

  onNextShapeChanged(shape, color) {
    this.view.renderNextShape(shape, color);
  }

  onShapeMoved(from, to, color) {
    this.view.renderShape(from, to, color);
  }

  onBoardChanged(board) {
    this.view.renderBoard(board);
  }

  onGameOver() {
    this.view.renderGameOver();
    this.stop();
    process.exit(0);
  }
}

module.exports = TetrisController;

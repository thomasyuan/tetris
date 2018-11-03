"use strict";

const Shape = require("./shape");

class ShapeFactory {
  static newShape() {
    return new Shape(this.getRandomInt(1, 7));
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = ShapeFactory;

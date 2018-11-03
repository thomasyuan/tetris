"use strict";

const readline = require("readline");
const Controller = require("./src/controller/controller");
const View = require("./src/view/terminal-view");

let v = new View();
let c = new Controller(v);
let pause = false;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on("keypress", (str, key) => {
  if (key.ctrl && key.name === "c") {
    process.exit();
  } else {
    switch (key.name) {
      case "up":
        c.rotate();
        break;
      case "down":
        c.moveDown2Bottom();
        break;
      case "left":
        c.moveLeft();
        break;
      case "right":
        c.moveRight();
        break;
      case "space":
        pause = !pause;
        if (pause) {
          c.pause();
        } else {
          c.resume();
        }
        break;
    }
  }
});

c.start();

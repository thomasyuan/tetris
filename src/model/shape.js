'use strict'

class Shape {

  constructor(type) {
    if (type >= 7 || type < 0) {
      type = 0
    }
    this.rotateFree = false
    this.posIndex = 0
    this[`initShape${type}`]()
 }

  rotateClockwise() {
    if (this.rotateFree) {
      return false
    }
    this.posIndex = (this.posIndex + 1) % this.pos.length
    return true
  }

  rotateAnticlockwise() {
    if (this.rotateFree) {
      return false
    }
    this.posIndex = (this.posIndex + this.pos.length - 1) % this.pos.length
    return true
  }

  shape() {
    return this.pos[this.posIndex]
  }

  // [][][][]
  initShape0() {
    this.pos = new Array(2)
    this.colorCode = 0
    this.pos[0] = [[0, 0], [1, 0], [2, 0], [3, 0]]
    this.pos[1] = [[1, -1], [1, 0], [1, 1], [1, 2]]
    // console.log('[][][][]')
    // console.log(this.shape)
  }

  // [][]
  // [][]
  initShape1() {
    this.pos = new Array(1)
    this.colorCode = 1
    this.rotateFree = true
    this.pos[0] = [[0, 0], [1, 0], [0, 1], [1, 1]]
    // console.log('[][]\n[][]')
    // console.log(this.shape)
  }

  // []
  // [][][]
  initShape2() {
    this.pos = new Array(4)
    this.colorCode = 2
    this.pos[0] = [[0, 0], [0, 1], [1, 1], [2, 1]]
    this.pos[1] = [[1, 0],  [2, 0], [1, 1], [1, 2]]
    this.pos[2] = [[0, 1], [1, 1], [2, 1], [2, 2]]
    this.pos[3] = [[1, 0], [1, 1], [1, 2], [0, 2]]
    // console.log('[]\n[][][]')
    // console.log(this.shape)
  }

  //     []
  // [][][]
  initShape3() {
    this.pos = new Array(4)
    this.colorCode = 3
    this.pos[0] = [[2, 0], [0, 1], [1, 1], [2, 1]]
    this.pos[1] = [[1, 0], [1, 1], [1, 2], [2, 2]]
    this.pos[2] = [[0, 1], [1, 1], [2, 1], [0, 2]]
    this.pos[3] = [[0, 0], [1, 0], [1, 1], [1, 2]]
    // console.log('    []\n[][][]')
    // console.log(this.shape)
  }

  //   []
  // [][][]
  initShape4() {
    this.pos = new Array(4)
    this.colorCode = 4
    this.pos[0] = [[1, 0], [0, 1], [1, 1], [2, 1]]
    this.pos[1] = [[1, 0], [1, 1], [2, 1], [1, 2]]
    this.pos[2] = [[0, 1], [1, 1], [2, 1], [1, 2]]
    this.pos[3] = [[1, 0], [0, 1], [1, 1], [1, 2]]
    // console.log('  []\n[][][]')
    // console.log(this.shape)
  }

  // [][]
  //   [][]
  initShape5() {
    this.pos = new Array(2)
    this.colorCode = 5
    this.pos[0] = [[0, 0], [1, 0], [1, 1], [2, 1]]
    this.pos[1] = [[2, 0], [1, 1], [2, 1], [1, 2]]

    // console.log('[][]\n  [][]')
    // console.log(this.shape)
  }

  //   [][]
  // [][]
  initShape6() {
    this.pos = new Array(2)
    this.colorCode = 6
    this.pos[0] = [[1, 0], [2, 0], [0, 1], [1, 1]]
    this.pos[1] = [[1, 0], [1, 1], [2, 1], [2, 2]]

    // console.log('  [][]\n[][]')
    // console.log(this.shape)
  }

}

module.exports = Shape

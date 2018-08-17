'use strict'

class Shape {

  constructor(type) {
    if (type > 7 || type < 1) {
      type = 1
    }
    this.rotateFree = false
    this.statusIndex = 0
    this[`initShape${type}`]()
 }

  rotateClockwise() {
    if (this.rotateFree) {
      return false
    }
    this.statusIndex = (this.statusIndex + 1) % this.status.length
    return true
  }

  rotateAnticlockwise() {
    if (this.rotateFree) {
      return false
    }
    this.statusIndex = (this.statusIndex + this.status.length - 1) % this.status.length
    return true
  }

  coordinates() {
    return this.status[this.statusIndex].map((v) => v)
  }

  // [][]
  // [][]
  initShape1() {
    this.status = new Array(1)
    this.colorCode = 1
    this.rotateFree = true
    this.status[0] = [[0, 0], [1, 0], [0, 1], [1, 1]]
    // console.log('[][]\n[][]')
    // console.log(this.shape)
  }

  // []
  // [][][]
  initShape2() {
    this.status = new Array(4)
    this.colorCode = 2
    this.status[0] = [[0, 0], [0, 1], [1, 1], [2, 1]]
    this.status[1] = [[1, 0],  [2, 0], [1, 1], [1, 2]]
    this.status[2] = [[0, 1], [1, 1], [2, 1], [2, 2]]
    this.status[3] = [[1, 0], [1, 1], [1, 2], [0, 2]]
    // console.log('[]\n[][][]')
    // console.log(this.shape)
  }

  //     []
  // [][][]
  initShape3() {
    this.status = new Array(4)
    this.colorCode = 3
    this.status[0] = [[2, 0], [0, 1], [1, 1], [2, 1]]
    this.status[1] = [[1, 0], [1, 1], [1, 2], [2, 2]]
    this.status[2] = [[0, 1], [1, 1], [2, 1], [0, 2]]
    this.status[3] = [[0, 0], [1, 0], [1, 1], [1, 2]]
    // console.log('    []\n[][][]')
    // console.log(this.shape)
  }

  //   []
  // [][][]
  initShape4() {
    this.status = new Array(4)
    this.colorCode = 4
    this.status[0] = [[1, 0], [0, 1], [1, 1], [2, 1]]
    this.status[1] = [[1, 0], [1, 1], [2, 1], [1, 2]]
    this.status[2] = [[0, 1], [1, 1], [2, 1], [1, 2]]
    this.status[3] = [[1, 0], [0, 1], [1, 1], [1, 2]]
    // console.log('  []\n[][][]')
    // console.log(this.shape)
  }

  // [][]
  //   [][]
  initShape5() {
    this.status = new Array(2)
    this.colorCode = 5
    this.status[0] = [[0, 0], [1, 0], [1, 1], [2, 1]]
    this.status[1] = [[2, 0], [1, 1], [2, 1], [1, 2]]

    // console.log('[][]\n  [][]')
    // console.log(this.shape)
  }

  //   [][]
  // [][]
  initShape6() {
    this.status = new Array(2)
    this.colorCode = 6
    this.status[0] = [[1, 0], [2, 0], [0, 1], [1, 1]]
    this.status[1] = [[1, 0], [1, 1], [2, 1], [2, 2]]

    // console.log('  [][]\n[][]')
    // console.log(this.shape)
  }

  // [][][][]
  initShape7() {
    this.status = new Array(2)
    this.colorCode = 7
    this.status[0] = [[0, 0], [1, 0], [2, 0], [3, 0]]
    this.status[1] = [[1, -1], [1, 0], [1, 1], [1, 2]]
    // console.log('[][][][]')
    // console.log(this.shape)
  }

}

module.exports = Shape

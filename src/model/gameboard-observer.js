'use strict'


class GameBoardObserver {
  onPointsChanged(point) {
    //console.log(`GameBoardObserver: Point changed to ${point}`)
  }

  onBoardChanged(board) {
    //console.log(`GameBoardObserver: Board changed to ${board}`)
  }

  onLevelChanged(level) {
    //console.log(`GameBoardObserver: Level changed to ${level}`)
  }

  onNextShapeChanged(shape) {
    //console.log(`GameBoardObserver: Next shape changed to ${shape}`)
  }

  onShapeMoved(from, to) {
    //console.log(`GameBoardObserver: Shape moved from ${from} to ${to}`)
  }

  onRotateChanged(clockWise) {
    //console.log(`GameBoardObserver: Rotate changed to ${clockWise ? 'Clockwise' : 'Anticlockwise'}`)
  }
}

module.exports = GameBoardObserver
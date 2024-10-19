import { log } from 'console';
import { IFigure, IObject } from './contracts';
import { StageGroup } from './stage-group';
import { Angle, AngleUnits, identityMatrix3d, IMatrix3d, IPoint2, IPoint3, Matrix3d, Point } from '@fbltd/math';

export class Camera {
  worldMatrix = Matrix3d.translateIdentity(0, 0, -0.5)

  get invertedWorldMatrix() {
    return Matrix3d.invert(this.worldMatrix)
  }

  getPointInCamera(p: IPoint3) {
    return Matrix3d.apply(this.invertedWorldMatrix, p)
  }

  lookAt(worldPoint: IPoint3) {
    let roll: number, pitch: number, yaw: number;
    let inverted: IMatrix3d;
    let pointInCamera: IPoint3;

    this.worldMatrix = Matrix3d.translateIdentity(this.worldMatrix[9], this.worldMatrix[10], this.worldMatrix[11])

    // roll
    inverted = this.invertedWorldMatrix
    pointInCamera = this.getPointInCamera(worldPoint)
    roll = Angle.ofPoint([pointInCamera[0], pointInCamera[1]], false) - 90
    this.worldMatrix = Matrix3d.multiply(this.worldMatrix, Matrix3d.rotateIdentityZ(roll))

    // yaw
    inverted = this.invertedWorldMatrix
    pointInCamera = this.getPointInCamera(worldPoint)
    yaw = Angle.ofPoint([pointInCamera[0], pointInCamera[2]], false) - 90
    this.worldMatrix = Matrix3d.multiply(this.worldMatrix, Matrix3d.rotateIdentityY(yaw))

    // pitch
    inverted = this.invertedWorldMatrix
    pointInCamera = this.getPointInCamera(worldPoint)
    pitch = Angle.ofPoint([pointInCamera[1], pointInCamera[2]], false) - 90
    this.worldMatrix = Matrix3d.multiply(this.worldMatrix, Matrix3d.rotateIdentityX(pitch))

  }
}

export class Stage {
  figures: StageGroup[] = []
  camera: Camera = new Camera

  addObject(figure: typeof this.figures[0]) {
    this.figures.push(figure)
  }

  get vertexes() {
    return this.figures.reduce((acc, child) => {
      acc.push(...child.vertexes)
      return acc
    }, [] as number[])
  }

  get colors() {
    return this.figures.reduce((acc, child) => {
      acc.push(...child.colors)
      return acc
    }, [] as number[])
  }

  get vertexesQty() {
    return this.figures.reduce((acc, child) => {
      return acc + child.vertexesQty
    }, 0)
  }

}

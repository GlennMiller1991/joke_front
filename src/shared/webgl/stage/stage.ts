import { log } from 'console';
import { IFigure, IObject } from './contracts';
import { StageGroup } from './stage-group';
import { Angle, AngleUnits, identityMatrix3d, IPoint2, IPoint3, Matrix3d, Point } from '@fbltd/math';

export class Camera {
  worldMatrix = Matrix3d.translateIdentity(0, 0, -1)

  lookAt(worldPoint: IPoint3) {
    let inverted = Matrix3d.invert(this.worldMatrix)
    worldPoint = Matrix3d.apply(inverted, worldPoint)

    let yaw = Angle.ofPoint([worldPoint[0], worldPoint[1]], false) - 90
    let pitch = Angle.ofPoint([worldPoint[1], worldPoint[2]], false) - 90
    console.log(pitch)


    this.worldMatrix = Matrix3d.multiply(this.worldMatrix, Matrix3d.rotateIdentityZ(yaw))
    inverted = Matrix3d.invert(this.worldMatrix)
    pitch = Angle.ofPoint([worldPoint[1], worldPoint[2]], false) - 90
    console.log(pitch)
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

import { IMatrix3d, IPoint2, identityMatrix3d } from '@fbltd/math';

export type IRect = {
  width: number,
  height: number,
  origin: IPoint2
}

export interface IFigure {
  get vertexes(): number[]

  get colors(): number[]

  get vertexesQty(): number

  transformVertexes(transform: IMatrix3d): IFigure['vertexes']
}

export interface IObject extends IFigure {
  worldMatrix: IMatrix3d
}

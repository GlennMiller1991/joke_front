import { IMatrix3d, IPoint2, IPoint3, identityMatrix3d } from '@fbltd/math';

export type IRect2 = {
  width: number,
  height: number,
  origin: IPoint2
}


export type IRect3 = {
  width: number,
  height: number,
  depth: number,
  origin: IPoint3
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
export function getVertexes(figures: IFigure[]) {
  return figures.reduce((acc, p) => {
    acc.push(...p.vertexes)
    return acc
  }, [] as number[])
}

export function getColors(figures: IFigure[]) {
  return figures.reduce((acc, p) => {
    acc.push(...p.colors)
    return acc
  }, [] as number[])
}

export function getVertexesQty(figures: IFigure[]) {
  return figures.reduce((acc, f) => {
    return acc + f.vertexesQty
  }, 0)
}

export function getTransformedVertexes(figures: IFigure[], transform: IMatrix3d) {
  return figures.reduce((acc, p) => {
    acc.push(...p.transformVertexes(transform))
    return acc
  }, [] as number[])
}
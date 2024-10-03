import {IPoint2} from '@fbltd/math';

export type IRect = {
  width: number,
  height: number,
  origin: IPoint2
}

export interface IFigure {
  get vertexes(): number[]

  get colors(): number[]
}

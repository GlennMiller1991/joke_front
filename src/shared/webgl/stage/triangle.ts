import {IPoint2} from '@fbltd/math';
import {IFigure} from './contracts';

export class Triangle implements IFigure {
  public aColor: number = 0.5
  public bColor: number = 0.5
  public cColor: number = 0.5

  constructor(
    public a: IPoint2,
    public b: IPoint2,
    public c: IPoint2,
  ) {
  }

  get vertexes(): number[] {
    return [
      ...this.a,
      ...this.b,
      ...this.c,
    ]
  }

  get colors(): number[] {
    return [
      this.aColor,
      this.bColor,
      this.cColor,
    ]
  }

  vertexesQty = 3


}

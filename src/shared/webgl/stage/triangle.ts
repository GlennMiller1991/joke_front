import {IPoint2} from '@fbltd/math';

export class Triangle {
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

  vertexesQty = 3


}

import { Color, IMatrix2d, IPoint2, Matrix2d } from '@fbltd/math';
import { IFigure } from './contracts';

export class Vertex implements IFigure {

  constructor(private point: IPoint2, private color: Color) {

  }

  get colors() {
    return [
      this.color.red, this.color.green, this.color.blue
    ]
  }

  get vertexes() {
    return [
      ...this.point
    ]
  }

  get vertexesQty() {
    return 1
  }

  transformVertexes(transform: IMatrix2d): IFigure['vertexes'] {
    return [
      ...Matrix2d.apply(transform, this.point)
    ]
  }
}

export class Triangle implements IFigure {
  public red: number = 0.2
  public green: number = 0.7
  public blue: number = 0.1

  constructor(
    public a: Vertex,
    public b: Vertex,
    public c: Vertex,
  ) {
  }

  get vertexes(): number[] {
    return [
      ...this.a.vertexes,
      ...this.b.vertexes,
      ...this.c.vertexes,
    ]
  }

  get colors(): number[] {
    return [
      ...this.a.colors,
      ...this.b.colors,
      ...this.c.colors,
    ]
  }

  transformVertexes(transform: IMatrix2d): IFigure['vertexes'] {
    return [
      ...this.a.transformVertexes(transform),
      ...this.b.transformVertexes(transform),
      ...this.c.transformVertexes(transform),
    ]
  }

  vertexesQty = 3


}

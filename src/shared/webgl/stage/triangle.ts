import { IMatrix2d, IMatrix3d } from '@fbltd/math';
import { IFigure } from './contracts';
import { Vertex } from './vertex';

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

  transformVertexes(transform: IMatrix3d): IFigure['vertexes'] {
    return [
      ...this.a.transformVertexes(transform),
      ...this.b.transformVertexes(transform),
      ...this.c.transformVertexes(transform),
    ]
  }

  vertexesQty = 3


}

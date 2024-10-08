import { Color, IMatrix2d, IMatrix3d, Point } from '@fbltd/math';
import { IFigure, IRect } from './contracts';
import { Triangle } from './triangle';
import { Vertex } from './vertex';
import { SpaceConverter } from '../converter';

export class Plane implements IFigure {
  private children: [Triangle, Triangle] | Plane[]
  private color!: Color

  constructor(rect: IRect, color?: typeof this.color) {
    color = this.color = color || new Color(0.5, 0.5, 0.5)
    const at = new Triangle(
      new Vertex(SpaceConverter.point2to3(rect.origin), color),
      new Vertex(SpaceConverter.point2to3(Point.sum(rect.origin, [0, rect.height])), color),
      new Vertex(SpaceConverter.point2to3(Point.sum(rect.origin, [rect.width, 0])), color),
    )
    const bt = new Triangle(
      new Vertex(SpaceConverter.point2to3(Point.sum(rect.origin, [rect.width, rect.height])), color),
      at.c,
      at.b,
    )

    this.children = [at, bt]
  }

  get vertexes() {
    return (this.children as Array<Plane | Triangle>).reduce((acc, child) => {
      acc.push(...child.vertexes)
      return acc
    }, [] as number[])
  }

  transformVertexes(transform: IMatrix3d) {
    return (this.children as Array<Plane | Triangle>).reduce((acc, child) => {
      acc.push(...child.transformVertexes(transform))
      return acc
    }, [] as number[])
  }

  get colors() {
    return (this.children as Array<Plane | Triangle>).reduce((acc, child) => {
      acc.push(...child.colors)
      return acc
    }, [] as number[])
  }

  get vertexesQty(): number {
    return (this.children as Array<Plane | Triangle>).reduce((acc, child) => {
      return acc + child.vertexesQty
    }, 0)
  }
}

import { Color, IMatrix2d, IMatrix3d, IPoint3, Point } from '@fbltd/math';
import { IFigure, IRect2, IRect3 } from './contracts';
import { Triangle } from './triangle';
import { Vertex } from './vertex';
import { SpaceConverter } from '../converter';

export class Plane implements IFigure {
  private children: [Triangle, Triangle] | Plane[]
  private color!: Color

  constructor(p1: IPoint3, p2: IPoint3, p3: IPoint3, p4: IPoint3, color?: typeof this.color) {
    color = this.color = color || new Color(0.5, 0.5, 0.5)
    const at = new Triangle(
      new Vertex(p1, color),
      new Vertex(p2, color),
      new Vertex(p3, color),
    )
    const bt = new Triangle(
      new Vertex(p4, color),
      at.c,
      at.b,
    )

    this.children = [at, bt]
  }

  static ofRect2(rect: IRect2, color?: Color) {
    return new Plane(
      SpaceConverter.point2to3(rect.origin),
      SpaceConverter.point2to3(Point.sum(rect.origin, [0, rect.height])),
      SpaceConverter.point2to3(Point.sum(rect.origin, [rect.width, 0])),
      SpaceConverter.point2to3(Point.sum(rect.origin, [rect.width, rect.height])),
      color
    )
  }

  static ofRect3(rect: IRect3, color?: Color) {
    return new Plane(
      rect.origin,
      Point.sum(rect.origin, [rect.width, rect.height, 0]),
      Point.sum(rect.origin, [0, 0, rect.depth]),
      Point.sum(rect.origin, [rect.width, rect.height, rect.depth]),
      color
    )
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

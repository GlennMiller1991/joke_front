import { Color, IMatrix2d, IMatrix3d, IPoint3, Point } from '@fbltd/math';
import { IFigure, IRect2, IRect3 } from './contracts';
import { Triangle } from './triangle';
import { Vertex } from './vertex';
import { SpaceConverter } from '../converter';
import { Figure } from './figure';

export class Plane extends Figure {
  declare children: [Triangle, Triangle]

  constructor(p1: IPoint3, p2: IPoint3, p3: IPoint3, p4: IPoint3, color?: Color, parent?: IFigure) {
    super(color, parent)
    const at = new Triangle(
      new Vertex(p1, color),
      new Vertex(p2, color),
      new Vertex(p3, color),
      undefined, this,
    )
    const bt = new Triangle(
      at.c,
      new Vertex(p4, color),
      at.a,
      undefined, this,
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
      color,
    )
  }

}

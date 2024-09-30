import {Point} from '@fbltd/math';
import {IRect} from './contracts';
import {Triangle} from './triangle';

export class Plane {
  private children: [Triangle, Triangle] | Plane[]

  constructor(private rect: IRect) {
    const at = new Triangle(
      rect.origin,
      Point.sum(rect.origin, [rect.width, 0]),
      Point.sum(rect.origin, [0, rect.height])
    )
    const bt = new Triangle(
      Point.sum(rect.origin, [rect.width, rect.height]),
      at.b,
      at.c
    )

    this.children = [at, bt]
  }

  get vertexes() {
    const children = this.children
    return (children as Array<Plane | Triangle>).reduce((acc, child) => {
      acc.push(...child.vertexes)
      return acc
    }, [] as number[])
  }

  get vertexesQty(): number {
    return (this.children as Array<Plane | Triangle>).reduce((acc, child) => {
      return acc + child.vertexesQty
    }, 0)
  }
}

import { Color, IMatrix2d, IMatrix3d } from '@fbltd/math';
import { getColors, IFigure, ISurface } from './contracts';
import { Vertex } from './vertex';
import { Figure } from './figure';
import { surfaceNormal } from '../../../app/components/intro/intro.component';

export class Triangle extends Figure implements ISurface {
  declare children: [Vertex, Vertex, Vertex]

  constructor(
    a: Vertex,
    b: Vertex,
    c: Vertex,

    color?: Color,
    parent?: IFigure,
  ) {
    super(color, parent)
    this.children = [
      a, b, c
    ]
    c.parent = b.parent = a.parent = this

  }


  get normal() {
    return surfaceNormal(this.a.normal, this.b.normal, this.c.normal)
  }

  get a() {
    return this.children[0]
  }

  get b() {
    return this.children[1]
  }

  get c() {
    return this.children[2]
  }

}

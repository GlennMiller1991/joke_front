import { Angle, identityMatrix3d, IMatrix3d, IPoint2, IPoint3, Matrix3d } from '@fbltd/math';
import { WebglProgram } from '../webgl-program';
import { IFigure } from './contracts';
import { SpaceConverter } from '../converter';
import { Figure } from './figure';

export class StageGroup extends Figure {
  key = String(Math.random())
  vao: WebGLVertexArrayObject | null = null
  worldMatrix = identityMatrix3d

  constructor(private program: WebglProgram) {
    super()
  }

  addFigures(...figures: Array<IFigure>) {
    this.children.push(...figures)
    figures.forEach(f => f.parent = this)
  }

  get gl() {
    return this.program.gl
  }

  get isReady() {
    return !!this.vao
  }

  init() {
    this.vao = this.program.createVertexArray()
    if (!this.isReady) return
    this.allocateVertexes('a_position', this.vertexes, 3)
    this.allocateVertexes('a_color', this.colors, 3)
  }

  draw() {
    const primitiveType = this.gl.TRIANGLES;
    const offset = 0;
    const count = this.vertexesQty;
    this.gl.drawArrays(primitiveType, offset, count);
  }

  allocateVertexes(name: string, vertexes: Array<number>, size: number) {
    const attrLocation = this.gl.getAttribLocation(this.program.program!, name)
    const vbo = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexes), this.gl.STATIC_DRAW)
    this.gl.bindVertexArray(this.vao)
    this.gl.enableVertexAttribArray(attrLocation);
    this.gl.vertexAttribPointer(attrLocation, size, this.gl.FLOAT, false, 0, 0)
  }


}

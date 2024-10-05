import { identityMatrix, IMatrix2d, Matrix2d } from '@fbltd/math';
import { WebglProgram } from '../webgl-program';
import { IFigure } from './contracts';

export class StageGroup implements IFigure {
  vao: WebGLVertexArrayObject | null = null
  transform: IMatrix2d = identityMatrix

  constructor(private program: WebglProgram, public readonly figure: IFigure) {

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
    this.allocateVertexes('a_position', this.vertexes, 2)
    this.allocateVertexes('a_color', this.colors, 3)
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

  transformVertexes(transform: IMatrix2d): IFigure['vertexes'] {
    return this.figure.transformVertexes(transform)
  }


  get vertexes() {
    return this.figure.vertexes
  }

  get colors() {
    return this.figure.colors
  }

  get vertexesQty() {
    return this.figure.vertexesQty
  }

  draw() {
    
  }
}

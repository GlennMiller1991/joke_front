import { afterNextRender, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { WebglProgram } from '../../../shared/webgl/webgl-program';
import { Stage } from '../../../shared/webgl/stage/stage';
import { Plane } from '../../../shared/webgl/stage/plane';
import { request } from '../../../shared/network/request';
import { StageGroup } from '../../../shared/webgl/stage/stage-group';
import { Color, identityMatrix3d, Matrix3d } from '@fbltd/math';

@Component({
  standalone: true,
  selector: 'intro-component',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent implements OnDestroy {
  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>
  resizeObserver!: ResizeObserver
  parent!: HTMLElement
  canvas!: HTMLCanvasElement
  gl!: WebGL2RenderingContext
  program!: WebGLProgram
  stage = new Stage()

  constructor() {
    afterNextRender(async () => {
      this.canvas = this.canvasRef.nativeElement
      this.parent = this.canvas.parentElement!
      this.canvas.style.background = 'inherit'
      if (!this.parent) return
      this.gl = this.canvas.getContext('webgl2')!
      if (!this.gl) return

      const p = new WebglProgram(this.gl)

      let [fragment, vertex] = await Promise.all([
        request<string>('/main-page/shaders/fragment.glsl'),
        request<string>('/main-page/shaders/vertex.glsl'),
      ])

      if (!fragment.data || !vertex.data) return
      p.buildInShader(vertex.data, this.gl.VERTEX_SHADER)
      p.buildInShader(fragment.data, this.gl.FRAGMENT_SHADER)
      p.build()
      if (!p.isOk) return


      const plane = new Plane({ origin: [-0.5, -1], width: 1, height: 1 }, new Color(0.1, 0.3, 0.7))
      const group = new StageGroup(p, plane)
      group.transform = Matrix3d.multiply(identityMatrix3d, [1, 0, 0, 0, 1, 0, 0, 0, 1, 0.25, 0, 0])
      group.init()

      this.stage.addObject(group)


      this.resizeObserver = new ResizeObserver(this.onResize)
      this.resizeObserver.observe(this.canvas.parentElement!)
    })
  }

  get isReady() {
    return this.canvas && this.parent && this.gl
  }

  onResize = () => {
    const parent = this.canvasRef.nativeElement.parentElement!
    const rect = parent.getBoundingClientRect()
    const max = Math.max(rect.width, rect.height)
    this.canvas.width = max
    this.canvas.height = max
    this.canvas.style.width = `${max}px`
    this.canvas.style.height = `${max}px`
    this.gl.viewport(0, 0, max, max);
    this.gl.lineWidth(10)

    this.draw()
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect()
    this.resizeObserver = null as any
  }

  draw() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    const primitiveType = this.gl.TRIANGLES;
    const offset = 0;
    const count = this.stage.vertexesQty;
    this.gl.drawArrays(primitiveType, offset, count);
  }

}

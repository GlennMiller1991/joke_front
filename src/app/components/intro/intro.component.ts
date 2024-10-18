import { afterNextRender, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { WebglProgram } from '../../../shared/webgl/webgl-program';
import { Stage } from '../../../shared/webgl/stage/stage';
import { Plane } from '../../../shared/webgl/stage/plane';
import { request } from '../../../shared/network/request';
import { StageGroup } from '../../../shared/webgl/stage/stage-group';
import { Angle, Color, IPoint3, Matrix3d } from '@fbltd/math';
import { ButtonComponent } from "../preloader/components/button/button.component";
import { RotatedButtonComponent } from "../preloader/components/rotated-button/rotated-button.component";
import { PlayerComponent } from '../player/player.component';
@Component({
  standalone: true,
  selector: 'intro-component',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
  imports: [PlayerComponent]
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


      const plane = new Plane({ origin: [-0.05, -0.05], width: 0.1, height: 0.1 }, new Color(0.1, 0.3, 0.7))
      const group = new StageGroup(p, plane)
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

  i = 0
  r = 1

  circleEquation = (i = this.i): IPoint3 => {
    i = Angle.toRad(i)
    return [
      Math.sin(i) * this.r,
      Math.cos(i) * this.r,
      0
    ]
  }

  draw() {
    window.requestAnimationFrame(() => {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT)

      const camera = this.stage.camera
      // camera.lookAt([1, , 0])
      console.log(this.circleEquation())
      camera.lookAt(this.circleEquation())
      this.stage.figures.forEach((group) => {
        group.allocateTransform(Matrix3d.invert(camera.worldMatrix))
        group.draw()
        console.log(group.transformVertexes(Matrix3d.invert(camera.worldMatrix)))
      })


      setTimeout(() => {
        this.i += 1
        this.draw()
      },10)
    })
  }

}

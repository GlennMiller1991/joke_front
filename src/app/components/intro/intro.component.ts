import { afterNextRender, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { WebglProgram } from '../../../shared/webgl/webgl-program';
import { Stage } from '../../../shared/webgl/stage/stage';
import { Plane } from '../../../shared/webgl/stage/plane';
import { request } from '../../../shared/network/request';
import { StageGroup } from '../../../shared/webgl/stage/stage-group';
import { Angle, Color, IPoint3, Matrix3d, identityMatrix3d } from '@fbltd/math';
import { ButtonComponent } from "../preloader/components/button/button.component";
import { RotatedButtonComponent } from "../preloader/components/rotated-button/rotated-button.component";
import { PlayerComponent } from '../player/player.component';


export class AnimationQueue {
  queue: Function[] = []
  rafId: number | undefined

  push(f: Function) {
    if (!this.queue.length) {
      this.rafId = requestAnimationFrame(() => {
        this.rafId = undefined
        this.go()
      })
    }

    this.queue.push(f)
  }

  go() {
    this.queue.forEach(f => f())
    this.queue = []
  }
}


@Component({
  standalone: true,
  selector: 'intro-component',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
  imports: [PlayerComponent]
})

export class IntroComponent implements OnDestroy {
  animationQueue = new AnimationQueue()
  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>
  resizeObserver!: ResizeObserver
  parent!: HTMLElement
  canvas!: HTMLCanvasElement
  gl!: WebGL2RenderingContext
  program!: WebglProgram
  stage!: Stage

  constructor() {

    afterNextRender(async () => {
      this.canvas = this.canvasRef.nativeElement
      this.parent = this.canvas.parentElement!
      this.canvas.style.background = 'inherit'
      if (!this.parent) return
      this.gl = this.canvas.getContext('webgl2')!
      if (!this.gl) return

      this.program = new WebglProgram(this.gl)

      let [fragment, vertex] = await Promise.all([
        request<string>('/main-page/shaders/fragment.glsl'),
        request<string>('/main-page/shaders/vertex.glsl'),
      ])

      if (!fragment.data || !vertex.data) return
      this.program.buildInShader(vertex.data, this.gl.VERTEX_SHADER)
      this.program.buildInShader(fragment.data, this.gl.FRAGMENT_SHADER)
      this.program.build()
      if (!this.program.isOk) return


      this.stage = new Stage(this.program)
      const plane1 = Plane.ofRect3({ origin: [-0, -0, -0], width: .5, height: .5, depth: .5 }, new Color(0.1, 0.3, 0.7))
      const plane2 = Plane.ofRect3({ origin: [-0, -0, -0], width: -.5, height: .5, depth: .5 }, new Color(0.1, 0.4, 0.7))
      const plane3 = Plane.ofRect3({origin: [-1, -1, -1], width: 2, height: 0, depth: 2}, new Color(1, 1, 1))
      const group1 = new StageGroup(this.program)
      group1.addFigures(plane1, plane2, plane3)
      group1.init()

      this.stage.addObject(group1)


      this.resizeObserver = new ResizeObserver(this.onResize)
      this.resizeObserver.observe(this.canvas.parentElement!)

      document.addEventListener('keypress', this.onKeyBoard)
    })
  }

  onPlayerStatusChanged(type: string) {
    const play = this.play
    switch (type) {
      case 'stop':
        this.play = 0
        break;
      case 'play':
        this.play = 1
        break;
      case 'back':
        this.play = -this.fastCoef
        break;
      case 'forward':
        this.play = this.fastCoef
        break;
    }

    if (this.play && !play) {
      this.draw()
    }
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
  }

  onKeyBoard = (event: KeyboardEvent) => {
    const camera = this.stage.camera
    let m = identityMatrix3d
    switch (event.key) {
      case 'q':
        m = Matrix3d.rotateZ(m, 1)
        break
      case 'e':
        m = Matrix3d.rotateZ(m, -1)
        break
      case 'w':
        m = Matrix3d.translateZ(m, 0.01)
        break
      case 's':
        m = Matrix3d.translateZ(m, -0.01)
        break
      case 'a':
        m = Matrix3d.rotateY(m, -1)
        break
      case 'd':
        m = Matrix3d.rotateY(m, 1)
        break
      case 'r':
        m = Matrix3d.rotateX(m, 1)
        break
      case 't':
        m = Matrix3d.rotateX(m, -1)
        break
    }

    camera.worldMatrix = Matrix3d.multiply(camera.worldMatrix, m)
    this.animationQueue.push(this.draw.bind(this))
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect()
    this.resizeObserver = null as any
  }

  i = 0
  r = 5
  z = 0
  play = 0
  fastCoef = 10

  circleEquation = (i = this.i): IPoint3 => {
    i = Angle.toRad(i)
    return [
      Math.cos(i) * this.r,
      Math.sin(i) * this.r,
      this.z
    ]
  }

  draw() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    const projection = this.stage.projection
    const camera = this.stage.camera

    projection.allocateTransform();
    this.program.allocateTransform(Matrix3d.invert(camera.worldMatrix), 'camera_matrix')

    this.stage.figures.forEach((group) => {
      group.draw()
    })

  }

}

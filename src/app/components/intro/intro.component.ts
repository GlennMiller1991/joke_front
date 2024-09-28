import { Component, ElementRef, OnDestroy, ViewChild, afterNextRender, afterRender, inject } from "@angular/core";
import { log } from "console";


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

    constructor() {
        afterNextRender(async () => {
            this.canvas = this.canvasRef.nativeElement
            this.parent = this.canvas.parentElement!
            this.canvas.style.background = 'inherit'
            if (!this.parent) return
            this.gl = this.canvas.getContext('webgl2')!
            if (!this.gl) return

            await fetch('/api/main-page/shaders', {
                method: 'GET'
            }).then(res => res.text())
            .then(console.log)

            this.gl.clearColor(0.0, 0.0, 0.0, 0)
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
        this.canvasRef.nativeElement.width = rect.width
        this.canvasRef.nativeElement.height = rect.height

        this.draw()
    }

    ngOnDestroy() {
        this.resizeObserver?.disconnect
        this.resizeObserver = null as any
    }

    draw() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        
    }

}
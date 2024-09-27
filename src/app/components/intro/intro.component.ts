import { Component, ElementRef, OnDestroy, ViewChild, afterNextRender, afterRender } from "@angular/core";
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
    ctx!: WebGL2RenderingContext

    constructor() {
        afterNextRender(() => {
            this.canvas = this.canvasRef.nativeElement
            this.parent = this.canvas.parentElement!
            this.canvas.style.background = 'inherit'
            if (!this.parent) return
            this.ctx = this.canvas.getContext('webgl2')!
            if (!this.ctx) return
            this.resizeObserver = new ResizeObserver(this.onResize)
            this.resizeObserver.observe(this.canvas.parentElement!)
        })
    }

    get isReady() {
        return this.canvas && this.parent && this.ctx
    }

    onResize = () => {
        const parent = this.canvasRef.nativeElement.parentElement!
        const rect = parent.getBoundingClientRect()
        this.canvasRef.nativeElement.width = rect.width
        this.canvasRef.nativeElement.height = rect.height
    }

    ngOnDestroy() {
        this.resizeObserver?.disconnect
        this.resizeObserver = null as any
    }

}
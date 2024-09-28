import { Component, ElementRef, OnDestroy, ViewChild, afterNextRender, afterRender, inject } from "@angular/core";
import { log } from "console";
import { createShader, SHADER_TYPE } from "../../../shared/webgl/create-shader";


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

            let [fragment, vertex] = await Promise.all([
                request<string>('/main-page/shaders/fragment.glsl'),
                request<string>('/main-page/shaders/vertex.glsl'),
            ])
            if (!fragment.data || !vertex.data) return

            const test = createShader(this.gl, SHADER_TYPE.FRAGMENT, fragment.data)


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

type ISuccessResponse<T> = {
    data: T,
    error?: never,
}

type IErrorResponse = {
    data?: never,
    error: string,
}

type IResponse<T> = ISuccessResponse<T> | IErrorResponse

export const METHODS = {
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    PUT: 'PUT',
    POST: 'POST',
    GET: 'GET'
} as const

type IRequestOptions = {
    method: keyof typeof METHODS,
    mode: RequestMode,
}

export const RESPONSE_HEADERS = {
    CONTENT_TYPE: 'content-type'
} as const

export type IResponseHeaders = {
    [Key in keyof typeof RESPONSE_HEADERS]: typeof RESPONSE_HEADERS[Key]
}

export async function request<T>(src: string, options: IRequestOptions = {
    method: METHODS.GET,
    mode: 'same-origin',
}): Promise<IResponse<T>> {
    try {
        let response = await fetch(src, {
            ...options
        })
        let contentType = response.headers.get(RESPONSE_HEADERS.CONTENT_TYPE) || ''
        let method: 'text' | 'json' = 'json'
        if (/text/.test(contentType)) {
            method = 'text'
        }

        let data = await response[method]()
        return {
            data,
        } as ISuccessResponse<T>
    } catch (err: any) {
        return {
            error: err?.message || ''
        } as IErrorResponse
    }
}
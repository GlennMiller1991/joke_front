import { Component, ElementRef, OnDestroy, ViewChild, afterNextRender } from "@angular/core";
import { WebglProgram } from '../../../shared/webgl/webgl-program';
import { IPoint, IPoint2 } from '@fbltd/math'

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

    constructor() {
        afterNextRender(async () => {
            this.canvas = this.canvasRef.nativeElement
            this.parent = this.canvas.parentElement!
            this.canvas.style.background = 'inherit'
            if (!this.parent) return
            this.gl = this.canvas.getContext('webgl2')!
            if (!this.gl) return

            console.log('after render')
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


            // const img = new Image(100, 100)
            // img.onload = console.log
            // img.src = '/main-page/images/movie.png'

            // img.style.position = 'absolute'
            // img.style.top = '0'
            // img.style.left = '0'
            // img.style.zIndex = '9999'
            // document.body.appendChild(img)


           



            p.allocateVertexes(
                'a_position',
                [
                    0, 0,
                    0, 0.5,
                    0.7, 0,
                    0.5, 0.5,
                    0, 0.5,
                    0.7, 0
                ]
            )


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
        const max = Math.max(rect.width, rect.height)
        this.canvas.width = max
        this.canvas.height = max
        this.canvas.style.width = `${rect.width}px`
        this.canvas.style.height = `${rect.height}px`
        this.gl.viewport(0, 0, rect.width, rect.height);

        this.draw()
    }

    ngOnDestroy() {
        this.resizeObserver?.disconnect
        this.resizeObserver = null as any
    }

    draw() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        var primitiveType = this.gl.TRIANGLES;
        var offset = 0;
        var count = 0;
        this.gl.drawArrays(primitiveType, offset, count);
        console.log('draw')
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

export type ITriangle = {
    a: IPoint2,
    b: IPoint2,
    c: IPoint2,
}

export function validateType<T>(v: never): never {
    throw new Error()
}
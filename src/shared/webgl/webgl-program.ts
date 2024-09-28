import { FAILURE, IFailure } from "../utils";
import { IShaderType } from "./contracts";

export class WebglProgram {

    constructor(public readonly gl: WebGL2RenderingContext) {
    }

    static createProgram(gl: WebGL2RenderingContext, shaders: WebGLShader[]) {
        const program = gl.createProgram()
        if (!program) return FAILURE

        shaders.forEach((s) => gl.attachShader(program, s))
        gl.linkProgram(program);

        if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program

        console.warn(WebglProgram.getLog(gl, program));
        gl.deleteProgram(program)

        return FAILURE
    }

    /**
     * Инициализация шейдера
     * @param gl Webgl2контекст
     * @param type Тип шейдера - фрагментный/вершинный (gl.VERTEXT_SHADER | gl.FRAGMENT_SHADER)
     * @param source текст шейдерной программы
     */
    static createShader(gl: WebGL2RenderingContext, type: IShaderType, source: string, verbose?: true): WebGLShader | IFailure {
        const shader = gl.createShader(type)
        if (!shader) return FAILURE
        gl.shaderSource(shader, source);
        gl.compileShader(shader)

        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader

        verbose && console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader)

        return undefined
    }

    static getLog(gl: WebGL2RenderingContext, program: WebGLProgram) {
        return gl.getProgramInfoLog(program)
    }
}
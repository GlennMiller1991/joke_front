import { FAILURE, IFailure, IResult } from "../utils";

export type IShaderType = WebGL2RenderingContext['VERTEX_SHADER' | 'FRAGMENT_SHADER']

/**
 * Инициализация шейдера
 * @param gl Webgl2контекст
 * @param type Тип шейдера - фрагментный/вершинный (gl.VERTEXT_SHADER | gl.FRAGMENT_SHADER)
 * @param source текст шейдерной программы
 */
export function createShader(gl: WebGL2RenderingContext, type: IShaderType, source: string, verbose?: true): WebGLShader | IFailure {
    const shader = gl.createShader(type)
    if (!shader) return FAILURE
    gl.shaderSource(shader, source);
    gl.compileShader(shader)

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader

    verbose && console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader)

    return undefined
}
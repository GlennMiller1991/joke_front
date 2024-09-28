import { FAILURE, IFailure } from "../utils"

export function createProgram(gl: WebGL2RenderingContext, shaders: WebGLShader[]): WebGLProgram | IFailure {
    const program = gl.createProgram()
    if (!program) return FAILURE

    shaders.forEach((s) => gl.attachShader(program, s))
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program

    console.warn(gl.getProgramInfoLog(program));
    gl.deleteProgram(program)

    return FAILURE
}
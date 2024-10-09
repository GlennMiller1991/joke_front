#version 300 es
precision lowp float;

in vec4 a_position;
in vec3 a_color;

uniform mat4 model_matrix;

out vec3 color;

void main() {
    color = a_color;
    gl_Position = model_matrix * a_position;
}
#version 300 es
precision lowp float;

in vec4 a_position;

void main() {
    gl_Position = a_position;
}
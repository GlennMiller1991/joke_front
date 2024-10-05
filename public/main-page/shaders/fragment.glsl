#version 300 es
precision lowp float;

out vec4 outColor;
in vec3 color;

void main() {
    outColor = vec4(color, 1);
}
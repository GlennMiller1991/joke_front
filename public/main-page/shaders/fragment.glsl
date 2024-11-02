#version 300 es
precision lowp float;

out vec4 outColor;

in vec3 color;
in vec3 normal;

void main() {
    outColor = vec4(color / 255.0, 1);
}

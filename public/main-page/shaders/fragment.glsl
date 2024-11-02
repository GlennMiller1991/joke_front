#version 300 es
precision lowp float;

out vec4 outColor;

in vec4 color;
in vec4 normal;
in vec4 direct_light_position;

void main() {

    float light = dot(normal.xyz, direct_light_position.xyz);
    outColor = vec4(color.xyz / 255.0 * light, 1);
}

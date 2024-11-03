#version 300 es
precision lowp float;

out vec4 outColor;

in vec4 color;
in vec4 normal;
in vec4 direct_light_position;

void main() {

    vec3 n = normalize(normal.xyz);
    vec3 l = normalize(direct_light_position.xyz);


    float light = dot(n, l);
    outColor = vec4(color.xyz / 255.0 * light, 1);
}

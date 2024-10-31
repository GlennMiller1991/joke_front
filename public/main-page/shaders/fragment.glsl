#version 300 es
precision lowp float;

out vec4 outColor;
in vec3 color;
in float z;

void main() {
    vec3 light_position_world = vec3(10.0, 10.0, 10.0);
    vec3 Ls = vec3(1.0, 0.0, 0.0);
    vec3 Ks = vec3(.7, 0.5, 0.0);
    float specular_exponent = 100.0;
    outColor = vec4(0.5, 0.5, 0.5, 1);
}
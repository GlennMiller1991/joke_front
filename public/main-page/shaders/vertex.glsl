#version 300 es
precision lowp float;

in vec4 a_position;
in vec3 a_color;

uniform mat4 camera_matrix;
uniform mat4 projection_matrix;

out vec3 color;

void main() {
    color = a_color;
    vec4 t =  camera_matrix * a_position;
    t = projection_matrix * t;
    gl_Position =  t;
}
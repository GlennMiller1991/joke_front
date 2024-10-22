#version 300 es
precision lowp float;

in vec4 a_position;
in vec3 a_color;

uniform mat4 camera_matrix;
uniform mat4 projection_matrix;

out vec3 color;

void main() {
    color = a_color;
    gl_Position = projection_matrix * camera_matrix * a_position;
}
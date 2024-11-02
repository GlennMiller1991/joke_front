#version 300 es
precision lowp float;

in vec4 a_position;
in vec3 a_color;
in vec3 a_normal;

uniform mat4 camera_matrix;
uniform mat4 projection_matrix;
uniform mat4 copy_matrix;
uniform mat4 model_matrix;

out vec3 color;
out vec3 normal;

void main() {
    color = a_color;
    normal = a_normal;
    vec4 t =  model_matrix * a_position;
    t = camera_matrix * t;
    t = projection_matrix * t;
    t = copy_matrix * t;
    gl_Position =  t;
}
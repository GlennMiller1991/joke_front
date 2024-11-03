#version 300 es
precision lowp float;

in vec4 a_position;
in vec4 a_color;
in vec4 a_normal;

uniform mat4 camera_matrix;
uniform mat4 projection_matrix;
uniform mat4 copy_matrix;
uniform mat4 model_matrix;
uniform vec3 absolute_light_position;

out vec4 color;
out vec4 normal;
out vec4 direct_light_position;

void main() {

    mat4 total_matrix = projection_matrix * model_matrix * camera_matrix;
    vec4 t = a_position;

    normal = total_matrix * a_normal;
    direct_light_position = projection_matrix * camera_matrix * vec4(absolute_light_position, 1);
    color = a_color;
    gl_Position =  total_matrix * a_position;
}
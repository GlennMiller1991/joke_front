#version 300 es
precision lowp float;

in vec4 a_position;
in vec3 a_color;

uniform mat4 camera_matrix;
uniform mat4 projection_matrix;
uniform mat4 copy_matrix;
uniform mat4 model_matrix;

out vec3 color;
out float z;

void main() {
    color = a_color;
    vec4 t =  model_matrix * a_position;
    t = projection_matrix * t;
    t = copy_matrix * t;
    z = t.z;
    gl_Position =  t;
}
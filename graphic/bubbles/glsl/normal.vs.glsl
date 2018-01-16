// Varying Variables
varying vec3 V_Normal_VCS;
varying vec3 V_ViewPosition_VCS;

//TODO: declare texCoord, pass uv to fs
varying vec2 texCoord;

void main() {
    //TODO: uv is for texture mapping
    texCoord = uv;

	// Calculate Normal and Eye Position in View Coordinate System
	V_Normal_VCS = normalMatrix * normal;
	V_ViewPosition_VCS = vec3(modelViewMatrix * vec4(position, 1.0));
   
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
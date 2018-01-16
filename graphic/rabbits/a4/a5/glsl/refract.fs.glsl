//varying vec3 V_Normal_VCS;
varying vec3 V_Normal_WCS;
varying vec3 V_Position_WCS;


uniform samplerCube cubemapUniform;
uniform sampler2D textureUniform;
void main() {
	
	// Calculate view ray direction, reflected view ray direction, and grab appropriate texel reflected view ray points to
	// NOTE: cameraPosition is available to all fragment shaders by default, value is camera position in WCS
    float eta = 0.8;
    vec3 N = normalize(V_Normal_WCS);
	vec3 I = normalize(V_Position_WCS - cameraPosition);
	vec3 R = refract(I, normalize(V_Normal_WCS), eta);
	vec4 fragColor = textureCube(cubemapUniform, R);

    
    
//    float K =  normalize(1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I)));
//	if (K < 0.0)
//        R = normalize(genType(0.0));       // or genDType(0.0)
//    else
//        R = normalize(eta * I - (eta * dot(N, I) + sqrt(K)) * N);
    
    
    gl_FragColor = fragColor;
	// !!!!!!!!!!!!!!COMPUTE AND OVERRIDE gl_fragColor(s) FOR TOP CUBE FACE USING CORRECT UV FROM PLANET TEXTURE!!!!!!!!!!!!!!
	// NOTE: You will know you have the correct results when you see a planet on the top of your sphere


}
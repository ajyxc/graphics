//varying vec3 V_Normal_VCS;
varying vec3 V_Normal_WCS;
varying vec3 V_Position_WCS;


uniform samplerCube cubemapUniform;
uniform sampler2D textureUniform;
 float F = 0.00320398718;
void main() {
	
	// Calculate view ray direction, reflected view ray direction, and grab appropriate texel reflected view ray points to
	// NOTE: cameraPosition is available to all fragment shaders by default, value is camera position in WCS

    vec3 N = normalize(V_Normal_WCS);
	vec3 I = normalize(V_Position_WCS - cameraPosition);
	
    float ratio = F + (1.0 - F) * pow(1.0 - dot(-I, N), 2.0);
   
    vec3 Rfr =  refract(I, normalize(V_Normal_WCS), 1.14);
    vec3 Rfg =  refract(I, normalize(V_Normal_WCS), 0.12);
    vec3 Rfb =  refract(I, normalize(V_Normal_WCS), 1.10);
    
    vec3 Rr = reflect(I, normalize(V_Normal_WCS));
	
    vec4 fragColorf = textureCube(cubemapUniform, Rr);
    
    vec4 fragColorfr = textureCube(cubemapUniform, Rfr);
    vec4 fragColorfg = textureCube(cubemapUniform, Rfg);
    vec4 fragColorfb = textureCube(cubemapUniform, Rfb);
    
    
//    float K =  normalize(1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I)));
//	if (K < 0.0)
//        R = normalize(genType(0.0));       // or genDType(0.0)
//    else
//        R = normalize(eta * I - (eta * dot(N, I) + sqrt(K)) * N);
    vec4 fragColorr= vec4(fragColorfr.x, fragColorfg.y,fragColorfb.z, 1.0 );
    
//     vec3 combinedColor = mix(fragColorf, fragColorr, ratio);
//
//    gl_FragColor = vec4(combinedColor, 1.0);
//    
    
    gl_FragColor = fragColorf* 0.35 + fragColorr* 0.65;
	// !!!!!!!!!!!!!!COMPUTE AND OVERRIDE gl_fragColor(s) FOR TOP CUBE FACE USING CORRECT UV FROM PLANET; TEXTURE!!!!!!!!!!!!!!
	// NOTE: You will know you have the correct results when you see a planet on the top of your sphere


}





////varying vec3 V_Normal_VCS;
//varying vec3 V_Normal_WCS;
//varying vec3 V_Position_WCS;
//
//
//uniform samplerCube cubemapUniform;
//uniform sampler2D textureUniform;
//void main() {
//	
//    const float etaR = 1.14;
//    const float etaG = 1.12;
//    const float etaB = 1.10;
//    const float fresnelPower = 2.0;
//    const float F = ((1.0 - etaG) * (1.0 - etaG)) / ((1.0 + etaG) * (1.0 + etaG));
//
//	// Calculate view ray direction, reflected view ray direction, and grab appropriate texel reflected view ray points to
//	// NOTE: cameraPosition is available to all fragment shaders by default, value is camera position in WCS
//
//    vec3 N = normalize(V_Normal_WCS);
//	vec3 I = normalize(V_Position_WCS - cameraPosition);
//
//    float ratio = F + (1.0 - F) * pow(1.0 - dot(-I, N), fresnelPower);
//    
//    vec3 refractR =  refract(I, normalize(V_Normal_WCS), etaR);
//    vec3 refractG =  refract(I, normalize(V_Normal_WCS), etaG);
//    vec3 refractB  =  refract(I, normalize(V_Normal_WCS), etaB);
//    
//    vec3 reflectDir = reflect(I, normalize(V_Normal_WCS));
//   
//    
//    vec4 refractColor;
//    refractColor.x = textureCube(cubemapUniform, refractR).x;
//    refractColor.y  = textureCube(cubemapUniform, refractG).y;
//    refractColor.z  = textureCube(cubemapUniform, refractB).z;
//    
//    vec4 reflectColor;
//    reflectColor    = textureCube(cubemapUniform, reflectDir);
//    
//
//    vec3 combinedColor = mix(refractColor, reflectColor, ratio);
//
//    gl_FragColor = vec4(combinedColor, 1.0);
//    
//	
//
//}
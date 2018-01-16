//TODO: texture_normal is passed from a5.js, texture picture
uniform sampler2D texture_normal;
//TODO: texCoord is passed from vs, used for texture mapping
varying vec2 texCoord;

// Varying Variables
varying vec3 V_Normal_VCS;
varying vec3 V_ViewPosition_VCS;


// Uniform Variables
uniform vec3 lightColorUniform;
uniform vec3 ambientColorUniform;
uniform vec3 lightDirectionUniform;

uniform float kAmbientUniform;
uniform float kDiffuseUniform;
uniform float kSpecularUniform;

uniform float shininessUniform;

void main() {
    //TODO: calculate normal from normal picture
    vec4 texColor = texture2D(texture_normal, texCoord);
    vec3 bump_normal = (2.0*texColor-1.0).xyz;
    
    
	// Pre-Calculations: Normal Vector, Light Direction, View Direction & Halfway Vector
	vec3 N = normalize(V_Normal_VCS);
    //TODO: add normal to original normal
    N = normalize(N + bump_normal);
	vec3 L = normalize(vec3(viewMatrix * vec4(lightDirectionUniform, 0.0)));
	vec3 V = normalize(vec3(0.0) - V_ViewPosition_VCS);
	vec3 H = normalize((V + L) * 0.5);

	// Ambient Component
	vec3 light_AMB = ambientColorUniform * kAmbientUniform;

	// Diffuse Component
	vec3 diffuse = kDiffuseUniform * lightColorUniform;
	vec3 light_DFF = diffuse * max(0.0, dot(N, L));

	// Specular Component
	vec3 specular = kSpecularUniform * lightColorUniform;
	vec3 light_SPC = specular * pow(max(0.0, dot(H, N)), shininessUniform);

	// Total Lighting
	vec3 TOTAL = light_AMB + light_DFF + light_SPC;
	gl_FragColor = vec4(TOTAL, 0.0);
	}
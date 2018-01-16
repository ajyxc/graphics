/**
 * UBC CPSC 314, VJan2017
 * Assignment 5 Template
 */

var scene = new THREE.Scene();

// Setup renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

// Setup camera
var aspect = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 10000);
camera.position.set(0, 45, 150);
camera.lookAt(scene.position); 
scene.add(camera);

// Setup orbit control of camera
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

// Adapt to window resize
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

// Planet texture for manual environment mapping of top cube face
var planetTexture = new THREE.ImageUtils.loadTexture('images/planet.jpg');
var normal_map = new THREE.ImageUtils.loadTexture('images/facial.png');
// Cubemap setup:
// First, prepare paths to load 2D textures for each cube face: 
// {pos x, neg x, pos y, neg y, pos z, neg z}
var path = "cube/";
var format = '.jpeg';
var urls = [
  path + 'px' + format, path + 'nx' + format,
  path + 'py' + format, path + 'ny' + format,
  path + 'pz' + format, path + 'nz' + format
];

// Next, create cubemap with loaded textures in colour format,
// use predefined cube shader libs & pass cubemap ('texturecube')
var cubemap = THREE.ImageUtils.loadTextureCube(urls); 
cubemap.format = THREE.RGBFormat;
var shader = THREE.ShaderLib['cube'];                 
shader.uniforms['tCube'].value = cubemap;             

// Skybox setup:
// First, create shader for skybox, attach shader with loaded cubemap uniform,
// set depthwrite to false to fix z-buffer, and set images to render on inside of cube
var skyBoxMaterial = new THREE.ShaderMaterial( {
  fragmentShader: shader.fragmentShader,
  vertexShader: shader.vertexShader,
  uniforms: shader.uniforms,
  depthWrite: false,                                  
  side: THREE.BackSide                                
});

// Next, create & add new skybox to scene
var skybox = new THREE.Mesh(
  new THREE.CubeGeometry(1000, 1000, 1000),
  skyBoxMaterial
);
scene.add(skybox);

// Lighting parameters for shaders
var lightColor = new THREE.Color(1,1,1);
var ambientColor = new THREE.Color(0.4,0.4,0.4);
var lightDirection = new THREE.Vector3(-0.3,0.49,0.49);

// Material properties for shaders
var kAmbient = 0.4;
var kDiffuse = 0.8;
var kSpecular = 0.8;

var shininess = 10.0;

///////////////////////// Blinn-Phong Shader Material

var blinn_phong_material = new THREE.ShaderMaterial({
    // !!!!!!!!!!!!!!ATTACH REMAINING UNIFORMS HERE!!!!!!!!!!!!!!
    // Here we specify how three.js "binds" the shader uniform variables to Javascript values
    //    See the shader definition, glsl/blinn_phong.fs.glsl,
    //    for the 7 different uniform vars that you need to add.
    // Below we have already added one of these.
    // The relevant Javascript variables that you need to bind to are listed immediately above.

// examples:  
//    
//   myShaderVarUniform: {type: "c", value: myJavascriptVar},   // THREE.Color
//   myShaderVarUniform: {type: "f", value: myJavascriptVar},   // float
//   myShaderVarUniform: {type: "v3", value: myJavascriptVar},  // THREE.Vector3
//   myShaderVarUniform: {type: "v4", value: myJavascriptVar},  // THREE.Vector4

   uniforms: {
    lightColorUniform: {type: "c", value: lightColor},  

//  add the other six required shader-uniforms-to-Javascript bindings below

       ambientColorUniform:{ type: "c", value: ambientColor},
       lightDirectionUniform:{type: "v3", value: lightDirection},
       kAmbientUniform:{type: "f", value:  kAmbient},
       kDiffuseUniform:{type: "f", value: kDiffuse},
       kSpecularUniform:{type: "f", value: kSpecular},
       shininessUniform:{type: "f", value: shininess}
       
  },
});

/////////////////////// Phong Shader Material

var phong_material = new THREE.ShaderMaterial({
   uniforms: {
    // !!!!!!!!!!!!!!ATTACH YOUR UNIFORMS HERE!!!!!!!!!!!!!!
    // see the Blinn-Phong shader for what you will need
           lightColorUniform: {type: "c", value: lightColor},  

//  add the other six required shader-uniforms-to-Javascript bindings below

       ambientColorUniform:{ type: "c", value: ambientColor},
       lightDirectionUniform:{type: "v3", value: lightDirection},
       kAmbientUniform:{type: "f", value:  kAmbient},
       kDiffuseUniform:{type: "f", value: kDiffuse},
       kSpecularUniform:{type: "f", value: kSpecular},
       shininessUniform:{type: "f", value: shininess}
  },
});

// Cubemap texture and planet texture for custom shaders
var cubemapUniform = {type: "t", value: cubemap };
var textureUniform = {type: "t", value: planetTexture };
//var textureFacialUniform = {type: "t", value: facialTexture };

// Setup shaders and uniforms for lighting models
// Environment Map Shader Material
var reflective_material = new THREE.ShaderMaterial ({
  uniforms: {
    cubemapUniform: cubemapUniform,
    textureUniform: textureUniform,
  }
});

var refract_material = new THREE.ShaderMaterial ({
  uniforms: {
    lightDirectionUniform:{type: "v3", value: lightDirection},
    cubemapUniform: cubemapUniform,
    textureUniform: textureUniform,
      
    
      
  
//  add the other six required shader-uniforms-to-Javascript bindings below

      
  }
});

var bubble_material = new THREE.ShaderMaterial ({
  uniforms: {
   
    cubemapUniform: cubemapUniform,
    textureUniform: textureUniform,
      
    
      
  
//  add the other six required shader-uniforms-to-Javascript bindings below

      
  }
});


var normal_material = new THREE.ShaderMaterial({
     uniforms: {
          cubemapUniform: cubemapUniform,
        textureUniform: textureUniform,
          lightColorUniform: {type: "c", value: lightColor},  

//  add the other six required shader-uniforms-to-Javascript bindings below

       ambientColorUniform:{ type: "c", value: ambientColor},
       lightDirectionUniform:{type: "v3", value: lightDirection},
       kAmbientUniform:{type: "f", value:  kAmbient},
       kDiffuseUniform:{type: "f", value: kDiffuse},
       kSpecularUniform:{type: "f", value: kSpecular},
       shininessUniform:{type: "f", value: shininess},
    texture_normal: { type: "t", value: normal_map }  
  }
});
// Load shader paths
var shaderFiles = [
  'glsl/phong.vs.glsl',
  'glsl/phong.fs.glsl',
  'glsl/blinn_phong.vs.glsl',
  'glsl/blinn_phong.fs.glsl',
  'glsl/reflective.vs.glsl',
  'glsl/reflective.fs.glsl',
  'glsl/refract.vs.glsl',
  'glsl/refract.fs.glsl',
   'glsl/bubble.vs.glsl',
  'glsl/bubble.fs.glsl',
  'glsl/normal.vs.glsl',
  'glsl/normal.fs.glsl',
];

// Load & attach shaders to materials, set update flags to true
new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  phong_material.vertexShader = shaders['glsl/phong.vs.glsl'];
  phong_material.fragmentShader = shaders['glsl/phong.fs.glsl'];
  blinn_phong_material.vertexShader = shaders['glsl/blinn_phong.vs.glsl'];
  blinn_phong_material.fragmentShader = shaders['glsl/blinn_phong.fs.glsl'];
  reflective_material.vertexShader = shaders['glsl/reflective.vs.glsl'];
  reflective_material.fragmentShader = shaders['glsl/reflective.fs.glsl'];
  refract_material.vertexShader = shaders['glsl/refract.vs.glsl'];
  refract_material.fragmentShader = shaders['glsl/refract.fs.glsl'];
  bubble_material.vertexShader = shaders['glsl/bubble.vs.glsl'];
  bubble_material.fragmentShader = shaders['glsl/bubble.fs.glsl'];
  normal_material.vertexShader = shaders['glsl/normal.vs.glsl'];
  normal_material.fragmentShader = shaders['glsl/normal.fs.glsl'];

  reflective_material.needsUpdate = true;
  phong_material.needsUpdate = true;
  blinn_phong_material.needsUpdate = true;
    normal_material.needsUpdate = true; 
    refract_material.needsUpdate = true; 
     bubble_material.needsUpdate = true; 
})

// Optional: object loader for user-defined meshes
function loadOBJ(file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function() {
    console.log('Failed to load ' + file);
  };

  var loader = new THREE.OBJLoader()
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.parent = floor;
    scene.add(object);

  }, onProgress, onError);
}

// Setup, create & add spheres to scenes
var sphere = new THREE.SphereGeometry(8, 16, 16);

// Blinn-Phong lighting model sphere
var gem_blinn_phong = new THREE.Mesh(sphere, blinn_phong_material);
gem_blinn_phong.position.set(0, 0, 0);
scene.add(gem_blinn_phong);

// Phong lighting model sphere
// !!!!!!!!!!!!!!CHANGE SPHERE MATERIAL!!!!!!!!!!!!!!
var gem_phong = new THREE.Mesh(sphere, phong_material);
gem_phong.position.set(-35, 0, 0);
scene.add(gem_phong);

// Environment mapping model sphere
// !!!!!!!!!!!!!!CHANGE SPHERE MATERIAL!!!!!!!!!!!!!!
var gem_reflective = new THREE.Mesh(sphere, reflective_material);
gem_reflective.position.set(35, 0, 0);
scene.add(gem_reflective);

var gem_refract = new THREE.Mesh(sphere, refract_material);
gem_refract.position.set(-70, 0, 0);
scene.add(gem_refract);

for(var i =0 ; i<10; i++){
    var gem_bubble = new THREE.Mesh(sphere, bubble_material);
    gem_bubble.position.set(-100 + 50*i*(Math.random()-0.5), 50*i*(Math.random()-0.5), 50*i*(Math.random()-0.5));
    gem_bubble.scale.set(1.45,1.45,1.45);
    scene.add(gem_bubble);
}

var gem_normal = new THREE.Mesh(sphere, normal_material);
gem_normal.position.set(70, 0, 0);
gem_normal.rotateY(-2);
gem_normal.scale.set(1.45,1.45,1.45);
scene.add(gem_normal);

// Setup update & callback 
var keyboard = new THREEx.KeyboardState();
var render = function() {
requestAnimationFrame(render);
renderer.render(scene, camera);
}

render();

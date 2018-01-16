//////////////////////////////////////////////////////////////////
// UBC CPSC 314 (2017_W2)
// Assignment 2:  coding
/////////////////////////////////////////////////////////////////


// SETUP RENDERER AND SCENE
var scene = new THREE.Scene();
var body;
var female;
var wing1 ;

var house;

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000c00); // white background colour
document.body.appendChild(renderer.domElement);


// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000); // view angle, aspect ratio, near, far
camera.position.set(-8,3,10);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;






////////////////////////////////////////////////////////////////////////////////
//  loadOBJ( ):  loads OBJ file vertex mesh, with vertex normals
////////////////////////////////////////////////////////////////////////////////
// function loadOBJ1(objName, file, files, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
//   var onProgress = function(query) {
//     if ( query.lengthComputable ) {
//       var percentComplete = query.loaded / query.total * 100;
//       console.log( Math.round(percentComplete, 2) + '% downloaded' );
//     }
//   };
//   var onError = function() {
//     console.log('Failed to load ' + file);
//   };

//   var mtlLoader = new THREE.MaterialLoader();
//   //mtlLoader.setPath( 'assets/' );
//   mtlLoader.load( files, function( materials ){
//     materials.preload();
//
//     var loader = new THREE.OBJLoader();
//     loader.load(file, function(object) {
//       object.traverse(function(child) {
//         if (child instanceof THREE.Mesh) {
//           child.material = materials;
//         }
//       });
//       object.position.set(xOff,yOff,zOff);
//       object.rotation.x= xRot;
//       object.rotation.y = yRot;
//       object.rotation.z = zRot;
//       object.scale.set(scale,scale,scale);
//       object.name = objName;
//       scene.add(object);
//
//     }, onProgress, onError);
//
//
//   }, onProgress, onError);
//
//
// }
// var loader = new THREE.ObjectLoader();
// loader.load('scene.json'
//       function( object  ){
//         scene.add(object);
//     });

function loadOBJ(objName, file, material, xscale,yscale, zscale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );

    }
  };
  var onError = function() {
    console.log('Failed to load ' + file);
  };
  var loader = new THREE.OBJLoader();
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(xscale,yscale,zscale);
    object.position.set(xOff,yOff,zOff);
    object.name = objName;
    scene.add(object);

  }, onProgress, onError);
}
// function loadOBJ1(objName, file, material) {
//   var onProgress = function(query) {
//     if ( query.lengthComputable ) {
//       var percentComplete = query.loaded / query.total * 100;
//       console.log( Math.round(percentComplete, 2) + '% downloaded' );
//     }
//   };
//   var onError = function() {
//     console.log('Failed to load ' + file);
//   };
//   var loader = new THREE.OBJLoader();
//   loader.load(file, function(object) {
//     object.traverse(function(child) {
//       if (child instanceof THREE.Mesh) {
//         child.material = material;
//       }
//     });
//
//
//     object.name = objName;
//     scene.add(object);
//
//   }, onProgress, onError);
// }



////////////////////////////////////////////////////////////////////////////////////
//   resize( ):  adjust camera parameters if the window is resized
////////////////////////////////////////////////////////////////////////////////////

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

////////////////////////////////////////////////////////////////////////////////////
//   create the needed objects
////////////////////////////////////////////////////////////////////////////////////


// FLOOR WITH star

var starTexture = new THREE.ImageUtils.loadTexture('images/star.jpg');
starTexture.wrapS = starTexture.wrapT = THREE.RepeatWrapping;
starTexture.repeat.set(1, 1);
var starMaterial = new THREE.MeshBasicMaterial({ map: starTexture, side: THREE.DoubleSide});
var starGeometry = new THREE.PlaneBufferGeometry(20, 20);
var star = new THREE.Mesh(starGeometry, starMaterial);
star.position.y = -4;
star.rotation.x = Math.PI / 2;
scene.add(star);
  // LIGHTS:  needed for phong illumination model

var light = new THREE.PointLight(0xFFFFFF);
light.position.x=-70;
light.position.y=100;
light.position.z=70;
scene.add(light);
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

  // MATERIALS

var houseMaterial = new THREE.MeshPhongMaterial( {
     ambient: 0x402020, color: 0xffff99, specular: 0x808080, shininess: 10.0, shading: THREE.SmoothShading });
var whiteMaterial = new THREE.MeshPhongMaterial( { 
     ambient: 0x404040, color: 0xffffff, specular: 0x808080, shininess: 40.0, shading: THREE.SmoothShading });
var normalMaterial = new THREE.MeshNormalMaterial();
var lalamaterial = new THREE.MeshPhongMaterial({
  ambient: 0x402020, color: 0xeef7fa, specular: 0x808080, shininess: 40.0, shading: THREE.SmoothShading });


  // Sphere
//
// var sphereGeometry = new THREE.SphereGeometry( 1, 32, 32 );
// var whiteSphere = new THREE.Mesh( sphereGeometry, whiteMaterial );
// scene.add( whiteSphere );
// whiteSphere.position.set(3,1,0);

  // upper Leg

var legRightUpLength = 0.37;
var legRightUpAngle = 5;       // animation parameter
var legRightUpGeometry = new THREE.CylinderGeometry(0.095, 0.075, legRightUpLength, 50);
//var legRightUpGeometry = new THREE.BoxGeometry( 0.1, legRightUpLength, 0.1 );
var legRightUp = new THREE.Mesh( legRightUpGeometry, whiteMaterial );
scene.add( legRightUp );
legRightUp.matrixAutoUpdate = false;

var legLeftUpLength = 0.37;
var legLeftUpAngle = 5;       // animation parameter
var legLeftUpGeometry = new THREE.CylinderGeometry(0.095, 0.075, legLeftUpLength, 50);
//var legLeftUpGeometry = new THREE.BoxGeometry( 0.1, legLeftUpLength, 0.1 );
var legLeftUp = new THREE.Mesh( legLeftUpGeometry, whiteMaterial  );
scene.add( legLeftUp );
legLeftUp.matrixAutoUpdate = false;

var legLeftDownLength = 0.37;
var legLeftDownAngle = 25;       // animation parameter
//var legLeftDownGeometry = new THREE.BoxGeometry( 0.1, legLeftDownLength, 0.1 );
var legLeftDownGeometry = new THREE.CylinderGeometry(0.095, 0.075, legLeftDownLength, 50);
var legLeftDown = new THREE.Mesh( legLeftDownGeometry, whiteMaterial  );
scene.add( legLeftDown );
legLeftDown.matrixAutoUpdate = false;

var legRightDownLength = 0.37;
var legRightDownAngle = 25;       // animation parameter
//var legRightDownGeometry = new THREE.BoxGeometry( 0.1, legRightDownLength, 0.1 );
var legRightDownGeometry = new THREE.CylinderGeometry(0.095, 0.075, legRightDownLength, 50);
var legRightDown = new THREE.Mesh( legRightDownGeometry, whiteMaterial );
scene.add( legRightDown );
legRightDown.matrixAutoUpdate = false;



//BOTTOM Leg

var botLegRightUpLength = 0.37;
var botLegRightUpAngle = 5;       // animation parameter
//var botLegRightUpGeometry = new THREE.BoxGeometry( 0.1, botLegRightUpLength, 0.1 );
var botLegRightUpGeometry = new THREE.CylinderGeometry(0.0675, 0.0555, botLegRightUpLength, 50);
var botLegRightUp = new THREE.Mesh( botLegRightUpGeometry,whiteMaterial  );
scene.add( botLegRightUp );
botLegRightUp.matrixAutoUpdate = false;

var botLegLeftUpLength = 0.37;
var botLegLeftUpAngle = 5;       // animation parameter
//var botLegLeftUpGeometry = new THREE.BoxGeometry( 0.1, botLegLeftUpLength, 0.1 );
var botLegLeftUpGeometry = new THREE.CylinderGeometry(0.0675, 0.0555, botLegLeftUpLength, 50);
var botLegLeftUp = new THREE.Mesh( botLegLeftUpGeometry, whiteMaterial );
scene.add( botLegLeftUp );
botLegLeftUp.matrixAutoUpdate = false;

var botLegLeftDownLength = 0.37;
var botLegLeftDownAngle = -15;       // animation parameter
//var botLegLeftDownGeometry = new THREE.BoxGeometry( 0.1, botLegLeftDownLength, 0.1 );
var botLegLeftDownGeometry = new THREE.CylinderGeometry(0.0675, 0.0555, botLegLeftDownLength, 50);
var botLegLeftDown = new THREE.Mesh( botLegLeftDownGeometry,whiteMaterial  );
scene.add( botLegLeftDown );
botLegLeftDown.matrixAutoUpdate = false;

var botLegRightDownLength = 0.37;
var botLegRightDownAngle = -15;       // animation parameter
//var botLegRightDownGeometry = new THREE.BoxGeometry( 0.1, botLegRightDownLength, 0.1 );
var botLegRightDownGeometry = new THREE.CylinderGeometry(0.0675, 0.0555, botLegRightDownLength, 50);
var botLegRightDown = new THREE.Mesh( botLegRightDownGeometry,whiteMaterial );
scene.add( botLegRightDown );
botLegRightDown.matrixAutoUpdate = false;


//feet
var feetRightUpLength = 0.17;
var feetRightUpAngle = -20;       // animation parameter
//var feetRightUpGeometry = new THREE.BoxGeometry( 0.1, feetRightUpLength, 0.1 );
var feetRightUpGeometry = new THREE.CylinderGeometry(0.055, 0.045, feetRightUpLength, 50);
var feetRightUp = new THREE.Mesh( feetRightUpGeometry, whiteMaterial  );
scene.add( feetRightUp );
feetRightUp.matrixAutoUpdate = false;

var feetLeftUpLength = 0.17;
var feetLeftUpAngle = -20;       // animation parameter
//var feetLeftUpGeometry = new THREE.BoxGeometry( 0.1, feetLeftUpLength, 0.1 );
var feetLeftUpGeometry = new THREE.CylinderGeometry(0.055, 0.045, feetLeftUpLength, 50);
var feetLeftUp = new THREE.Mesh(feetLeftUpGeometry,whiteMaterial  );
scene.add( feetLeftUp );
feetLeftUp.matrixAutoUpdate = false;

var feetLeftDownLength = 0.17;
var feetLeftDownAngle = -20;       // animation parameter
//var feetLeftDownGeometry = new THREE.BoxGeometry( 0.1, feetLeftDownLength, 0.1 );
var feetLeftDownGeometry = new THREE.CylinderGeometry(0.055, 0.045, feetLeftDownLength, 50);
var feetLeftDown = new THREE.Mesh( feetLeftDownGeometry, whiteMaterial  );
scene.add( feetLeftDown );
feetLeftDown.matrixAutoUpdate = false;

var feetRightDownLength = 0.17;
var feetRightDownAngle = -20;       // animation parameter
//var feetRightDownGeometry = new THREE.BoxGeometry( 0.1, feetRightDownLength, 0.1 );
var feetRightDownGeometry = new THREE.CylinderGeometry(0.055, 0.045, feetRightDownLength, 50);
var feetRightDown = new THREE.Mesh( feetRightDownGeometry, whiteMaterial  );
scene.add( feetRightDown );
feetRightDown.matrixAutoUpdate = false;

//   // Body
// var scale1 =5;
// var scale2 =5;
// var scale3=5;
// var translationx = 0;
// var translationy = -3;
// var translationz = 0;
loadOBJ('body','horseC/horse_low_poly_torso_with_tail.obj',whiteMaterial,1,1,1,0,0,0,0,0,0);
//female
//loadOBJ1('female','assets/female.obj','assets/female.mtl',0.5,0,0,0,0,0,0);
loadOBJ('female','assets/female.obj',lalamaterial,0.7,0.6,0.6,0,-3.5,0,0,0,0);
//loadOBJ1('wing','wing/wing.obj',normalMaterial);
loadOBJ('wing1','wing/wing.obj',whiteMaterial,6.0,6.0,6.0, 0 , -1.5  , -1.2 , -100  ,0.0,0.0);

//loadOBJ('wing1','wing/wing.obj',lalamaterial,6.0,6.0,6.0, 0 , 0  , 0 ,0 ,0.0,0.0);
for(var i= 0; i<24; i++)
{
  var xp = (Math.random()-0.5)*i*1.85;
  var yp = (Math.random()-0.5)*i*1.85;
  var zp = (Math.random()-0.5)*i*1.85;
  var xr = (Math.random()-0.5)*i*1.85;
  var yr = (Math.random()-0.5)*i*1.85;
  var zr = (Math.random()-0.5)*i*1.85;
  loadOBJ('house', 'house/house.obj', houseMaterial, 0.0019, 0.0019, 0.0019, xp, yp, zp, xr, yr, zr);
}

//body to leg link
var linkradiu = 0.1;
var linkwidth = 100;
var linkheight = 30;
var linktoLeg = new THREE.SphereGeometry(linkradiu ,linkwidth, linkheight);
var linkRightUp = new THREE.Mesh(linktoLeg, whiteMaterial );
var linkRightDown = new THREE.Mesh(linktoLeg, whiteMaterial );
var linkLeftUp = new THREE.Mesh(linktoLeg, whiteMaterial );
var linkLeftDown = new THREE.Mesh(linktoLeg, whiteMaterial );
scene.add(linkRightUp);
scene.add(linkRightDown);
scene.add(linkLeftUp);
scene.add(linkLeftDown);

linkRightUp.matrixAutoUpdate = false;
linkRightDown.matrixAutoUpdate = false;
linkLeftUp.matrixAutoUpdate = false;
linkLeftDown.matrixAutoUpdate = false;

//leg to leg link
var linkradiu1 = 0.075;
var linkwidth1 = 30;
var linkheight1 = 30;
var linkLegtoLeg = new THREE.SphereGeometry(linkradiu1 ,linkwidth1, linkheight1);
var rightUplegtoleg = new THREE.Mesh(linkLegtoLeg, whiteMaterial );
var rightDownlegtoleg = new THREE.Mesh(linkLegtoLeg, whiteMaterial );
var leftUplegtoleg = new THREE.Mesh(linkLegtoLeg, whiteMaterial );
var leftDownlegtoleg = new THREE.Mesh(linkLegtoLeg, whiteMaterial );
scene.add(rightUplegtoleg);
scene.add(rightDownlegtoleg);
scene.add(leftUplegtoleg);
scene.add(leftDownlegtoleg);

rightUplegtoleg.matrixAutoUpdate = false;
rightDownlegtoleg.matrixAutoUpdate = false;
leftUplegtoleg.matrixAutoUpdate = false;
leftDownlegtoleg.matrixAutoUpdate = false;

//leg to feet link
var linkradiu2 = 0.055;
var linkwidth2 = 30;
var linkheight2 = 30;
var linkFeettoLeg = new THREE.SphereGeometry(linkradiu2 ,linkwidth2, linkheight2);
var rightUpLegtoFeet = new THREE.Mesh(linkFeettoLeg, normalMaterial);
var rightDownLegtoFeet = new THREE.Mesh(linkFeettoLeg, normalMaterial);
var leftUpLegtoFeet = new THREE.Mesh(linkFeettoLeg, normalMaterial);
var leftDownLegtoFeet = new THREE.Mesh(linkFeettoLeg, normalMaterial);
scene.add(rightUpLegtoFeet);
scene.add(rightDownLegtoFeet);
scene.add(leftUpLegtoFeet);
scene.add(leftDownLegtoFeet);

rightUpLegtoFeet.matrixAutoUpdate = false;
rightDownLegtoFeet.matrixAutoUpdate = false;
leftUpLegtoFeet.matrixAutoUpdate = false;
leftDownLegtoFeet.matrixAutoUpdate = false;

//////////////////////////////////////////////////////////////////
// printMatrix():  prints a matrix
//////////////////////////////////////////////////////////////////

function printMatrix(name,matrix) {       // matrices are stored column-major, although matrix.set() uses row-major
    console.log('Matrix ',name);
    var e = matrix.elements;
    console.log(e[0], e[4], e[8], e[12]);
    console.log(e[1], e[5], e[9], e[13]);
    console.log(e[2], e[6], e[10], e[14]);
    console.log(e[3], e[7], e[11], e[15]);
}

//////////////////////////////////////////////////////////////////
// setupBody():  build model Matrix for body, and then its children
//////////////////////////////////////////////////////////////////

var bodyHeight=0;


//set up feet
var feetRightUpYAngle = 0;
var feetRightUpZAngle = 0;
function setupRightUpFeet(parentMatrix) {
  feetRightUp.matrix.copy(parentMatrix);
  feetRightUp.matrix.multiply(new THREE.Matrix4().makeRotationY(feetRightUpYAngle*Math.PI/180.0));
  feetRightUp.matrix.multiply(new THREE.Matrix4().makeRotationZ(feetRightUpZAngle*Math.PI/180.0));
  feetRightUp.matrix.multiply(new THREE.Matrix4().makeRotationX(feetRightUpAngle*Math.PI/180.0));
  feetRightUp.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -feetRightUpLength/2 , 0));
  feetRightUp.updateMatrixWorld();
}


var feetRightDownYAngle = 0;
var feetRightDownZAngle = 0;
function setupRightDownFeet(parentMatrix) {
  feetRightDown.matrix.copy(parentMatrix);
  feetRightDown.matrix.multiply(new THREE.Matrix4().makeRotationY(feetRightDownYAngle*Math.PI/180.0));
  feetRightDown.matrix.multiply(new THREE.Matrix4().makeRotationZ(feetRightDownZAngle*Math.PI/180.0));
  feetRightDown.matrix.multiply(new THREE.Matrix4().makeRotationX(feetRightDownAngle*Math.PI/180.0));
  feetRightDown.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -feetRightDownLength/2, 0));
  feetRightDown.updateMatrixWorld();
}

var feetLeftUpYAngle = 0;
var feetLeftUpZAngle = 0;
function setupLeftUpFeet(parentMatrix) {
  feetLeftUp.matrix.copy(parentMatrix);
  feetLeftUp.matrix.multiply(new THREE.Matrix4().makeRotationY(feetLeftUpYAngle*Math.PI/180.0));
  feetLeftUp.matrix.multiply(new THREE.Matrix4().makeRotationZ(feetLeftUpZAngle*Math.PI/180.0));
  feetLeftUp.matrix.multiply(new THREE.Matrix4().makeRotationX(feetLeftUpAngle*Math.PI/180.0));
  feetLeftUp.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -feetLeftUpLength/2 , 0));
  feetLeftUp.updateMatrixWorld();
}

var feetLeftDownYAngle = 0;
var feetLeftDownZAngle = 0;
function setupLeftDownFeet(parentMatrix) {
  feetLeftDown.matrix.copy(parentMatrix);
  feetLeftDown.matrix.multiply(new THREE.Matrix4().makeRotationY(feetLeftDownYAngle*Math.PI/180.0));
  feetLeftDown.matrix.multiply(new THREE.Matrix4().makeRotationZ(feetLeftDownZAngle*Math.PI/180.0));
  feetLeftDown.matrix.multiply(new THREE.Matrix4().makeRotationX(feetLeftDownAngle*Math.PI/180.0));
  feetLeftDown.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -feetLeftDownLength/2 , 0));
  feetLeftDown.updateMatrixWorld();
}

//set up leg to feet link
function setupRightUpLegtoFeet(parentMatrix){
  rightUpLegtoFeet.matrix.copy(parentMatrix);
  rightUpLegtoFeet.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -botLegRightUpLength/2, 0));
  rightUpLegtoFeet.updateMatrixWorld();
  setupRightUpFeet(rightUpLegtoFeet.matrix);
}

function setupRightDownLegtoFeet(parentMatrix){
  rightDownLegtoFeet.matrix.copy(parentMatrix);
  rightDownLegtoFeet.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -botLegRightDownLength/2, 0));
  rightDownLegtoFeet.updateMatrixWorld();
  setupRightDownFeet(rightDownLegtoFeet.matrix);
}

function setupLeftUpLegtoFeet(parentMatrix){
  leftUpLegtoFeet.matrix.copy(parentMatrix);
  leftUpLegtoFeet.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -botLegLeftUpLength/2, 0));
  leftUpLegtoFeet.updateMatrixWorld();
  setupLeftUpFeet(leftUpLegtoFeet.matrix);
}

function setupLeftDownLegtoFeet(parentMatrix){
  leftDownLegtoFeet.matrix.copy(parentMatrix);
  leftDownLegtoFeet.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -botLegLeftDownLength/2, 0));
  leftDownLegtoFeet.updateMatrixWorld();
  setupLeftDownFeet(leftDownLegtoFeet.matrix);
}

//set up bottom leg
var botLegRightUpYAngle = 0;
var botLegRightUpZAngle = 0;
function setupbotlegRightUp(parentMatrix){
  botLegRightUp.matrix.copy(parentMatrix);
  botLegRightUp.matrix.multiply(new THREE.Matrix4().makeRotationY(botLegRightUpYAngle*Math.PI/180.0));
  botLegRightUp.matrix.multiply(new THREE.Matrix4().makeRotationZ(botLegRightUpZAngle*Math.PI/180.0));
  botLegRightUp.matrix.multiply(new THREE.Matrix4().makeRotationX(botLegRightUpAngle*Math.PI/180.0));
  botLegRightUp.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -botLegRightUpLength/2 , 0));
  botLegRightUp.updateMatrixWorld();
  setupRightUpLegtoFeet(botLegRightUp.matrix);

}

var botLegRightDownYAngle = 0;
var botLegRightDownZAngle = 0;
function setupbotlegRightDown(parentMatrix){
  botLegRightDown.matrix.copy(parentMatrix);
  botLegRightDown.matrix.multiply(new THREE.Matrix4().makeRotationY(botLegRightDownYAngle*Math.PI/180.0));
  botLegRightDown.matrix.multiply(new THREE.Matrix4().makeRotationZ(botLegRightDownZAngle*Math.PI/180.0));
  botLegRightDown.matrix.multiply(new THREE.Matrix4().makeRotationX(botLegRightDownAngle*Math.PI/180.0));
  botLegRightDown.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -botLegRightDownLength/2 , 0));
  botLegRightDown.updateMatrixWorld();
  setupRightDownLegtoFeet(botLegRightDown.matrix);
}

var botLegLeftUpYAngle = 0;
var botLegLeftUpZAngle = 0;
function setupbotlegLeftUp(parentMatrix){
  botLegLeftUp.matrix.copy(parentMatrix);
  botLegLeftUp.matrix.multiply(new THREE.Matrix4().makeRotationY(botLegLeftUpYAngle*Math.PI/180.0));
  botLegLeftUp.matrix.multiply(new THREE.Matrix4().makeRotationZ(botLegLeftUpZAngle*Math.PI/180.0));
  botLegLeftUp.matrix.multiply(new THREE.Matrix4().makeRotationX(botLegLeftUpAngle*Math.PI/180.0));
  botLegLeftUp.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -botLegLeftUpLength/2 , 0));
  botLegLeftUp.updateMatrixWorld();
  setupLeftUpLegtoFeet(botLegLeftUp.matrix);
}

var botLegLeftDownYAngle = 0;
var botLegLeftDownZAngle = 0;
function setupbotlegLeftDown(parentMatrix){
  botLegLeftDown.matrix.copy(parentMatrix);
  botLegLeftDown.matrix.multiply(new THREE.Matrix4().makeRotationY(botLegLeftDownYAngle*Math.PI/180.0));
  botLegLeftDown.matrix.multiply(new THREE.Matrix4().makeRotationZ(botLegLeftDownZAngle*Math.PI/180.0));
  botLegLeftDown.matrix.multiply(new THREE.Matrix4().makeRotationX(botLegLeftDownAngle*Math.PI/180.0));
  botLegLeftDown.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -botLegRightUpLength/2 , 0));
  botLegLeftDown.updateMatrixWorld();
  setupLeftDownLegtoFeet(botLegLeftDown.matrix);
}


//set up body to leg link

function setupLinkLeg(parentMatrix){
  linkRightUp.matrix.copy(parentMatrix);
  linkRightUp.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.175,0.9,0.4));
  linkRightUp.updateMatrixWorld();

  linkLeftUp.matrix.copy(parentMatrix);
  linkLeftUp.matrix.multiply(new THREE.Matrix4().makeTranslation(0.175, 0.9,0.4));
  linkLeftUp.updateMatrixWorld();

  linkRightDown.matrix.copy(parentMatrix);
  linkRightDown.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.175,0.9, -0.6));
  linkRightDown.updateMatrixWorld();

  linkLeftDown.matrix.copy(parentMatrix);
  linkLeftDown.matrix.multiply(new THREE.Matrix4().makeTranslation(0.175 ,0.9, -0.6));
  linkRightDown.updateMatrixWorld();

}


//set up leg to leg link
function setupLegtoLegRightUp(parentMatrix){
  rightUplegtoleg.matrix.copy(parentMatrix);
  rightUplegtoleg.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -legRightUpLength/2 , 0));
  rightUplegtoleg.updateMatrixWorld();
  setupbotlegRightUp(rightUplegtoleg.matrix);

}
function setupLegtoLegRightDown(parentMatrix){
  rightDownlegtoleg.matrix.copy(parentMatrix);
  rightDownlegtoleg.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -legRightDownLength/2 , 0));
  rightDownlegtoleg.updateMatrixWorld();
  setupbotlegRightDown(rightDownlegtoleg.matrix);
}

function setupLegtoLegLeftUp(parentMatrix){
  leftUplegtoleg.matrix.copy(parentMatrix);
  leftUplegtoleg.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -legLeftUpLength/2 , 0));
  leftUplegtoleg.updateMatrixWorld();
  setupbotlegLeftUp(leftUplegtoleg.matrix);
}

function setupLegtoLegLeftDown(parentMatrix){
  leftDownlegtoleg.matrix.copy(parentMatrix);
  leftDownlegtoleg.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -legLeftDownLength/2 , 0));
  leftDownlegtoleg.updateMatrixWorld();
  setupbotlegLeftDown(leftDownlegtoleg.matrix);
}

var bodyxposition = 0;
var bodyyposition = bodyHeight;
var bodyzposition = 0;
var bodyrotationx = -3.0;
var bodyrotationy = 0;
var bodyrotationz = 0;

//set up body
function setupBody(parentMatrix) {
//  printMatrix("body parent",parentMatrix);
  body.matrix.copy(parentMatrix);     // copy the parent link transformation
  //body.matrix.multiply(new THREE.Matrix4().makeTranslation(bodyxposition,bodyyposition,bodyzposition));        // post multiply by translate matrix
  body.matrix.multiply(new THREE.Matrix4().makeRotationY(bodyrotationy * Math.PI/180.0));
  body.matrix.multiply(new THREE.Matrix4().makeRotationX(bodyrotationx * Math.PI/180.0));      // post multiply by rotation matrix (3 deg rotation)

  body.matrix.multiply(new THREE.Matrix4().makeRotationZ(bodyrotationz * Math.PI/180.0));
  body.matrix.multiply(new THREE.Matrix4().makeTranslation(bodyxposition,bodyyposition,bodyzposition));
  setupLeg(body.matrix);           // draw children, i.e., attached objects
  setupLinkLeg(body.matrix);
  body.matrix.multiply(new THREE.Matrix4().makeScale(0.3,0.3,0.3));   // post multiply by scale matrix, to scale down body geometry
  body.updateMatrixWorld();         // force update of internal body.matrixWorld
}
//set up female
var femalexposition = 0;
var femaleyposition = 0;
var femalezposition = 0;
var femalerotationx = -3.0;
var femalerotationy = 0;
var femalerotationz = 0;
function setupFemale(parentMatrix) {
  female.matrix.copy(parentMatrix);
  female.matrix.multiply(new THREE.Matrix4().makeRotationY(femalerotationy * Math.PI/180.0));
  female.matrix.multiply(new THREE.Matrix4().makeRotationX(femalerotationx * Math.PI/180.0));      // post multiply by rotation matrix (3 deg rotation)

  female.matrix.multiply(new THREE.Matrix4().makeRotationZ(femalerotationz * Math.PI/180.0));
  female.matrix.multiply(new THREE.Matrix4().makeTranslation(femalexposition,femaleyposition,femalezposition));

  female.matrix.multiply(new THREE.Matrix4().makeScale(0.01,0.01,0.01));   // post multiply by scale matrix, to scale down body geometry
  female.updateMatrixWorld();
}



//////////////////////////////////////////////////////////////////
// setupHead():  build model Matrix for head
//////////////////////////////////////////////////////////////////

//var legRightUpAngle = -15;

//set up upper leg
var legRightUpYAngle = 0;
var legRightUpZAngle = 0;
var legLeftUpYAngle = 0;
var legLeftUpZAngle = 0;
var legLeftDownYAngle = 0;
var legLeftDownZAngle = 0;
var legRightDownYAngle = 0;
var legRightDownZAngle = 0;

function setupLeg(parentMatrix) {
//  printMatrix("legRightUp parent",parentMatrix);
  //right up leg
  legRightUp.matrix.copy(parentMatrix);     // copy the parent link transformation
  legRightUp.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.175,0.9,0.4));              // post multiply by translate matrix
  //legRightUp.matrix.multiply(new THREE.Matrix4().makeTranslation(0,10,0.5));              // post multiply by translate matrix


  legRightUp.matrix.multiply(new THREE.Matrix4().makeRotationY(legRightUpYAngle*Math.PI/180.0));
  legRightUp.matrix.multiply(new THREE.Matrix4().makeRotationZ(legRightUpZAngle*Math.PI/180.0));
  legRightUp.matrix.multiply(new THREE.Matrix4().makeRotationX(legRightUpAngle*Math.PI/180.0));           // post multiply by rotation matrix



  legRightUp.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legRightUpLength,0));              // post multiply by translate matrix
  legRightUp.updateMatrixWorld();         // force update of internal body.matrixWorld

  //left up leg
  legLeftUp.matrix.copy(parentMatrix);     // copy the parent link transformation
  legLeftUp.matrix.multiply(new THREE.Matrix4().makeTranslation(0.175, 0.9,0.4));              // post multiply by translate matrix
  //legRightUp.matrix.multiply(new THREE.Matrix4().makeTranslation(0,10,0.5));              // post multiply by translate matrix

  legLeftUp.matrix.multiply(new THREE.Matrix4().makeRotationY(legLeftUpYAngle*Math.PI/180.0));
  legLeftUp.matrix.multiply(new THREE.Matrix4().makeRotationZ(legLeftUpZAngle*Math.PI/180.0));
  legLeftUp.matrix.multiply(new THREE.Matrix4().makeRotationX(legLeftUpAngle*Math.PI/180.0));           // post multiply by rotation matrix
  legLeftUp.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legLeftUpLength,0));              // post multiply by translate matrix
  legLeftUp.updateMatrixWorld();         // force update of internal body.matrixWorld


  //left down leg
  legLeftDown.matrix.copy(parentMatrix);     // copy the parent link transformation
  legLeftDown.matrix.multiply(new THREE.Matrix4().makeTranslation(0.175 ,0.9, -0.6));              // post multiply by translate matrix
  //legRightUp.matrix.multiply(new THREE.Matrix4().makeTranslation(0,10,0.5));              // post multiply by translate matrix

  legLeftDown.matrix.multiply(new THREE.Matrix4().makeRotationY(legLeftDownYAngle*Math.PI/180.0));
  legLeftDown.matrix.multiply(new THREE.Matrix4().makeRotationZ(legLeftDownZAngle*Math.PI/180.0));
  legLeftDown.matrix.multiply(new THREE.Matrix4().makeRotationX(legLeftDownAngle*Math.PI/180.0));           // post multiply by rotation matrix
  legLeftDown.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legLeftDownLength,0));              // post multiply by translate matrix
  legLeftDown.updateMatrixWorld();         // force update of internal body.matrixWorld

  //right down leg
  legRightDown.matrix.copy(parentMatrix);     // copy the parent link transformation
  legRightDown.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.175,0.9, -0.6));              // post multiply by translate matrix

  legRightDown.matrix.multiply(new THREE.Matrix4().makeRotationY(legRightDownYAngle*Math.PI/180.0));
  legRightDown.matrix.multiply(new THREE.Matrix4().makeRotationZ(legRightDownZAngle*Math.PI/180.0));
  legRightDown.matrix.multiply(new THREE.Matrix4().makeRotationX(legRightDownAngle*Math.PI/180.0));           // post multiply by rotation matrix
  legRightDown.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*legRightDownLength,0));              // post multiply by translate matrix
  legRightDown.updateMatrixWorld();         // force update of internal body.matrixWorld

  setupLegtoLegRightUp(legRightUp.matrix);
  setupLegtoLegLeftDown(legLeftDown.matrix);
  setupLegtoLegLeftUp(legLeftUp.matrix);
  setupLegtoLegRightDown(legRightDown.matrix);

}

//////////////////////////////////////////////////////////////////
// updateWorld():  update all degrees of freedom, as needed, and recompute matrices
//////////////////////////////////////////////////////////////////

var clock = new THREE.Clock(true);

function updateWorld() {
  var modelMatrix = new THREE.Matrix4();
  modelMatrix.identity();
    // only start the matrix setup if the 'body' object has been loaded
  if (body != undefined) {   
    setupBody(modelMatrix);

  }
  if (female != undefined) {
    setupFemale(modelMatrix);
  }
}

//////////////////////////////////////////////////////////////////
//  checkKeyboard():   listen for keyboard presses
//////////////////////////////////////////////////////////////////
var t = 0;

function restartPosition(){

  //wing1.visible = true;
  //console.log('Reset');
  //setupBody(modelMatrix);
//wing1.visible = true;

   legRightUpAngle = 5;
   legRightUpZAngle = 0;
   legRightUpYAngle = 0;

   legLeftUpAngle = 5;
   legLeftUpYAngle = 0;
   legLeftUpZAngle = 0;

   legLeftDownAngle = 25;
   legLeftDownYAngle = 0;
   legLeftDownZAngle = 0;

   legRightDownAngle = 25;
   legRightDownYAngle = 0;
   legRightDownZAngle = 0;

   botLegRightUpAngle = 5;
    botLegRightUpZAngle = 0;
  botLegRightUpYAngle = 0;

   botLegLeftUpAngle = 5;
  botLegLeftUpYAngle = 0;
  botLegLeftUpZAngle = 0;

   botLegLeftDownAngle = -15;
  botLegLeftDownYAngle = 0;
  botLegLeftDownZAngle = 0;

   botLegRightDownAngle = -15;
  botLegRightDownYAngle = 0;
  botLegRightDownZAngle = 0;

   feetRightUpAngle = -20;
  feetRightUpYAngle = 0;
  feetRightUpZAngle = 0;


   feetLeftUpAngle = -20;
  feetLeftUpYAngle = 0;
  feetLeftUpZAngle = 0;

   feetLeftDownAngle = -20;
  feetLeftDownYAngle = 0;
  feetLeftDownZAngle = 0;

   feetRightDownAngle = -20;
  feetRightDownYAngle = 0;
  feetRightDownZAngle = 0;

   bodyxposition = 0; 
   bodyyposition = 0;
   bodyzposition = 0;

   bodyrotationx = 0;
   bodyrotationz = 0;
   bodyrotationy = 0;
}


var keyboard = new THREEx.KeyboardState();
var mode = 4;

var keyPressed = false;
var keyRelease = false;

var animation = false;



function checkKeyboard() {
  //record  the time
   wing1 = scene.getObjectByName("wing1");
   body = scene.getObjectByName( 'body' );

   house = scene.getObjectByName('house');

   if (body != undefined) {
     body.matrixAutoUpdate = false;
   }

  var a = false;

  for (var i=0; i<6; i++)
  {

    if (keyboard.pressed(i.toString()))
    {

      a = true;
      if (!keyPressed) {

        keyPressed = true;
        animation = !animation;
      }

      mode = i;
      //var t0 = clock.getElapsedTime();
      break;
    }
  }

  if (!a) {
    keyPressed = false;
  }

  switch(mode)
  {
    //add poses here:
    case 1:       // pose
      //headAngle = 0;
      restartPosition();
      //legRightUpYAngle = 0;
        //right up leg
      // if(animation) {



        wing1.visible = false;
        legRightUpZAngle = 90;
        legRightUpAngle = -80;
        legRightUpYAngle = -30;

        botLegRightUpZAngle = -100;
        botLegRightUpAngle = -30;
        botLegRightUpYAngle = -30;

        feetRightUpAngle = 0;
        feetRightUpZAngle = -20;
        feetRightUpYAngle = 0;

        //left up leg
        legLeftUpZAngle = 90;
        legLeftUpAngle = -80;
        legLeftUpYAngle = 30;

        botLegLeftUpZAngle = -100;
        botLegLeftUpAngle = 30;
        botLegLeftUpYAngle = 0;

        feetLeftUpAngle = 0;
        feetLeftUpZAngle = 20;
        feetLeftUpYAngle = 0;

        //right down leg
        legRightDownZAngle = -90;
        legRightDownAngle = 90;
        legRightDownYAngle = 30;


        botLegRightDownZAngle = 90;
        botLegRightDownAngle = -40;
        botLegRightDownYAngle = 40;

        feetRightDownAngle = -10;
        feetRightDownYAngle = -10;
        feetRightDownZAngle = 0;

        //left down leg
        legLeftDownZAngle = -90;
        legLeftDownAngle = 90;
        legLeftDownYAngle = -30;


        botLegLeftDownZAngle = 110;
        botLegLeftDownAngle = -40;
        botLegLeftDownYAngle = 40;

        feetLeftDownAngle = 30;
        feetLeftDownYAngle = 20;
        feetLeftDownZAngle = -20;

        bodyxposition = 0;
        bodyyposition = 1;
        bodyzposition  = 0;

        bodyrotationx = -70;
        //bodyrotationx = -90;
        bodyrotationy = -90;
        bodyrotationz = 0;
        //bodyrotationx = -270;
        //legRightUpYAngle =90;

      // }else{
      //   //restartPosition();
      //   //animation = !animation;
      // }
      break;
    case 0:       // pose
          restartPosition();
        // if(animation) {
      wing1.visible = false;
        bodyxposition = 0;
        bodyyposition = 0;
        bodyzposition = 0;


          //restartPosition();
          bodyrotationx = -40;
          bodyrotationy = 0;
          bodyrotationz = 0;

          legRightUpYAngle = 90;
          legRightUpAngle = 0;
          legRightUpZAngle = 10;

          legLeftUpYAngle = 90;
          legLeftUpZAngle = -30;
          legLeftUpAngle = 0;

          botLegRightUpZAngle = 90;
          botLegRightUpAngle = 0;
          botLegRightUpYAngle = 0;

          botLegLeftUpZAngle = 50;
          botLegLeftUpAngle = 0;
          botLegLeftUpYAngle = 0;

          feetRightUpZAngle = 50;
          feetRightUpAngle = 0;
          feetRightUpYAngle = 0;

          feetLeftUpZAngle = 50;
          feetLeftUpYAngle = 0;
          feetLeftUpAngle = 0;

          feetRightDownZAngle = 0;
          feetRightDownYAngle = 0;
          feetRightDownAngle = 0;

          feetLeftDownZAngle = 0;
          feetLeftDownYAngle = 0;
          feetLeftDownAngle = 0;


          legRightDownAngle = 90;
          legRightDownZAngle = 20;
          legRightDownYAngle = 0;

          botLegRightDownAngle = -20;
          botLegRightDownYAngle = 0;
          botLegRightDownZAngle = 0;

          botLegLeftDownAngle = -40;
          botLegLeftDownYAngle = 0;
          botLegLeftDownZAngle = 0;

          legLeftDownAngle = 60;
          legLeftDownYAngle = 0;
          legLeftDownZAngle = 0;
          // legLeftDownZAngle = 10;
        // }else{
        //   restartPosition();
        //   animation = !animation;
        // }
      break;
    case 2:       // pose
      restartPosition();
      wing1.visible = false;

      legRightUpAngle = 35;
      legRightUpZAngle = 0;
      legRightUpYAngle = 0;

      legLeftUpAngle = -55;
      legLeftUpYAngle = 0;
      legLeftUpZAngle = 0;

      legLeftDownAngle = 65;
      legLeftDownYAngle = 0;
      legLeftDownZAngle = 0;

      legRightDownAngle = 25;
      legRightDownYAngle = 0;
      legRightDownZAngle = 0;

      botLegRightUpAngle = 75;
      botLegRightUpZAngle = 0;
      botLegRightUpYAngle = 0;

      botLegLeftUpAngle = 35;
      botLegLeftUpYAngle = 0;
      botLegLeftUpZAngle = 0;

      botLegLeftDownAngle = -15;
      botLegLeftDownYAngle = 0;
      botLegLeftDownZAngle = 0;

      botLegRightDownAngle = -25;
      botLegRightDownYAngle = 0;
      botLegRightDownZAngle = 0;

      feetRightUpAngle = -20;
      feetRightUpYAngle = 0;
      feetRightUpZAngle = 0;


      feetLeftUpAngle = -20;
      feetLeftUpYAngle = 0;
      feetLeftUpZAngle = 0;

      feetLeftDownAngle = -20;
      feetLeftDownYAngle = 0;
      feetLeftDownZAngle = 0;

      feetRightDownAngle = -20;
      feetRightDownYAngle = 0;
      feetRightDownZAngle = 0;

      bodyxposition = 4;
      bodyyposition = -1;
      bodyzposition = 1;

      bodyrotationx = 180;
      bodyrotationz = 0;
      bodyrotationy = 90;
      break;
    case 3:      {     // animation

//the current time minus the time last press the key
        //restartPosition();
        //var t = clock.getElapsedTime()  ;

      //bodyyposition = 0;
       // legRightUpAngle = 30*Math.sin(6*t)-3;
        //botLegRightUpAngle = Math.abs(-35*Math.sin(5*t)+3);
        //console.log(Math.ceil(t % (2*Math.PI)));
      //if(Math.ceil(t % (2*Math.PI))==1 ||t % (2*Math.PI)==3 || t % (2*Math.PI)==5 || t % (2*Math.PI)==7) {
        //feetRightUpAngle =  Math.abs(-40 * Math.sin( 4* t) );
      //}
        //bodyHeight = 0.3*Math.sin(6*t);
        //bodyxposition = 0.3*Math.sin(6*t);
        //bodyyposition = 0.3*Math.sin(6*t);
       // bodyyposition = bodyyposition +t;
        //legLeftUpAngle = -30*Math.sin(6*t)+10;
        //botLegLeftUpAngle = Math.abs(-40*Math.sin(3*t)-10);
      //restartPosition();
      if(animation) {
        wing1.visible = false;
        t = t + 0.2;
        restartPosition();
        //t++;
        //bodyzposition = bodyzposition + t/200;
        //translationy = translationy + t/200;
        bodyrotationy = 0.8*t;
        //bodyzposition = bodyzposition+0.01;
        //bodyzposition = 5*Math.sin(0.1*t);
        //bodyxposition = 5*Math.cos(0.1*t);
        //bodyrotationx = t;


        bodyyposition = 0.08*Math.sin(1*t);

        legLeftDownAngle = -30 * Math.sin(0.5 * t) + 10;
        botLegLeftDownAngle = Math.abs(-40 * Math.sin(0.4 * t) + 10);
        feetLeftDownAngle = Math.abs(-50 * Math.sin(0.3 * t) +10);

        legRightDownAngle = 30 * Math.sin(0.5 * t) + 10;
        botLegRightDownAngle = Math.abs(-40 * Math.sin(0.4 * t) +10);
        feetRightDownAngle = Math.abs(-50 * Math.sin(0.3 * t) +10);
        if (t > 0.25) {
          legRightUpAngle = 30 * Math.sin(0.5 * t) +10
          botLegRightUpAngle = Math.abs(-35 * Math.sin(0.4 * t) + 10);
          feetRightUpAngle = Math.abs(-40 * Math.sin(0.3 * t) + 10);

          //bodyyposition = bodyyposition +t/100;
          legLeftUpAngle = -30 * Math.sin(0.5 * t) + 10;
          botLegLeftUpAngle = Math.abs(-40 * Math.sin(0.4 * t) + 10);
          feetLeftUpAngle = Math.abs(-40 * Math.sin(0.3 * t) + 10);
        }
      }else {
        restartPosition();
        animation = true;
        t=0;
        //reset
      }
      //legLeftDownAngle = -30*Math.sin(6*t)+10;
      //botLegLeftDownAngle = Math.abs(-40*Math.sin(3*t)-10);
      }
      camera.matrixAutoUpdate = true;
      break;
    case 4:
      restartPosition();
      break;
    default:
      break;

}}

//////////////////////////////////////////////////////////////////
//  update()
//////////////////////////////////////////////////////////////////

function update() {

  checkKeyboard();
  updateWorld();
  requestAnimationFrame(update);     // this requests the next update call
  renderer.render(scene, camera);
}

update();     // launch an infinite drawing loop

import { App } from './App';
import * as THREE from 'three';
console.clear();

const distortion_uniforms = {
  uDistortionX: new THREE.Uniform(new THREE.Vector2(80, 3)),
  uDistortionY: new THREE.Uniform(new THREE.Vector2(-40, 2.5)),
};

const distortion_vertex = `
#define PI 3.14159265358979
  uniform vec2 uDistortionX;
  uniform vec2 uDistortionY;

    float nsin(float val){
    return sin(val) * 0.5+0.5;
    }
  vec3 getDistortion(float progress){
        progress = clamp(progress, 0.,1.);
        float xAmp = uDistortionX.r;
        float xFreq = uDistortionX.g;
        float yAmp = uDistortionY.r;
        float yFreq = uDistortionY.g;
        return vec3( 
            xAmp * nsin(progress* PI * xFreq   - PI / 2. ) ,
            yAmp * nsin(progress * PI *yFreq - PI / 2.  ) ,
            0.
        );
    }
`;

const myCustomDistortion = {
  uniforms: distortion_uniforms,
  getDistortion: distortion_vertex,
};

const options = {
  length: 400,
  width: 20,
  roadWidth: 9,
  islandWidth: 2,
  nPairs: 50,
  roadSections: 3,
  distortion: myCustomDistortion,
};

const container = document.getElementById('container');
console.log('Container', container);
const myApp = new App(container, options);
myApp.loadAssets().then(myApp.init);

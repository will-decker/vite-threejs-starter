import * as THREE from 'three';
export class CarLights {
  constructor(webgl, options) {
    this.webgl = webgl;
    this.options = options;
  }
  init() {
    const options = this.options;
    let curve = new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1)
    );
    let baseGeometry = new THREE.TubeBufferGeometry(curve, 25, 1, 8, false);
    let instanced = new THREE.InstancedBufferGeometry().copy(baseGeometry);
    instanced.instanceCount = options.nPairs * 2;

    let aOffset = [];

    let sectionWidth = options.roadWidth / options.roadSections;

    for (let i = 0; i < options.nPairs; i++) {
      let radius = 1;
      // 1a. Get it's lane index
      // Instead of random, keep lights per lane consistent
      let section = i % 3;

      // 1b. Get its lane's centered position
      let sectionX =
        section * sectionWidth - options.roadWidth / 2 + sectionWidth / 2;
      let carWidth = 0.5 * sectionWidth;
      let offsetX = 0.5 * Math.random();

      let offsetY = radius * 1.3;

      let offsetZ = Math.random() * options.length;

      aOffset.push(sectionX - carWidth / 2 + offsetX);
      aOffset.push(offsetY);
      aOffset.push(-offsetZ);

      aOffset.push(sectionX + carWidth / 2 + offsetX);
      aOffset.push(offsetY);
      aOffset.push(-offsetZ);
    }
    // Add the offset to the instanced geometry.
    instanced.setAttribute(
      'aOffset',
      new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false)
    );

    // let material = new THREE.MeshBasicMaterial({ color: 0xfafafa });

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uColor: new THREE.Uniform(new THREE.Color(0xfafafa)),
      },
    });
    let mesh = new THREE.Mesh(instanced, material);
    mesh.frustumCulled = false;
    console.log(mesh);
    this.webgl.scene.add(mesh);
  }
}

const fragmentShader = `
uniform vec3 uColor;
  void main() {
      vec3 color = vec3(uColor);
      gl_FragColor = vec4(color,1.);
  }
`;

const vertexShader = `
attribute vec3 aOffset;
  void main() {
    vec3 transformed = position.xyz;
    


		// Keep them separated to make the next step easier!
	   transformed.z = transformed.z + aOffset.z;
        transformed.xy += aOffset.xy;
	
        vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
        gl_Position = projectionMatrix * mvPosition;
	}
`;

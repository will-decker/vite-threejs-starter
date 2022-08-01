import './styles.css';
import * as THREE from 'three';
import { BasicThreejsSetup } from './BasicThreejsSetup';

export class App extends BasicThreejsSetup {
  constructor(container) {
    super(container);
    this.camera.position.z = 50;
    // Dp stuff
  }
  loadAssets() {
    return new Promise((resolve, reject) => {
      const manager = new THREE.LoadingManager(resolve);

      manager.itemStart('test');
      manager.itemEnd('test');
    });
  }
  init() {
    const geometry = new THREE.BoxBufferGeometry(10, 10, 10);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;
    this.scene.add(mesh);

    this.tick();
  }
  update(delta) {
    this.mesh.rotateX(delta);
    this.mesh.rotateY(delta);
  }
  dispose() {}
}

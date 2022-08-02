import './styles.css';
import * as THREE from 'three';
import { BasicThreejsSetup } from './BasicThreejsSetup';
import { Road } from './Road';

export class App extends BasicThreejsSetup {
  constructor(container, options) {
    super(container);
    this.camera.position.z = -4;
    this.camera.position.y = 7;
    this.camera.position.x = 0;

    this.road = new Road(this, options);
  }
  loadAssets() {
    return new Promise((resolve, reject) => {
      const manager = new THREE.LoadingManager(resolve);

      manager.itemStart('test');
      manager.itemEnd('test');
    });
  }
  init() {
    this.road.init();
    this.tick();
  }
  update(delta) {}
  dispose() {}
}

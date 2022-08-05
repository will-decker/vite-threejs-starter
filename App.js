import './styles.css';
import * as THREE from 'three';
import { BasicThreejsSetup } from './BasicThreejsSetup';
import { Road } from './Road';
import { CarLights } from './CarLights';
export class App extends BasicThreejsSetup {
  constructor(container, options) {
    super(container);
    // this.camera.position.z = 50;
    // Dp stuff
    this.options = options;
    this.camera.position.z = -5;
    this.camera.position.y = 7;
    this.camera.position.x = 0;

    this.road = new Road(this, options);
    this.leftLights = new CarLights(this, options, 0xff102a);
    this.rightLights = new CarLights(this, options, 0xfafafa);
  }
  loadAssets() {
    return new Promise((resolve, reject) => {
      const manager = new THREE.LoadingManager(resolve);

      manager.itemStart('test');
      manager.itemEnd('test');
    });
  }
  init() {
    // this.scene.add(mesh);
    const options = this.options;
    this.road.init();
    this.leftLights.init();
    this.leftLights.mesh.position.setX(
      -options.roadWidth / 2 - options.islandWidth / 2
    );

    this.rightLights.init();
    this.rightLights.mesh.position.setX(
      options.roadWidth / 2 + options.islandWidth / 2
    );

    this.tick();
  }
  update(delta) {
    let time = this.clock.elapsedTime;
    this.leftLights.update(time);
    this.rightLights.update(time);
  }
  dispose() {}
}

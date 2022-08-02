import { App } from './App';
console.clear();

const options = {
  length: 400,
  width: 20,
  roadWidth: 9,
  islandWidth: 2,
  nPairs: 50,
  roadSections: 3,
};

const container = document.getElementById('container');
console.log('Container', container);
const myApp = new App(container, options);
myApp.loadAssets().then(myApp.init);

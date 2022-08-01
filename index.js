import { App } from './App';
console.clear();

const container = document.getElementById('container');
console.log('Container', container);
const myApp = new App(container);
myApp.loadAssets().then(myApp.init);

if (module && module.hot) {
  module.hot.dispose(() => {
    if (myApp) myApp.dispose();
  });
}

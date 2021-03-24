import modelPlayer from 'js-3d-model-viewer';
const viewerElement = document.getElementById('viewer');
const scene = modelPlayer.prepareScene(viewerElement);
modelPlayer.loadObject(scene, './assets/sample.obj');

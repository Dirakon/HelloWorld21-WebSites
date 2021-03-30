import * as THREE from './Three/three.module.js';
// Создание индикатора, которые будет в будущем использоваться как признак окончания анимации
let indicator = document.createElement('div');
indicator.className = "not_done";
document.body.appendChild(indicator);

let textMesh = undefined;
let idealRotationSpeed = 0.01;
let rotationSpeed = 0;

// Функция, ответственная за управление при помощи клавиатуры.
function handle(e) {

    // Нас не интересует событие, появляющеся при первом нажатии.
    if (!e.repeat)
        return;

    // Выбираем сторону вращения в зависимости от нажатой клавиши
    let key = e.key.toUpperCase();
    if (key === 'D'){
        rotationSpeed = idealRotationSpeed;
    }else if (key === 'A'){
        rotationSpeed = -idealRotationSpeed;
    }
}

// Создание камеры, сцена и рендерера, которые необходимы для работы three.js
let camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 50 );
camera.position.z = 8;
const scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Создаём загрузчик шрифтов и загружаем шрифт
const loader = new THREE.FontLoader();
loader.load( 'Three/helvetiker_regular.typeface.json', function ( font ) {

    // Настраиваем текст
    const geometry = new THREE.TextGeometry( 'W', {
        font: font,
        size: 8,
        height: 0.5,
        curveSegments: 4,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.05,
        bevelSegments: 3
    } );

    // Располагаем текст и создаем для него меш
    geometry.center();
    const material = new THREE.MeshNormalMaterial();
    textMesh = new THREE.Mesh( geometry, material ) ;

    // Ставим изначальное вращение
    textMesh.rotation.y = Math.PI/2;

    // Добавляем объект на сцену
    scene.add(textMesh);

    // Включаем обработку нажатий и начинаем рендерить
    onkeydown = handle;
    animate();
} );

// Повторяющаяся функция, которая отвечает за рендер сцены и вращение
function animate() {
    requestAnimationFrame( animate );

    // Вращаем один раз на каждый keypressed event.
    textMesh.rotation.y += rotationSpeed;
    rotationSpeed=0;

    // Если мы завершили вращение вправо или влево, ставим индикатору отметку "готово" и отключем возможность вращать.
    if (textMesh.rotation.y >= Math.PI || textMesh.rotation.y <= 0){
        idealRotationSpeed=0;
        indicator.className="done";
    }
    renderer.render( scene, camera );

}


// --- 1. Système de Copie ---
function copyToClipboard(text, tooltipId) {
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = document.getElementById(tooltipId);
        tooltip.classList.add('active');
        
        // Si c'est un lien (Discord/Store), on l'ouvre aussi dans un nouvel onglet après 1s
        if (text.includes('discord') || text.includes('store')) {
             setTimeout(() => {
                 window.open('https://' + text, '_blank');
             }, 800);
        }

        setTimeout(() => {
            tooltip.classList.remove('active');
        }, 2000);
    });
}

// --- 2. Animation 3D (Three.js) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Fond transparent

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Création des particules (Étincelles)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500; // Nombre d'étincelles

const posArray = new Float32Array(particlesCount * 3); // x, y, z

for(let i = 0; i < particlesCount * 3; i++) {
    // On place les particules partout aléatoirement
    posArray[i] = (Math.random() - 0.5) * 15; 
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Texture de l'étincelle (Un simple point brillant)
const material = new THREE.PointsMaterial({
    size: 0.03,
    color: 0xff4500, // Orange Magma
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending // Effet lumineux
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

camera.position.z = 3;

// Interaction Souris
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Boucle d'animation
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Rotation lente de la galaxie d'étincelles
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = mouseY * 0.5;
    particlesMesh.rotation.y += mouseX * 0.5;

    renderer.render(scene, camera);
}

animate();

// Redimensionnement propre
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

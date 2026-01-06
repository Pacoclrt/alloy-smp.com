// --- FONCTION DE COPIE & OUVERTURE ---
function copyToClipboard(text, tooltipId) {
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = document.getElementById(tooltipId);
        tooltip.classList.add('active');
        
        // Ouvre le lien si c'est Discord, Store OU le Wiki (info)
        if (text.includes('discord') || text.includes('store') || text.includes('info')) {
             setTimeout(() => {
                 // Ajoute https:// si nécessaire
                 let url = text.startsWith('http') ? text : 'https://' + text;
                 window.open(url, '_blank');
             }, 500);
        }

        setTimeout(() => {
            tooltip.classList.remove('active');
        }, 2000);
    });
}

// --- MOTEUR 3D (PARTICULES DE FORGE) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Création des particules
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15; // Dispersion large
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Texture de l'étincelle
const material = new THREE.PointsMaterial({
    size: 0.03,
    color: 0xff4500, // Orange Magma
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
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

// Animation
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Mouvement de la spirale d'étincelles
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = mouseY * 0.3;
    particlesMesh.rotation.y += mouseX * 0.3;

    renderer.render(scene, camera);
}

animate();

// Redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

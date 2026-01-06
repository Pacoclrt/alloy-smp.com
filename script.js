// --- 1. Copier l'IP ---
function copyIP() {
    const ip = document.getElementById("ip-text").innerText;
    navigator.clipboard.writeText(ip).then(() => {
        const tooltip = document.getElementById("copy-tooltip");
        tooltip.innerText = "IP Copiée !";
        tooltip.classList.add("active");
        
        setTimeout(() => {
            tooltip.classList.remove("active");
            setTimeout(() => tooltip.innerText = "Cliquez pour copier !", 300);
        }, 2000);
    });
}

// --- 2. Joueurs en ligne (API mcstatus) ---
fetch('https://api.mcstatus.io/v2/status/java/play.alloy-smp.fr')
    .then(response => response.json())
    .then(data => {
        const countElement = document.getElementById("player-count");
        if (data.online) {
            countElement.innerText = data.players.online;
            document.querySelector('.dot').style.background = '#44b700'; // Vert
        } else {
            countElement.innerText = "Hors ligne";
            document.querySelector('.dot').style.background = '#d32f2f'; // Rouge
        }
    })
    .catch(err => {
        console.error("Erreur API:", err);
        document.getElementById("player-count").innerText = "-";
    });

// --- 3. Animation de Particules (Étincelles de Forge) ---
const canvas = document.getElementById("ember-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const embers = [];

class Ember {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1 + 0.5;
        this.color = `rgba(255, ${69 + Math.random() * 100}, 0, ${Math.random() * 0.5 + 0.2})`;
    }

    update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y * 0.01) * 0.5; // Effet de flottement
        
        if (this.size > 0.1) this.size -= 0.01;

        if (this.y < 0 || this.size <= 0.1) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Créer 100 étincelles
for (let i = 0; i < 100; i++) {
    embers.push(new Ember());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    embers.forEach(ember => {
        ember.update();
        ember.draw();
    });
    requestAnimationFrame(animate);
}

// Redimensionner le canvas si la fenêtre change
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();

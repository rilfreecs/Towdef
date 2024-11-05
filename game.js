const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variabel untuk menara dan musuh
const towers = [];
const enemies = [];

// Fungsi untuk menggambar menara
function drawTower(x, y) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, 50, 50);
}

// Fungsi untuk menggambar musuh
function drawEnemy(x, y) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
}

// Loop game
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Gambar menara dan musuh
    towers.forEach(tower => drawTower(tower.x, tower.y));
    enemies.forEach(enemy => drawEnemy(enemy.x, enemy.y));
    requestAnimationFrame(gameLoop);
}

// Tambah menara dan musuh untuk percobaan
towers.push({ x: 100, y: 100 });
enemies.push({ x: 200, y: 50 });
gameLoop();

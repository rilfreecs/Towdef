const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0,
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let towers = [];
let enemies = [];
let bullets = [];
let enemySpawnTime = 2000; // Waktu spwan musuh dalam milidetik
let score = 0; // Skor pemain
const scoreText = document.getElementById('score');

function preload() {
    // Load assets di sini (jika ada gambar menara atau musuh)
}

function create() {
    this.input.on('pointerdown', placeTower, this); // Tempatkan menara saat klik
    this.time.addEvent({ delay: enemySpawnTime, callback: addEnemy, callbackScope: this, loop: true }); // Tambahkan musuh secara berkala
}

function update() {
    // Update logika game
    updateEnemies();
    updateBullets();
    checkCollisions();
}

function placeTower(pointer) {
    const tower = this.add.rectangle(pointer.x, pointer.y, 50, 50, 0x00ff00); // Menara hijau
    towers.push(tower);
}

function addEnemy() {
    const enemyType = Math.random() < 0.5 ? 'normal' : 'fast'; // 50% chance untuk jenis musuh
    const enemy = createEnemy(enemyType);
    enemies.push(enemy);
}

function createEnemy(type) {
    const enemy = type === 'normal' 
        ? this.add.circle(Math.random() * this.cameras.main.width, 0, 15, 0xff0000) // Musuh normal
        : this.add.circle(Math.random() * this.cameras.main.width, 0, 10, 0x0000ff); // Musuh cepat
    enemy.speed = type === 'normal' ? 100 : 200; // Kecepatan musuh
    return enemy;
}

function updateEnemies() {
    enemies.forEach(enemy => {
        enemy.y += enemy.speed * (1 / 60); // Pergerakan musuh
        if (enemy.y > this.cameras.main.height) {
            enemy.destroy(); // Hapus musuh jika keluar dari layar
            enemies.splice(enemies.indexOf(enemy), 1); // Hapus dari array
        }
    });
}

function updateBullets() {
    bullets.forEach(bullet => {
        bullet.y -= 300 * (1 / 60); // Pergerakan peluru
        if (bullet.y < 0) {
            bullet.destroy(); // Hapus peluru jika keluar dari layar
            bullets.splice(bullets.indexOf(bullet), 1); // Hapus dari array
        }
    });
}

function shootBullets() {
    towers.forEach(tower => {
        const bullet = this.add.rectangle(tower.x + 25, tower.y, 5, 10, 0x0000ff); // Peluru
        bullets.push(bullet);
    });
}

function checkCollisions() {
    bullets.forEach(bullet => {
        enemies.forEach(enemy => {
            if (Phaser.Geom.Intersects.CircleToRectangle(enemy.getBounds(), bullet.getBounds())) {
                bullet.destroy(); // Hapus peluru
                enemy.destroy(); // Hapus musuh
                bullets.splice(bullets.indexOf(bullet), 1); // Hapus dari array
                enemies.splice(enemies.indexOf(enemy), 1); // Hapus dari array
                score += 10; // Tambah skor
                scoreText.innerHTML = `Score: ${score}`; // Update tampilan skor
            }
        });
    });
}

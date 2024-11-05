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
let enemySpeed = 100; // Kecepatan musuh

function preload() {
    // Load assets di sini jika diperlukan
}

function create() {
    this.input.on('pointerdown', placeTower, this); // Tempatkan menara saat klik
    this.time.addEvent({ delay: enemySpawnTime, callback: addEnemy, callbackScope: this, loop: true }); // Tambahkan musuh secara berkala
    this.time.addEvent({ delay: 1000, callback: shootBullets, callbackScope: this, loop: true }); // Menembakkan peluru secara berkala
}

function update() {
    // Update logika game, gerakan musuh, menara, dll.
    enemies.forEach(enemy => {
        enemy.y += enemySpeed * (1 / 60); // Pergerakan musuh
        if (enemy.y > this.cameras.main.height) {
            enemy.destroy(); // Hapus musuh jika keluar dari layar
        }
    });

    bullets.forEach(bullet => {
        bullet.y -= 300 * (1 / 60); // Pergerakan peluru ke atas
        if (bullet.y < 0) {
            bullet.destroy(); // Hapus peluru jika keluar dari layar
        }
    });

    // Deteksi tabrakan antara peluru dan musuh
    bullets.forEach(bullet => {
        enemies.forEach(enemy => {
            if (Phaser.Geom.Intersects.CircleToRectangle(enemy.getBounds(), bullet.getBounds())) {
                bullet.destroy(); // Hapus peluru saat mengenai musuh
                enemy.destroy(); // Hapus musuh saat terkena peluru
            }
        });
    });
}

function placeTower(pointer) {
    const tower = this.add.rectangle(pointer.x, pointer.y, 50, 50, 0x00ff00); // Menggambar menara
    towers.push(tower);
}

function addEnemy() {
    const enemy = this.add.circle(Math.random() * this.cameras.main.width, 0, 15, 0xff0000); // Menggambar musuh
    enemies.push(enemy);
}

function shootBullets() {
    towers.forEach(tower => {
        const bullet = this.add.rectangle(tower.x + 25, tower.y, 5, 10, 0x0000ff); // Menggambar peluru
        bullets.push(bullet);
    });
}

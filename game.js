const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

// Variabel untuk menyimpan tower dan musuh
const towers = [];
const enemies = [];

// Fungsi untuk menambahkan menara
function addTower(x, y) {
    const tower = new PIXI.Graphics();
    tower.beginFill(0x00ff00);
    tower.drawRect(x, y, 50, 50);
    tower.endFill();
    app.stage.addChild(tower);
    towers.push(tower);
}

// Fungsi untuk menambahkan musuh
function addEnemy() {
    const enemy = new PIXI.Graphics();
    enemy.beginFill(0xff0000);
    enemy.drawCircle(0, 0, 25);
    enemy.endFill();
    enemy.x = Math.random() * app.screen.width;
    enemy.y = 0; // Mulai dari atas
    app.stage.addChild(enemy);
    enemies.push(enemy);
}

// Loop game
app.ticker.add(() => {
    enemies.forEach(enemy => {
        enemy.y += 2; // Gerak ke bawah
        if (enemy.y > app.screen.height) {
            enemy.y = 0; // Reset ke atas
            enemy.x = Math.random() * app.screen.width;
        }
    });
});

// Tambahkan event listener untuk menempatkan menara
app.view.addEventListener('click', (event) => {
    const x = event.clientX - app.view.offsetLeft;
    const y = event.clientY - app.view.offsetTop;
    addTower(x, y);
});

// Tambahkan musuh setiap beberapa detik
setInterval(addEnemy, 1000);

// Kelas Menara
class Tower {
    constructor(x, y, type) {
        this.graphics = new PIXI.Graphics();
        this.type = type;
        this.setupTower(x, y);
    }

    setupTower(x, y) {
        if (this.type === 'basic') {
            this.graphics.beginFill(0x00ff00);
            this.graphics.drawRect(x, y, 50, 50);
            this.graphics.endFill();
            this.damage = 10;
            this.range = 100;
            this.fireRate = 1000; // dalam milidetik
        } else if (this.type === 'fast') {
            this.graphics.beginFill(0x0000ff);
            this.graphics.drawRect(x, y, 50, 50);
            this.graphics.endFill();
            this.damage = 5;
            this.range = 75;
            this.fireRate = 500;
        } else if (this.type === 'strong') {
            this.graphics.beginFill(0xff00ff);
            this.graphics.drawRect(x, y, 50, 50);
            this.graphics.endFill();
            this.damage = 20;
            this.range = 125;
            this.fireRate = 2000;
        }
        app.stage.addChild(this.graphics);
    }
}

// Fungsi untuk menambahkan menara
function addTower(x, y) {
    const towerType = Math.random() < 0.5 ? 'basic' : (Math.random() < 0.5 ? 'fast' : 'strong');
    const tower = new Tower(x, y, towerType);
    towers.push(tower);
}

// Kelas Musuh
class Enemy {
    constructor() {
        this.graphics = new PIXI.Graphics();
        this.setupEnemy();
    }

    setupEnemy() {
        const enemyType = Math.random();
        if (enemyType < 0.5) { // Musuh tipe lambat
            this.graphics.beginFill(0xff0000);
            this.graphics.drawCircle(0, 0, 20);
            this.graphics.endFill();
            this.health = 50;
            this.speed = 1;
        } else { // Musuh tipe cepat
            this.graphics.beginFill(0xffff00);
            this.graphics.drawCircle(0, 0, 15);
            this.graphics.endFill();
            this.health = 30;
            this.speed = 2;
        }
        this.graphics.x = Math.random() * app.screen.width;
        this.graphics.y = 0; // Mulai dari atas
        app.stage.addChild(this.graphics);
        enemies.push(this);
    }
}

// Fungsi untuk menambahkan musuh
function addEnemy() {
    new Enemy();
}

// Menambahkan animasi pada menara
function animateTower(tower) {
    tower.graphics.rotation += 0.1; // Menambahkan rotasi
}

// Mengupdate loop game
app.ticker.add(() => {
    enemies.forEach(enemy => {
        enemy.graphics.y += enemy.speed; // Gerak ke bawah
        if (enemy.graphics.y > app.screen.height) {
            enemy.graphics.y = 0; // Reset ke atas
            enemy.graphics.x = Math.random() * app.screen.width;
        }
    });

    towers.forEach(tower => {
        animateTower(tower);
    });
});
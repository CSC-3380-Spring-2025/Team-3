// Interface for Game Objects
interface GameObject {
    update(deltaTime: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
  }
  
  // Movement based on keyboard input
  class Player implements GameObject {
    x: number;
    y: number;
    width: number = 40;
    height: number = 40;
    speed: number = 200; // pixels per second
    dx: number = 0;
    dy: number = 0;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  
    update(deltaTime: number): void {
      this.x += this.dx * this.speed * deltaTime;
      this.y += this.dy * this.speed * deltaTime;
      // Bounds of game
      this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = "#0F0";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  // Enemy class 
  class Enemy implements GameObject {
    x: number;
    y: number;
    width: number = 30;
    height: number = 30;
    speed: number = 100; // pixels per second
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  
    update(deltaTime: number): void {
      this.y += this.speed * deltaTime;
      // Reset enemy to top once it leaves the canvas
      if (this.y > canvas.height) {
        this.y = -this.height;
        this.x = Math.random() * (canvas.width - this.width);
      }
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = "#F00";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  // Bullet class that can be used by player
  class Bullet implements GameObject {
    x: number;
    y: number;
    width: number = 5;
    height: number = 10;
    speed: number = 300;
    active: boolean = true;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  
    update(deltaTime: number): void {
      this.y -= this.speed * deltaTime;
      if (this.y < -this.height) {
        this.active = false;
      }
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = "#FF0";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  // Main Game class
  class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    lastTime: number = 0;
    player: Player;
    enemies: Enemy[] = [];
    bullets: Bullet[] = [];
    keys: { [key: string]: boolean } = {};
    lastBulletTime: number = 0;
  
    constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d")!;
      this.player = new Player(canvas.width / 2 - 20, canvas.height - 60);
  
      // Create several enemies at random positions
      for (let i = 0; i < 5; i++) {
        this.enemies.push(new Enemy(Math.random() * (canvas.width - 30), Math.random() * -canvas.height));
      }
  
      this.setupInput();
    }
  
    setupInput(): void {
      window.addEventListener("keydown", (e) => {
        this.keys[e.key] = true;
      });
      window.addEventListener("keyup", (e) => {
        this.keys[e.key] = false;
      });
    }
  
    update(deltaTime: number): void {
      // Reset player's movement and update based on keys
      this.player.dx = 0;
      this.player.dy = 0;
      if (this.keys["ArrowLeft"] || this.keys["a"]) this.player.dx = -1;
      if (this.keys["ArrowRight"] || this.keys["d"]) this.player.dx = 1;
      if (this.keys["ArrowUp"] || this.keys["w"]) this.player.dy = -1;
      if (this.keys["ArrowDown"] || this.keys["s"]) this.player.dy = 1;
  
      // Fire a bullet when space is pressed (with a cooldown)
      if (this.keys[" "]) {
        if (!this.lastBulletTime || performance.now() - this.lastBulletTime > 250) {
          this.bullets.push(new Bullet(this.player.x + this.player.width / 2 - 2.5, this.player.y));
          this.lastBulletTime = performance.now();
        }
      }
  
      // Update game objects
      this.player.update(deltaTime);
      this.enemies.forEach(enemy => enemy.update(deltaTime));
      this.bullets.forEach(bullet => bullet.update(deltaTime));
  
      // Remove bullets that are no longer active
      this.bullets = this.bullets.filter(bullet => bullet.active);
  
      // Check for collisions between bullets and enemies
      this.bullets.forEach(bullet => {
        this.enemies.forEach(enemy => {
          if (this.rectIntersect(bullet, enemy)) {
            bullet.active = false;
            // Reset enemy position after hit
            enemy.y = -enemy.height;
            enemy.x = Math.random() * (this.canvas.width - enemy.width);
          }
        });
      });
    }
  
    rectIntersect(a: { x: number; y: number; width: number; height: number },
                  b: { x: number; y: number; width: number; height: number }): boolean {
      return a.x < b.x + b.width && a.x + a.width > b.x &&
             a.y < b.y + b.height && a.y + a.height > b.y;
    }
  
    draw(): void {
      // Clear canvas
      this.ctx.fillStyle = "#000";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
      // Draw all objects
      this.player.draw(this.ctx);
      this.enemies.forEach(enemy => enemy.draw(this.ctx));
      this.bullets.forEach(bullet => bullet.draw(this.ctx));
    }
  
    // The main game loop using requestAnimationFrame
    gameLoop = (time: number) => {
      let deltaTime = (time - this.lastTime) / 1000;
      this.lastTime = time;
  
      this.update(deltaTime);
      this.draw();
  
      requestAnimationFrame(this.gameLoop);
    };
  
    start(): void {
      this.lastTime = performance.now();
      requestAnimationFrame(this.gameLoop);
    }
  }
  
  // Global canvas variable for use in game objects
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  canvas.width = 800;
  canvas.height = 600;
  
  // Start the game once the window loads
  window.onload = () => {
    const game = new Game(canvas);
    game.start();
  };
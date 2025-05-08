'use client';
import React, { useEffect, useRef} from "react";


const GameCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
    useEffect(() => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 600;
  
      class Player implements GameObject {
        x: number;
        y: number;
        width = 40;
        height = 40;
        speed = 200;
        dx = 0;
        dy = 0;
  
        constructor(x: number, y: number) {
          this.x = x;
          this.y = y;
        }
  
        update(deltaTime: number): void {
          this.x += this.dx * this.speed * deltaTime;
          this.y += this.dy * this.speed * deltaTime;
          this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
          this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
        }
  
        draw(ctx: CanvasRenderingContext2D): void {
          ctx.fillStyle = '#0F0';
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
      }
  
      class Enemy implements GameObject {
        x: number;
        y: number;
        width = 30;
        height = 30;
        speed = 100;
  
        constructor(x: number, y: number) {
          this.x = x;
          this.y = y;
        }
  
        update(deltaTime: number): void {
          this.y += this.speed * deltaTime;
          if (this.y > canvas.height) {
            this.y = -this.height;
            this.x = Math.random() * (canvas.width - this.width);
          }
        }
  
        draw(ctx: CanvasRenderingContext2D): void {
          ctx.fillStyle = '#F00';
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
      }
  
      class Bullet implements GameObject {
        x: number;
        y: number;
        width = 5;
        height = 10;
        speed = 300;
        active = true;
  
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
          ctx.fillStyle = '#FF0';
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
      }
  
      class Game {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        lastTime = 0;
        player: Player;
        enemies: Enemy[] = [];
        bullets: Bullet[] = [];
        keys: { [key: string]: boolean } = {};
        lastBulletTime = 0;
  
        constructor(canvas: HTMLCanvasElement) {
          this.canvas = canvas;
          this.ctx = canvas.getContext('2d')!;
          this.player = new Player(canvas.width / 2 - 20, canvas.height - 60);
          for (let i = 0; i < 5; i++) {
            this.enemies.push(new Enemy(Math.random() * (canvas.width - 30), Math.random() * -canvas.height));
          }
          this.setupInput();
        }
  
        setupInput(): void {
          window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
          });
          window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
          });
        }
  
        update(deltaTime: number): void {
          this.player.dx = this.player.dy = 0;
          if (this.keys['ArrowLeft'] || this.keys['a']) this.player.dx = -1;
          if (this.keys['ArrowRight'] || this.keys['d']) this.player.dx = 1;
          if (this.keys['ArrowUp'] || this.keys['w']) this.player.dy = -1;
          if (this.keys['ArrowDown'] || this.keys['s']) this.player.dy = 1;
  
          if (this.keys[' ']) {
            if (!this.lastBulletTime || performance.now() - this.lastBulletTime > 250) {
              this.bullets.push(new Bullet(this.player.x + this.player.width / 2 - 2.5, this.player.y));
              this.lastBulletTime = performance.now();
            }
          }
  
          this.player.update(deltaTime);
          this.enemies.forEach((e) => e.update(deltaTime));
          this.bullets.forEach((b) => b.update(deltaTime));
          this.bullets = this.bullets.filter((b) => b.active);
  
          this.bullets.forEach((bullet) => {
            this.enemies.forEach((enemy) => {
              if (this.rectIntersect(bullet, enemy)) {
                bullet.active = false;
                enemy.y = -enemy.height;
                enemy.x = Math.random() * (this.canvas.width - enemy.width);
              }
            });
          });
        }
  
        rectIntersect(a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }): boolean {
          return a.x < b.x + b.width && a.x + a.width > b.x &&
                 a.y < b.y + b.height && a.y + a.height > b.y;
        }
  
        draw(): void {
          this.ctx.fillStyle = '#000';
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          this.player.draw(this.ctx);
          this.enemies.forEach((e) => e.draw(this.ctx));
          this.bullets.forEach((b) => b.draw(this.ctx));
        }
  
        gameLoop = (time: number) => {
          const deltaTime = (time - this.lastTime) / 1000;
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
  
      const game = new Game(canvas);
      game.start();
    }, []);
  
    return <canvas ref={canvasRef} style={{ border: '1px solid white' }} />;
  };
  
  export default GameCanvas;

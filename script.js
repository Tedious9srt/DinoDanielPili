window.addEventListener("load", function() {
  let mCanvas = document.getElementById("mCanvas");
  const ctx = mCanvas.getContext("2d");
  mCanvas.width = 1000;
  mCanvas.height = 550;
  
  mCanvas.addEventListener("click", () => {
    game.jump();
  });
  
  class Kisses {
    constructor(game) {
      this.game = game
      this.sprite = new Image();
      this.sprite.src = "kisses.png";
      this.x = 700;
      this.y = 300;
      this.w = 150;
      this.h = 150;
      this.fy = 0;
      this.fx = 0;
      this.fw = 1000;
      this.fh = 1000;
      this.fts = 0;
      this.ftm = 9;
    }
    update() {
      this.fts++;
      if (this.fts >= this.ftm) {
        this.fts = 0;
        this.fx = this.fx + this.fw;
      }
      if (this.fx > this.fw) {
        this.fx = 0;
      }
    }
    draw(ctx) {
      ctx.drawImage(this.sprite, this.fx, this.fy, this.fw, this.fh, this.x, this.y, this.w, this.h);
    }
  }
  
  class Phone {
    constructor(game, y, x) {
      this.game = game
      this.game = game;
      this.sprite = new Image();
      this.sprite.src = "phone.png";
      this.x = x;
      this.y = y;
      this.w = 75;
      this.h = 100;
      this.cd = 0;
      this.cdm = 10;
      this.speed = 6;
    }
    draw(ctx) {
      if (this.x != 0) {
        ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
        this.x -= this.speed;
      };
    }
    update() {
      this.speed += 0.01;
      if (this.x <= 0) {
        this.x = 1000;
      }
    }
  }
  
  class Dino {
    constructor(game) {
      this.game = game;
      this.sprite = new Image();
      this.sprite.src = "player.png";
      this.x = 200;
      this.y = 300;
      this.w = 150;
      this.h = 150;
      this.fy = 0;
      this.fx = 0;
      this.fw = 1024;
      this.fh = 1024;
      this.fts = 0;
      this.ftm = 9;
      this.jumping = false;
      this.score = 0;
      this.jumpdur = 5;
    }
    update() {
      this.fts++;
      this.jumpdur += 0.01;
      if (this.fts >= this.ftm) {
        this.fts = 0;
        this.fx = this.fx + this.fw;
        this.score += 1;
      }
      if (this.fx > this.fw) {
        this.fx = 0;
      }
      if (this.jumping == true) {
        this.y -= this.jumpdur;
      } else if (this.jumping == false) {
          this.y += (this.jumpdur - (this.jumpdur / 4));
      }
      if (this.y >= 300) {
        this.y = 300
      }
      if (this.y <= 75) {
        this.jumping = false;
      }
    }
    draw(ctx) {
      ctx.font = "40px Arial";
      ctx.fillText("Score: " + this.score, 50, 50);
      ctx.fillText("Made by TDSSRT(ARNEL)", 540, 32);
      ctx.drawImage(this.sprite, this.fx, this.fy, this.fw, this.fh, this.x, this.y, this.w, this.h);
    }
    jump() {
      this.jumping = true;
    }
  }
  
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.dino = new Dino(this);
      this.phone = new Phone(this, 375, 1000);
      this.kisses = new Kisses(this, 300);
      this.phone1 = new Phone(this, 100, 1500);
    }
    update() {
      this.dino.update();
      this.phone.update();
      this.kisses.update();
      this.phone1.update();
      if ( this.dino.x < this.phone.x + this.phone.w && this.dino.x + this.dino.w > this.phone.x && this.dino.y < this.phone.y + this.phone.h && this.dino.y + this.dino.h > this.phone.y) {
          location.reload();
      }
      if (this.dino.x < this.phone1.x + this.phone1.w && this.dino.x + this.dino.w > this.phone1.x && this.dino.y < this.phone1.y + this.phone1.h && this.dino.y + this.dino.h > this.phone1.y) {
        location.reload();
      }
    }
    draw(ctx) {
      this.dino.draw(ctx);
      this.kisses.draw(ctx);
      this.phone.draw(ctx);
      this.phone1.draw(ctx);
    }
    jump() {
      this.dino.jump();
    }
  }
  
  const game = new Game(mCanvas.width, mCanvas.height);
  
  function Gameloop() {
    ctx.clearRect(0, 0, game.width, game.height);
    game.draw(ctx);
    game.update();
    requestAnimationFrame(Gameloop);
  }
  Gameloop();
});
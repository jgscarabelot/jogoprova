const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');

let pontuacao = 0;

const teclasPressionadas = {
   KeyW: false,
   KeyS: false,
   KeyD: false,
   KeyA: false
};

document.addEventListener('keydown', (e) => {
   for (let tecla in teclasPressionadas) {
       teclasPressionadas[tecla] = false;
   }
   if (teclasPressionadas.hasOwnProperty(e.code)) {
       teclasPressionadas[e.code] = true;
   }
});

class Entidade {
   constructor(x, y, largura, altura) {
       this.x = x;
       this.y = y;
       this.largura = largura;
       this.altura = altura;
   }
   desenhar() {
       ctx.fillStyle = 'black';
       ctx.fillRect(this.x, this.y, this.largura, this.altura);
   }
}

class Cobra extends Entidade {
   constructor(x, y, largura, altura) {
       super(x, y, largura, altura);
       this.imagem = new Image();
       this.imagem.src = 'cobra.png'; 
   }
   atualizar() {
       if (teclasPressionadas.KeyW) {
           this.y -= 7;
       } else if (teclasPressionadas.KeyS) {
           this.y += 7;
       } else if (teclasPressionadas.KeyA) {
           this.x -= 7;
       } else if (teclasPressionadas.KeyD) {
           this.x += 7;
       }

       this.verificarColisaoBorda();
   }

   verificarColisaoBorda() {
       if (this.x < 0 || this.x + this.largura > canvas.width ||
           this.y < 0 || this.y + this.altura > canvas.height) {
           alert("Perdeu! Pontuação: " + pontuacao);
           location.reload(); 
       }
   }

   verificarColisao(comida) {
       if (
           this.x < comida.x + comida.largura &&
           this.x + this.largura > comida.x &&
           this.y < comida.y + comida.altura &&
           this.y + this.altura > comida.y
       ) {
           this.#houveColisao(comida);
       }
   }

   #houveColisao(comida) {
       comida.x = Math.random() * (canvas.width - comida.largura);
       comida.y = Math.random() * (canvas.height - comida.altura);
       pontuacao += 1; 
   }
   
   desenhar() {
       ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
   }
}

class Comida extends Entidade {
   constructor() {
       super(Math.random() * (canvas.width - 45), Math.random() * (canvas.height - 45), 45, 45);
       this.imagem = new Image();
       this.imagem.src = 'fruta.png'; 
   }
   desenhar() {
       ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
   }
}

function desenharPontuacao() {
   ctx.fillStyle = 'black';
   ctx.font = '20px Arial';
   ctx.fillText('Pontuação: ' + pontuacao, 10, 20);
}

const cobra = new Cobra(100, 200, 50, 50);
const comida = new Comida();

function loop() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   cobra.desenhar();
   cobra.atualizar();
   comida.desenhar();
   cobra.verificarColisao(comida);
   desenharPontuacao();
   requestAnimationFrame(loop);
}
loop();
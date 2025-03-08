import config from "../main.js"; // importa as configurações definidas na main

export class HappyScene extends Phaser.Scene { // cria uma cena chamada EndScene

    alturaJogo = config.height; // define a altura do jogo
    larguraJogo = config.width; // define a largura do jogo

    constructor() {
        super("HappyScene"); // registra o nome da cena
    }


    preload() {
        this.load.image("happybg", "./assets/ohana.jpg") // carrega o fundo da cena
    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "happybg");
        this.botao = this.add.image(this.larguraJogo/1.15, 550, "prosseguir").setScale(0.4).setInteractive()
        this.botao.on("pointerover", () => {
            this.input.setDefaultCursor("pointer"); // quando o mouse passa sobre a imagem, o cursor muda para mãozinha clicável
        });
        
        this.botao.on("pointerout", () => {
            this.input.setDefaultCursor("default"); // quando o mouse sai da imagem, o cursor volta ao normal
        });

        this.botao.on("pointerdown", () => {
            this.scene.start("WelcomeScene"); // quando se clica na imagem a cena muda para "WelcomeScene"
        });

    }}

import config from "../main.js"; // importa as configurações definidas na main

export class ContextoScene extends Phaser.Scene { // cria uma cena chamada EndScene

    alturaJogo = config.height; // define a altura do jogo
    larguraJogo = config.width; // define a largura do jogo

    constructor() {
        super("ContextoScene"); // registra o nome da cena
    }


    preload() {
        this.load.image("bg", "./assets/contextobg.png") // carrega o fundo da cena
        this.load.image("prosseguir", "./assets/prosseguir.png"); // carrega o botão de start do jogo
    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "bg");
        this.botao = this.add.image(this.larguraJogo/1.15, 550, "prosseguir").setScale(0.4).setInteractive()
        this.botao.on("pointerover", () => {
            this.input.setDefaultCursor("pointer"); // quando o mouse passa sobre a imagem, o cursor muda para mãozinha clicável
        });
        
        this.botao.on("pointerout", () => {
            this.input.setDefaultCursor("default"); // quando o mouse sai da imagem, o cursor volta ao normal
        });

        this.botao.on("pointerdown", () => {
            this.scene.start("GameScene"); // quando se clica na imagem a cena muda para "GameScene"
        });

    }}

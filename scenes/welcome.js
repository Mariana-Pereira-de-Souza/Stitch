import config from "../main.js"; // importa as configurações definidas na main

export class WelcomeScene extends Phaser.Scene { // cria uma cena chamada WelcomeScene

    alturaJogo = config.height; // define a altura do jogo
    larguraJogo = config.width; // define a largura do jogo

    constructor() {
        super("WelcomeScene"); // registra o nome da cena
    }

    preload() {
        this.load.image("fundo", "./assets/background.jpg"); // carrega a imagem de fundo da tela de inicio
        this.load.image("play", "./assets/play.png"); // carrega o botão de start do jogo
        this.load.audio("musica", "./assets/musica.mp3"); // carrega música ao jogo

    }

    create() {
        this.add.image(this.larguraJogo/1.50, this.alturaJogo/2, 'fundo').setScale(0.6); // adiciona o fundo da tela e aumenta seu tamanho
        
        this.botaoJogar = this.add.image(this.larguraJogo/5, 500, "play").setScale(0.3).setInteractive(); // adiciona um botão de start, diminui seu tamanho e a torna interativa

        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer"); // quando o mouse passa sobre a imagem, o cursor muda para mãozinha clicável
        });
        
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default"); // quando o mouse sai da imagem, o cursor volta ao normal
        });

        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("ContextoScene"); // quando se clica na imagem a cena muda para "ContextoScene"
        });

        // música
        this.musica = this.sound.add("musica"); // adiciona música ao jogo
        this.musica.play({ // reproduz a música
            loop: true, // deixa a música em loop
            volume: 0.2 // define o volume da música em 50%
        });

    }

    update() {

    }
}

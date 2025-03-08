import config from "../main.js"; // importa as configurações definidas na main

export class EndScene extends Phaser.Scene { // cria uma cena chamada EndScene

    alturaJogo = config.height; // define a altura do jogo
    larguraJogo = config.width; // define a largura do jogo

    constructor() {
        super("EndScene"); // registra o nome da cena
    }

    preload() {
        this.load.image("end","./assets/endbg.png")
        this.load.image("levar", "./assets/levar.png");
        this.load.image("deixar", "./assets/deixar.png");

    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "end");
        this.botaoLevar = this.add.image(200, 400, "levar").setScale(0.7).setInteractive();
        this.botaoDeixar = this.add.image(600, 400, "deixar").setScale(0.7).setInteractive();

        this.botaoLevar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoLevar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoLevar.on("pointerdown", () => {
            this.scene.stop("EndScene")
            this.scene.start("SadScene")
        })

        this.botaoDeixar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoDeixar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoDeixar.on("pointerdown", () => {
            this.scene.stop("EndScene");
            this.scene.start("HappyScene");
        })
    }

    update() {

    }
}
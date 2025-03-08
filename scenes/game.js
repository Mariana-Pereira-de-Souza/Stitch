import config from "../main.js"; // importa as configurações definidas na main 

export class GameScene extends Phaser.Scene { // cria a cena chamada GameScene

    alturaJogo = config.height; // define a altura do jogo
    larguraJogo = config.width; // define a largura do jogo

    constructor() {
        super("GameScene"); // registra o nome da cena
    }

    preload() {
        this.load.image("paisagem", "./assets/praia.jpg"); // carrega o fundo da cena
        this.load.spritesheet("stitch", "./assets/stitch.png", { frameWidth: 150, frameHeight: 128 }); // carrega a spritesheet da personagem "stitch"
        this.load.image("plataforma", "./assets/nave.png"); // carrega a imagem das plataformas
        this.load.spritesheet("et", "./assets/et1.png", { frameWidth: 260, frameHeight: 170 }); // carrega a spritesheet da personagem "et" parado
        this.load.spritesheet("et2", "./assets/et.png", { frameWidth: 200, frameHeight: 128 }); // carrega a spritesheet da personagem "et" andando
    }

    create() {
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagem").setScale(1.45); // adiciona o fundo da cena

        this.cursors = this.input.keyboard.createCursorKeys(); // acessa as setas do teclado e atribui suas propriedades

        // Stitch
        var posicaoStitch_X = Phaser.Math.RND.between(50, 550); // sorteia um número aleatório para a posição x do Stitch
        this.stitch = this.physics.add.sprite(posicaoStitch_X, 0, 'stitch'); // adiciona a spritesheet da personagem "stitch"
        this.stitch.body.setSize(52, 68, false).setOffset(37, 60); // define a hitbox da personagem "stitch"
        this.stitch.setCollideWorldBounds(true); // adiciona bordas ao mundo para o Stitch

        // Animação do Stitch
        this.anims.create({
            key: 'parada',
            frames: this.anims.generateFrameNumbers('stitch', { start: 0, end: 4 }),
            frameRate: 4,
            repeat: -1
        });

        // Et parado
        this.et = this.physics.add.sprite(400, 300, 'et');
        this.et.body.setSize(52, 68, false).setOffset(37, 60);
        this.et.setCollideWorldBounds(true);

        // Animações do Et
        this.anims.create({
            key: 'parado',
            frames: this.anims.generateFrameNumbers('et', { start: 0, end: 7 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'andando',
            frames: this.anims.generateFrameNumbers('et2', { start: 0, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'pulando',
            frames: this.anims.generateFrameNumbers('et2', { start: 0, end: 7 }),
            frameRate: 6,
            repeat: 0
        });

        // Quando o player encostar no Stitch
        this.physics.add.overlap(this.et, this.stitch, () => { 
            this.stitch.setVisible(false); // Faz o Stitch desaparecer

            var novaPosicaoStitch_X = Phaser.Math.RND.between(50, 550); // Para o Stitch não sumir para fora da tela
            this.stitch.setPosition(novaPosicaoStitch_X, 0); // Coloca o Stitch de volta na nova posição

            this.pontuacao += 1; // Aumenta a pontuação
            this.placar.setText('Catalogando Stitch: ' + this.pontuacao); // Atualiza o placar

            this.stitch.setVisible(true); // Torna o Stitch visível novamente
        });

        // Criar grupo de plataformas
        this.plataformas = this.physics.add.staticGroup();

        // Plataformas
        let plat1 = this.plataformas.create(200, 450, 'plataforma').setScale(0.4).refreshBody();
        plat1.body.setSize(120, 80, true); // Ajusta a hitbox

        let plat2 = this.plataformas.create(580, 360, 'plataforma').setScale(0.4).refreshBody();
        plat2.body.setSize(120, 80, true); // Ajusta a hitbox

        let plat3 = this.plataformas.create(300, 200, 'plataforma').setScale(0.4).refreshBody();
        plat3.body.setSize(120, 80, true); // Ajusta a hitbox

        // Adicionar colisão com todas as plataformas
        this.physics.add.collider(this.stitch, this.plataformas);
        this.physics.add.collider(this.et, this.plataformas);

        // Adiciona placar
        this.pontuacao = 0;
        this.placar = this.add.text(30, 30, 'Catalogando Stitch: ' + this.pontuacao, { fontSize: '35px', fill: '#495613' });
    }

    update() {
        // Stitch
        this.stitch.anims.play('parada', true);

        // Et
        if (this.cursors.left.isDown) {
            this.et.setVelocityX(-100);
            this.et.setFlipX(true);
            if (this.et.anims.currentAnim?.key !== 'andando') {
                this.et.play('andando');
            }
        } else if (this.cursors.right.isDown) {
            this.et.setVelocityX(100);
            this.et.setFlipX(false);
            if (this.et.anims.currentAnim?.key !== 'andando') {
                this.et.play('andando');
            }
        } else {
            this.et.setVelocityX(0);
            if (this.et.anims.currentAnim?.key !== 'parado') {
                this.et.play('parado');
            }
        }

        // Pulo
        if (this.cursors.up.isDown) {
            this.et.setVelocityY(-300); // Ajuste a força do pulo conforme necessário
            if (this.et.anims.currentAnim?.key !== 'pulando') {
                this.et.play('pulando');
            }
        }

        this.et.setGravityY(250); // Gravidade do pulo

        // Verifica se a pontuação atingiu 1 e transita para a EndScene
        if (this.pontuacao >= 10) {
            this.scene.start("EndScene"); // Transita para a EndScene
        }
    }
}

// EndScene (A cena final do jogo)
export class EndScene extends Phaser.Scene {
    constructor() {
        super("EndScene");
    }

    preload() {
        this.load.image("fundoFinal", "assets/fundoFinal.jpg"); // Imagem do fundo para a cena final
    }

    create() {
        this.add.image(config.width / 2, config.height / 2, "fundoFinal"); // Adiciona o fundo da cena final

        // Texto de finalização do jogo
        this.add.text(config.width / 2, config.height / 2, 'Jogo Finalizado! Pontuação Final: ' + gameScene.pontuacao, {
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Botão de reiniciar (se necessário)
        this.input.on('pointerdown', () => {
            this.scene.start("GameScene"); // Reinicia o jogo
        });
    }
}


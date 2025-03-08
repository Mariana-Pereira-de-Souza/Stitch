// cada linha imposta uma cena do jogo
import {WelcomeScene} from "./scenes/welcome.js";
import {ContextoScene} from "./scenes/contexto.js";
import {GameScene} from "./scenes/game.js";
import {EndScene} from "./scenes/end.js";
import {SadScene} from "./scenes/sad.js";
import {HappyScene} from "./scenes/happy.js";

// configurações do jogo
const config = {
    type: Phaser.AUTO, // escolhe, automaticamente, a melhor renderização
    width: 800, // largura do jogo
    height: 600, // altura do jogo
    backgroundColor: "#9e9a87", // cor de fundo
    scale: {
        mode: Phaser.Scale.FIT, // não distorce o jogo em outras telas
        autoCenter: Phaser.Scale.CENTER_BOTH // centraliza o jogo na tela
    },
    physics: { // física do jogo
        default: "arcade", // configurações específicas para o sistema de física 'arcade'
        arcade: {
            gravity: { y: 250 }, // define a gravidade no eixo y como 250
            debug: false // não visualisar as informações de depuração (debug) relacionadas à física do jogo
        }
    },
    scene: [WelcomeScene, ContextoScene, GameScene, EndScene, HappyScene, SadScene] // cenas carregadas em ordem
};

export default config // exporta as configurações definidas na main

const game = new Phaser.Game(config); // cria o jogo com as configurações definidas
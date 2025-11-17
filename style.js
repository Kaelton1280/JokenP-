// Seleciona os botões do jogo
const buttonPedra = document.getElementById('pedra');
const buttonPapel = document.getElementById('papel');
const buttonTesoura = document.getElementById('tesoura');
const buttonReiniciar = document.querySelector('.reiniciar');

// Seleciona os elementos do placar e resultado
const result = document.querySelector('.result');
const placarHumano = document.querySelector('h3 span');
const placarIA = document.querySelector('.jogador-ia span');

// Variáveis para guardar os pontos
let pontosHumano = 0;
let pontosIA = 0;

const GAME_OPTIONS = { // ENUM para as opções do jogo
    ROCK: 'pedra',
    PAPER: 'papel',
    SCISSORS: 'tesoura'
}
/*
ENUM -> Para que serve?
Organização: Em vez de espalhar strings como 'pedra', 'papel', 'tesoura' pelo código, você usa GAME_OPTIONS.ROCK, GAME_OPTIONS.PAPER, etc.
Evita erros de digitação: Se você errar ao digitar 'tesoura' em algum lugar, pode dar bug. Usando o objeto, você só precisa acertar uma vez.
Facilita manutenção: Se quiser mudar 'pedra' para 'rocha', basta mudar no objeto.
*/

// Função principal do jogo
function playRound(escolhaJogador) {
    const opcoes = [GAME_OPTIONS.ROCK, GAME_OPTIONS.PAPER, GAME_OPTIONS.SCISSORS];
    const emojis = { pedra: '✊🏾', papel: '🤚🏼', tesoura: '✌️' };
    const escolhaIA = opcoes[Math.floor(Math.random() * 3)]; // escolha aleatória da IA, math.floor arredonda para baixo

    let mensagem = ''; // Mensagem de resultado para o usuário
    let classe = ''; // Classe para adicionar animação no resultado

    if (escolhaJogador === escolhaIA) {
        mensagem = 'Empate!';
        classe = 'empate';
    } else if ( // Verifica se o jogador ganhou com base na escolha da IA
        (escolhaJogador === GAME_OPTIONS.ROCK && escolhaIA === GAME_OPTIONS.SCISSORS) ||
        (escolhaJogador === GAME_OPTIONS.PAPER && escolhaIA === GAME_OPTIONS.ROCK) ||
        (escolhaJogador === GAME_OPTIONS.SCISSORS && escolhaIA === GAME_OPTIONS.PAPER)
    ) {
        mensagem = 'Você ganhou!';
        classe = 'vitoria';
        pontosHumano++;
    } else {
        mensagem = 'IA ganhou!'; // Verifica se a IA ganhou com base na escolha do jogador
        classe = 'derrota'; // Adiciona a classe de derrota ao resultado
        pontosIA++; // Incrementa o ponto da IA
    }

    // Atualiza o placar
    placarHumano.textContent = pontosHumano;
    placarIA.textContent = pontosIA;

    // Mostra o resultado e adiciona animação
    result.className = `result ${classe} animar`;
    result.textContent = `Você: ${emojis[escolhaJogador]} | IA: ${emojis[escolhaIA]} — ${mensagem}`;

    // Remove a classe de animação depois de 500ms para poder animar de novo na próxima jogada
    setTimeout(() => {
        result.classList.remove('animar'); // Remove a classe de animação
    }, 500);
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    pontosHumano = 0;
    pontosIA = 0;
    placarHumano.textContent = pontosHumano;
    placarIA.textContent = pontosIA;
    result.textContent = '';
    result.className = 'result';
}

// Adiciona os eventos de clique
buttonPedra.addEventListener('click', () => playRound('pedra'));
buttonPapel.addEventListener('click', () => playRound('papel'));
buttonTesoura.addEventListener('click', () => playRound('tesoura'));
buttonReiniciar.addEventListener('click', reiniciarJogo);
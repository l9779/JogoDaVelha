const tabuleiro = document.querySelectorAll('.casa');
let jogada = 1;

addEventListener('click', (ev) => {
    if (!ev.target.classList.contains('casa')) return;

    for (const casa of tabuleiro) {
        if (casa === ev.target) {
            if (casaMarcada(casa)) return;

            marcarCasa(casa);

            setTimeout(() => {
                if (verificaVitoria(casa)) {
                    vitoria();
                    return;
                }
                if (jogada === 9) {
                    empate();
                    return;
                }
                mudarJogada();
            }, 50)
        }
    }
});

function casaMarcada(casa) {
    return casa.classList.contains('marcada');
}

function marcarCasa(casa) {
    const div = criarDiv();
    casa.classList.add('marcada');
    casa.append(div);
}

function criarDiv() {
    const div = document.createElement('div');
    if (jogada % 2 !== 0) div.classList.add('marca', 'x');
    else div.classList.add('marca', 'o');

    return div;
}

function mudarJogada() {
    jogada++;
}

function verificaVitoria(casa) {
    if (jogada < 5) return;

    try {
        const marca = casa.lastChild.classList[1];// X ou O

        const casasMarcadas = [];
        tabuleiro.forEach(casa => {
        if (casa.classList.contains('marcada')) {
            casasMarcadas.push(casa.lastChild.classList[1]);
        } else {
            casasMarcadas.push(null);
        }
        })

        if (vitoriaH(marca, casasMarcadas)) return true;
        if (vitoriaV(marca, casasMarcadas)) return true;
        if (vitoriaD(marca, casasMarcadas)) return true;
    } catch (err) {
        return;
    }
}

function vitoriaH(marca, casasMarcadas) {
    return  (casasMarcadas[0] === marca
            && casasMarcadas[1] === marca
            && casasMarcadas[2] === marca)
            ||
            (casasMarcadas[3] === marca
            && casasMarcadas[4] === marca
            && casasMarcadas[5] === marca)
            ||
            (casasMarcadas[6] === marca
            && casasMarcadas[7] === marca
            && casasMarcadas[8] === marca);
}

function vitoriaV(marca, casasMarcadas) {
    return  (casasMarcadas[0] === marca
            && casasMarcadas[3] === marca
            && casasMarcadas[6] === marca)
            ||
            (casasMarcadas[1] === marca
            && casasMarcadas[4] === marca
            && casasMarcadas[7] === marca)
            ||
            (casasMarcadas[2] === marca
            && casasMarcadas[5] === marca
            && casasMarcadas[8] === marca);
}

function vitoriaD(marca, casasMarcadas) {
    return (casasMarcadas[0] === marca
            && casasMarcadas[4] === marca
            && casasMarcadas[8] === marca) 
            ||
            (casasMarcadas[2] === marca
            && casasMarcadas[4] === marca
            && casasMarcadas[6] === marca);
}

function vitoria() {
    if (jogada % 2 !== 0) {
        alert('Vitória de X!');
    } else {
        alert('Vitória de O!');
    }

    reinicar();
}

function empate() {
    alert('Empate!');
    reinicar();
}

function reinicar() {
    jogada = 1;

    for (const casa of tabuleiro) {
        casa.classList.remove('marcada');
        if (casa.childNodes.length > 1) {
            casa.lastChild.remove();
        }
    }
}

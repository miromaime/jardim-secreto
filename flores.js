document.addEventListener('DOMContentLoaded', function() {
    const book = document.querySelector('.book');
    const pagePairs = document.querySelectorAll('.page-pair');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentPair = 0;
    let isTurning = false;

    // Inicializa o livro
    function initBook() {
        pagePairs.forEach((pair, index) => {
            if (index === 0) {
                pair.style.zIndex = pagePairs.length - index;
                pair.style.opacity = '1';
            } else {
                pair.style.zIndex = '0';
                pair.style.opacity = '0';
            }
        });
        updateButtons();
    }

    // Atualiza estado dos botões
    function updateButtons() {
        if (prevBtn) prevBtn.disabled = currentPair <= 0;
        if (nextBtn) nextBtn.disabled = currentPair >= pagePairs.length - 1;
    }

    // Vira para o próximo par de páginas
    function nextPair() {
        if (isTurning || currentPair >= pagePairs.length - 1) return;

        isTurning = true;
        const currentRightPage = pagePairs[currentPair].querySelector('.right-page');
        currentRightPage.classList.add('turning');

        setTimeout(() => {
            pagePairs[currentPair].style.opacity = '0';
            pagePairs[currentPair].style.zIndex = '0';

            currentPair++;
            pagePairs[currentPair].style.opacity = '1';
            pagePairs[currentPair].style.zIndex = pagePairs.length - currentPair;

            currentRightPage.classList.remove('turning');
            updateButtons();
            isTurning = false;
        }, 1200);
    }

    // Vira para o par de páginas anterior
    function prevPair() {
        if (isTurning || currentPair <= 0) return;

        isTurning = true;
        const prevLeftPage = pagePairs[currentPair - 1].querySelector('.left-page');
        pagePairs[currentPair - 1].style.opacity = '1';
        pagePairs[currentPair - 1].style.zIndex = pagePairs.length - currentPair + 1;
        prevLeftPage.classList.add('turning-back');

        setTimeout(() => {
            pagePairs[currentPair].style.opacity = '0';
            pagePairs[currentPair].style.zIndex = '0';

            currentPair--;
            pagePairs[currentPair].style.opacity = '1';
            pagePairs[currentPair].style.zIndex = pagePairs.length - currentPair;

            prevLeftPage.classList.remove('turning-back');
            updateButtons();
            isTurning = false;
        }, 1200);
    }

    // Clique na página direita: avançar
    document.querySelectorAll('.right-page').forEach(page => {
        page.addEventListener('click', function() {
            nextPair();
        });
    });

    // Clique na página esquerda: voltar
    document.querySelectorAll('.left-page').forEach(page => {
        page.addEventListener('click', function() {
            prevPair();
        });
    });

    // Event listeners dos botões (se existirem)
    if (prevBtn) prevBtn.addEventListener('click', prevPair);
    if (nextBtn) nextBtn.addEventListener('click', nextPair);
    
    // Inicializa
    initBook();
});

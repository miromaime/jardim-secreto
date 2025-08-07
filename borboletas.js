document.addEventListener('DOMContentLoaded', function() {
    const book = document.querySelector('.book');
    const pagePairs = document.querySelectorAll('.page-pair');
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentPair = 0;
    let isTurning = false;
    
    // Inicializa o livro
    function initBook() {
        // Mostra apenas o primeiro par de páginas
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
        prevBtn.disabled = currentPair <= 0;
        nextBtn.disabled = currentPair >= pagePairs.length - 1;
    }
    
    // Vira para o próximo par de páginas
    function nextPair() {
        if (isTurning || currentPair >= pagePairs.length - 1) return;
        
        isTurning = true;
        const currentRightPage = pagePairs[currentPair].querySelector('.right-page');
        
        // Animação de virar a página direita
        currentRightPage.classList.add('turning');
        
        setTimeout(() => {
            // Esconde o par atual
            pagePairs[currentPair].style.opacity = '0';
            pagePairs[currentPair].style.zIndex = '0';
            
            // Mostra o próximo par
            currentPair++;
            pagePairs[currentPair].style.opacity = '1';
            pagePairs[currentPair].style.zIndex = pagePairs.length - currentPair;
            
            // Reseta a página virada
            currentRightPage.classList.remove('turning');
            currentRightPage.style.transform = 'rotateY(0deg)';
            
            updateButtons();
            isTurning = false;
        }, 1200);
    }
    
    // Vira para o par de páginas anterior
    function prevPair() {
        if (isTurning || currentPair <= 0) return;
        
        isTurning = true;
        const prevLeftPage = pagePairs[currentPair - 1].querySelector('.left-page');
        
        // Prepara a página para animação reversa
        pagePairs[currentPair - 1].style.opacity = '1';
        pagePairs[currentPair - 1].style.zIndex = pagePairs.length - currentPair + 1;
        prevLeftPage.style.transform = 'rotateY(-180deg)';
        
        setTimeout(() => {
            // Animação de voltar a página
            prevLeftPage.style.transition = 'transform 1.2s cubic-bezier(0.2, 0.8, 0.3, 1.5)';
            prevLeftPage.style.transform = 'rotateY(-15deg)';
            
            // Esconde o par atual
            pagePairs[currentPair].style.opacity = '0';
            pagePairs[currentPair].style.zIndex = '0';
            
            setTimeout(() => {
                currentPair--;
                prevLeftPage.style.transition = '';
                updateButtons();
                isTurning = false;
            }, 1200);
        }, 10);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevPair);
    nextBtn.addEventListener('click', nextPair);
    
    // Inicializa
    initBook();
});
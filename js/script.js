document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");

    hamburger.addEventListener('click', () => {
        //Animate Links
        navLinks.classList.toggle("open");
        links.forEach(link => {
            link.classList.toggle("fade");
        });

        //Hamburger Animation
        hamburger.classList.toggle("toggle");
    });

    // Seleciona todos os vídeos dentro da seção premium
    const videos = document.querySelectorAll('.premium-members video');
    const playBtns = document.querySelectorAll('.premium-members .play-btn');

    videos.forEach((video, index) => {
        video.muted = true; // Mute inicial

        video.addEventListener('pause', function () {
            playBtns[index].innerHTML = '<i class="fas fa-play"></i>';
        });

        video.addEventListener('click', function () {
            if (video.paused) {
                video.play();
                playBtns[index].innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtns[index].innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Atualiza o botão de play/pause ao clicar no botão de play
        playBtns[index].addEventListener('click', function () {
            if (video.paused) {
                video.play();
                playBtns[index].innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtns[index].innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Desabilitar tela cheia
        video.removeAttribute("controls");
    });
    

    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slideWidth = slides[0].clientWidth;
    let currentSlide = 1;

    function goToSlide(index) {
        slidesContainer.style.transition = 'transform 0.5s ease';
        slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= totalSlides) {
            currentSlide = 1;
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            }, 500);
        }
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        if (currentSlide <= 0) {
            currentSlide = totalSlides - 2;
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            }, 500);
        }
        goToSlide(currentSlide);
    }

    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);

    setInterval(nextSlide, 3000); // Troca de slide automática a cada 3 segundos
});



// função do contato
const handleSubmit = async (event) => {
    event.preventDefault();

    const form = document.querySelector('form');
    const submitButton = form.querySelector('button[type="submit"]');
    const charCountElement = document.getElementById('charCount');

    const name = form.querySelector('input[name=name]').value;
    const email = form.querySelector('input[name=email]').value;
    const message = form.querySelector('textarea[name=message]').value;

    submitButton.disabled = true;

    submitButton.innerHTML = 'Enviando...';
    submitButton.style.backgroundColor = '#5a5a5a';

    try {
        const response = await fetch('https://api.sheetmonkey.io/form/8Rxr7ip4HQKnbgNTt65LKH', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
            submitButton.innerHTML = '<i class="uil uil-check"></i> Enviado com sucesso';
            submitButton.style.backgroundColor = '#2ecc71';
            form.reset();
            charCountElement.textContent = '0 ';
            charCountElement.className = 'char-counter green';

            setTimeout(() => {
                submitButton.innerHTML = 'Enviar Mensagem';
                submitButton.style.backgroundColor = '';
            }, 3000);

        } else {

            submitButton.innerHTML = 'Erro ao Enviar';
            submitButton.style.backgroundColor = '#e74c3c';
        }
    } catch (error) {
        console.error('Erro ao enviar a mensagem:', error);
        submitButton.innerHTML = 'Erro ao Enviar';
        submitButton.style.backgroundColor = '#e74c3c';
    } finally {
        submitButton.style.animation = 'none';
        submitButton.disabled = false;
    }
};

document.querySelector('form').addEventListener('submit', handleSubmit);

// Função para atualizar a contagem de caracteres
function updateCharCount() {
    const textarea = document.querySelector('textarea[name=message]');
    const charCount = textarea.value.length;
    const charCountElement = document.getElementById('charCount');

    charCountElement.textContent = charCount + ' ';

    if (charCount <= 100) {
        charCountElement.className = 'char-counter green';
    } else if (charCount <= 150) {
        charCountElement.className = 'char-counter yellow';
    } else {
        charCountElement.className = 'char-counter red';
    }
}

// Adicionar evento de digitação para a atualização da contagem de caracteres
document.querySelector('textarea[name=message]').addEventListener('input', updateCharCount);


// Contador de caracters
function countChars(input) {
    const charCountElement = document.getElementById('charCount');
    const charCounter = input.value.length;

    charCountElement.textContent = charCounter + ' ';

    if (charCounter <= 100) {
        charCountElement.className = 'char-counter green';
    } else if (charCounter <= 150) {
        charCountElement.className = 'char-counter yellow';
    } else {
        charCountElement.className = 'char-counter red';
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const modalOverlay = document.getElementById("modalOverlay");
    const confirmBtn = document.getElementById("confirmBtn");

    // Mostra o modal ao carregar a página
    modalOverlay.style.display = "flex";

    // Adiciona evento de clique ao botão de confirmação
    confirmBtn.addEventListener("click", function () {
        // Oculta o modal e exibe o conteúdo principal
        modalOverlay.style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    });
});

function updateLocation(location) {
    const locationElement = document.getElementById('cidade');
    locationElement.textContent = location;
}

function getIPLocation() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://wtfismyip.com/json', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(request.responseText);
            const location = data.YourFuckingLocation.replace(/\,.+/g, "$'");
            updateLocation(location);
        } else {
            updateLocation("Sua Cidade");
        }
    };

    request.onerror = function () {
        updateLocation("Erro na requisição");
    };

    request.send();
}

getIPLocation();

// Função para exibir o ads
function openAdsModalAfterDelay() {
    setTimeout(function () {
        var adsModal = document.getElementById('ads-modal-container');
        adsModal.style.display = 'flex';
        startVideoPlayback();
    }, 10000);
}

window.onload = function () {
    var adsModal = document.getElementById('ads-modal-container');
    adsModal.style.display = 'none';
    openAdsModalAfterDelay();
};

function closeAdsModal() {
    var adsModal = document.getElementById('ads-modal-container');
    var adsVideo = document.getElementById('ads-video');
    adsModal.style.display = 'none';
    adsVideo.pause(); // Pausa o vídeo ao fechar o modal
}

function startVideoPlayback() {
    var adsVideo = document.getElementById('ads-video');
    adsVideo.muted = false; // Desmuta o vídeo
    adsVideo.play(); // Inicia a reprodução do vídeo
}

document.getElementById('ads-modal-close').addEventListener('click', closeAdsModal);

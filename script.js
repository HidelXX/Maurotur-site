// ===============================
// MENU MOBILE
// ===============================

const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('navLinks');

if (toggle && nav) {
    toggle.addEventListener('click', function () {
        const isOpen = nav.classList.toggle('open');

        toggle.setAttribute('aria-expanded', String(isOpen));

        const icon = toggle.querySelector('i');

        if (icon) {
            icon.className = isOpen
                ? 'fas fa-times'
                : 'fas fa-bars';
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');

            toggle.setAttribute('aria-expanded', 'false');

            const icon = toggle.querySelector('i');

            if (icon) {
                icon.className = 'fas fa-bars';
            }
        });
    });
}


// ===============================
// FORMULÁRIO → WHATSAPP
// ===============================

const form = document.getElementById('formContato');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = form.querySelector('input[type="text"]')?.value.trim() || '';
        const email = form.querySelector('input[type="email"]')?.value.trim() || '';
        const telefone = form.querySelector('input[type="tel"]')?.value.trim() || '';
        const mensagem = form.querySelector('textarea')?.value.trim() || '';

        const whatsappNumber = '559884030572';

        const whatsappText =
            `Olá, vim do site MAUROTUR.%0A%0A` +
            `Nome: ${nome}%0A` +
            `E-mail: ${email}%0A` +
            `Telefone: ${telefone}%0A` +
            `Mensagem: ${mensagem}`;

        const waUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

        window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
}


// ===============================
// SCROLL SUAVE
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        const href = this.getAttribute('href');

        if (!href || href === '#') {
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

});


// ===============================
// GALERIA
// ===============================

const galleryTrack = document.getElementById('galleryTrack');
const galleryCards = galleryTrack
    ? Array.from(galleryTrack.children)
    : [];

const prevGalleryBtn = document.getElementById('prevGallery');
const nextGalleryBtn = document.getElementById('nextGallery');
const toggleGalleryBtn = document.getElementById('toggleGallery');

const galleryModal = document.getElementById('galleryModal');
const galleryModalImage = document.getElementById('galleryModalImage');
const galleryModalClose = document.getElementById('galleryModalClose');

const galleryImages = document.querySelectorAll('.gallery-image');

let currentIndex = 0;
let isPlaying = true;
let autoPlayInterval = null;


// Calcula largura do cartão
function getCardWidth() {

    if (!galleryCards.length) {
        return 0;
    }

    const card = galleryCards[0];

    const trackStyle = window.getComputedStyle(galleryTrack);

    const gap = parseFloat(
        trackStyle.gap ||
        trackStyle.columnGap ||
        '24'
    );

    return card.getBoundingClientRect().width + gap;
}


// Atualiza posição da galeria
function updateGallery() {

    if (!galleryTrack || !galleryCards.length) {
        return;
    }

    const cardWidth = getCardWidth();

    galleryTrack.style.transform =
        `translateX(-${currentIndex * cardWidth}px)`;
}


// Inicia reprodução automática
function startAutoPlay() {

    if (!galleryCards.length) {
        return;
    }

    clearInterval(autoPlayInterval);

    autoPlayInterval = setInterval(() => {

        currentIndex =
            (currentIndex + 1) % galleryCards.length;

        updateGallery();

    }, 6000);
}


// Pausa reprodução
function pauseAutoPlay() {

    clearInterval(autoPlayInterval);

    isPlaying = false;

    if (toggleGalleryBtn) {
        toggleGalleryBtn.innerHTML =
            '<i class="fas fa-play"></i>';

        toggleGalleryBtn.setAttribute(
            'aria-label',
            'Continuar galeria'
        );
    }
}


// Continua reprodução
function resumeAutoPlay() {

    isPlaying = true;

    startAutoPlay();

    if (toggleGalleryBtn) {
        toggleGalleryBtn.innerHTML =
            '<i class="fas fa-pause"></i>';

        toggleGalleryBtn.setAttribute(
            'aria-label',
            'Pausar galeria'
        );
    }
}


// Botão anterior
if (prevGalleryBtn && galleryCards.length) {

    prevGalleryBtn.addEventListener('click', () => {

        currentIndex =
            (currentIndex - 1 + galleryCards.length) %
            galleryCards.length;

        updateGallery();

        if (isPlaying) {
            startAutoPlay();
        }
    });
}


// Botão próximo
if (nextGalleryBtn && galleryCards.length) {

    nextGalleryBtn.addEventListener('click', () => {

        currentIndex =
            (currentIndex + 1) %
            galleryCards.length;

        updateGallery();

        if (isPlaying) {
            startAutoPlay();
        }
    });
}


// Botão play/pause
if (toggleGalleryBtn && galleryCards.length) {

    toggleGalleryBtn.addEventListener('click', () => {

        if (isPlaying) {
            pauseAutoPlay();
        } else {
            resumeAutoPlay();
        }

    });
}


// Recalcula galeria ao redimensionar
window.addEventListener('resize', () => {

    if (galleryCards.length) {
        updateGallery();
    }

});


// Inicia galeria
if (
    galleryTrack &&
    galleryCards.length &&
    prevGalleryBtn &&
    nextGalleryBtn &&
    toggleGalleryBtn
) {
    updateGallery();
    startAutoPlay();
}


// ===============================
// MODAL DA GALERIA
// ===============================

function openGalleryModal(src, alt) {

    if (!galleryModal || !galleryModalImage) {
        return;
    }

    galleryModalImage.src = src;
    galleryModalImage.alt = alt || 'Imagem ampliada';

    galleryModal.classList.add('is-open');

    galleryModal.setAttribute(
        'aria-hidden',
        'false'
    );

    document.body.style.overflow = 'hidden';
}


function closeGalleryModal() {

    if (!galleryModal) {
        return;
    }

    galleryModal.classList.remove('is-open');

    galleryModal.setAttribute(
        'aria-hidden',
        'true'
    );

    document.body.style.overflow = '';

    setTimeout(() => {

        if (galleryModalImage) {
            galleryModalImage.src = '';
        }

    }, 250);
}


// Clique nas imagens
galleryImages.forEach(image => {

    image.addEventListener('click', () => {

        openGalleryModal(
            image.src,
            image.alt
        );

    });


    // Teclado
    image.addEventListener('keydown', event => {

        if (
            event.key === 'Enter' ||
            event.key === ' '
        ) {

            event.preventDefault();

            openGalleryModal(
                image.src,
                image.alt
            );
        }

    });

});


// Fechar pelo botão
if (galleryModalClose) {

    galleryModalClose.addEventListener(
        'click',
        closeGalleryModal
    );

}


// Fechar clicando fora da imagem
if (galleryModal) {

    galleryModal.addEventListener('click', event => {

        if (event.target === galleryModal) {
            closeGalleryModal();
        }

    });

}


// Fechar com ESC
document.addEventListener('keydown', event => {

    if (
        event.key === 'Escape' &&
        galleryModal &&
        galleryModal.classList.contains('is-open')
    ) {
        closeGalleryModal();
    }

});
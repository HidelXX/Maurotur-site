// Menu mobile toggle
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('navLinks');

        toggle.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            const icon = toggle.querySelector('i');
            if (isOpen) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.querySelector('i').className = 'fas fa-bars';
            });
        });

        const form = document.getElementById('formContato');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const whatsappNumber = '559884030572';
            const whatsappText = 'olá, vim do site maurotur';
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        });

        // Scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Galeria de imagens com movimento lento e controle do usuário
        const galleryTrack = document.getElementById('galleryTrack');
        const galleryCards = galleryTrack ? Array.from(galleryTrack.children) : [];
        const prevGalleryBtn = document.getElementById('prevGallery');
        const nextGalleryBtn = document.getElementById('nextGallery');
        const toggleGalleryBtn = document.getElementById('toggleGallery');
        const galleryModal = document.getElementById('galleryModal');
        const galleryModalImage = document.getElementById('galleryModalImage');
        const galleryModalClose = document.getElementById('galleryModalClose');
        const galleryImages = document.querySelectorAll('.gallery-image');

        if (galleryTrack && galleryCards.length > 0 && prevGalleryBtn && nextGalleryBtn && toggleGalleryBtn) {
            let currentIndex = 0;
            let isPlaying = true;
            let autoPlayInterval;

            function getCardWidth() {
                const card = galleryCards[0];
                const trackStyle = window.getComputedStyle(galleryTrack);
                const gap = parseFloat(trackStyle.gap || trackStyle.columnGap || '24');
                return card.getBoundingClientRect().width + gap;
            }

            function updateGallery() {
                const cardWidth = getCardWidth();
                galleryTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }

            function startAutoPlay() {
                clearInterval(autoPlayInterval);
                autoPlayInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % galleryCards.length;
                    updateGallery();
                }, 6000);
            }

            function pauseAutoPlay() {
                clearInterval(autoPlayInterval);
                isPlaying = false;
                toggleGalleryBtn.innerHTML = '<i class="fas fa-play"></i>';
            }

            function resumeAutoPlay() {
                isPlaying = true;
                startAutoPlay();
                toggleGalleryBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }

            prevGalleryBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
                updateGallery();
                if (!isPlaying) {
                    resumeAutoPlay();
                } else {
                    startAutoPlay();
                }
            });

            nextGalleryBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % galleryCards.length;
                updateGallery();
                if (!isPlaying) {
                    resumeAutoPlay();
                } else {
                    startAutoPlay();
                }
            });

            toggleGalleryBtn.addEventListener('click', () => {
                if (isPlaying) {
                    pauseAutoPlay();
                } else {
                    resumeAutoPlay();
                }
            });

            window.addEventListener('resize', updateGallery);
            startAutoPlay();
        }

        function openGalleryModal(src, alt) {
            if (!galleryModal || !galleryModalImage) return;
            galleryModalImage.src = src;
            galleryModalImage.alt = alt;
            galleryModal.classList.add('is-open');
            galleryModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeGalleryModal() {
            if (!galleryModal) return;
            galleryModal.classList.remove('is-open');
            galleryModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        galleryImages.forEach(image => {
            image.addEventListener('click', () => openGalleryModal(image.src, image.alt));
            image.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openGalleryModal(image.src, image.alt);
                }
            });
        });

        if (galleryModalClose) {
            galleryModalClose.addEventListener('click', closeGalleryModal);
        }

        if (galleryModal) {
            galleryModal.addEventListener('click', (event) => {
                if (event.target === galleryModal) {
                    closeGalleryModal();
                }
            });
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && galleryModal && galleryModal.classList.contains('is-open')) {
                closeGalleryModal();
            }
        });

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
            const whatsappText = 'ola, vim do site maurotur';
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

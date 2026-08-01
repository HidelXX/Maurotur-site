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
            const btn = form.querySelector('button');
            const icon = btn.querySelector('i');
            const label = document.createElement('span');
            label.className = 'button-label';
            btn.appendChild(label);
            label.textContent = ' Enviando...';
            icon.className = 'fas fa-spinner fa-spin';
            btn.disabled = true;

            setTimeout(() => {
                label.textContent = ' Mensagem enviada!';
                icon.className = 'fas fa-check-circle';
                btn.classList.add('is-sent');
                form.reset();
                setTimeout(() => {
                    label.textContent = ' Enviar mensagem';
                    btn.classList.remove('is-sent');
                    btn.disabled = false;
                }, 2500);
            }, 1800);
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

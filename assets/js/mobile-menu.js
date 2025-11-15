// Menú hamburguesa para móvil
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón hamburguesa si no existe
    const navbar = document.querySelector('.navbar .container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navbar || !navMenu) return;
    
    // Crear botón hamburguesa
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Menú');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;
    
    // Insertar antes del menú
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.parentNode.insertBefore(hamburger, navBrand.nextSibling);
    }
    
    // Toggle menú
    hamburger.addEventListener('click', function() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Cerrar menú al hacer click en un link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Prevenir scroll cuando el menú está abierto
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMenuScroll() {
        if (mediaQuery.matches && document.body.classList.contains('menu-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Observer para cambios en body class
    const observer = new MutationObserver(handleMenuScroll);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});

// Mejorar experiencia de scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Solo en móvil
    if (window.innerWidth <= 768) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll para anclas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Lazy loading de imágenes
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Touch feedback para botones
document.querySelectorAll('.btn, .post-card, .service-card').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});
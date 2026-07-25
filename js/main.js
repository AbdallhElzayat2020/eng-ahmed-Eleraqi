// =============================================================
// 1. تفعيل AOS
// =============================================================
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-out-cubic',
});

// =============================================================
// 2. هامبورجر
// =============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// =============================================================
// 3. عدادات متحركة
// =============================================================
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    document.querySelectorAll('.counter-number').forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 60;
        const stepTime = 1500 / 60;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

const aboutSection = document.getElementById('about');
if (aboutSection) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startCounters();
                }
            });
        },
        { threshold: 0.3 },
    );
    observer.observe(aboutSection);
}

// =============================================================
// 4. شهادات العملاء (كاروسيل)
// =============================================================
let currentSlide = 0;
const track = document.getElementById('testimonialsTrack');
const dots = document.querySelectorAll('.slider-dot');
const totalSlides = document.querySelectorAll('.testimonial-card').length;
let slidesToShow = 3;
let autoSlideInterval;

function getSlidesToShow() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
}

function updateSlider() {
    if (!track) return;
    slidesToShow = getSlidesToShow();
    const slideWidth = 100 / slidesToShow;
    const maxSlide = Math.max(0, totalSlides - slidesToShow);

    document.querySelectorAll('.testimonial-card').forEach((card) => {
        card.style.minWidth = `calc(${slideWidth}% - 1rem)`;
    });

    if (currentSlide > maxSlide) currentSlide = maxSlide;
    track.style.transform = `translateX(${currentSlide * slideWidth}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function slideTestimonials(direction) {
    const maxSlide = Math.max(0, totalSlides - slidesToShow);
    currentSlide = Math.max(0, Math.min(maxSlide, currentSlide + direction));
    updateSlider();
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        const maxSlide = Math.max(0, totalSlides - slidesToShow);
        if (currentSlide >= maxSlide) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        updateSlider();
    }, 5000);
}

dots.forEach((dot) => {
    dot.addEventListener('click', function () {
        currentSlide = parseInt(this.dataset.index);
        updateSlider();
        resetAutoSlide();
    });
});

window.addEventListener('load', () => {
    updateSlider();
    resetAutoSlide();
});

window.addEventListener('resize', () => {
    updateSlider();
});

// =============================================================
// 5. Lightbox
// =============================================================
function openLightbox(src) {
    const img = document.getElementById('lightbox-img');
    const lightbox = document.getElementById('lightbox');
    if (img && lightbox) {
        img.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// =============================================================
// 6. Product Modal
// =============================================================
function openProduct(title, desc, img) {
    const modal = document.getElementById('productModal');
    if (modal) {
        document.getElementById('modalProductTitle').textContent = title;
        document.getElementById('modalProductDesc').textContent = desc;
        document.getElementById('modalProductImg').src = img;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProduct() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// =============================================================
// 7. Blog Modal
// =============================================================
function openBlog(title, desc, img) {
    const modal = document.getElementById('blogModal');
    if (modal) {
        document.getElementById('blogModalTitle').textContent = title;
        document.getElementById('blogModalDesc').textContent = desc;
        document.getElementById('blogModalImg').src = img;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeBlog() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// =============================================================
// 8. Close modals with Escape
// =============================================================
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeLightbox();
        closeProduct();
        closeBlog();
    }
});

// =============================================================
// 9. Smooth scroll for navbar
// =============================================================
document.querySelectorAll('.navbar a, .mobile-menu a').forEach((link) => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70;
            const top =
                target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

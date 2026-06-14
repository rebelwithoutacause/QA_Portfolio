// ===================================
// Smooth Scrolling for Navigation Links
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // Handle smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .cta-button');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal links starting with #
            if (href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===================================
    // Active Navigation Link Highlighting
    // ===================================

    const sections = document.querySelectorAll('section[id]');
    const navMenuLinks = document.querySelectorAll('.nav-menu a');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navMenuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ===================================
    // Email Modal Handling
    // ===================================

    const EMAIL = 'qamanualtester@proton.me';
    const emailButton = document.getElementById('emailButton');
    const emailModal = document.getElementById('emailModal');
    const emailModalImage = document.getElementById('emailModalImage');
    const modalCloseX = document.getElementById('modalCloseX');
    const modalOverlay = document.getElementById('modalOverlay');

    function closeModal() {
        emailModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showToast() {
        const toast = document.createElement('div');
        toast.textContent = 'Email copied: ' + EMAIL;
        toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#B8860B;color:#1a1410;padding:0.75rem 1.5rem;border-radius:4px;font-weight:600;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.5);';
        document.body.appendChild(toast);
        setTimeout(function() { toast.remove(); }, 3000);
    }

    // Open modal when email button is clicked
    if (emailButton) {
        emailButton.addEventListener('click', function() {
            emailModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Click image: copy email + open mail client + close modal
    if (emailModalImage) {
        emailModalImage.style.cursor = 'pointer';
        emailModalImage.addEventListener('click', function() {
            navigator.clipboard.writeText(EMAIL).catch(function() {
                const ta = document.createElement('textarea');
                ta.value = EMAIL;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            });
            window.location.href = 'mailto:' + EMAIL;
            closeModal();
            showToast();
        });
    }

    if (modalCloseX) {
        modalCloseX.addEventListener('click', function(e) {
            e.stopPropagation();
            closeModal();
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && emailModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ===================================
    // Navbar Background on Scroll
    // ===================================

    const navbar = document.querySelector('.navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(180deg, rgba(42, 31, 24, 0.98) 0%, rgba(26, 20, 16, 0.98) 100%)';
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.7), 0 0 12px rgba(184, 134, 11, 0.2)';
        } else {
            navbar.style.background = 'linear-gradient(180deg, rgba(42, 31, 24, 0.98) 0%, rgba(26, 20, 16, 0.95) 100%)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(184, 134, 11, 0.2)';
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ===================================
    // Portfolio Card Click Enhancement
    // ===================================

    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if the click is not on the link itself
            if (!e.target.classList.contains('portfolio-link')) {
                const link = this.querySelector('.portfolio-link');
                if (link) {
                    // In production, this would navigate to the actual link
                    console.log('Navigating to:', link.href);
                }
            }
        });
    });

    // ===================================
    // Intersection Observer for Fade-in Animation
    // ===================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards, portfolio cards, and skill categories
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .skill-category, .highlight-item'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ===================================
    // Console Message (Easter Egg)
    // ===================================

    console.log('%c⚙ Teodor Kostov - QA Portfolio ⚙', 'color: #B8860B; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);');
    console.log('%c⚡ Welcome to the Cyber-Lab. Where code, gears, and quality meet.', 'color: #c9a96e; font-size: 14px;');
    console.log('%c🔧 Quality is engineered with precision, not by accident.', 'color: #f4e4c1; font-size: 12px;');

});

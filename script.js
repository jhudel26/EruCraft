// Template Selection Carousel
class TemplateCarousel {
    constructor() {
        this.currentIndex = 0;
        this.templates = document.querySelectorAll('.template-card');
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dots = document.querySelectorAll('.dot');
        this.selectBtn = document.getElementById('selectTemplateBtn');
        this.totalCards = this.templates.length;

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCarousel();
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.previousTemplate());
        this.nextBtn.addEventListener('click', () => this.nextTemplate());

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToTemplate(index));
        });

        this.templates.forEach((template, index) => {
            template.addEventListener('click', () => this.goToTemplate(index));
        });

        this.selectBtn.addEventListener('click', () => this.selectTemplate());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousTemplate();
            if (e.key === 'ArrowRight') this.nextTemplate();
            if (e.key === 'Enter') this.selectTemplate();
        });
    }

    nextTemplate() {
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCarousel();
    }

    previousTemplate() {
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCarousel();
    }

    goToTemplate(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        // Update card positions and classes for 3D effect
        this.templates.forEach((template, index) => {
            const relativeIndex = (index - this.currentIndex + this.totalCards) % this.totalCards;

            // Remove all position classes
            template.className = template.className.replace(/\b(prev-\d|next-\d|active)\b/g, '');

            // Add appropriate position class
            switch(relativeIndex) {
                case 0:
                    template.classList.add('active');
                    break;
                case 1:
                    template.classList.add('next-1');
                    break;
                case this.totalCards - 1:
                    template.classList.add('prev-1');
                    break;
                case 2:
                    template.classList.add('next-2');
                    break;
                case this.totalCards - 2:
                    template.classList.add('prev-2');
                    break;
                default:
                    // Cards that are not adjacent will be styled by the catch-all rule
                    break;
            }
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Enable select button
        this.selectBtn.disabled = false;
        this.selectBtn.textContent = 'Select Template';
    }

    selectTemplate() {
        const selectedTemplate = this.templates[this.currentIndex].dataset.template;

        // Add selection animation
        this.selectBtn.textContent = 'Selected!';
        this.selectBtn.style.background = '#27ae60';

        // Store selected template
        localStorage.setItem('selectedTemplate', selectedTemplate);

        // Navigate to form page after animation
        setTimeout(() => {
            window.location.href = 'form.html';
        }, 1000);
    }
}

// Page Loader Management
class PageLoader {
    constructor() {
        this.loader = document.getElementById('pageLoader');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressText = document.querySelector('.progress-text');
        this.init();
    }

    init() {
        // Simulate loading progress
        this.simulateProgress();
        
        // Hide loader when everything is ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoader();
            }, 1000); // Minimum 1 second loading time
        });
    }

    simulateProgress() {
        const steps = [
            { progress: 20, text: 'Initializing...' },
            { progress: 40, text: 'Loading templates...' },
            { progress: 60, text: 'Preparing interface...' },
            { progress: 80, text: 'Almost ready...' },
            { progress: 100, text: 'Complete!' }
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                this.updateProgress(step.progress, step.text);
                currentStep++;
            } else {
                clearInterval(interval);
            }
        }, 600);
    }

    updateProgress(percentage, text) {
        if (this.progressFill) {
            this.progressFill.style.transform = `scaleX(${percentage / 100})`;
        }
        if (this.progressText) {
            this.progressText.textContent = text;
        }
    }

    hideLoader() {
        if (this.loader) {
            this.loader.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => {
                if (this.loader.parentElement) {
                    this.loader.remove();
                }
            }, 800);
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PageLoader();
    new TemplateCarousel();
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

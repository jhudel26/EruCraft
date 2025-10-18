// Template Configuration for Modularity
const templates = {
    template1: {
        id: 'template1',
        name: 'Classic Blue',
        description: 'Professional • Traditional • Clean',
        sidebarWidth: '35%',
        sidebarBg: '#2c3e50',
        sidebarColor: 'white',
        profilePhotoBg: '#34495e',
        profilePhotoBorder: 'white',
        sectionTitleBorder: 'white',
        profilePhotoBorderRadius: '50%',
        previewHTML: `
            <div class="preview-sidebar">
                <div class="preview-photo">
                    <i class="fas fa-user"></i>
                </div>
                <div class="preview-section">
                    <h4>CONTACT</h4>
                    <div class="preview-contact">
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>+123-456-7890</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>hello@example.com</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>123 Anywhere St.</span>
                        </div>
                    </div>
                </div>
                <div class="preview-section">
                    <h4>EDUCATION</h4>
                    <div class="preview-education">
                        <div class="edu-item">
                            <strong>UNIVERSITY</strong><br>
                            Master of Business
                        </div>
                    </div>
                </div>
                <div class="preview-section">
                    <h4>SKILLS</h4>
                    <div class="preview-skills">
                        <div class="skill-item">• Project Management</div>
                        <div class="skill-item">• Leadership</div>
                        <div class="skill-item">• Communication</div>
                    </div>
                </div>
            </div>
            <div class="preview-main">
                <div class="preview-name">RICHARD SANCHEZ</div>
                <div class="preview-title">MARKETING MANAGER</div>
                <div class="preview-section">
                    <h4>ABOUT</h4>
                    <p>Experienced marketing professional with 5+ years of expertise in digital marketing, brand management, and team leadership.</p>
                </div>
                <div class="preview-section">
                    <h4>WORK EXPERIENCE</h4>
                    <div class="preview-experience">
                        <div class="exp-item">
                            <strong>Senior Marketing Manager</strong><br>
                            TechCorp Inc. • 2020-2023
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    template2: {
        id: 'template2',
        name: 'Modern Beige',
        description: 'Creative • Minimalist • Elegant',
        sidebarWidth: '30%',
        sidebarBg: '#f5f5f5',
        sidebarColor: '#333',
        profilePhotoBg: '#e8e8e8',
        profilePhotoBorder: '#ddd',
        sectionTitleBorder: '#ddd',
        profilePhotoBorderRadius: '0',
        previewHTML: `
            <div class="preview-sidebar-beige">
                <div class="preview-photo-beige">
                    <i class="fas fa-user"></i>
                </div>
                <div class="preview-contact-beige">
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>+123-456-7890</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>hello@example.com</span>
                    </div>
                </div>
                <div class="preview-section-beige">
                    <h4>Education</h4>
                    <div class="edu-item-beige">
                        <strong>Bachelor of Design</strong><br>
                        Wardiere University
                    </div>
                </div>
                <div class="preview-section-beige">
                    <h4>Expertise</h4>
                    <div class="expertise-item">Digital Marketing</div>
                    <div class="expertise-item">Branding</div>
                </div>
            </div>
            <div class="preview-main-beige">
                <div class="preview-name-beige">OLIVIA WILSON</div>
                <div class="preview-title-beige">Graphics Designer</div>
                <div class="preview-section-beige">
                    <h4>About</h4>
                    <p>Creative designer with expertise in visual identity, digital marketing, and user experience design.</p>
                </div>
                <div class="preview-section-beige">
                    <h4>Work Experience</h4>
                    <div class="exp-item-beige">
                        <strong>Creative Director</strong><br>
                        Design Studio • 2020-2023
                    </div>
                </div>
            </div>
        `
    },
    // Add similar objects for template3, template4, template5...
    template3: {
        id: 'template3',
        name: 'Teal Professional',
        description: 'Modern • Competency-based • Visual',
        sidebarWidth: '35%',
        sidebarBg: '#2c3e50',
        sidebarColor: 'white',
        profilePhotoBg: '#34495e',
        profilePhotoBorder: '#f39c12',
        sectionTitleBorder: '#f39c12',
        profilePhotoBorderRadius: '50%',
        previewHTML: `
            <div class="preview-sidebar-teal">
                <div class="preview-photo-teal">
                    <i class="fas fa-user"></i>
                </div>
                <div class="preview-section-teal">
                    <h4>ABOUT</h4>
                    <p>Highly efficient results-driven interior designer with 8+ years of experience in commercial and residential design.</p>
                    <div class="preview-attributes">
                        <div class="attr-item">• Highly Motivated</div>
                        <div class="attr-item">• Detail Oriented</div>
                    </div>
                </div>
                <div class="preview-section-teal">
                    <h4>CORE COMPETENCIES</h4>
                    <div class="competency-item">
                        <span>Space Planning</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 100%"></div>
                        </div>
                    </div>
                    <div class="competency-item">
                        <span>3D Visualization</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 90%"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="preview-main-teal">
                <div class="preview-name-teal">RYAN REYNOLDS</div>
                <div class="preview-title-teal">Interior Designer</div>
                <div class="preview-contact-teal">
                    📞 999-111-2222 • 📍 New York, NY
                </div>
                <div class="preview-section-teal">
                    <h4>WORK EXPERIENCE</h4>
                    <div class="exp-timeline">
                        <div class="timeline-item">
                            <strong>Lead Interior Designer</strong><br>
                            Design Studio • 2017-Present
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    template4: {
        id: 'template4',
        name: 'Light Blue',
        description: 'Healthcare • Professional • Trustworthy',
        sidebarWidth: '35%',
        sidebarBg: '#e0ebf2',
        sidebarColor: '#333',
        profilePhotoBg: '#bdc3c7',
        profilePhotoBorder: 'white',
        sectionTitleBorder: '#2c3e50',
        profilePhotoBorderRadius: '50%',
        previewHTML: `
            <div class="preview-sidebar-blue">
                <div class="preview-photo-blue">
                    <i class="fas fa-user"></i>
                </div>
                <div class="preview-contact-blue">
                    <h4>CONTACT</h4>
                    <div class="contact-item-blue">111 1st Avenue</div>
                    <div class="contact-item-blue">Redmond, WA 65432</div>
                    <div class="contact-item-blue">909.555.0100</div>
                </div>
                <div class="preview-section-blue">
                    <h4>COMMUNICATION</h4>
                    <p>Award for patient education and counseling excellence in healthcare communication.</p>
                </div>
                <div class="preview-section-blue">
                    <h4>LEADERSHIP</h4>
                    <p>Outstanding Nursing Student award recipient for clinical excellence and leadership.</p>
                </div>
            </div>
            <div class="preview-main-blue">
                <div class="preview-name-blue">KRISTI LAAR</div>
                <div class="preview-title-blue">REGISTERED NURSE</div>
                <div class="preview-section-blue">
                    <h4>EDUCATION</h4>
                    <div class="edu-item-blue">
                        <strong>Bellows College</strong><br>
                        Bachelors of Science in Nursing
                    </div>
                </div>
                <div class="preview-section-blue">
                    <h4>EXPERIENCE</h4>
                    <div class="exp-item-blue">
                        <strong>Registered Nurse | Pediatrics</strong><br>
                        Wholeness Healthcare • Nov 2020-Oct 2023
                    </div>
                </div>
            </div>
        `
    },
    template5: {
        id: 'template5',
        name: 'Dark Gray Modern',
        description: 'Bold • Contemporary • Striking',
        sidebarWidth: '35%',
        sidebarBg: '#2c3e50',
        sidebarColor: 'white',
        profilePhotoBg: '#34495e',
        profilePhotoBorder: 'white',
        sectionTitleBorder: 'white',
        profilePhotoBorderRadius: '50%',
        previewHTML: `
            <div class="preview-sidebar-gray">
                <div class="preview-photo-gray">
                    <i class="fas fa-user"></i>
                </div>
                <div class="preview-section-gray">
                    <h4>ABOUT ME</h4>
                    <p>Creative professional with expertise in digital marketing, brand strategy, and team leadership across diverse industries.</p>
                </div>
                <div class="preview-section-gray">
                    <h4>SKILLS</h4>
                    <div class="skill-item-gray">
                        <span>Digital Marketing</span>
                        <div class="skill-bars">
                            <div class="skill-bar active"></div>
                            <div class="skill-bar active"></div>
                            <div class="skill-bar active"></div>
                        </div>
                    </div>
                    <div class="skill-item-gray">
                        <span>Project Management</span>
                        <div class="skill-bars">
                            <div class="skill-bar active"></div>
                            <div class="skill-bar active"></div>
                            <div class="skill-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="preview-main-gray">
                <div class="preview-name-gray">AUSTIN BRONSON</div>
                <div class="preview-contact-gray">
                    4710 Bus Boulevard, Flintstone, GA<br>
                    phone: +(0) 1 2345 555
                </div>
                <div class="preview-section-gray">
                    <h4>EXPERIENCE</h4>
                    <div class="exp-item-gray">
                        <strong>SALES FORCE TEAM LEADER</strong> (2018 - Present)<br>
                        Led a team of 12 sales professionals, achieving 150% of quarterly targets through strategic planning and team development.
                    </div>
                </div>
                <div class="preview-section-gray">
                    <h4>EDUCATION</h4>
                    <div class="edu-item-gray">
                        <strong>UNIVERSITY OF BUSINESS</strong> (2014 - 2018)<br>
                        Bachelor of Science in Marketing with focus on digital strategy and consumer behavior.
                    </div>
                </div>
            </div>
        `
    }
};

// Template Selection Carousel
class TemplateCarousel {
    constructor() {
        this.currentIndex = 0;
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dots = document.querySelectorAll('.dot');
        this.selectBtn = document.getElementById('selectTemplateBtn');
        this.totalCards = Object.keys(templates).length;
        this.templates = [];

        this.init();
    }

    init() {
        this.generateTemplateCards();
        this.bindEvents();
        this.updateCarousel();
    }

    generateTemplateCards() {
        this.track.innerHTML = '';
        Object.values(templates).forEach((template, index) => {
            const card = document.createElement('div');
            card.className = `template-card ${index === 0 ? 'active' : ''}`;
            card.dataset.template = template.id;
            card.innerHTML = `
                <div class="template-preview ${template.id}">
                    ${template.previewHTML}
                </div>
                <div class="template-info">
                    <h3>${template.name}</h3>
                    <p>${template.description}</p>
                </div>
            `;
            this.track.appendChild(card);
            this.templates.push(card);
        });
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
            const activeElement = document.activeElement;
            const isOnCarousel = activeElement && (activeElement.classList.contains('template-card') || activeElement.classList.contains('dot') || activeElement === this.selectBtn);
            if (e.key === 'Enter' && isOnCarousel) this.selectTemplate();
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
        const template = templates[selectedTemplate];

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

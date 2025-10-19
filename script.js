// Template Configuration for Modularity
const templates = {
    template1: {
        id: 'template1',
        name: 'Executive Classic',
        description: 'Corporate • Professional • Traditional',
        sidebarWidth: '35%',
        sidebarBg: '#1a365d',
        sidebarColor: 'white',
        profilePhotoBg: '#2d3748',
        profilePhotoBorder: '#4299e1',
        sectionTitleBorder: '#4299e1',
        profilePhotoBorderRadius: '50%',
        accentColor: '#4299e1',
        layout: 'traditional',
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
        name: 'Creative Portfolio',
        description: 'Artistic • Colorful • Dynamic',
        sidebarWidth: '40%',
        sidebarBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        sidebarColor: 'white',
        profilePhotoBg: 'rgba(255,255,255,0.2)',
        profilePhotoBorder: 'rgba(255,255,255,0.5)',
        sectionTitleBorder: 'rgba(255,255,255,0.8)',
        profilePhotoBorderRadius: '20px',
        accentColor: '#ff6b6b',
        layout: 'creative',
        previewHTML: `
            <div class="preview-sidebar-creative">
                <div class="preview-photo-creative">
                    <i class="fas fa-user"></i>
                </div>
                <div class="preview-section-creative">
                    <h4>CONTACT</h4>
                    <div class="preview-contact-creative">
                        <div class="contact-item-creative">
                            <i class="fas fa-phone"></i>
                            <span>+123-456-7890</span>
                        </div>
                        <div class="contact-item-creative">
                            <i class="fas fa-envelope"></i>
                            <span>hello@example.com</span>
                        </div>
                        <div class="contact-item-creative">
                            <i class="fas fa-globe"></i>
                            <span>portfolio.com</span>
                        </div>
                    </div>
                </div>
                <div class="preview-section-creative">
                    <h4>TOOLS & SKILLS</h4>
                    <div class="skills-grid-creative">
                        <div class="skill-tag">Photoshop</div>
                        <div class="skill-tag">Illustrator</div>
                        <div class="skill-tag">Figma</div>
                        <div class="skill-tag">After Effects</div>
                    </div>
                </div>
            </div>
            <div class="preview-main-creative">
                <div class="preview-name-creative">OLIVIA WILSON</div>
                <div class="preview-title-creative">Creative Director</div>
                <div class="preview-section-creative">
                    <h4>ABOUT</h4>
                    <p>Passionate creative professional with 8+ years transforming brands through innovative design and strategic thinking.</p>
                </div>
                <div class="preview-section-creative">
                    <h4>FEATURED PROJECTS</h4>
                    <div class="project-item-creative">
                        <strong>Brand Identity Redesign</strong><br>
                        <span class="project-client">TechStart Inc. • 2023</span>
                    </div>
                    <div class="project-item-creative">
                        <strong>Mobile App Design</strong><br>
                        <span class="project-client">FinanceApp • 2022</span>
                    </div>
                </div>
            </div>
        `
    },
    // Add similar objects for template3, template4, template5...
    template3: {
        id: 'template3',
        name: 'Tech Modern',
        description: 'Innovative • Data-driven • Sleek',
        sidebarWidth: '30%',
        sidebarBg: '#0f172a',
        sidebarColor: 'white',
        profilePhotoBg: '#1e293b',
        profilePhotoBorder: '#06b6d4',
        sectionTitleBorder: '#06b6d4',
        profilePhotoBorderRadius: '8px',
        accentColor: '#06b6d4',
        layout: 'tech',
        previewHTML: `
            <div class="preview-sidebar-tech">
                <div class="preview-photo-tech">
                    <i class="fas fa-user"></i>
                </div>
                <div class="preview-section-tech">
                    <h4>CONTACT</h4>
                    <div class="preview-contact-tech">
                        <div class="contact-item-tech">
                            <i class="fas fa-phone"></i>
                            <span>+123-456-7890</span>
                        </div>
                        <div class="contact-item-tech">
                            <i class="fas fa-envelope"></i>
                            <span>hello@example.com</span>
                        </div>
                        <div class="contact-item-tech">
                            <i class="fab fa-github"></i>
                            <span>github.com/username</span>
                        </div>
                    </div>
                </div>
                <div class="preview-section-tech">
                    <h4>TECH STACK</h4>
                    <div class="tech-stack">
                        <div class="tech-category">
                            <strong>Frontend</strong>
                            <div class="tech-items">React, Vue.js, TypeScript</div>
                        </div>
                        <div class="tech-category">
                            <strong>Backend</strong>
                            <div class="tech-items">Node.js, Python, Go</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="preview-main-tech">
                <div class="preview-name-tech">ALEX CHEN</div>
                <div class="preview-title-tech">Full Stack Developer</div>
                <div class="preview-section-tech">
                    <h4>ABOUT</h4>
                    <p>Innovative developer with 6+ years building scalable web applications and leading technical teams in fast-paced environments.</p>
                </div>
                <div class="preview-section-tech">
                    <h4>EXPERIENCE</h4>
                    <div class="exp-item-tech">
                        <div class="exp-header-tech">
                            <strong>Senior Software Engineer</strong>
                            <span class="exp-dates">2021 - Present</span>
                        </div>
                        <div class="exp-company-tech">TechCorp Inc.</div>
                        <div class="exp-desc-tech">Led development of microservices architecture serving 1M+ users</div>
                    </div>
                </div>
            </div>
        `
    },
    template4: {
        id: 'template4',
        name: 'Medical Professional',
        description: 'Healthcare • Trustworthy • Caring',
        sidebarWidth: '35%',
        sidebarBg: '#f0f9ff',
        sidebarColor: '#1e40af',
        profilePhotoBg: '#dbeafe',
        profilePhotoBorder: '#3b82f6',
        sectionTitleBorder: '#3b82f6',
        profilePhotoBorderRadius: '50%',
        accentColor: '#3b82f6',
        layout: 'medical',
        previewHTML: `
            <div class="preview-sidebar-medical">
                <div class="preview-photo-medical">
                    <i class="fas fa-user-md"></i>
                </div>
                <div class="preview-section-medical">
                    <h4>CONTACT</h4>
                    <div class="preview-contact-medical">
                        <div class="contact-item-medical">
                            <i class="fas fa-phone"></i>
                            <span>+123-456-7890</span>
                        </div>
                        <div class="contact-item-medical">
                            <i class="fas fa-envelope"></i>
                            <span>dr.smith@hospital.com</span>
                        </div>
                        <div class="contact-item-medical">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Medical Center, NY</span>
                        </div>
                    </div>
                </div>
                <div class="preview-section-medical">
                    <h4>CERTIFICATIONS</h4>
                    <div class="cert-item-medical">
                        <i class="fas fa-certificate"></i>
                        <span>Board Certified</span>
                    </div>
                    <div class="cert-item-medical">
                        <i class="fas fa-certificate"></i>
                        <span>ACLS Certified</span>
                    </div>
                </div>
                <div class="preview-section-medical">
                    <h4>SPECIALTIES</h4>
                    <div class="specialty-tags">
                        <span class="specialty-tag">Internal Medicine</span>
                        <span class="specialty-tag">Cardiology</span>
                    </div>
                </div>
            </div>
            <div class="preview-main-medical">
                <div class="preview-name-medical">DR. SARAH SMITH</div>
                <div class="preview-title-medical">Internal Medicine Physician</div>
                <div class="preview-section-medical">
                    <h4>PROFESSIONAL SUMMARY</h4>
                    <p>Dedicated physician with 10+ years of experience in internal medicine, committed to providing exceptional patient care and advancing medical knowledge through research.</p>
                </div>
                <div class="preview-section-medical">
                    <h4>EDUCATION</h4>
                    <div class="edu-item-medical">
                        <strong>Johns Hopkins University</strong><br>
                        Doctor of Medicine (MD) • 2010-2014
                    </div>
                </div>
                <div class="preview-section-medical">
                    <h4>CLINICAL EXPERIENCE</h4>
                    <div class="exp-item-medical">
                        <strong>Senior Physician</strong><br>
                        <span class="exp-company-medical">City General Hospital • 2018-Present</span>
                    </div>
                </div>
            </div>
        `
    },
    template5: {
        id: 'template5',
        name: 'Bold Executive',
        description: 'Powerful • Confident • Impactful',
        sidebarWidth: '40%',
        sidebarBg: '#000000',
        sidebarColor: 'white',
        profilePhotoBg: '#1a1a1a',
        profilePhotoBorder: '#ffd700',
        sectionTitleBorder: '#ffd700',
        profilePhotoBorderRadius: '0',
        accentColor: '#ffd700',
        layout: 'executive',
        previewHTML: `
            <div class="preview-sidebar-executive">
                <div class="preview-photo-executive">
                    <i class="fas fa-user-tie"></i>
                </div>
                <div class="preview-section-executive">
                    <h4>CONTACT</h4>
                    <div class="preview-contact-executive">
                        <div class="contact-item-executive">
                            <i class="fas fa-phone"></i>
                            <span>+123-456-7890</span>
                        </div>
                        <div class="contact-item-executive">
                            <i class="fas fa-envelope"></i>
                            <span>ceo@company.com</span>
                        </div>
                        <div class="contact-item-executive">
                            <i class="fab fa-linkedin"></i>
                            <span>linkedin.com/in/executive</span>
                        </div>
                    </div>
                </div>
                <div class="preview-section-executive">
                    <h4>ACHIEVEMENTS</h4>
                    <div class="achievement-item">
                        <div class="achievement-number">$50M+</div>
                        <div class="achievement-desc">Revenue Growth</div>
                    </div>
                    <div class="achievement-item">
                        <div class="achievement-number">500+</div>
                        <div class="achievement-desc">Team Members</div>
                    </div>
                </div>
                <div class="preview-section-executive">
                    <h4>LEADERSHIP</h4>
                    <div class="leadership-skills">
                        <span class="leadership-tag">Strategic Planning</span>
                        <span class="leadership-tag">Team Building</span>
                        <span class="leadership-tag">Innovation</span>
                    </div>
                </div>
            </div>
            <div class="preview-main-executive">
                <div class="preview-name-executive">MICHAEL JOHNSON</div>
                <div class="preview-title-executive">Chief Executive Officer</div>
                <div class="preview-section-executive">
                    <h4>EXECUTIVE SUMMARY</h4>
                    <p>Visionary leader with 15+ years of experience driving organizational growth, strategic transformation, and market expansion across global enterprises.</p>
                </div>
                <div class="preview-section-executive">
                    <h4>EXECUTIVE EXPERIENCE</h4>
                    <div class="exp-item-executive">
                        <div class="exp-header-executive">
                            <strong>Chief Executive Officer</strong>
                            <span class="exp-dates">2019 - Present</span>
                        </div>
                        <div class="exp-company-executive">Global Tech Solutions</div>
                        <div class="exp-desc-executive">Led company through IPO and 300% revenue growth, expanding to 15 countries</div>
                    </div>
                </div>
                <div class="preview-section-executive">
                    <h4>EDUCATION</h4>
                    <div class="edu-item-executive">
                        <strong>Harvard Business School</strong><br>
                        Master of Business Administration (MBA) • 2005-2007
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


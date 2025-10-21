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
            <div class="resume-sidebar">
                <div class="profile-photo">
                    <i class="fas fa-user"></i>
                </div>
                <div class="contact-info">
                    <div class="section-title blue">CONTACT</div>
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
                <div class="skills-section">
                    <div class="section-title blue">SKILLS</div>
                    <ul class="skills-list">
                        <li>• Project Management</li>
                        <li>• Leadership</li>
                        <li>• Communication</li>
                    </ul>
                </div>
            </div>
            <div class="resume-main">
                <div class="resume-name">RICHARD SANCHEZ</div>
                <div class="resume-title">MARKETING MANAGER</div>
                <div class="about-section">
                    <div class="section-title main">ABOUT</div>
                    <p>Experienced marketing professional with 5+ years of expertise in digital marketing, brand management, and team leadership.</p>
                </div>
                <div class="experience-section">
                    <div class="section-title main">WORK EXPERIENCE</div>
                    <div class="experience-item-preview">
                        <div class="experience-header">
                            <div>
                                <div class="experience-position">Senior Marketing Manager</div>
                                <div class="experience-company">TechCorp Inc.</div>
                            </div>
                            <div class="experience-dates">2020 - 2023</div>
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
            <div class="resume-sidebar">
                <div class="profile-photo">
                    <i class="fas fa-user"></i>
                </div>
                <div class="contact-info">
                    <div class="section-title blue">CONTACT</div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>+123-456-7890</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>hello@example.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-globe"></i>
                        <span>portfolio.com</span>
                    </div>
                </div>
                <div class="skills-section">
                    <div class="section-title blue">TOOLS & SKILLS</div>
                    <ul class="skills-list">
                        <li>• Photoshop</li>
                        <li>• Illustrator</li>
                        <li>• Figma</li>
                        <li>• After Effects</li>
                    </ul>
                </div>
            </div>
            <div class="resume-main">
                <div class="resume-name">OLIVIA WILSON</div>
                <div class="resume-title">Creative Director</div>
                <div class="about-section">
                    <div class="section-title main">ABOUT</div>
                    <p>Passionate creative professional with 8+ years transforming brands through innovative design and strategic thinking.</p>
                </div>
                <div class="experience-section">
                    <div class="section-title main">FEATURED PROJECTS</div>
                    <div class="experience-item-preview">
                        <div class="experience-header">
                            <div>
                                <div class="experience-position">Brand Identity Redesign</div>
                                <div class="experience-company">TechStart Inc.</div>
                            </div>
                            <div class="experience-dates">2023</div>
                        </div>
                    </div>
                    <div class="experience-item-preview">
                        <div class="experience-header">
                            <div>
                                <div class="experience-position">Mobile App Design</div>
                                <div class="experience-company">FinanceApp</div>
                            </div>
                            <div class="experience-dates">2022</div>
                        </div>
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
            <div class="resume-sidebar">
                <div class="profile-photo">
                    <i class="fas fa-user"></i>
                </div>
                <div class="contact-info">
                    <div class="section-title blue">CONTACT</div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>+123-456-7890</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>hello@example.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-github"></i>
                        <span>github.com/username</span>
                    </div>
                </div>
                <div class="skills-section">
                    <div class="section-title blue">TECH STACK</div>
                    <ul class="skills-list">
                        <li>• React, Vue.js, TypeScript</li>
                        <li>• Node.js, Python, Go</li>
                        <li>• AWS, Docker, Kubernetes</li>
                    </ul>
                </div>
            </div>
            <div class="resume-main">
                <div class="resume-name">ALEX CHEN</div>
                <div class="resume-title">Full Stack Developer</div>
                <div class="about-section">
                    <div class="section-title main">ABOUT</div>
                    <p>Innovative developer with 6+ years building scalable web applications and leading technical teams in fast-paced environments.</p>
                </div>
                <div class="experience-section">
                    <div class="section-title main">EXPERIENCE</div>
                    <div class="experience-item-preview">
                        <div class="experience-header">
                            <div>
                                <div class="experience-position">Senior Software Engineer</div>
                                <div class="experience-company">TechCorp Inc.</div>
                            </div>
                            <div class="experience-dates">2021 - Present</div>
                        </div>
                        <div class="experience-description">Led development of microservices architecture serving 1M+ users</div>
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
            <div class="resume-sidebar">
                <div class="profile-photo">
                    <i class="fas fa-user-md"></i>
                </div>
                <div class="contact-info">
                    <div class="section-title blue">CONTACT</div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>+123-456-7890</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>dr.smith@hospital.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Medical Center, NY</span>
                    </div>
                </div>
                <div class="skills-section">
                    <div class="section-title blue">CERTIFICATIONS</div>
                    <ul class="skills-list">
                        <li>• Board Certified</li>
                        <li>• ACLS Certified</li>
                        <li>• Internal Medicine</li>
                        <li>• Cardiology</li>
                    </ul>
                </div>
            </div>
            <div class="resume-main">
                <div class="resume-name">DR. SARAH SMITH</div>
                <div class="resume-title">Internal Medicine Physician</div>
                <div class="about-section">
                    <div class="section-title main">PROFESSIONAL SUMMARY</div>
                    <p>Dedicated physician with 10+ years of experience in internal medicine, committed to providing exceptional patient care and advancing medical knowledge through research.</p>
                </div>
                <div class="education-section">
                    <div class="section-title main">EDUCATION</div>
                    <div class="education-item-preview">
                        <div class="education-header">
                            <div>
                                <div class="education-degree">Doctor of Medicine (MD)</div>
                                <div class="education-institution">Johns Hopkins University</div>
                            </div>
                            <div class="education-dates">2010 - 2014</div>
                        </div>
                    </div>
                </div>
                <div class="experience-section">
                    <div class="section-title main">CLINICAL EXPERIENCE</div>
                    <div class="experience-item-preview">
                        <div class="experience-header">
                            <div>
                                <div class="experience-position">Senior Physician</div>
                                <div class="experience-company">City General Hospital</div>
                            </div>
                            <div class="experience-dates">2018 - Present</div>
                        </div>
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
            <div class="resume-sidebar">
                <div class="profile-photo">
                    <i class="fas fa-user-tie"></i>
                </div>
                <div class="contact-info">
                    <div class="section-title blue">CONTACT</div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>+123-456-7890</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>ceo@company.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-linkedin"></i>
                        <span>linkedin.com/in/executive</span>
                    </div>
                </div>
                <div class="skills-section">
                    <div class="section-title blue">LEADERSHIP</div>
                    <ul class="skills-list">
                        <li>• Strategic Planning</li>
                        <li>• Team Building</li>
                        <li>• Innovation</li>
                        <li>• Revenue Growth: $50M+</li>
                    </ul>
                </div>
            </div>
            <div class="resume-main">
                <div class="resume-name">MICHAEL JOHNSON</div>
                <div class="resume-title">Chief Executive Officer</div>
                <div class="about-section">
                    <div class="section-title main">EXECUTIVE SUMMARY</div>
                    <p>Visionary leader with 15+ years of experience driving organizational growth, strategic transformation, and market expansion across global enterprises.</p>
                </div>
                <div class="experience-section">
                    <div class="section-title main">EXECUTIVE EXPERIENCE</div>
                    <div class="experience-item-preview">
                        <div class="experience-header">
                            <div>
                                <div class="experience-position">Chief Executive Officer</div>
                                <div class="experience-company">Global Tech Solutions</div>
                            </div>
                            <div class="experience-dates">2019 - Present</div>
                        </div>
                        <div class="experience-description">Led company through IPO and 300% revenue growth, expanding to 15 countries</div>
                    </div>
                </div>
                <div class="education-section">
                    <div class="section-title main">EDUCATION</div>
                    <div class="education-item-preview">
                        <div class="education-header">
                            <div>
                                <div class="education-degree">Master of Business Administration (MBA)</div>
                                <div class="education-institution">Harvard Business School</div>
                            </div>
                            <div class="education-dates">2005 - 2007</div>
                        </div>
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



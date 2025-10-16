// Form and Preview Management
class ResumeBuilder {
    constructor() {
        this.selectedTemplate = localStorage.getItem('selectedTemplate') || 'template1';
        this.zoomLevel = 1;
        this.updateTimeout = null;
        this.formSections = {
            personalInfo: true,
            summary: true,
            experience: true,
            education: true,
            skills: true,
            languages: true
        };
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.generatePreview();
        this.setupImageUpload();
        this.setupFormToggles();
        this.loadSavedData();
    }

    // HTML sanitization to prevent XSS attacks
    sanitizeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Auto-save functionality
    saveData() {
        const formData = {
            personalInfo: {
                fullName: document.getElementById('fullName').value,
                jobTitle: document.getElementById('jobTitle').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                website: document.getElementById('website').value
            },
            summary: document.getElementById('summary').value,
            experience: this.getExperienceData(),
            education: this.getEducationData(),
            skills: document.getElementById('skills').value,
            languages: document.getElementById('languages').value,
            formSections: this.formSections
        };
        
        try {
            localStorage.setItem('resumeData', JSON.stringify(formData));
        } catch (error) {
            console.warn('Could not save data to localStorage:', error);
        }
    }

    loadSavedData() {
        try {
            const savedData = localStorage.getItem('resumeData');
            if (savedData) {
                const data = JSON.parse(savedData);
                
                // Load personal info
                if (data.personalInfo) {
                    Object.keys(data.personalInfo).forEach(key => {
                        const element = document.getElementById(key);
                        if (element) element.value = data.personalInfo[key];
                    });
                }
                
                // Load other fields
                if (data.summary) document.getElementById('summary').value = data.summary;
                if (data.skills) document.getElementById('skills').value = data.skills;
                if (data.languages) document.getElementById('languages').value = data.languages;
                
                // Load form sections state
                if (data.formSections) {
                    this.formSections = data.formSections;
                    this.updateFormToggles();
                }
                
                // Load experience and education
                if (data.experience && data.experience.length > 0) {
                    this.loadExperienceData(data.experience);
                }
                if (data.education && data.education.length > 0) {
                    this.loadEducationData(data.education);
                }
                
                this.updatePreview();
            }
        } catch (error) {
            console.warn('Could not load saved data:', error);
        }
    }

    getExperienceData() {
        const experienceItems = document.querySelectorAll('.experience-item');
        return Array.from(experienceItems).map(item => ({
            company: item.querySelector('.experience-company').value,
            position: item.querySelector('.experience-position').value,
            startDate: item.querySelector('.experience-start').value,
            endDate: item.querySelector('.experience-end').value,
            description: item.querySelector('.experience-description').value
        }));
    }

    getEducationData() {
        const educationItems = document.querySelectorAll('.education-item');
        return Array.from(educationItems).map(item => ({
            institution: item.querySelector('.education-institution').value,
            degree: item.querySelector('.education-degree').value,
            startDate: item.querySelector('.education-start').value,
            endDate: item.querySelector('.education-end').value,
            info: item.querySelector('.education-info').value
        }));
    }

    loadExperienceData(experienceData) {
        const container = document.getElementById('experienceContainer');
        container.innerHTML = '';
        
        experienceData.forEach((exp, index) => {
            if (index > 0) this.addExperience();
            const items = container.querySelectorAll('.experience-item');
            const currentItem = items[index];
            
            if (currentItem) {
                currentItem.querySelector('.experience-company').value = exp.company || '';
                currentItem.querySelector('.experience-position').value = exp.position || '';
                currentItem.querySelector('.experience-start').value = exp.startDate || '';
                currentItem.querySelector('.experience-end').value = exp.endDate || '';
                currentItem.querySelector('.experience-description').value = exp.description || '';
            }
        });
    }

    loadEducationData(educationData) {
        const container = document.getElementById('educationContainer');
        container.innerHTML = '';
        
        educationData.forEach((edu, index) => {
            if (index > 0) this.addEducation();
            const items = container.querySelectorAll('.education-item');
            const currentItem = items[index];
            
            if (currentItem) {
                currentItem.querySelector('.education-institution').value = edu.institution || '';
                currentItem.querySelector('.education-degree').value = edu.degree || '';
                currentItem.querySelector('.education-start').value = edu.startDate || '';
                currentItem.querySelector('.education-end').value = edu.endDate || '';
                currentItem.querySelector('.education-info').value = edu.info || '';
            }
        });
    }

    // Debounced update for better performance
    debouncedUpdate() {
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }
        this.updateTimeout = setTimeout(() => {
            this.updatePreview();
        }, 300);
    }

    // Setup form section toggles
    setupFormToggles() {
        // This will be called after the HTML is updated
        setTimeout(() => {
            this.updateFormToggles();
        }, 100);
    }

    updateFormToggles() {
        const sections = [
            { key: 'summary', selector: '#summary' },
            { key: 'experience', selector: '#experienceContainer' },
            { key: 'education', selector: '#educationContainer' },
            { key: 'skills', selector: '#skills' },
            { key: 'languages', selector: '#languages' }
        ];

        sections.forEach(section => {
            const element = document.querySelector(section.selector);
            if (element) {
                const sectionWrapper = element.closest('.form-section') || element.parentElement;
                if (sectionWrapper) {
                    this.toggleSection(sectionWrapper, this.formSections[section.key]);
                }
            }
        });
    }

    toggleSection(sectionWrapper, isEnabled) {
        if (isEnabled) {
            sectionWrapper.style.display = 'block';
            sectionWrapper.style.opacity = '1';
        } else {
            sectionWrapper.style.display = 'none';
            sectionWrapper.style.opacity = '0.5';
        }
    }

    toggleFormSection(sectionType, isEnabled) {
        const sectionSelectors = {
            summary: '.summary-section',
            experience: '.experience-section',
            education: '.education-section',
            skills: '.skills-section',
            languages: '.languages-section'
        };

        const toggleSelectors = {
            summary: '#toggle-summary',
            experience: '#toggle-experience',
            education: '#toggle-education',
            skills: '#toggle-skills',
            languages: '#toggle-languages'
        };

        const selector = sectionSelectors[sectionType];
        const toggleSelector = toggleSelectors[sectionType];
        
        if (selector) {
            const sections = document.querySelectorAll(selector);
            sections.forEach(section => {
                if (isEnabled) {
                    section.classList.remove('disabled');
                    section.setAttribute('aria-hidden', 'false');
                } else {
                    section.classList.add('disabled');
                    section.setAttribute('aria-hidden', 'true');
                }
            });
        }

        // Update ARIA attributes for toggle switch
        if (toggleSelector) {
            const toggle = document.querySelector(toggleSelector);
            const slider = toggle.querySelector('.slider');
            if (slider) {
                slider.setAttribute('aria-checked', isEnabled.toString());
            }
        }

        this.updatePreview();
    }
    
    bindEvents() {
        // Form inputs with debounced updates
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.debouncedUpdate();
                this.saveData();
            });
        });

        // Toggle switches
        document.getElementById('toggle-summary').addEventListener('change', (e) => {
            this.formSections.summary = e.target.checked;
            this.toggleFormSection('summary', e.target.checked);
            this.saveData();
        });

        document.getElementById('toggle-experience').addEventListener('change', (e) => {
            this.formSections.experience = e.target.checked;
            this.toggleFormSection('experience', e.target.checked);
            this.saveData();
        });

        document.getElementById('toggle-education').addEventListener('change', (e) => {
            this.formSections.education = e.target.checked;
            this.toggleFormSection('education', e.target.checked);
            this.saveData();
        });

        document.getElementById('toggle-skills').addEventListener('change', (e) => {
            this.formSections.skills = e.target.checked;
            this.toggleFormSection('skills', e.target.checked);
            this.saveData();
        });

        document.getElementById('toggle-languages').addEventListener('change', (e) => {
            this.formSections.languages = e.target.checked;
            this.toggleFormSection('languages', e.target.checked);
            this.saveData();
        });
        
        // Add/Remove Experience
        document.getElementById('addExperience').addEventListener('click', () => this.addExperience());
        document.getElementById('addEducation').addEventListener('click', () => this.addEducation());
        
        // Zoom controls
        document.getElementById('zoomIn').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoomOut').addEventListener('click', () => this.zoomOut());
        
        // Download button
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadPDF());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Escape key to close notifications
            if (e.key === 'Escape') {
                const notifications = document.querySelectorAll('.error-notification, .success-notification');
                notifications.forEach(notification => notification.remove());
            }
            
            // Ctrl/Cmd + S to save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveData();
                this.showSuccess('Data saved successfully!');
            }
        });
        
        // Remove buttons (delegated event handling)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-experience')) {
                this.removeExperience(e.target.closest('.experience-item'));
            }
            if (e.target.classList.contains('remove-education')) {
                this.removeEducation(e.target.closest('.education-item'));
            }
        });
    }
    
    setupImageUpload() {
        const imageUploadArea = document.getElementById('imageUploadArea');
        const imageInput = document.getElementById('profileImage');
        const imagePreview = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImg');
        const removeImageBtn = document.getElementById('removeImage');

        // Click to upload
        imageUploadArea.addEventListener('click', () => {
            imageInput.click();
        });

        // File input change
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleImageFile(file);
            }
        });

        // Drag and drop
        imageUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUploadArea.classList.add('drag-over');
        });

        imageUploadArea.addEventListener('dragleave', () => {
            imageUploadArea.classList.remove('drag-over');
        });

        imageUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUploadArea.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleImageFile(file);
            }
        });

        // Remove image
        removeImageBtn.addEventListener('click', () => {
            this.removeImage();
        });
    }

    handleImageFile(file) {
        // Validate file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
            this.showError('File size must be less than 2MB');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showError('Please select an image file');
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                try {
                    // Compress image if needed
                    const compressedData = this.compressImage(img, file.type);

                    localStorage.setItem('profileImage', compressedData);

                    // Show preview
                    this.showImagePreview(compressedData);

                    // Update resume preview
                    this.updatePreview();
                } catch (error) {
                    console.error('Error processing image:', error);
                    this.showError('Error processing image. Please try again.');
                }
            };

            img.onerror = () => {
                this.showError('Error loading image. Please try again.');
            };

            img.src = e.target.result;
        };

        reader.onerror = () => {
            this.showError('Error reading file. Please try again.');
        };

        reader.readAsDataURL(file);
    }

    compressImage(img, mimeType) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate new dimensions (max 300x300 for profile images)
        const maxSize = 300;
        let { width, height } = img;

        if (width > height) {
            if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
            }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        // Return compressed image data
        return canvas.toDataURL(mimeType, 0.8); // 80% quality
    }

    showError(message) {
        // Remove existing error notifications
        const existingErrors = document.querySelectorAll('.error-notification');
        existingErrors.forEach(error => error.remove());

        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">×</button>
            </div>
        `;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
            font-family: 'Inter', sans-serif;
        `;

        document.body.appendChild(errorDiv);

        // Remove after 8 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 8000);
    }

    showSuccess(message) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.success-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create success notification
        const successDiv = document.createElement('div');
        successDiv.className = 'success-notification';
        successDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
            font-family: 'Inter', sans-serif;
        `;

        document.body.appendChild(successDiv);

        // Remove after 3 seconds
        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 3000);
    }

    validateForm() {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (!fullName) {
            this.showError('Please enter your full name');
            return false;
        }
        
        if (!email) {
            this.showError('Please enter your email address');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('Please enter a valid email address');
            return false;
        }
        
        return true;
    }

    showImagePreview(imageData) {
        const imageUploadArea = document.getElementById('imageUploadArea');
        const imagePreview = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImg');

        previewImg.src = imageData;
        imageUploadArea.style.display = 'none';
        imagePreview.style.display = 'block';
    }

    removeImage() {
        const imageUploadArea = document.getElementById('imageUploadArea');
        const imagePreview = document.getElementById('imagePreview');
        const imageInput = document.getElementById('profileImage');

        localStorage.removeItem('profileImage');
        imageInput.value = '';
        imageUploadArea.style.display = 'block';
        imagePreview.style.display = 'none';

        // Update resume preview
        this.updatePreview();
    }
    
    generatePreview() {
        const previewContainer = document.getElementById('resumePreview');
        const templateClass = this.getTemplateClass();
        
        // Clear any existing content first
        previewContainer.innerHTML = '';
        
        // Create the resume template
        const resumeTemplate = document.createElement('div');
        resumeTemplate.className = `resume-template ${templateClass}`;
        resumeTemplate.id = 'resumeTemplate';
        
        // Add sidebar
        resumeTemplate.innerHTML = this.getSidebarHTML();
        
        // Create main content container
        const mainContent = document.createElement('div');
        mainContent.className = 'resume-main';
        
        // Ensure job title is properly handled
        const fullName = this.sanitizeHTML(document.getElementById('fullName').value) || 'Your Name';
        const jobTitleInput = document.getElementById('jobTitle');
        const jobTitle = jobTitleInput ? jobTitleInput.value.trim() : '';
        
        // Create name element
        const nameElement = document.createElement('div');
        nameElement.className = 'resume-name';
        nameElement.textContent = fullName.toUpperCase();
        mainContent.appendChild(nameElement);
        
        // Create job title element only if there's content (leave blank for fresh graduates)
        if (jobTitle && jobTitle.length > 0) {
            const titleElement = document.createElement('div');
            titleElement.className = 'resume-title';
            titleElement.textContent = this.sanitizeHTML(jobTitle).toUpperCase();
            mainContent.appendChild(titleElement);
        } else {
            // Add spacer with line to maintain consistent spacing when no title is present
            const spacerElement = document.createElement('div');
            spacerElement.className = 'resume-title-spacer';
            spacerElement.innerHTML = '<div class="resume-name-underline"></div>';
            mainContent.appendChild(spacerElement);
        }
        
        // Add experience and education
        const experienceHTML = this.getExperienceHTML();
        const educationHTML = this.getEducationHTML();
        mainContent.innerHTML += experienceHTML + educationHTML;
        
        resumeTemplate.appendChild(mainContent);
        previewContainer.appendChild(resumeTemplate);
        
        this.applyZoom();
    }
    
    getTemplateClass() {
        const templateMap = {
            'template1': 'template-1',
            'template2': 'template-2',
            'template3': 'template-3',
            'template4': 'template-4',
            'template5': 'template-5'
        };
        return templateMap[this.selectedTemplate] || 'template-1';
    }

    getTemplateColors() {
        const templateColors = {
            'template1': {
                width: '35%',
                background: '#2c3e50',
                color: 'white',
                profilePhotoBg: '#34495e',
                profilePhotoBorder: 'white',
                sectionTitleBorder: 'white',
                profilePhotoBorderRadius: '50%'
            },
            'template2': {
                width: '30%',
                background: '#f5f5f5',
                color: '#333',
                profilePhotoBg: '#e8e8e8',
                profilePhotoBorder: '#ddd',
                sectionTitleBorder: '#ddd',
                profilePhotoBorderRadius: '0' // Square shape for Template 2
            },
            'template3': {
                width: '35%',
                background: '#2c3e50',
                color: 'white',
                profilePhotoBg: '#34495e',
                profilePhotoBorder: '#f39c12',
                sectionTitleBorder: '#f39c12',
                profilePhotoBorderRadius: '50%'
            },
            'template4': {
                width: '35%',
                background: '#e0ebf2',
                color: '#333',
                profilePhotoBg: '#bdc3c7',
                profilePhotoBorder: 'white',
                sectionTitleBorder: '#2c3e50',
                profilePhotoBorderRadius: '50%'
            },
            'template5': {
                width: '35%',
                background: '#2c3e50',
                color: 'white',
                profilePhotoBg: '#34495e',
                profilePhotoBorder: 'white',
                sectionTitleBorder: 'white',
                profilePhotoBorderRadius: '50%'
            }
        };
        return templateColors[this.selectedTemplate] || templateColors['template1'];
    }

    getProfileImageHTML() {
        const profileImage = localStorage.getItem('profileImage');
        const templateColors = this.getTemplateColors();
        
        if (profileImage) {
            return `<img src="${profileImage}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: ${templateColors.profilePhotoBorderRadius};">`;
        } else {
            return `<i class="fas fa-user"></i>`;
        }
    }
    
    getSidebarHTML() {
        const fullName = this.sanitizeHTML(document.getElementById('fullName').value) || 'Your Name';
        const email = this.sanitizeHTML(document.getElementById('email').value) || 'your.email@example.com';
        const phone = this.sanitizeHTML(document.getElementById('phone').value) || '+1 (555) 123-4567';
        const address = this.sanitizeHTML(document.getElementById('address').value) || '123 Main Street, City, State';
        const website = this.sanitizeHTML(document.getElementById('website').value) || '';
        const skills = this.sanitizeHTML(document.getElementById('skills').value) || '';
        const languages = this.sanitizeHTML(document.getElementById('languages').value) || '';
        const summary = this.sanitizeHTML(document.getElementById('summary').value) || '';
        
        const skillsList = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
        const languagesList = languages.split(',').map(lang => lang.trim()).filter(lang => lang);
        
        return `
            <div class="resume-sidebar">
                <div class="profile-photo">
                    ${this.getProfileImageHTML()}
                </div>
                
                <div class="contact-info">
                    <div class="section-title blue">CONTACT</div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>${phone}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${email}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${address}</span>
                    </div>
                    ${website ? `
                    <div class="contact-item">
                        <i class="fas fa-globe"></i>
                        <span>${website}</span>
                    </div>
                    ` : ''}
                </div>
                
                ${summary && this.formSections.summary ? `
                <div class="summary-section">
                    <div class="section-title blue">SUMMARY</div>
                    <p style="font-size: 13px; line-height: 1.4;">${summary}</p>
                </div>
                ` : ''}
                
                ${skillsList.length > 0 && this.formSections.skills ? `
                <div class="skills-section">
                    <div class="section-title blue">SKILLS</div>
                    <ul class="skills-list">
                        ${skillsList.map(skill => `<li>• ${skill}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${languagesList.length > 0 && this.formSections.languages ? `
                <div class="languages-section">
                    <div class="section-title blue">LANGUAGES</div>
                    <ul class="languages-list">
                        ${languagesList.map(lang => `<li>• ${lang}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        `;
    }
    
    getMainContentHTML() {
        // This method is no longer used - content is built in generatePreview()
        // Keeping it for compatibility but it won't be called
        return '';
    }
    
    getExperienceHTML() {
        const experienceItems = document.querySelectorAll('.experience-item');
        if (experienceItems.length === 0) return '';
        
        const experienceHTML = Array.from(experienceItems).map(item => {
            const company = item.querySelector('.experience-company').value;
            const position = item.querySelector('.experience-position').value;
            const startDate = item.querySelector('.experience-start').value;
            const endDate = item.querySelector('.experience-end').value;
            const description = item.querySelector('.experience-description').value;
            
            if (!company && !position) return '';
            
            const formatDate = (date) => {
                if (!date) return '';
                const [year, month] = date.split('-');
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return `${monthNames[parseInt(month) - 1]} ${year}`;
            };
            
            const dateRange = startDate || endDate ? 
                `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : 'Present'}` : '';
            
            return `
                <div class="experience-item-preview">
                    <div class="experience-header">
                        <div>
                            <div class="experience-position">${position}</div>
                            <div class="experience-company">${company}</div>
                        </div>
                        <div class="experience-dates">${dateRange}</div>
                    </div>
                    <div class="experience-description">${description}</div>
                </div>
            `;
        }).join('');
        
        return experienceHTML && this.formSections.experience ? `
            <div class="experience-section">
                <div class="section-title main">WORK EXPERIENCE</div>
                ${experienceHTML}
            </div>
        ` : '';
    }
    
    getEducationHTML() {
        const educationItems = document.querySelectorAll('.education-item');
        if (educationItems.length === 0) return '';
        
        const educationHTML = Array.from(educationItems).map(item => {
            const institution = item.querySelector('.education-institution').value;
            const degree = item.querySelector('.education-degree').value;
            const startDate = item.querySelector('.education-start').value;
            const endDate = item.querySelector('.education-end').value;
            const info = item.querySelector('.education-info').value;
            
            if (!institution && !degree) return '';
            
            const formatDate = (date) => {
                if (!date) return '';
                const [year, month] = date.split('-');
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return `${monthNames[parseInt(month) - 1]} ${year}`;
            };
            
            const dateRange = startDate || endDate ? 
                `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : 'Present'}` : '';
            
            return `
                <div class="education-item-preview">
                    <div class="education-header">
                        <div>
                            <div class="education-degree">${degree}</div>
                            <div class="education-institution">${institution}</div>
                        </div>
                        <div class="education-dates">${dateRange}</div>
                    </div>
                    <div class="education-info">${info}</div>
                </div>
            `;
        }).join('');
        
        return educationHTML && this.formSections.education ? `
            <div class="education-section">
                <div class="section-title main">EDUCATION</div>
                ${educationHTML}
            </div>
        ` : '';
    }
    
    addExperience() {
        const container = document.getElementById('experienceContainer');
        const newItem = document.createElement('div');
        newItem.className = 'experience-item';
        newItem.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" class="experience-company" placeholder="Company Name">
                </div>
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" class="experience-position" placeholder="Your Position">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="month" class="experience-start">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" class="experience-end">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="experience-description" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
            </div>
            <button type="button" class="btn btn-danger btn-sm remove-experience">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        
        // Add event listeners to new inputs
        const inputs = newItem.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.updatePreview());
        });
        
        container.appendChild(newItem);
    }
    
    addEducation() {
        const container = document.getElementById('educationContainer');
        const newItem = document.createElement('div');
        newItem.className = 'education-item';
        newItem.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>Institution</label>
                    <input type="text" class="education-institution" placeholder="University Name">
                </div>
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" class="education-degree" placeholder="Bachelor of Science">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="month" class="education-start">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" class="education-end">
                </div>
            </div>
            <div class="form-group">
                <label>Additional Info</label>
                <textarea class="education-info" rows="2" placeholder="GPA, relevant coursework, achievements..."></textarea>
            </div>
            <button type="button" class="btn btn-danger btn-sm remove-education">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        
        // Add event listeners to new inputs
        const inputs = newItem.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.updatePreview());
        });
        
        container.appendChild(newItem);
    }
    
    removeExperience(item) {
        item.remove();
        this.updatePreview();
    }
    
    removeEducation(item) {
        item.remove();
        this.updatePreview();
    }
    
    updatePreview() {
        this.generatePreview();
    }
    
    zoomIn() {
        this.zoomLevel = Math.min(this.zoomLevel + 0.1, 2);
        this.applyZoom();
    }
    
    zoomOut() {
        this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5);
        this.applyZoom();
    }
    
    applyZoom() {
        const resumeTemplate = document.getElementById('resumeTemplate');
        const zoomLevelDisplay = document.getElementById('zoomLevel');
        
        if (resumeTemplate) {
            resumeTemplate.style.transform = `scale(${this.zoomLevel})`;
        }
        
        if (zoomLevelDisplay) {
            zoomLevelDisplay.textContent = `${Math.round(this.zoomLevel * 100)}%`;
        }
    }

    // Create a perfectly sized resume for PDF generation
    createPDFOptimizedResume() {
        const resumeElement = document.getElementById('resumeTemplate');
        if (!resumeElement) return null;

        // Create container with exact A4 dimensions
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: -9999px;
            left: -9999px;
            width: 210mm;
            height: 297mm;
            background: white;
            margin: 0;
            padding: 0;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
            display: flex;
            box-sizing: border-box;
        `;

        // Clone the resume element
        const resumeClone = resumeElement.cloneNode(true);
        resumeClone.style.cssText = `
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            transform: none;
            box-shadow: none;
            border-radius: 0;
            display: flex;
            box-sizing: border-box;
        `;

        // Remove job title if it's empty (for fresh graduates) and ensure proper spacing
        const jobTitleInput = document.getElementById('jobTitle');
        const jobTitleInClone = resumeClone.querySelector('.resume-title');
        const spacerInClone = resumeClone.querySelector('.resume-title-spacer');
        
        if (jobTitleInClone && (!jobTitleInput || !jobTitleInput.value.trim() || jobTitleInput.value.trim().length === 0)) {
            jobTitleInClone.remove();
        } else if (jobTitleInClone && jobTitleInput && jobTitleInput.value.trim() && jobTitleInput.value.trim().length > 0) {
            // Update job title content to ensure it's correct
            jobTitleInClone.textContent = jobTitleInput.value.trim().toUpperCase();
        }
        
        // Ensure spacer is present if no title (for consistent spacing)
        if ((!jobTitleInput || !jobTitleInput.value.trim() || jobTitleInput.value.trim().length === 0) && !spacerInClone) {
            const spacerElement = document.createElement('div');
            spacerElement.className = 'resume-title-spacer';
            spacerElement.innerHTML = '<div class="resume-name-underline"></div>';
            const resumeMain = resumeClone.querySelector('.resume-main');
            if (resumeMain && resumeMain.firstChild) {
                resumeMain.insertBefore(spacerElement, resumeMain.children[1]); // Insert after name
            }
        }

        // Optimize sidebar
        const sidebar = resumeClone.querySelector('.resume-sidebar');
        if (sidebar) {
            // Get template-specific colors
            const templateColors = this.getTemplateColors();
            
            sidebar.style.cssText = `
                width: ${templateColors.width};
                background: ${templateColors.background};
                color: ${templateColors.color};
                padding: 25px 20px;
                margin: 0;
                height: 100%;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                font-size: 14px;
                line-height: 1.4;
            `;

            // Optimize profile photo
            const profilePhoto = sidebar.querySelector('.profile-photo');
            if (profilePhoto) {
                profilePhoto.style.cssText = `
                    width: 110px;
                    height: 110px;
                    margin: 0 auto 15px;
                    border-radius: ${templateColors.profilePhotoBorderRadius};
                    background: ${templateColors.profilePhotoBg};
                    border: 2px solid ${templateColors.profilePhotoBorder};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${templateColors.color};
                    font-size: 2rem;
                    overflow: hidden;
                `;
            }

            // Optimize section titles
            const sectionTitles = sidebar.querySelectorAll('.section-title');
            sectionTitles.forEach(title => {
                title.style.cssText = `
                    font-size: 14px;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 12px;
                    margin-top: 20px;
                    border-bottom: 2px solid ${templateColors.sectionTitleBorder};
                    padding-bottom: 5px;
                    letter-spacing: 0.5px;
                `;
            });

            // Optimize contact items
            const contactItems = sidebar.querySelectorAll('.contact-item');
            contactItems.forEach(item => {
                item.style.cssText = `
                    display: flex;
                    align-items: center;
                    margin-bottom: 8px;
                    font-size: 13px;
                    line-height: 1.3;
                `;
            });

            // Optimize skills and languages lists
            const skillsLists = sidebar.querySelectorAll('.skills-list, .languages-list');
            skillsLists.forEach(list => {
                list.style.cssText = `
                    margin: 0;
                    padding: 0;
                    list-style: none;
                `;
                
                const listItems = list.querySelectorAll('li');
                listItems.forEach(item => {
                    item.style.cssText = `
                        margin-bottom: 6px;
                        font-size: 13px;
                        line-height: 1.3;
                        padding-left: 0;
                    `;
                });
            });

            // Optimize summary text
            const summaryText = sidebar.querySelector('.summary-section p');
            if (summaryText) {
                summaryText.style.cssText = `
                    font-size: 13px;
                    line-height: 1.4;
                    margin: 0;
                    text-align: justify;
                `;
            }
        }

        // Optimize main content
        const main = resumeClone.querySelector('.resume-main');
        if (main) {
            main.style.cssText = `
                width: 65%;
                padding: 25px 20px;
                margin: 0;
                height: 100%;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                color: #333;
                font-size: 14px;
                line-height: 1.4;
            `;

            // Optimize name
            const resumeName = main.querySelector('.resume-name');
            if (resumeName) {
                resumeName.style.cssText = `
                    font-size: 24px;
                    font-weight: 700;
                    color: #2c3e50;
                    margin-bottom: 5px;
                `;
            }

            // Optimize title (only if it exists)
            const resumeTitle = main.querySelector('.resume-title');
            if (resumeTitle) {
                resumeTitle.style.cssText = `
                    font-size: 14px;
                    color: #7f8c8d;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #bdc3c7;
                    padding-bottom: 8px;
                `;
            }

            // Optimize spacer (only if it exists)
            const resumeSpacer = main.querySelector('.resume-title-spacer');
            if (resumeSpacer) {
                resumeSpacer.style.cssText = `
                    margin-bottom: 20px;
                `;
                
                // Optimize the underline within the spacer
                const underline = resumeSpacer.querySelector('.resume-name-underline');
                if (underline) {
                    underline.style.cssText = `
                        border-bottom: 1px solid #bdc3c7;
                        padding-bottom: 8px;
                    `;
                }
            }

            // Optimize section titles in main
            const mainSectionTitles = main.querySelectorAll('.section-title');
            mainSectionTitles.forEach(title => {
                title.style.cssText = `
                    font-size: 16px;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 15px;
                    margin-top: 25px;
                    border-bottom: 2px solid #bdc3c7;
                    padding-bottom: 5px;
                    color: #2c3e50;
                    letter-spacing: 0.5px;
                `;
            });

            // Optimize experience and education items
            const expItems = main.querySelectorAll('.experience-item-preview, .education-item-preview');
            expItems.forEach(item => {
                item.style.cssText = `
                    margin-bottom: 12px;
                `;
            });
        }

        container.appendChild(resumeClone);
        document.body.appendChild(container);

        return container;
    }
    
    async downloadPDF() {
        // Validate form before generating PDF
        if (!this.validateForm()) {
            return;
        }

        const downloadBtn = document.getElementById('downloadBtn');
        const originalText = downloadBtn.innerHTML;
        
        // Show loading state
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        downloadBtn.disabled = true;
        
        try {
            // Check if required libraries are loaded
            if (typeof window.jspdf === 'undefined' || typeof window.html2canvas === 'undefined') {
                throw new Error('PDF generation libraries not loaded');
            }

            const { jsPDF } = window.jspdf;
            const resumeElement = document.getElementById('resumeTemplate');
            
            if (!resumeElement) {
                throw new Error('Resume preview not found');
            }
            
            // Create a perfectly sized resume for PDF generation
            const pdfResume = this.createPDFOptimizedResume();
            
            // Generate canvas with exact A4 dimensions (no margins)
            const canvas = await html2canvas(pdfResume, {
                scale: 3, // Higher scale for better quality
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: 794, // 210mm in pixels at 96 DPI
                height: 1123, // 297mm in pixels at 96 DPI
                scrollX: 0,
                scrollY: 0,
                x: 0,
                y: 0,
                logging: false,
                imageTimeout: 0,
                removeContainer: true
            });

            // Clean up temporary container
            if (pdfResume && pdfResume.parentElement) {
                pdfResume.parentElement.removeChild(pdfResume);
            }
            
            // Create PDF with A4 size (210mm x 297mm) to match our canvas
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [210, 297] // A4 size in mm
            });
            
            const imgData = canvas.toDataURL('image/png');
            
            // Add image to fill entire page with no margins
            const pageWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            
            // Add image to fill the entire page
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
            
            // Since we're using a fixed A4 container, content should fit in one page
            // If it doesn't, we'll let it overflow (which is rare with our fixed sizing)
            
            // Generate filename
            const fullName = document.getElementById('fullName').value || 'Resume';
            const filename = `${fullName.replace(/\s+/g, '_')}_Resume.pdf`;
            
            // Download the PDF
            pdf.save(filename);
            
            // Show success message
            this.showSuccess('PDF downloaded successfully!');
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            this.showError(`Error generating PDF: ${error.message}`);
        } finally {
            // Reset button state
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }
    }
}

// Navigation function
function goBack() {
    window.location.href = 'index.html';
}

// Page Loader Management for Form Page
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
            }, 1200); // Slightly longer for form page
        });
    }

    simulateProgress() {
        const steps = [
            { progress: 15, text: 'Loading form...' },
            { progress: 35, text: 'Preparing templates...' },
            { progress: 55, text: 'Loading libraries...' },
            { progress: 75, text: 'Initializing builder...' },
            { progress: 95, text: 'Almost ready...' },
            { progress: 100, text: 'Ready to build!' }
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
        }, 700);
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

// Initialize the resume builder when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PageLoader();
    new ResumeBuilder();
});

// Add some default content for demonstration
document.addEventListener('DOMContentLoaded', () => {
    // Add sample data if no data exists
    const fullName = document.getElementById('fullName');
    const jobTitle = document.getElementById('jobTitle');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    
    if (!fullName.value && !email.value && !phone.value) {
        fullName.value = 'John Doe';
        // Leave job title empty for fresh graduates
        email.value = 'john.doe@example.com';
        phone.value = '+1 (555) 123-4567';
        document.getElementById('address').value = '123 Main Street, New York, NY 10001';
        document.getElementById('website').value = 'https://johndoe.com';
        document.getElementById('summary').value = 'Recent graduate with strong academic background and eagerness to apply learned skills in a professional environment. Detail-oriented, quick learner with excellent communication and problem-solving abilities.';
        document.getElementById('skills').value = 'Microsoft Office, Teamwork, Problem Solving, Communication, Time Management, Adaptability';
        document.getElementById('languages').value = 'English (Native)';
        
        // Leave experience empty for fresh graduates - they can add internships or projects if needed
        
        // Add sample education for fresh graduates
        const eduInstitution = document.querySelector('.education-institution');
        const eduDegree = document.querySelector('.education-degree');
        const eduStart = document.querySelector('.education-start');
        const eduEnd = document.querySelector('.education-end');
        const eduInfo = document.querySelector('.education-info');
        
        if (eduInstitution) eduInstitution.value = 'University of Technology';
        if (eduDegree) eduDegree.value = 'Bachelor of Science in Computer Science';
        if (eduStart) eduStart.value = '2020-09';
        if (eduEnd) eduEnd.value = '2024-05';
        if (eduInfo) eduInfo.value = 'GPA: 3.5/4.0, Relevant Coursework: Data Structures, Algorithms, Software Engineering';
    }

    // Restore profile image if exists
    const profileImage = localStorage.getItem('profileImage');
    if (profileImage) {
        const imageUploadArea = document.getElementById('imageUploadArea');
        const imagePreview = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImg');

        previewImg.src = profileImage;
        imageUploadArea.style.display = 'none';
        imagePreview.style.display = 'block';
    }
});

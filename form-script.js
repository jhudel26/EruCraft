// Template Configuration for Modularity (shared with script.js)
const templates = {
    template1: {
        id: 'template1',
        name: 'Executive Classic',
        sidebarWidth: '35%',
        sidebarBg: '#1a365d',
        sidebarColor: 'white',
        profilePhotoBg: '#2d3748',
        profilePhotoBorder: '#4299e1',
        sectionTitleBorder: '#4299e1',
        profilePhotoBorderRadius: '50%',
        accentColor: '#4299e1',
        layout: 'traditional'
    },
    template2: {
        id: 'template2',
        name: 'Creative Portfolio',
        sidebarWidth: '40%',
        sidebarBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        sidebarColor: 'white',
        profilePhotoBg: 'rgba(255,255,255,0.2)',
        profilePhotoBorder: 'rgba(255,255,255,0.5)',
        sectionTitleBorder: 'rgba(255,255,255,0.8)',
        profilePhotoBorderRadius: '20px',
        accentColor: '#ff6b6b',
        layout: 'creative'
    },
    template3: {
        id: 'template3',
        name: 'Tech Modern',
        sidebarWidth: '30%',
        sidebarBg: '#0f172a',
        sidebarColor: 'white',
        profilePhotoBg: '#1e293b',
        profilePhotoBorder: '#06b6d4',
        sectionTitleBorder: '#06b6d4',
        profilePhotoBorderRadius: '8px',
        accentColor: '#06b6d4',
        layout: 'tech'
    },
    template4: {
        id: 'template4',
        name: 'Medical Professional',
        sidebarWidth: '35%',
        sidebarBg: '#f0f9ff',
        sidebarColor: '#1e40af',
        profilePhotoBg: '#dbeafe',
        profilePhotoBorder: '#3b82f6',
        sectionTitleBorder: '#3b82f6',
        profilePhotoBorderRadius: '50%',
        accentColor: '#3b82f6',
        layout: 'medical'
    },
    template5: {
        id: 'template5',
        name: 'Bold Executive',
        sidebarWidth: '40%',
        sidebarBg: '#000000',
        sidebarColor: 'white',
        profilePhotoBg: '#1a1a1a',
        profilePhotoBorder: '#ffd700',
        sectionTitleBorder: '#ffd700',
        profilePhotoBorderRadius: '0',
        accentColor: '#ffd700',
        layout: 'executive'
    }
};

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
            this.showError('Storage is full. Try removing the profile image or shortening content.');
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
            const inputEl = document.querySelector(toggleSelector);
            if (inputEl) {
                inputEl.setAttribute('role', 'switch');
                inputEl.setAttribute('aria-checked', isEnabled.toString());
                const sliderEl = inputEl.nextElementSibling;
                if (sliderEl && sliderEl.classList && sliderEl.classList.contains('slider')) {
                    sliderEl.setAttribute('aria-checked', isEnabled.toString());
                }
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
                this.showAutoSaveIndicator();
            });
            
            // Add real-time validation
            input.addEventListener('blur', () => {
                this.validateField(input);
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
            const removeExpBtn = e.target.closest('.remove-experience');
            if (removeExpBtn) {
                this.removeExperience(removeExpBtn.closest('.experience-item'));
            }
            const removeEduBtn = e.target.closest('.remove-education');
            if (removeEduBtn) {
                this.removeEducation(removeEduBtn.closest('.education-item'));
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

                    try {
                        localStorage.setItem('profileImage', compressedData);
                    } catch (err) {
                        this.showError('Image is too large to store. Please choose a smaller image.');
                        return;
                    }

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
        const website = (document.getElementById('website')?.value || '').trim();
        const phone = (document.getElementById('phone')?.value || '').trim();
        const summary = document.getElementById('summary').value.trim();
        
        // Clear previous error highlights
        this.clearErrorHighlights();
        
        let hasErrors = false;
        
        if (!fullName) {
            this.highlightError('fullName', 'Please enter your full name');
            hasErrors = true;
        }
        
        if (!email) {
            this.highlightError('email', 'Please enter your email address');
            hasErrors = true;
        } else {
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.highlightError('email', 'Please enter a valid email address');
                hasErrors = true;
            }
        }

        // Optional website validation
        if (website) {
            try {
                const url = new URL(website.startsWith('http') ? website : `https://${website}`);
                if (!url.hostname.includes('.')) throw new Error('Invalid URL');
            } catch {
                this.highlightError('website', 'Please enter a valid website URL (e.g., https://example.com)');
                hasErrors = true;
            }
        }

        // Optional phone validation (very lenient, digits and +, spaces, -)
        if (phone) {
            const phoneRegex = /^[+\d][\d\s().-]{6,}$/;
            if (!phoneRegex.test(phone)) {
                this.highlightError('phone', 'Please enter a valid phone number');
                hasErrors = true;
            }
        }

        // Check if at least one section has content
        const hasExperience = document.querySelectorAll('.experience-item').length > 0 && 
            Array.from(document.querySelectorAll('.experience-item')).some(item => 
                item.querySelector('.experience-company').value.trim() || 
                item.querySelector('.experience-position').value.trim()
            );
        
        const hasEducation = document.querySelectorAll('.education-item').length > 0 && 
            Array.from(document.querySelectorAll('.education-item')).some(item => 
                item.querySelector('.education-institution').value.trim() || 
                item.querySelector('.education-degree').value.trim()
            );
        
        const hasSkills = document.getElementById('skills').value.trim();
        const hasLanguages = document.getElementById('languages').value.trim();
        
        if (!hasExperience && !hasEducation && !hasSkills && !hasLanguages && !summary) {
            this.showError('Please fill in at least one section (Experience, Education, Skills, or Summary)');
            hasErrors = true;
        }

        // Date range validation for experience and education
        const checkRanges = (selectorStart, selectorEnd, sectionName) => {
            const starts = document.querySelectorAll(selectorStart);
            const ends = document.querySelectorAll(selectorEnd);
            for (let i = 0; i < starts.length; i++) {
                const s = starts[i].value;
                const e = ends[i].value;
                if (s && e && s > e) {
                    this.highlightError(starts[i].id || selectorStart.replace('.', ''), `${sectionName} start date must be before end date`);
                    hasErrors = true;
                }
            }
        };

        checkRanges('.experience-start', '.experience-end', 'Experience');
        checkRanges('.education-start', '.education-end', 'Education');
        
        if (hasErrors) {
            this.showError('Please fix the highlighted errors before proceeding');
        }
        
        return !hasErrors;
    }

    highlightError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '#dc3545';
            field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            
            // Add error message below field
            let errorMsg = field.parentElement.querySelector('.field-error');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'field-error';
                errorMsg.style.cssText = 'color: #dc3545; font-size: 0.8rem; margin-top: 5px;';
                field.parentElement.appendChild(errorMsg);
            }
            errorMsg.textContent = message;
        }
    }

    clearErrorHighlights() {
        // Clear all error highlights
        const errorFields = document.querySelectorAll('input, textarea');
        errorFields.forEach(field => {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        });
        
        // Remove error messages
        const errorMessages = document.querySelectorAll('.field-error');
        errorMessages.forEach(msg => msg.remove());
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
        const template = templates[this.selectedTemplate];
        
        // Clear any existing content first
        previewContainer.innerHTML = '';
        
        // Create the resume template
        const resumeTemplate = document.createElement('div');
        resumeTemplate.className = `resume-template ${templateClass}`;
        resumeTemplate.id = 'resumeTemplate';
        
        // Add sidebar
        resumeTemplate.innerHTML = this.getSidebarHTML();
        
        // Apply template-specific styles dynamically after elements are created
        this.applyTemplateStyles(resumeTemplate, template);
        
        // Create main content container
        const mainContent = document.createElement('div');
        mainContent.className = 'resume-main';
        
        // Ensure job title is properly handled
        const fullName = this.sanitizeHTML(document.getElementById('fullName').value) || 'Your Name';
        const jobTitleInput = document.getElementById('jobTitle');
        const jobTitle = jobTitleInput ? jobTitleInput.value.trim() : '';
        
        // Create name element with proper line breaking
        const nameElement = document.createElement('div');
        nameElement.className = 'resume-name';
        
        // Check if name is too long and needs to be broken into lines
        const nameParts = fullName.toUpperCase().trim().split(' ');
        if (nameParts.length >= 3 && fullName.length > 15) {
            // For long names, try to break them logically
            const firstPart = nameParts.slice(0, nameParts.length - 1).join(' ');
            const lastPart = nameParts[nameParts.length - 1];
            
            // Create divs for each line with explicit styling
            const firstLine = document.createElement('div');
            firstLine.style.cssText = 'display: block; line-height: 1.2; margin: 0; padding: 0;';
            firstLine.textContent = firstPart;
            
            const secondLine = document.createElement('div');
            secondLine.style.cssText = 'display: block; line-height: 1.2; margin: 0; padding: 0;';
            secondLine.textContent = lastPart;
            
            nameElement.appendChild(firstLine);
            nameElement.appendChild(secondLine);
        } else {
            nameElement.textContent = fullName.toUpperCase();
        }
        
        mainContent.appendChild(nameElement);
        
        // Create job title element only if there's content
        if (jobTitle) {
            const titleElement = document.createElement('div');
            titleElement.className = 'resume-title';
            titleElement.textContent = this.sanitizeHTML(jobTitle).toUpperCase();
            mainContent.appendChild(titleElement);
        } else {
            // Add empty space if no job title to maintain consistent spacing
            const emptySpace = document.createElement('div');
            emptySpace.className = 'resume-title-spacer';
            mainContent.appendChild(emptySpace);
        }
        
        // Add About section if it exists
        const summary = this.sanitizeHTML(document.getElementById('summary').value) || '';
        if (summary && this.formSections.summary) {
            const aboutSection = document.createElement('div');
            aboutSection.className = 'about-section';
            aboutSection.innerHTML = `
                <div class="section-title main">ABOUT</div>
                <p style="font-size: 14px; line-height: 1.5; margin-bottom: 20px;">${summary}</p>
            `;
            mainContent.appendChild(aboutSection);
        }
        
        // Add experience and education
        const experienceHTML = this.getExperienceHTML();
        const educationHTML = this.getEducationHTML();
        mainContent.innerHTML += experienceHTML + educationHTML;
        
        resumeTemplate.appendChild(mainContent);
        
        // Apply template styles to main content as well
        this.applyMainContentStyles(resumeTemplate, template);
        
        previewContainer.appendChild(resumeTemplate);
        
        this.applyZoom();
    }
    
    applyTemplateStyles(resumeTemplate, template) {
        // Apply template-specific styles to the resume template
        
        const sidebar = resumeTemplate.querySelector('.resume-sidebar');
        const main = resumeTemplate.querySelector('.resume-main');
        const profilePhoto = resumeTemplate.querySelector('.profile-photo');
        const sectionTitles = resumeTemplate.querySelectorAll('.section-title');
        
        if (sidebar) {
            sidebar.style.setProperty('width', template.sidebarWidth, 'important');
            sidebar.style.setProperty('background', template.sidebarBg, 'important');
            sidebar.style.setProperty('color', template.sidebarColor, 'important');
        }
        
        if (main) {
            main.style.setProperty('width', `calc(100% - ${template.sidebarWidth})`, 'important');
        }
        
        if (profilePhoto) {
            profilePhoto.style.setProperty('background', template.profilePhotoBg, 'important');
            profilePhoto.style.setProperty('border-color', template.profilePhotoBorder, 'important');
            profilePhoto.style.setProperty('border-radius', template.profilePhotoBorderRadius, 'important');
        }
        
        sectionTitles.forEach(title => {
            if (title.classList.contains('blue')) {
                title.style.setProperty('border-bottom-color', template.sectionTitleBorder, 'important');
            }
        });
        
        // Apply accent color to contact item icons
        const contactItems = resumeTemplate.querySelectorAll('.contact-item i');
        contactItems.forEach(icon => {
            icon.style.setProperty('color', template.accentColor || '#f39c12', 'important');
        });
        
        // Ensure all section titles get the correct styling
        const allSectionTitles = resumeTemplate.querySelectorAll('.section-title');
        allSectionTitles.forEach(title => {
            if (title.classList.contains('blue')) {
                title.style.setProperty('border-bottom-color', template.sectionTitleBorder, 'important');
            }
        });
        
        // Apply template-specific special styling
        this.applyTemplateSpecialStyles(resumeTemplate, template);
    }
    
    applyTemplateSpecialStyles(resumeTemplate, template) {
        // Apply unique styling for each template
        const sidebar = resumeTemplate.querySelector('.resume-sidebar');
        
        if (this.selectedTemplate === 'template2') {
            // Creative Portfolio - Add gradient and special effects
            if (sidebar) {
                sidebar.style.setProperty('position', 'relative', 'important');
                sidebar.style.setProperty('overflow', 'hidden', 'important');
                
                // Add decorative corner element
                const cornerElement = document.createElement('div');
                cornerElement.style.cssText = `
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 80px;
                    height: 80px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 0 0 0 80px;
                    pointer-events: none;
                `;
                sidebar.appendChild(cornerElement);
            }
        } else if (this.selectedTemplate === 'template3') {
            // Tech Modern - Add gradient top border
            if (sidebar) {
                sidebar.style.setProperty('position', 'relative', 'important');
                
                const topBorder = document.createElement('div');
                topBorder.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%);
                `;
                sidebar.appendChild(topBorder);
            }
        } else if (this.selectedTemplate === 'template4') {
            // Medical Professional - Add gradient top border
            if (sidebar) {
                sidebar.style.setProperty('position', 'relative', 'important');
                
                const topBorder = document.createElement('div');
                topBorder.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
                `;
                sidebar.appendChild(topBorder);
            }
        } else if (this.selectedTemplate === 'template5') {
            // Bold Executive - Add gradient top border
            if (sidebar) {
                sidebar.style.setProperty('position', 'relative', 'important');
                
                const topBorder = document.createElement('div');
                topBorder.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #ffd700 0%, #ffed4e 100%);
                `;
                sidebar.appendChild(topBorder);
            }
        }
    }
    
    applyMainContentStyles(resumeTemplate, template) {
        // Apply template-specific styles to main content
        const main = resumeTemplate.querySelector('.resume-main');
        const resumeName = resumeTemplate.querySelector('.resume-name');
        const resumeTitle = resumeTemplate.querySelector('.resume-title');
        const mainSectionTitles = resumeTemplate.querySelectorAll('.resume-main .section-title');
        
        if (main) {
            main.style.setProperty('width', `calc(100% - ${template.sidebarWidth})`, 'important');
        }
        
        if (resumeName) {
            // Apply template-specific name styling
            resumeName.style.setProperty('color', template.accentColor || '#2c3e50', 'important');
        }
        
        if (resumeTitle) {
            // Apply template-specific title styling
            resumeTitle.style.setProperty('color', template.accentColor || '#7f8c8d', 'important');
        }
        
        mainSectionTitles.forEach(title => {
            title.style.setProperty('border-bottom-color', template.accentColor || '#bdc3c7', 'important');
            title.style.setProperty('color', template.accentColor || '#2c3e50', 'important');
        });
    }
    
    changeTemplate(templateId) {
        // Change the selected template and update preview
        this.selectedTemplate = templateId;
        localStorage.setItem('selectedTemplate', templateId);
        this.generatePreview();
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
        const template = templates[this.selectedTemplate];
        return {
            width: template.sidebarWidth,
            background: template.sidebarBg,
            color: template.sidebarColor,
            profilePhotoBg: template.profilePhotoBg,
            profilePhotoBorder: template.profilePhotoBorder,
            sectionTitleBorder: template.sectionTitleBorder,
            profilePhotoBorderRadius: template.profilePhotoBorderRadius
        };
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

        // Create container with exact A4 dimensions and proper font loading
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
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            box-sizing: border-box;
        `;

        // Clone the resume element with all its classes and styles
        const resumeClone = resumeElement.cloneNode(true);
        resumeClone.style.cssText = `
            width: 100%;
            min-height: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            transform: none;
            box-shadow: none;
            border-radius: 0;
            display: flex;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: visible;
        `;

        // Remove job title if it's empty (for fresh graduates)
        const jobTitleInput = document.getElementById('jobTitle');
        const jobTitleInClone = resumeClone.querySelector('.resume-title');
        if (jobTitleInClone && (!jobTitleInput || !jobTitleInput.value.trim())) {
            jobTitleInClone.remove();
        } else if (jobTitleInClone && jobTitleInput && jobTitleInput.value.trim()) {
            // Update job title content to ensure it's correct
            jobTitleInClone.textContent = jobTitleInput.value.trim().toUpperCase();
        }

        // Apply template-specific styling to match live preview exactly
        const template = templates[this.selectedTemplate];
        
        // Style the sidebar to match live preview
        const sidebar = resumeClone.querySelector('.resume-sidebar');
        if (sidebar) {
            sidebar.style.cssText = `
                width: ${template.sidebarWidth};
                background: ${template.sidebarBg};
                color: ${template.sidebarColor};
                padding: 25px 20px;
                margin: 0;
                min-height: 100%;
                height: auto;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            `;

            // Style profile photo to match live preview
            const profilePhoto = sidebar.querySelector('.profile-photo');
            if (profilePhoto) {
                profilePhoto.style.cssText = `
                    width: 160px;
                    height: 160px;
                    margin: 0 auto 25px;
                    border-radius: ${template.profilePhotoBorderRadius};
                    background: ${template.profilePhotoBg};
                    border: 4px solid ${template.profilePhotoBorder};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${template.sidebarColor};
                    font-size: 3rem;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
            }

            // Style section titles to match live preview
            const sectionTitles = sidebar.querySelectorAll('.section-title');
            sectionTitles.forEach(title => {
                title.style.cssText = `
                    font-size: 16px;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 15px;
                    margin-top: 25px;
                    border-bottom: 2px solid ${template.sectionTitleBorder};
                    padding-bottom: 5px;
                    letter-spacing: 0.5px;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
            });

            // Style contact items to match live preview
            const contactItems = sidebar.querySelectorAll('.contact-item');
            contactItems.forEach(item => {
                item.style.cssText = `
                    display: flex;
                    align-items: center;
                    margin-bottom: 8px;
                    font-size: 13px;
                    line-height: 1.4;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
            });

            // Style skills and languages lists to match live preview
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
                        margin-bottom: 5px;
                        font-size: 13px;
                        line-height: 1.4;
                        padding-left: 0;
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    `;
                });
            });
        }

        // Style main content to match live preview exactly
        const main = resumeClone.querySelector('.resume-main');
        if (main) {
            main.style.cssText = `
                width: calc(100% - ${template.sidebarWidth});
                padding: 25px;
                margin: 0;
                min-height: 100%;
                height: auto;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                color: #333;
                font-size: 14px;
                line-height: 1.4;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            `;

            // Style name to match live preview exactly
            const resumeName = main.querySelector('.resume-name');
            if (resumeName) {
                resumeName.style.cssText = `
                    font-size: 42px;
                    font-weight: 800;
                    color: ${template.accentColor};
                    margin-bottom: 8px;
                    letter-spacing: 1px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    line-height: 1.2;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    max-width: 100%;
                    white-space: normal;
                `;
                
                // Style any nested divs within the name element
                const nameLines = resumeName.querySelectorAll('div');
                nameLines.forEach(line => {
                    line.style.cssText = `
                        display: block;
                        line-height: 1.2;
                        margin: 0;
                        padding: 0;
                        font-size: inherit;
                        font-weight: inherit;
                        color: inherit;
                        letter-spacing: inherit;
                        text-shadow: inherit;
                        font-family: inherit;
                    `;
                });
            }

            // Style title to match live preview exactly
            const resumeTitle = main.querySelector('.resume-title');
            if (resumeTitle) {
                resumeTitle.style.cssText = `
                    font-size: 18px;
                    color: ${template.accentColor};
                    margin-bottom: 30px;
                    border-bottom: 2px solid ${template.accentColor};
                    padding-bottom: 10px;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
            }

            // Style title spacer to match live preview
            const titleSpacer = main.querySelector('.resume-title-spacer');
            if (titleSpacer) {
                titleSpacer.style.cssText = `
                    height: 40px;
                    margin-bottom: 20px;
                `;
            }

            // Style About section to match live preview
            const aboutSection = main.querySelector('.about-section');
            if (aboutSection) {
                aboutSection.style.cssText = `
                    margin-bottom: 20px;
                `;
                
                const aboutTitle = aboutSection.querySelector('.section-title');
                if (aboutTitle) {
                    aboutTitle.style.cssText = `
                        font-size: 16px;
                        font-weight: 700;
                        text-transform: uppercase;
                        margin-bottom: 15px;
                        margin-top: 25px;
                        border-bottom: 2px solid ${template.accentColor};
                        padding-bottom: 5px;
                        color: ${template.accentColor};
                        letter-spacing: 0.5px;
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    `;
                }
                
                const aboutText = aboutSection.querySelector('p');
                if (aboutText) {
                    aboutText.style.cssText = `
                        font-size: 14px;
                        line-height: 1.5;
                        margin-bottom: 20px;
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    `;
                }
            }

            // Style section titles in main to match live preview
            const mainSectionTitles = main.querySelectorAll('.section-title');
            mainSectionTitles.forEach(title => {
                title.style.cssText = `
                    font-size: 16px;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-bottom: 15px;
                    margin-top: 25px;
                    border-bottom: 2px solid ${template.accentColor};
                    padding-bottom: 5px;
                    color: ${template.accentColor};
                    letter-spacing: 0.5px;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
            });

            // Style experience and education items to match live preview
            const expItems = main.querySelectorAll('.experience-item-preview, .education-item-preview');
            expItems.forEach(item => {
                item.style.cssText = `
                    margin-bottom: 20px;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
            });

            // Style experience/education headers to match live preview
            const expHeaders = main.querySelectorAll('.experience-header, .education-header');
            expHeaders.forEach(header => {
                header.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 8px;
                `;
            });

            // Style position/degree titles to match live preview
            const positionTitles = main.querySelectorAll('.experience-position, .education-degree');
            positionTitles.forEach(title => {
                title.style.cssText = `
                    font-weight: 600;
                    font-size: 16px;
                    color: #2c3e50;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
            });

            // Style company/institution names to match live preview
            const companyNames = main.querySelectorAll('.experience-company, .education-institution');
            companyNames.forEach(name => {
                name.style.cssText = `
                    font-weight: 500;
                    color: #7f8c8d;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
            });

            // Style dates to match live preview
            const dates = main.querySelectorAll('.experience-dates, .education-dates');
            dates.forEach(date => {
                date.style.cssText = `
                    font-size: 12px;
                    color: #7f8c8d;
                    text-align: right;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
            });

            // Style descriptions to match live preview
            const descriptions = main.querySelectorAll('.experience-description, .education-info');
            descriptions.forEach(desc => {
                desc.style.cssText = `
                    font-size: 13px;
                    line-height: 1.5;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
            });
        }

        // Apply template-specific special styling for PDF
        this.applyPDFTemplateSpecialStyles(resumeClone, template);

        container.appendChild(resumeClone);
        document.body.appendChild(container);

        return container;
    }
    
    applyPDFTemplateSpecialStyles(resumeClone, template) {
        // Apply template-specific special styling for PDF generation
        const sidebar = resumeClone.querySelector('.resume-sidebar');
        
        if (this.selectedTemplate === 'template2') {
            // Creative Portfolio - Add gradient and special effects
            if (sidebar) {
                sidebar.style.setProperty('position', 'relative', 'important');
                sidebar.style.setProperty('overflow', 'hidden', 'important');
                
                // Add decorative corner element
                const cornerElement = document.createElement('div');
                cornerElement.style.cssText = `
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 80px;
                    height: 80px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 0 0 0 80px;
                    pointer-events: none;
                `;
                sidebar.appendChild(cornerElement);
            }
        } else if (this.selectedTemplate === 'template3') {
            // Tech Modern - Add gradient top border
            if (sidebar) {
                sidebar.style.setProperty('position', 'relative', 'important');
                
                const topBorder = document.createElement('div');
                topBorder.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%);
                `;
                sidebar.appendChild(topBorder);
            }
        } else if (this.selectedTemplate === 'template4') {
            // Medical Professional - Add gradient top border
            if (sidebar) {
                sidebar.style.setProperty('position', 'relative', 'important');
                
                const topBorder = document.createElement('div');
                topBorder.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
                `;
                sidebar.appendChild(topBorder);
            }
        } else if (this.selectedTemplate === 'template5') {
            // Bold Executive - Add gradient top border
            if (sidebar) {
                sidebar.style.setProperty('position', 'relative', 'important');
                
                const topBorder = document.createElement('div');
                topBorder.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #ffd700 0%, #ffed4e 100%);
                `;
                sidebar.appendChild(topBorder);
            }
        }
    }
    
    async downloadPDF() {
        // Validate form before generating PDF
        if (!this.validateForm()) {
            return;
        }

        const downloadBtn = document.getElementById('downloadBtn');
        const originalText = downloadBtn.innerHTML;
        
        // Show enhanced loading state
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        downloadBtn.disabled = true;
        downloadBtn.classList.add('loading');
        
        // Add progress indicator
        this.showProgressIndicator('Preparing resume for PDF generation...');
        
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
            
            // Ensure Google Fonts are loaded before PDF generation
            await this.ensureFontsLoaded();
            
            // Create a perfectly sized resume for PDF generation
            const pdfResume = this.createPDFOptimizedResume();
            
            // Wait a moment for fonts to render properly
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Update progress indicator
            this.showProgressIndicator('Analyzing content size...');
            
            // Wait a moment for layout to settle
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Check if the content fits within A4 dimensions
            const contentHeight = pdfResume.scrollHeight;
            const contentWidth = pdfResume.scrollWidth;
            const maxHeight = 1123; // 297mm in pixels at 96 DPI
            const maxWidth = 794; // 210mm in pixels at 96 DPI
            
            let scale = 3; // Default scale for better quality
            let canvasHeight = maxHeight;
            let canvasWidth = maxWidth;
            
            // Calculate optimal scale to fit content
            const heightRatio = maxHeight / contentHeight;
            const widthRatio = maxWidth / contentWidth;
            const optimalScale = Math.min(heightRatio, widthRatio, 1); // Don't scale up
            
            // If content is too large, scale it down to fit
            if (contentHeight > maxHeight || contentWidth > maxWidth) {
                scale = optimalScale * 3; // Maintain quality while fitting
                canvasHeight = contentHeight * (scale / 3);
                canvasWidth = contentWidth * (scale / 3);
                
                // Update progress
                this.showProgressIndicator(`Scaling content to fit page (${Math.round(optimalScale * 100)}%)...`);
            } else {
                this.showProgressIndicator('Content fits perfectly, generating PDF...');
            }
            
            // Update progress indicator
            this.showProgressIndicator('Generating high-quality image...');
            
            // Generate canvas with dynamic scaling
            const canvas = await html2canvas(pdfResume, {
                scale: scale,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: Math.min(canvasWidth, maxWidth), // Use calculated width
                height: Math.min(canvasHeight, maxHeight), // Use calculated height
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
            
            // Update progress indicator
            this.showProgressIndicator('Creating PDF document...');
            
            const imgData = canvas.toDataURL('image/png');
            
            // Add image to fill entire page with no margins
            const pageWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            
            // Calculate the actual image dimensions in mm
            const imgWidthInMm = (canvas.width / scale) * 0.264583; // Convert pixels to mm
            const imgHeightInMm = (canvas.height / scale) * 0.264583;
            
            // Calculate scaling to fit within A4 page
            const scaleX = pageWidth / imgWidthInMm;
            const scaleY = pageHeight / imgHeightInMm;
            const finalScale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down
            
            // Calculate final dimensions and centered position
            const finalWidth = imgWidthInMm * finalScale;
            const finalHeight = imgHeightInMm * finalScale;
            const xOffset = (pageWidth - finalWidth) / 2;
            const yOffset = (pageHeight - finalHeight) / 2;
            
            // Add image centered and scaled to fit
            pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
            
            // Update progress indicator
            this.showProgressIndicator('Finalizing PDF...');
            
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
            downloadBtn.classList.remove('loading');
            this.hideProgressIndicator();
        }
    }

    // Ensure Google Fonts are loaded before PDF generation
    async ensureFontsLoaded() {
        return new Promise((resolve) => {
            // Check if fonts are already loaded
            if (document.fonts && document.fonts.check) {
                if (document.fonts.check('16px Inter')) {
                    resolve();
                    return;
                }
            }

            // Load Google Fonts if not already loaded
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);

            // Wait for fonts to load
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => {
                    resolve();
                });
            } else {
                // Fallback: wait a bit for fonts to load
                setTimeout(() => {
                    resolve();
                }, 1000);
            }
        });
    }

    showProgressIndicator(message) {
        // Remove existing progress indicator
        this.hideProgressIndicator();
        
        const progressDiv = document.createElement('div');
        progressDiv.id = 'pdfProgressIndicator';
        progressDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
        `;
        
        progressDiv.innerHTML = `
            <div style="margin-bottom: 15px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 24px; color: #667eea;"></i>
            </div>
            <div style="font-size: 16px; font-weight: 500;">${message}</div>
            <div style="margin-top: 10px; font-size: 14px; opacity: 0.8;">Please wait while we generate your PDF...</div>
        `;
        
        document.body.appendChild(progressDiv);
    }

    hideProgressIndicator() {
        const progressDiv = document.getElementById('pdfProgressIndicator');
        if (progressDiv) {
            progressDiv.remove();
        }
    }

    showAutoSaveIndicator() {
        // Remove existing indicator
        const existing = document.querySelector('.auto-save-indicator');
        if (existing) {
            existing.remove();
        }
        
        const indicator = document.createElement('div');
        indicator.className = 'auto-save-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: #28a745;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            z-index: 1000;
            animation: slideInLeft 0.3s ease;
            box-shadow: 0 2px 10px rgba(40, 167, 69, 0.3);
        `;
        
        indicator.innerHTML = '<i class="fas fa-check"></i> Auto-saved';
        document.body.appendChild(indicator);
        
        // Remove after 2 seconds
        setTimeout(() => {
            if (indicator.parentElement) {
                indicator.style.animation = 'slideOutLeft 0.3s ease';
                setTimeout(() => indicator.remove(), 300);
            }
        }, 2000);
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        
        // Clear previous error
        this.clearFieldError(field);
        
        // Validate based on field type
        if (fieldId === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.highlightError(fieldId, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (fieldId === 'website' && value) {
            try {
                const url = new URL(value.startsWith('http') ? value : `https://${value}`);
                if (!url.hostname.includes('.')) throw new Error('Invalid URL');
            } catch {
                this.highlightError(fieldId, 'Please enter a valid website URL');
                return false;
            }
        }
        
        if (fieldId === 'phone' && value) {
            const phoneRegex = /^[+\d][\d\s().-]{6,}$/;
            if (!phoneRegex.test(value)) {
                this.highlightError(fieldId, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        const errorMsg = field.parentElement.querySelector('.field-error');
        if (errorMsg) {
            errorMsg.remove();
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

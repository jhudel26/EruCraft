/**
 * EruCraft - Core Script
 * Modern, Vanilla JavaScript Resume Generator
 */

const ResumeApp = {
    // Application State
    state: {
        personal: {
            fullName: 'John Doe',
            title: 'Senior Software Engineer',
            email: 'john.doe@example.com',
            phone: '+1 234 567 890',
            address: 'New York, USA',
            website: 'https://johndoe.dev',
            linkedin: 'linkedin.com/in/johndoe',
            github: 'github.com/johndoe',
            photo: null
        },
        summary: 'Passionate software engineer with 8+ years of experience building scalable web applications. Expert in JavaScript, React, and Node.js with a strong focus on clean code and user-centric design.',
        experience: [
            {
                id: Date.now(),
                company: 'Tech Solutions Inc.',
                position: 'Lead Developer',
                startDate: '2020',
                endDate: '', // Use empty string for current/present
                current: true,
                description: 'Leading a team of 10 developers to build a high-traffic e-commerce platform. Improved performance by 40%.'
            }
        ],
        education: [
            {
                id: Date.now() + 1,
                school: 'University of Technology',
                degree: 'B.S. in Computer Science',
                startDate: '2014',
                endDate: '2018',
                gpa: '3.9'
            }
        ],
        skills: [
            { id: Date.now() + 2, name: 'JavaScript', level: 90 },
            { id: Date.now() + 3, name: 'TypeScript', level: 85 },
            { id: Date.now() + 4, name: 'React', level: 95 }
        ],
        projects: [],
        certifications: [],
        config: {
            theme: 'light',
            template: 'modern',
            primaryColor: '#4f46e5',
            fontSize: '14px',
            spacing: '1.5rem',
            layout: 'single',
            paperSize: 'A4',
            headerAlign: 'left',
            sectionStyle: 'standard',
            skillStyle: 'tags',
            lineHeight: '1.5',
            margins: '20mm',
            dateFormat: 'YYYY'
        }
    },

    templates: [
        { id: 'modern', name: 'Modern Professional' },
        { id: 'minimalist', name: 'Minimalist' },
        { id: 'executive', name: 'Executive' },
        { id: 'creative', name: 'Creative Designer' },
        { id: 'ats', name: 'ATS-Friendly' },
        { id: 'corporate', name: 'Corporate' },
        { id: 'elegant', name: 'Elegant' },
        { id: 'tech', name: 'Tech Developer' },
        { id: 'academic', name: 'Academic' },
        { id: 'colorful', name: 'Colorful Portfolio' }
    ],

    history: [],
    historyIndex: -1,
    historyTimeout: null,

    // Initialization
    init() {
        this.loadFromLocalStorage();
        this.bindEvents();
        this.renderAll();
        this.updateCompletion();
        this.saveToHistory();
        this.populateTemplates();
        this.updateTips();
        
        // Hide loader after a short delay to ensure icons and fonts are ready
        setTimeout(() => {
            const loader = document.getElementById('app-loader');
            if (loader) loader.classList.add('hidden');
        }, 1500);

        setInterval(() => this.updateTips(), 10000);
    },

    // Event Bindings
    bindEvents() {
        // Form Inputs
        const form = document.getElementById('resume-form');
        form.addEventListener('input', (e) => {
            this.handleInput(e);
        });

        // Add Buttons
        document.querySelectorAll('.btn-add').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.add;
                this.addItem(type);
            });
        });

        // Sidebar Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                if (!section) return;

                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (section === 'templates') {
                    document.getElementById('template-modal').classList.add('active');
                } else if (section === 'editor') {
                    document.getElementById('editor-sections').style.display = 'block';
                    document.getElementById('customization-panel').style.display = 'none';
                    document.getElementById('template-modal').classList.remove('active');
                } else if (section === 'customization') {
                    document.getElementById('editor-sections').style.display = 'none';
                    document.getElementById('customization-panel').style.display = 'block';
                    document.getElementById('template-modal').classList.remove('active');
                }
            });
        });

        // Editor Tab Switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(`tab-${tab}`).classList.add('active');
            });
        });

        // Next Button Logic
        document.addEventListener('click', (e) => {
            const nextBtn = e.target.closest('.btn-next');
            if (nextBtn) {
                const nextTab = nextBtn.dataset.next;
                const tabBtn = document.querySelector(`.tab-btn[data-tab="${nextTab}"]`);
                if (tabBtn) tabBtn.click();
                // Scroll to top of editor
                document.querySelector('.editor-pane').scrollTop = 0;
            }

            const finalBtn = e.target.closest('#final-choose-template');
            if (finalBtn) {
                document.getElementById('template-modal').classList.add('active');
            }
        });

        // Config Inputs
        ['primaryColor', 'fontFamily', 'fontSize', 'spacing', 'paperSize', 'headerAlign', 'sectionStyle', 'skillStyle', 'lineHeight', 'margins', 'dateFormat'].forEach(key => {
            const input = document.getElementById(`config-${key}`);
            if (input) {
                input.value = this.state.config[key];
                input.addEventListener('input', (e) => {
                    this.state.config[key] = e.target.value;
                    
                    if (key === 'primaryColor') {
                        const colorValue = document.getElementById('primary-color-value');
                        if (colorValue) colorValue.textContent = e.target.value;
                    }
                    
                    this.renderPreview();
                    this.saveToLocalStorage();
                });
            }
        });

        // Close Modal
        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('template-modal').classList.remove('active');
        });

        // Theme Toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Download PDF
        document.getElementById('download-pdf').addEventListener('click', () => {
            window.print();
        });

        // Photo Upload
        document.getElementById('profile-photo').addEventListener('change', (e) => {
            this.handlePhotoUpload(e);
        });

        // Zoom Controls
        let zoom = 100;
        document.getElementById('zoom-in').addEventListener('click', () => {
            zoom = Math.min(zoom + 10, 150);
            this.updateZoom(zoom);
        });
        document.getElementById('zoom-out').addEventListener('click', () => {
            zoom = Math.max(zoom - 10, 50);
            this.updateZoom(zoom);
        });

        // Layout Switching
        document.querySelectorAll('.btn-layout').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.btn-layout').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.config.layout = btn.dataset.layout;
                this.renderPreview();
            });
        });

        // JSON Export/Import
        document.getElementById('export-json').addEventListener('click', () => this.exportJSON());
        document.getElementById('import-json').addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => this.importJSON(e);
            input.click();
        });

        // Event Delegation for Dynamic Items (Remove Button)
        document.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.btn-remove');
            if (removeBtn) {
                const type = removeBtn.dataset.removeType;
                const id = parseInt(removeBtn.dataset.removeId);
                this.removeItem(type, id);
            }
        });
    },

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.state = JSON.parse(this.history[this.historyIndex]);
            this.renderAll();
        }
    },

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.state = JSON.parse(this.history[this.historyIndex]);
            this.renderAll();
        }
    },

    populateTemplates() {
        const grid = document.querySelector('.template-grid');
        grid.innerHTML = this.templates.map(t => `
            <div class="template-card ${this.state.config.template === t.id ? 'active' : ''}" data-id="${t.id}">
                <div class="template-thumb">
                    ${this.getMockupHTML(t.id)}
                </div>
                <p>${t.name}</p>
            </div>
        `).join('');

        grid.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                grid.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.state.config.template = card.dataset.id;
                this.renderPreview();
                
                // Switch back to editor view
                document.getElementById('template-modal').classList.remove('active');
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                const editorBtn = document.querySelector('.nav-btn[data-section="editor"]');
                if (editorBtn) editorBtn.classList.add('active');
                document.getElementById('editor-sections').style.display = 'block';
                document.getElementById('customization-panel').style.display = 'none';
            });
        });
    },

    getMockupHTML(id) {
        const base = '<div class="m-title"></div><div class="m-text"></div><div class="m-text"></div><div class="m-line"></div><div class="m-text"></div><div class="m-text"></div>';
        
        if (id === 'creative') {
            return `
                <div class="thumb-mockup">
                    <div class="m-side">
                        <div class="m-side-box" style="height:20px; border-radius:50%"></div>
                        <div class="m-side-box"></div>
                        <div class="m-side-box"></div>
                    </div>
                    <div class="m-main">
                        <div class="m-title"></div>
                        <div class="m-text"></div>
                        <div class="m-text"></div>
                        <div class="m-line"></div>
                        <div class="m-text"></div>
                    </div>
                </div>`;
        }
        
        if (id === 'corporate') {
            return `
                <div class="thumb-mockup">
                    <div class="m-header"></div>
                    <div class="m-body">${base}</div>
                </div>`;
        }

        return `<div class="thumb-mockup">${base}</div>`;
    },

    // Input Handling
    handleInput(e) {
        const { name, value, type, checked } = e.target;
        const section = e.target.closest('.form-section')?.dataset.section;

        if (section === 'personal') {
            this.state.personal[name] = value;
        } else if (name === 'summary') {
            this.state.summary = value;
        } else {
            // Handle dynamic list items
            const dynamicItem = e.target.closest('.dynamic-item');
            if (dynamicItem) {
                const listType = dynamicItem.dataset.type;
                const id = parseInt(dynamicItem.dataset.id);
                const item = this.state[listType].find(i => i.id === id);
                if (item) {
                    if (type === 'checkbox') {
                        item[name] = checked;
                        // If it's the "current" checkbox, we might want to disable/enable the end date input
                        const endDateInput = dynamicItem.querySelector('input[name="endDate"]');
                        if (endDateInput) endDateInput.disabled = checked;
                    } else {
                        item[name] = value;
                    }
                }
            }
        }

        this.renderPreview();
        this.saveToLocalStorage();
        this.updateCompletion();
        
        // Save to history with debounce
        clearTimeout(this.historyTimeout);
        this.historyTimeout = setTimeout(() => this.saveToHistory(), 500);
    },

    // Dynamic List Management
    addItem(type) {
        const newItem = { id: Date.now() };
        let stateKey = type;
        
        // Map singular to plural where necessary to match state
        if (type === 'skill') stateKey = 'skills';
        if (type === 'project') stateKey = 'projects';
        if (type === 'certification') stateKey = 'certifications';

        if (stateKey === 'experience') {
            newItem.company = ''; newItem.position = ''; newItem.startDate = ''; newItem.endDate = ''; newItem.description = ''; newItem.current = false;
        } else if (stateKey === 'education') {
            newItem.school = ''; newItem.degree = ''; newItem.startDate = ''; newItem.endDate = ''; newItem.level = 'Tertiary';
        } else if (stateKey === 'skills') {
            newItem.name = '';
        } else if (stateKey === 'projects') {
            newItem.name = ''; newItem.description = ''; newItem.link = '';
        } else if (stateKey === 'certifications') {
            newItem.name = ''; newItem.issuer = '';
        }

        if (!this.state[stateKey]) this.state[stateKey] = [];
        this.state[stateKey].push(newItem);
        this.renderAll();
    },

    removeItem(type, id) {
        this.state[type] = this.state[type].filter(item => item.id !== id);
        this.renderAll();
    },

    // Rendering
    renderAll() {
        this.renderForm();
        this.renderPreview();
    },

    renderForm() {
        // Fill personal info
        Object.keys(this.state.personal).forEach(key => {
            const input = document.querySelector(`input[name="${key}"]`);
            if (input) input.value = this.state.personal[key] || '';
        });

        // Fill summary
        const summaryEl = document.querySelector('textarea[name="summary"]');
        if (summaryEl) summaryEl.value = this.state.summary || '';

        // Render dynamic lists
        this.renderDynamicList('experience');
        this.renderDynamicList('education');
        this.renderDynamicList('skills');
        this.renderDynamicList('projects');
        this.renderDynamicList('certifications');
    },

    renderDynamicList(type) {
        const container = document.getElementById(`${type}-list`);
        if (!container) return;
        
        container.innerHTML = this.state[type].map(item => `
            <div class="dynamic-item" data-type="${type}" data-id="${item.id}">
                <button type="button" class="btn-remove" data-remove-type="${type}" data-remove-id="${item.id}">
                    <i data-lucide="trash-2" style="width:14px;height:14px"></i>
                </button>
                <div class="form-grid">
                    ${this.getFieldsForType(type, item)}
                </div>
            </div>
        `).join('');
        
        lucide.createIcons();
    },

    getFieldsForType(type, item) {
        const fields = {
            experience: `
                <div class="input-group"><label>Company</label><input type="text" name="company" value="${item.company || ''}"></div>
                <div class="input-group"><label>Position</label><input type="text" name="position" value="${item.position || ''}"></div>
                <div class="input-group"><label>Start Year</label><input type="number" name="startDate" value="${item.startDate || ''}" placeholder="YYYY"></div>
                <div class="input-group">
                    <label>End Year</label>
                    <input type="number" name="endDate" value="${item.endDate || ''}" ${item.current ? 'disabled' : ''} placeholder="YYYY">
                    <label class="checkbox-label">
                        <input type="checkbox" name="current" ${item.current ? 'checked' : ''}> Currently Work Here
                    </label>
                </div>
                <div class="input-group" style="grid-column: span 2">
                    <label>Description (One bullet per line)</label>
                    <textarea name="description" rows="6" style="min-height: 120px; white-space: pre-wrap;" placeholder="• Developed a new feature...&#10;• Led a team of 5...">${item.description || ''}</textarea>
                    <small style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.25rem;">Start each line with a bullet (•) or hyphen (-) to format as list.</small>
                </div>
            `,
            education: `
                <div class="input-group"><label>School</label><input type="text" name="school" value="${item.school || ''}"></div>
                <div class="input-group">
                    <label>Level</label>
                    <select name="level">
                        <option value="Tertiary" ${item.level === 'Tertiary' ? 'selected' : ''}>Tertiary</option>
                        <option value="Secondary" ${item.level === 'Secondary' ? 'selected' : ''}>Secondary</option>
                        <option value="Vocational" ${item.level === 'Vocational' ? 'selected' : ''}>Vocational</option>
                        <option value="Primary" ${item.level === 'Primary' ? 'selected' : ''}>Primary</option>
                    </select>
                </div>
                <div class="input-group"><label>Degree / Qualification</label><input type="text" name="degree" value="${item.degree || ''}"></div>
                <div class="input-group"><label>Start Year</label><input type="number" name="startDate" value="${item.startDate || ''}" placeholder="YYYY"></div>
                <div class="input-group"><label>End Year</label><input type="number" name="endDate" value="${item.endDate || ''}" placeholder="YYYY"></div>
            `,
            skills: `
                <div class="input-group"><label>Skill Name</label><input type="text" name="name" value="${item.name || ''}"></div>
            `,
            projects: `
                <div class="input-group"><label>Project Name</label><input type="text" name="name" value="${item.name || ''}"></div>
                <div class="input-group"><label>Link</label><input type="url" name="link" value="${item.link || ''}"></div>
                <div class="input-group" style="grid-column: span 2">
                    <label>Description (One bullet per line)</label>
                    <textarea name="description" placeholder="• Built a full-stack app...&#10;• Integrated Stripe...">${item.description || ''}</textarea>
                </div>
            `,
            certifications: `
                <div class="input-group"><label>Certification</label><input type="text" name="name" value="${item.name || ''}"></div>
                <div class="input-group"><label>Issuer</label><input type="text" name="issuer" value="${item.issuer || ''}"></div>
            `
        };
        return fields[type] || '';
    },

    renderPreview() {
        const preview = document.getElementById('resume-preview');
        const s = this.state;
        const config = s.config;
        const templateId = config.template;
        const layout = config.layout;

        // Paper Size Handling
        if (config.paperSize === 'Letter') {
            preview.style.width = '215.9mm';
            preview.style.minHeight = '279.4mm';
        } else {
            preview.style.width = '210mm';
            preview.style.minHeight = '297mm';
        }

        preview.className = `resume-paper template-${templateId} layout-${layout} section-${config.sectionStyle} skills-${config.skillStyle}`;
        
        // Apply Config Styles directly to the element style to ensure they take effect
        preview.style.setProperty('--primary', config.primaryColor, 'important');
        preview.style.setProperty('font-family', config.fontFamily, 'important');
        preview.style.setProperty('font-size', config.fontSize, 'important');
        preview.style.setProperty('line-height', config.lineHeight, 'important');
        preview.style.setProperty('padding', config.margins, 'important');
        
        let html = '';

        if (templateId === 'creative' || layout === 'sidebar') {
            // Sidebar layout logic (kept same but can be adjusted for headerAlign if needed)
            html = `
                <div class="sidebar-col">
                    ${s.personal.photo ? `<img src="${s.personal.photo}" style="width:120px;height:120px;border-radius:12px;margin-bottom:1.5rem;object-fit:cover;">` : ''}
                    <h2 style="color:white;margin-bottom:0.5rem">${s.personal.fullName || 'Your Name'}</h2>
                    <p style="color:rgba(255,255,255,0.8);margin-bottom:2rem;font-weight:500">${s.personal.title || ''}</p>
                    
                    <div class="contact-sidebar" style="font-size:0.85rem;display:flex;flex-direction:column;gap:0.75rem;color:rgba(255,255,255,0.9)">
                        ${s.personal.email ? `<div><i data-lucide="mail"></i> ${s.personal.email}</div>` : ''}
                        ${s.personal.phone ? `<div><i data-lucide="phone"></i> ${s.personal.phone}</div>` : ''}
                        ${s.personal.address ? `<div><i data-lucide="map-pin"></i> ${s.personal.address}</div>` : ''}
                        ${s.personal.website ? `<div><i data-lucide="globe"></i> ${s.personal.website}</div>` : ''}
                        ${s.personal.linkedin ? `<div><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" class="brand-icon"> ${s.personal.linkedin}</div>` : ''}
                        ${s.personal.github ? `<div><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" class="brand-icon" style="filter: invert(1)"> ${s.personal.github}</div>` : ''}
                    </div>

                    <div style="margin-top:2.5rem">
                        <h4 style="color:white;text-transform:uppercase;font-size:0.75rem;letter-spacing:1px;margin-bottom:1rem;border-bottom:1px solid rgba(255,255,255,0.2);padding-bottom:0.5rem">Skills</h4>
                        <div style="display:flex;flex-direction:column;gap:0.75rem">
                            ${this.renderSkills(s.skills, config.skillStyle, true)}
                        </div>
                    </div>
                </div>
                <div class="main-col">
                    <section class="tm-section">
                        <h3 class="tm-section-title">Professional Summary</h3>
                        <p style="line-height:1.6; white-space: pre-wrap;">${s.summary || 'Summary goes here...'}</p>
                    </section>
                    ${this.renderPreviewSection('Experience', s.experience)}
                    ${this.renderPreviewSection('Education', s.education)}
                    ${this.renderPreviewSection('Projects', s.projects)}
                    ${this.renderPreviewSection('Certifications', s.certifications)}
                </div>
            `;
        } else {
            // Standard Top Header layout (used by most templates)
            const headerStyle = `text-align: ${config.headerAlign}; flex-direction: ${config.headerAlign === 'center' ? 'column' : 'row'}; align-items: ${config.headerAlign === 'center' ? 'center' : 'flex-start'};`;
            
            html = `
                <header class="tm-header" style="${headerStyle}">
                    <div style="flex: 1;">
                        <h1 class="tm-name">${s.personal.fullName || 'Your Name'}</h1>
                        <p class="tm-title">${s.personal.title || 'Professional Title'}</p>
                        <div class="tm-contact" style="justify-content: ${config.headerAlign === 'center' ? 'center' : 'flex-start'};">
                            ${s.personal.email ? `<span><i data-lucide="mail"></i> ${s.personal.email}</span>` : ''}
                            ${s.personal.phone ? `<span><i data-lucide="phone"></i> ${s.personal.phone}</span>` : ''}
                            ${s.personal.address ? `<span><i data-lucide="map-pin"></i> ${s.personal.address}</span>` : ''}
                            ${s.personal.website ? `<span><i data-lucide="globe"></i> ${s.personal.website}</span>` : ''}
                            ${s.personal.linkedin ? `<span><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" class="brand-icon"> ${s.personal.linkedin}</span>` : ''}
                            ${s.personal.github ? `<span><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" class="brand-icon"> ${s.personal.github}</span>` : ''}
                        </div>
                    </div>
                    ${s.personal.photo ? `<img src="${s.personal.photo}" style="width:100px;height:100px;border-radius:50%;object-fit:cover; margin-top: ${config.headerAlign === 'center' ? '1rem' : '0'};">` : ''}
                </header>

                <section class="tm-section">
                    <h3 class="tm-section-title">Professional Summary</h3>
                    <p style="white-space: pre-wrap;">${s.summary || 'Write a brief summary...'}</p>
                </section>

                ${this.renderPreviewSection('Experience', s.experience)}
                ${this.renderPreviewSection('Education', s.education)}
                ${this.renderPreviewSection('Projects', s.projects)}
                ${this.renderPreviewSection('Certifications', s.certifications)}
                
                <section class="tm-section">
                    <h3 class="tm-section-title">Skills</h3>
                    <div class="skills-container" style="display:flex;flex-wrap:wrap;gap:0.5rem; justify-content: ${config.headerAlign === 'center' ? 'center' : 'flex-start'};">
                        ${this.renderSkills(s.skills, config.skillStyle)}
                    </div>
                </section>
            `;
        }

        preview.innerHTML = html;
        // ... (rest of renderPreview logic for lucide icons and element styles)

        // Apply Font Family and Spacing to all elements after they are injected into DOM
        const allElements = preview.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.setProperty('font-family', config.fontFamily, 'important');
        });

        // Apply Spacing (Section Gaps) to the newly created elements
        const sections = preview.querySelectorAll('.tm-section');
        sections.forEach(sec => {
            sec.style.setProperty('margin-bottom', config.spacing, 'important');
        });

        // RE-INITIALIZE ICONS - CRITICAL FIX
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    },

    renderSkills(skills, style, isSidebar = false) {
        if (!skills || skills.length === 0) return '';
        
        return skills.map(skill => {
            if (style === 'badges') {
                const badgeBorder = isSidebar ? 'rgba(255,255,255,0.4)' : 'var(--primary)';
                const badgeColor = isSidebar ? 'white' : 'var(--primary)';
                return `
                    <span style="border: 1px solid ${badgeBorder}; padding:0.2rem 0.6rem; border-radius:4px; font-size:0.8rem; color: ${badgeColor}; font-weight: 500;">
                        ${skill.name}
                    </span>
                `;
            } else if (style === 'minimal') {
                return `<span style="font-size:0.875rem; color: ${isSidebar ? 'white' : 'inherit'}">${skill.name}</span>`;
            } else if (style === 'dots') {
                return `
                    <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.875rem; color: ${isSidebar ? 'white' : 'inherit'}">
                        <span style="width:6px; height:6px; background:var(--primary); border-radius:50%"></span>
                        <span>${skill.name}</span>
                    </div>
                `;
            } else { // 'tags'
                const tagBg = isSidebar ? 'rgba(255,255,255,0.1)' : '#f1f5f9';
                const tagColor = isSidebar ? 'white' : 'inherit';
                return `
                    <span style="background:${tagBg}; padding:0.25rem 0.75rem; border-radius:99px; font-size:0.875rem; color: ${tagColor}">
                        ${skill.name}
                    </span>
                `;
            }
        }).join('');
    },

    formatYear(year, format) {
        if (!year) return '';
        const yearStr = year.toString();
        
        if (format === "'YY") {
            return "'" + yearStr.slice(-2);
        } else if (format === "[YYYY]") {
            return `[${yearStr}]`;
        }
        return yearStr; // Default YYYY
    },

    renderPreviewSection(title, items) {
        if (!items || items.length === 0) return '';
        const config = this.state.config;
        
        return `
            <section class="tm-section">
                <h3 class="tm-section-title">${title}</h3>
                ${items.map(item => {
                    // Extract only the year
                    const startYearRaw = item.startDate ? item.startDate.toString().split('-')[0] : '';
                    const endYearRaw = item.endDate ? item.endDate.toString().split('-')[0] : '';
                    
                    const startYear = this.formatYear(startYearRaw, config.dateFormat);
                    const endYear = this.formatYear(endYearRaw, config.dateFormat);
                    
                    return `
                    <div style="margin-bottom: 1rem">
                        <div style="display:flex;justify-content:space-between;font-weight:600">
                            <span>
                                ${item.position || item.degree || item.school || item.name || 'Untitled'} 
                                ${item.company ? `at ${item.company}` : ''} 
                                ${item.school && item.degree ? `from ${item.school}` : ''}
                                ${item.level ? `(${item.level})` : ''}
                            </span>
                            <span style="color:#64748b;font-size:0.875rem">
                                ${startYear || ''} ${startYear && (item.current || endYearRaw) ? '-' : ''} ${item.current ? 'Present' : endYear || ''}
                            </span>
                        </div>
                        ${item.link ? `<div style="font-size:0.8rem; color:var(--primary);"><i data-lucide="link" style="width:12px; height:12px"></i> <a href="${item.link}" target="_blank" style="color:inherit; text-decoration:none">${item.link}</a></div>` : ''}
                        <p style="margin-top:0.25rem; white-space: pre-wrap;">${item.description || ''}</p>
                        ${item.issuer ? `<p style="font-size:0.875rem; color:#64748b">${item.issuer}</p>` : ''}
                    </div>
                `}).join('')}
            </section>
        `;
    },

    // Helpers
    handlePhotoUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.state.personal.photo = event.target.result;
                document.getElementById('photo-preview').innerHTML = `<img src="${event.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">`;
                this.renderPreview();
                this.saveToLocalStorage();
            };
            reader.readAsDataURL(file);
        }
    },

    updateZoom(level) {
        const preview = document.getElementById('resume-preview');
        preview.style.transform = `scale(${level / 100})`;
        document.getElementById('zoom-level').textContent = `${level}%`;
    },

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        this.state.config.theme = next;
        this.saveToLocalStorage();
    },

    updateCompletion() {
        // Simple logic: check how many fields are filled
        const fields = [
            this.state.personal.fullName,
            this.state.personal.email,
            this.state.summary,
            this.state.experience.length > 0,
            this.state.education.length > 0,
            this.state.skills.length > 0
        ];
        const filled = fields.filter(Boolean).length;
        const percentage = Math.round((filled / fields.length) * 100);
        
        document.querySelector('.progress-fill').style.width = `${percentage}%`;
        document.querySelector('.percentage').textContent = `${percentage}%`;
    },

    tips: [
        "Add a professional photo to increase your chances by 30%!",
        "Quantify your achievements (e.g., 'Increased sales by 20%').",
        "Keep your resume to 1-2 pages for maximum impact.",
        "Use action verbs like 'Led', 'Developed', and 'Managed'.",
        "Tailor your summary to the specific job you're applying for."
    ],

    updateTips() {
        const tipEl = document.getElementById('ai-tip');
        if (tipEl) {
            tipEl.textContent = this.tips[Math.floor(Math.random() * this.tips.length)];
        }
    },

    // Persistence
    saveToLocalStorage() {
        const statusEl = document.getElementById('save-status');
        if (statusEl) {
            statusEl.innerHTML = '<i data-lucide="refresh-cw" class="spin" style="width: 14px;"></i><span>Saving...</span>';
            lucide.createIcons();
        }

        localStorage.setItem('resume_data', JSON.stringify(this.state));

        setTimeout(() => {
            if (statusEl) {
                statusEl.innerHTML = '<i data-lucide="check-circle" style="width: 14px;"></i><span>All changes saved</span>';
                lucide.createIcons();
            }
        }, 800);
    },

    loadFromLocalStorage() {
        const saved = localStorage.getItem('resume_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                
                // Sanitize dates: Convert "YYYY-MM" to "YYYY" for the new number inputs
                if (parsed.experience) {
                    parsed.experience.forEach(exp => {
                        if (exp.startDate && exp.startDate.includes('-')) exp.startDate = exp.startDate.split('-')[0];
                        if (exp.endDate && exp.endDate.includes('-')) exp.endDate = exp.endDate.split('-')[0];
                    });
                }
                if (parsed.education) {
                    parsed.education.forEach(edu => {
                        if (edu.startDate && edu.startDate.includes('-')) edu.startDate = edu.startDate.split('-')[0];
                        if (edu.endDate && edu.endDate.includes('-')) edu.endDate = edu.endDate.split('-')[0];
                    });
                }

                this.state = parsed;
                if (this.state.config.theme) {
                    document.documentElement.setAttribute('data-theme', this.state.config.theme);
                }
            } catch (e) {
                console.error("Failed to parse saved data", e);
            }
        }
    },

    saveToHistory() {
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(JSON.stringify(this.state));
        this.historyIndex++;
        if (this.history.length > 20) {
            this.history.shift();
            this.historyIndex--;
        }
    },

    exportJSON() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "resume.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    },

    importJSON(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                this.state = JSON.parse(event.target.result);
                this.renderAll();
                this.saveToLocalStorage();
            } catch (err) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }
};

// Start the app
window.addEventListener('DOMContentLoaded', () => ResumeApp.init());

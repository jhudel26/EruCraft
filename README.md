# EruCraft - Modern Resume Builder

A beautiful, modern web application for creating professional resumes with multiple templates and real-time preview.

## Features

### 🎨 Template Selection
- **Interactive Carousel**: Choose from 5 professionally designed resume templates
- **Game Console Style**: Smooth transitions and hover effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Auto-play**: Templates rotate automatically every 5 seconds

### 📝 Resume Templates
1. **Classic Blue** - Traditional professional layout with dark blue sidebar
2. **Modern Beige** - Creative minimalist design perfect for designers
3. **Teal Professional** - Modern layout with competency progress bars
4. **Light Blue** - Healthcare-focused design with clean typography
5. **Dark Gray Modern** - Bold contemporary style with striking accents

### ✨ Real-time Preview
- **Live Updates**: See changes instantly as you type
- **Zoom Controls**: Zoom in/out to preview at different sizes
- **Responsive Layout**: Preview adapts to different screen sizes
- **Professional Styling**: Each template maintains its unique design

### 📄 PDF Export
- **High Quality**: Generates professional PDF files
- **Automatic Naming**: Files named based on your name
- **Multi-page Support**: Handles long resumes automatically
- **Print Ready**: Optimized for printing and digital sharing

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation
1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start building your resume!

### File Structure
```
EruCraft/
├── index.html          # Template selection page
├── form.html           # Resume builder form
├── styles.css          # Main page styles
├── form-styles.css     # Form page styles
├── script.js           # Template selection logic
├── form-script.js      # Resume builder logic
└── README.md           # This file
```

## How to Use

### Step 1: Choose Template
1. Open `index.html` in your browser
2. Browse through the 5 available templates using:
   - Arrow buttons on the sides
   - Navigation dots at the bottom
   - Click directly on templates
   - Use keyboard arrows (← →)
3. Click "Select Template" when you find the one you like

### Step 2: Fill Out Form
1. You'll be taken to the resume builder form
2. Fill in your personal information:
   - Name, job title, contact details
   - Professional summary
   - Work experience (add multiple entries)
   - Education (add multiple entries)
   - Skills and languages
3. Watch the live preview update in real-time

### Step 3: Download PDF
1. Review your resume in the preview panel
2. Use zoom controls to check details
3. Click "Download PDF" to save your resume
4. The file will be automatically named and downloaded

## Features in Detail

### Template Carousel
- **Smooth Animations**: CSS transitions for professional feel
- **Hover Effects**: Templates lift and highlight on hover
- **Active State**: Selected template is clearly marked
- **Keyboard Navigation**: Full keyboard accessibility

### Form Interface
- **Real-time Updates**: Changes appear instantly in preview
- **Dynamic Sections**: Add/remove work experience and education entries
- **Input Validation**: Proper form field types and validation
- **Responsive Layout**: Adapts to different screen sizes

### PDF Generation
- **High Resolution**: 2x scale for crisp text and graphics
- **Automatic Pagination**: Handles long resumes across multiple pages
- **Professional Quality**: Print-ready output
- **Error Handling**: Graceful fallbacks if generation fails

## Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Technical Details

### Libraries Used
- **jsPDF**: PDF generation
- **html2canvas**: HTML to image conversion
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter font family)

### Key Technologies
- **Vanilla JavaScript**: No frameworks required
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: Consistent theming
- **Local Storage**: Template selection persistence

## Customization

### Adding New Templates
1. Create new template CSS classes in `form-styles.css`
2. Add template preview HTML in `index.html`
3. Update template mapping in `form-script.js`
4. Add template generation logic in `getSidebarHTML()` and `getMainContentHTML()`

### Styling Modifications
- Colors: Update CSS custom properties in `:root`
- Typography: Change Google Fonts import
- Layout: Modify grid and flexbox properties
- Animations: Adjust transition durations and easing

## Troubleshooting

### Common Issues
1. **PDF not downloading**: Check browser popup blockers
2. **Template not loading**: Ensure all files are in the same folder
3. **Preview not updating**: Check browser console for JavaScript errors
4. **Styling issues**: Clear browser cache and reload

### Performance Tips
- Use modern browsers for best performance
- Close other tabs if experiencing slowdowns
- Ensure stable internet connection for font loading

## License
This project is open source and available under the MIT License.

## Support
For issues or questions, please check the browser console for error messages and ensure all files are properly loaded.

---

**EruCraft** - Create professional resumes in minutes! 🚀

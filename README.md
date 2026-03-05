# MavunoSasa Website

A fully responsive and functional website for MavunoSasa, an organization dedicated to helping farmers achieve harvests, reduce poverty, and thrive.

## Features

### 🎨 Design
- Modern, clean design with a professional green color scheme
- Fully responsive layout that works on all devices (desktop, tablet, mobile)
- Smooth animations and transitions
- Interactive hover effects

### 📱 Responsive Breakpoints
- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: Below 768px
- Small mobile: Below 480px

### ✨ Functionality
- **Sticky Navigation**: Fixed navbar with smooth scrolling to sections
- **Mobile Menu**: Hamburger menu with animated transitions
- **Scroll Animations**: Elements fade in as you scroll
- **Animated Statistics**: Numbers count up when scrolled into view
- **Contact Form**: Functional form with validation
- **Interactive Buttons**: All buttons are functional and navigate appropriately
- **Parallax Effects**: Hero section has subtle parallax scrolling
- **Active Navigation**: Current section is highlighted in navigation

### 📄 Sections
1. **Hero**: Eye-catching introduction with call-to-action
2. **About**: Overview of MavunoSasa services
3. **Vision & Mission**: Organization's goals and purpose
4. **What We Do**: Services and offerings
5. **Where We Work**: Geographic coverage
6. **Impact**: Statistics and success stories
7. **Crop Impact**: Specific crop improvements
8. **Testimonials**: Farmer success stories
9. **Call to Action**: Engagement opportunities
10. **Roadmap**: Current initiatives and future goals
11. **Partners**: Trusted organizations
12. **Team**: Meet the leadership
13. **Collaborate**: Partnership opportunities
14. **Contact**: Get in touch form
15. **Footer**: Links and information

## File Structure

```
mavunosasa/
├── index.html          # Main HTML file
├── styles.css          # All styles and responsive design
├── script.js           # Interactive functionality
└── README.md          # This file
```

## How to Use

### Option 1: Local Development
1. Open `index.html` in any modern web browser
2. All functionality will work immediately

### Option 2: Live Server (Recommended)
1. Install a local server (VS Code Live Server, Python SimpleHTTPServer, etc.)
2. Serve the files from the mavunosasa directory
3. Open in your browser

### For VS Code Users:
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### For Python Users:
```bash
# Navigate to the mavunosasa folder
cd mavunosasa

# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### For Node.js Users:
```bash
# Install http-server globally
npm install -g http-server

# Navigate to the mavunosasa folder and run
cd mavunosasa
http-server

# Open the provided URL in your browser
```

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## Customization

### Colors
Colors are defined in CSS variables at the top of `styles.css`:
```css
:root {
    --primary-green: #2d5f3f;
    --secondary-green: #3a7550;
    --accent-green: #4a9668;
    --light-green: #e8f5e9;
    --dark-green: #1e4029;
    --orange-accent: #f5a623;
}
```

### Content
- Edit `index.html` to update text, images, and structure
- Replace placeholder images with actual photos
- Update contact information in the footer and contact section

### Styling
- Modify `styles.css` to change layouts, colors, fonts, and spacing
- All responsive breakpoints are in the media queries at the bottom

### Functionality
- Edit `script.js` to modify interactive behaviors
- Add new features or animations as needed

## Key Features Explained

### Mobile Navigation
- Hamburger menu appears on screens smaller than 768px
- Smooth animation when opening/closing
- Automatically closes when clicking a link

### Form Validation
- Contact form validates email format
- Required fields are checked before submission
- Success message shown after submission

### Scroll Animations
- Statistics animate when scrolled into view
- Sections fade in as they enter viewport
- Navbar shadow increases on scroll

### Button Actions
- "Learn More" → Scrolls to About section
- "Get Involved" / "Get in Touch" → Scrolls to Contact section
- "Join as Farmer" → Shows contact information
- Form submit → Validates and shows success message

## Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Focus states for keyboard navigation
- Respects prefers-reduced-motion setting
- High contrast color combinations

## Performance

- Optimized CSS with minimal animations
- Efficient JavaScript with event delegation
- Intersection Observer for scroll animations
- Lazy loading for images
- Smooth scrolling behavior

## Future Enhancements

Potential additions:
- Backend integration for form submissions
- Database for farmer registration
- Admin panel for content management
- Blog section for updates and news
- Multi-language support
- Image gallery
- Video testimonials
- Newsletter subscription
- Social media feed integration

## Support

For issues or questions:
- Email: info@mavunosasa.org
- Phone: +254 700 123 456

## License

© 2026 MavunoSasa. All rights reserved.

---

**Built with ❤️ for farmers**
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="landing-page">
      <!-- Top Navigation -->
      <nav class="navbar">
        <div class="nav-left">
          <div class="brand">
            <img src="/logo1.png" alt="Smart Wall Logo" class="brand-img">
            SmartWall
          </div>
          <div class="nav-links hidden-mobile">
            <a routerLink="/visualizer">Visualize <span>⌄</span></a>
            <a routerLink="/visualizer">Colors <span>⌄</span></a>
            <a routerLink="/dashboard">Guides</a>
            <a routerLink="/about">About</a>
          </div>
        </div>
        <div class="nav-right">
          <button routerLink="/visualizer" class="btn primary">Start for free →</button>
          <button routerLink="/login" class="btn secondary outline">Sign in</button>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="hero">
        <div class="hero-content">
          <h1>Visualize your home's interior or exterior in real paint colors from top brands. Just snap a photo, choose a color, visualize, and share.</h1>
          
          <div class="cta-group">
            <button routerLink="/visualizer" class="btn primary large">Start for Free</button>
            <button routerLink="/visualizer" class="btn secondary outline large">Browse Colors</button>
          </div>
          <p class="subtext">Free credits for new users • No credit card required</p>
        </div>
      </header>

      <!-- Seeing is Believing Section -->
      <section class="gallery-section">
        <div class="gallery-header">
          <h2>Seeing is believing</h2>
          <p>Drag the sliders to compare original images with digital paint previews. These illustrate color ideas, not completed customer paint jobs.</p>
        </div>

        <div class="slider-grid">
          <div class="slider-card">
            <div class="slider-image before-image" style="background-color: #e0e0e0;">
              <span class="label">Before</span>
            </div>
            <div class="slider-image after-image" style="background-color: #4a6b75;">
              <span class="label">After</span>
            </div>
            <div class="slider-handle">⇌</div>
          </div>
          
          <div class="slider-card">
            <div class="slider-image before-image" style="background-color: #d2a679;">
              <span class="label">Before</span>
            </div>
            <div class="slider-image after-image" style="background-color: #f5f5f0;">
              <span class="label">After</span>
            </div>
            <div class="slider-handle">⇌</div>
          </div>

          <div class="slider-card">
            <div class="slider-image before-image" style="background-color: #a3a3a3;">
              <span class="label">Before</span>
            </div>
            <div class="slider-image after-image" style="background-color: #e6e6da;">
              <span class="label">After</span>
            </div>
            <div class="slider-handle">⇌</div>
          </div>
        </div>
      </section>

      <!-- Comprehensive Footer -->
      <footer class="footer">
        <div class="footer-grid">
          <div class="footer-brand-col">
            <div class="brand">
              <img src="assets/logo1.png" alt="Smart Wall Logo" class="brand-img" onerror="this.src='https://ui-avatars.com/api/?name=SW&background=c55a30&color=fff&rounded=true'">
              SmartWall
            </div>
            <p>An independent paint visualizer and color guide. Preview real colors from every major brand on a photo of your own home, in your own light.</p>
            <div class="footer-buttons">
              <button routerLink="/visualizer" class="btn outline small">All visualizers →</button>
              <button routerLink="/visualizer" class="btn outline small">All colors →</button>
            </div>
            <div class="social-links">
              <span class="social-icon">📷</span>
              <span class="social-icon">f</span>
              <span class="social-icon">𝕏</span>
              <span class="social-icon">P</span>
            </div>
          </div>

          <div class="footer-col">
            <h4>VISUALIZERS</h4>
            <ul>
              <li><a routerLink="/visualizer">Interior Walls</a></li>
              <li><a routerLink="/visualizer">Front & Entry Doors</a></li>
              <li><a routerLink="/visualizer">Siding</a></li>
              <li><a routerLink="/visualizer">Exterior Trim</a></li>
              <li><a routerLink="/visualizer">Bathroom</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>&nbsp;</h4>
            <ul>
              <li><a routerLink="/visualizer">Kitchen & Bathroom</a></li>
              <li><a routerLink="/visualizer">Cabinets</a></li>
              <li><a routerLink="/visualizer">Exterior Shutters</a></li>
              <li><a routerLink="/visualizer">Brick</a></li>
              <li><a routerLink="/visualizer">Ceilings</a></li>
              <li><a routerLink="/visualizer">Roof</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>PAINT COLORS</h4>
            <ul>
              <li><a routerLink="/visualizer">Sherwin-Williams</a></li>
              <li><a routerLink="/visualizer">Benjamin Moore</a></li>
              <li><a routerLink="/visualizer">Behr</a></li>
              <li><a routerLink="/visualizer">PPG</a></li>
              <li><a routerLink="/visualizer">Farrow & Ball</a></li>
              <li><a routerLink="/visualizer">Valspar</a></li>
              <li><a routerLink="/visualizer">Dunn-Edwards</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>COMPANY</h4>
            <ul>
              <li><a routerLink="/about">About</a></li>
              <li><a routerLink="/dashboard">Guides</a></li>
              <li><a routerLink="/">Contact</a></li>
              <li><a routerLink="/">Privacy policy</a></li>
              <li><a routerLink="/">Terms of use</a></li>
              <li><a routerLink="/">Cookies policy</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 Anmol Tiwari. All rights reserved.</p>
          <div class="legal-links">
            <a routerLink="/">Privacy</a>
            <a routerLink="/">Terms</a>
            <a routerLink="/">Cookies</a>
          </div>
        </div>
        <div class="footer-disclaimer">
          <p>Sherwin-Williams®, Benjamin Moore®, Behr®, PPG®, Farrow & Ball®, Valspar®, and Dunn-Edwards® are registered trademarks of their respective owners. SmartWall is not affiliated with, endorsed by, or sponsored by any paint manufacturer. Color names and codes are used for identification only. Digital previews are approximations: screen colors vary, and actual paint appearance depends on lighting, surface, and application. Always confirm your choice with a physical swatch before purchasing.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .landing-page { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #ffffff; color: #333; }
    
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 15px 40px; background: #ffffff; border-bottom: 1px solid #f0f0f0; }
    .nav-left, .nav-right { display: flex; align-items: center; gap: 30px; }
    .brand { display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 700; color: #111; }
    .brand-img { width: 40px; height: 40px; border-radius: 8px; object-fit: contain; }
    .nav-links { display: flex; gap: 24px; }
    .nav-links a { color: #555; text-decoration: none; font-size: 15px; font-weight: 500; cursor: pointer; }
    .nav-links a span { font-size: 10px; color: #888; }
    .nav-links a:hover { color: #111; }
    
    .btn { padding: 10px 20px; border-radius: 24px; font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.2s; border: none; }
    .btn.primary { background: #c55a30; color: white; }
    .btn.primary:hover { background: #a84824; }
    .btn.secondary.outline { background: transparent; border: 1px solid #ddd; color: #333; }
    .btn.secondary.outline:hover { border-color: #999; }
    .btn.large { padding: 14px 32px; font-size: 16px; border-radius: 30px; }
    .btn.small { padding: 8px 16px; font-size: 14px; border-radius: 20px; }

    .hero { text-align: center; padding: 80px 20px 100px; background: radial-gradient(circle at 50% 0%, #fff2ec 0%, #ffffff 70%); }
    .hero-content { max-width: 800px; margin: 0 auto; }
    .hero h1 { font-size: 26px; line-height: 1.4; color: #444; font-weight: 400; margin-bottom: 40px; }
    .cta-group { display: flex; gap: 15px; justify-content: center; margin-bottom: 20px; }
    .subtext { color: #888; font-size: 14px; }

    .gallery-section { padding: 0 40px 80px; max-width: 1200px; margin: 0 auto; text-align: center; }
    .gallery-header h2 { font-size: 32px; color: #111; margin-bottom: 15px; }
    .gallery-header p { color: #666; font-size: 16px; max-width: 600px; margin: 0 auto 40px; line-height: 1.5; }
    
    .slider-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    .slider-card { height: 250px; border-radius: 12px; overflow: hidden; position: relative; display: flex; background: #eee; }
    .slider-image { flex: 1; position: relative; }
    .label { position: absolute; top: 15px; background: rgba(0,0,0,0.6); color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 500; }
    .before-image .label { left: 15px; }
    .after-image .label { right: 15px; }
    .slider-handle { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 36px; height: 36px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #555; box-shadow: 0 2px 10px rgba(0,0,0,0.1); cursor: ew-resize; z-index: 10; }

    .footer { padding: 60px 40px 40px; background: #fafafa; border-top: 1px solid #eaeaea; }
    .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 60px; }
    .footer-brand-col p { color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0; }
    .footer-buttons { display: flex; gap: 10px; margin-bottom: 20px; }
    .social-links { display: flex; gap: 10px; }
    .social-icon { width: 36px; height: 36px; border: 1px solid #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #555; cursor: pointer; }
    
    .footer-col h4 { font-size: 12px; letter-spacing: 1px; color: #111; margin-bottom: 20px; text-transform: uppercase; }
    .footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
    .footer-col a { color: #666; text-decoration: none; font-size: 14px; cursor: pointer; }
    .footer-col a:hover { color: #c55a30; }

    .footer-bottom { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding-top: 30px; border-top: 1px solid #eaeaea; color: #888; font-size: 13px; }
    .legal-links { display: flex; gap: 20px; }
    .legal-links a { color: #888; text-decoration: none; cursor: pointer; }
    .footer-disclaimer { max-width: 1200px; margin: 20px auto 0; color: #aaa; font-size: 11px; line-height: 1.6; }

    @media (max-width: 768px) {
      .hidden-mobile { display: none; }
      .footer-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent {}
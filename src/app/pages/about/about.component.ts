import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-layout">
      <!-- Top Navigation -->
      <nav class="navbar">
        <div class="nav-left">
          <a routerLink="/" class="brand">
            <img src="https://ui-avatars.com/api/?name=SW&background=c55a30&color=fff&rounded=true" alt="Smart Wall Logo" class="brand-img">
            SmartWall
          </a>
        </div>
        <div class="nav-right">
          <button routerLink="/visualizer" class="btn primary">Start for free →</button>
        </div>
      </nav>

      <!-- About Content -->
      <main class="about-container">
        <div class="about-header">
          <h1>About SmartWall</h1>
          <p>Taking the guesswork out of home improvement.</p>
        </div>
        
        <div class="about-content">
          <section class="info-card">
            <h2>Our Mission</h2>
            <p>Painting a room is a huge commitment, and tiny paper swatches rarely tell the whole story. SmartWall was built to solve this problem by leveraging modern web technologies and HTML5 Canvas masking to give you a realistic, instant preview of your space before you ever open a can of paint.</p>
          </section>

          <section class="info-card">
            <h2>How It Works</h2>
            <p>By using CSS multiply and color-burn blend modes, our rendering engine dynamically tints your actual room photos while preserving natural shadows and lighting. We pair this with seamless SVG patterns to accurately simulate physical textures like matte stucco, wood paneling, and exposed brick.</p>
          </section>

          <section class="info-card developer-card">
            <h2>The Developer</h2>
            <p>SmartWall is an interactive frontend prototype developed by <strong>Anmol Tiwari</strong>. Built entirely with Angular, it showcases advanced state management, Canvas API manipulation, responsive UI design, and client-side data persistence.</p>
            <div class="action-links">
              <a routerLink="/dashboard" class="text-link">View Dashboard →</a>
            </div>
          </section>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .page-layout { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #fafafa; color: #333; min-height: 100vh; display: flex; flex-direction: column; }
    
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 15px 40px; background: #ffffff; border-bottom: 1px solid #f0f0f0; }
    .brand { display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 700; color: #111; text-decoration: none; }
    .brand-img { width: 40px; height: 40px; border-radius: 8px; object-fit: contain; }
    
    .btn { padding: 10px 20px; border-radius: 24px; font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.2s; border: none; text-decoration: none; display: inline-block; }
    .btn.primary { background: #c55a30; color: white; }
    .btn.primary:hover { background: #a84824; }

    .about-container { flex: 1; max-width: 800px; margin: 0 auto; padding: 60px 20px; }
    .about-header { text-align: center; margin-bottom: 50px; }
    .about-header h1 { font-size: 36px; color: #111; margin-bottom: 10px; }
    .about-header p { font-size: 18px; color: #666; margin: 0; }

    .about-content { display: flex; flex-direction: column; gap: 30px; }
    .info-card { background: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #eaeaea; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
    .info-card h2 { margin-top: 0; color: #111; font-size: 22px; margin-bottom: 15px; }
    .info-card p { line-height: 1.6; color: #555; margin: 0; font-size: 16px; }
    
    .developer-card { border-left: 4px solid #c55a30; }
    .action-links { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eaeaea; }
    .text-link { color: #c55a30; text-decoration: none; font-weight: 600; }
    .text-link:hover { text-decoration: underline; }
  `]
})
export class AboutComponent {}

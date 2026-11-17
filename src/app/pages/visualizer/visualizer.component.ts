import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="visualizer-layout">
      <nav class="top-nav">
        <div class="logo">Smart Wall <span>Visualizer</span></div>
        <a routerLink="/dashboard" class="back-btn">← Back to Dashboard</a>
      </nav>

      <div class="workspace">
        <aside class="toolbar">
          <h3>Design Tools</h3>
          
          <div class="tool-group">
            <label>Base Wall Color</label>
            <input type="color" [value]="wallColor" (input)="onColorChange($event)">
          </div>
          
          <div class="tool-group">
            <label>Upload Room Image</label>
            <input type="file" accept="image/*" class="file-input" (change)="onImageUpload($event)">
          </div>

          <div class="tool-group">
            <label>Apply Texture</label>
            <select class="texture-select" [value]="selectedTexture" (change)="onTextureChange($event)">
              <option value="none">None</option>
              <option value="stucco">Stucco / Matte</option>
              <option value="stripes">Vertical Paneling</option>
              <option value="brick">Exposed Brick</option>
            </select>
          </div>
          
          <div class="action-buttons">
            <!-- Added the Export Image button -->
            <button class="btn primary" (click)="exportImage()">Export Image</button>
            <button class="btn primary" (click)="saveProject()">Save Project</button>
            <button class="btn secondary" (click)="clearMask()">Clear Mask Points</button>
            <button class="btn secondary" (click)="resetCanvas()">Reset Everything</button>
          </div>
        </aside>

        <main class="canvas-container">
          <canvas #wallCanvas 
                  (click)="onCanvasClick($event)"
                  class="interactive-canvas">
          </canvas>
          @if (!imageLoaded) {
            <p class="placeholder-text">Upload an image to start masking</p>
          }
        </main>
      </div>
    </div>
  `,
  styles: [`
    .visualizer-layout { display: flex; flex-direction: column; height: 100vh; background-color: #1e1e1e; color: white; font-family: sans-serif; }
    .top-nav { display: flex; justify-content: space-between; align-items: center; padding: 15px 30px; background-color: #2d2d2d; border-bottom: 1px solid #444; }
    .logo { font-size: 20px; font-weight: bold; letter-spacing: 1px; }
    .logo span { color: #0056b3; }
    .back-btn { color: #aaa; text-decoration: none; font-size: 14px; transition: color 0.2s; }
    .back-btn:hover { color: white; }
    .workspace { display: flex; flex: 1; overflow: hidden; }
    .toolbar { width: 320px; background-color: #252525; padding: 25px; border-right: 1px solid #444; display: flex; flex-direction: column; gap: 25px; overflow-y: auto; }
    .toolbar h3 { margin: 0 0 10px 0; color: #eee; font-size: 16px; text-transform: uppercase; border-bottom: 1px solid #444; padding-bottom: 10px; }
    .tool-group label { display: block; font-size: 13px; color: #aaa; margin-bottom: 8px; font-weight: bold; }
    .tool-group input[type="color"] { width: 100%; height: 45px; border: none; border-radius: 4px; cursor: pointer; background: transparent; }
    .file-input { width: 100%; font-size: 13px; color: #ccc; }
    .texture-select { width: 100%; padding: 10px; background-color: #333; color: white; border: 1px solid #555; border-radius: 4px; font-size: 14px; }
    .action-buttons { display: flex; flex-direction: column; gap: 10px; margin-top: auto; padding-top: 20px; }
    .btn { padding: 14px; border: none; border-radius: 4px; font-weight: bold; font-size: 14px; cursor: pointer; transition: background 0.2s; }
    .btn.primary { background-color: #0056b3; color: white; }
    .btn.primary:hover { background-color: #004494; }
    .btn.secondary { background-color: #444; color: white; }
    .btn.secondary:hover { background-color: #555; }
    .canvas-container { flex: 1; display: flex; justify-content: center; align-items: center; padding: 40px; background-color: #121212; position: relative; }
    .interactive-canvas { max-width: 100%; max-height: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.5); cursor: crosshair; }
    .placeholder-text { position: absolute; color: #666; font-size: 24px; font-weight: bold; pointer-events: none; }
  `]
})
export class VisualizerComponent implements OnInit {
  @ViewChild('wallCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  wallColor: string = '#3498db'; 
  imageLoaded: boolean = false;
  selectedTexture: string = 'none';
  
  private ctx!: CanvasRenderingContext2D;
  private img = new Image();
  private textureImg = new Image();
  private points: {x: number, y: number}[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['color']) {
        this.wallColor = params['color'];
      }
      if (params['texture']) {
        this.selectedTexture = params['texture'];
        if (this.selectedTexture !== 'none') {
          this.textureImg.src = this.getTextureSvgBase64(this.selectedTexture);
        }
      }
    });
  }

  onColorChange(event: Event) {
    this.wallColor = (event.target as HTMLInputElement).value;
    this.drawCanvas(); 
  }

  onTextureChange(event: Event) {
    this.selectedTexture = (event.target as HTMLSelectElement).value;
    if (this.selectedTexture !== 'none') {
      this.textureImg.src = this.getTextureSvgBase64(this.selectedTexture);
      this.textureImg.onload = () => this.drawCanvas();
    } else {
      this.drawCanvas();
    }
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.img.src = e.target?.result as string;
        this.img.onload = () => {
          this.imageLoaded = true;
          this.initCanvas();
        };
      };
      reader.readAsDataURL(file);
    }
  }

  initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = this.img.width;
    canvas.height = this.img.height;
    this.drawCanvas();
  }

  onCanvasClick(event: MouseEvent) {
    if (!this.imageLoaded) return;
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    this.points.push({ x, y });
    this.drawCanvas();
  }

  // Added hideUI parameter so we can turn off the dashed lines during export
  drawCanvas(hideUI: boolean = false) {
    if (!this.ctx || !this.imageLoaded) return;
    const canvas = this.canvasRef.nativeElement;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);

    if (this.points.length > 0) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.points[0].x, this.points[0].y);
      for (let i = 1; i < this.points.length; i++) {
        this.ctx.lineTo(this.points[i].x, this.points[i].y);
      }
      this.ctx.closePath();

      this.ctx.globalCompositeOperation = 'multiply';
      this.ctx.fillStyle = this.wallColor;
      this.ctx.fill();

      if (this.selectedTexture !== 'none' && this.textureImg.complete) {
        this.ctx.globalCompositeOperation = 'color-burn';
        const pattern = this.ctx.createPattern(this.textureImg, 'repeat');
        if (pattern) {
          this.ctx.fillStyle = pattern;
          this.ctx.fill();
        }
      }

      // Only draw the UI dots and lines if hideUI is false
      if (!hideUI) {
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([5, 5]);
        this.ctx.stroke();
        this.ctx.setLineDash([]); 

        this.ctx.fillStyle = '#0056b3';
        this.points.forEach(p => {
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.stroke();
        });
      }
    }
  }

  // Export functionality
  exportImage() {
    if (!this.imageLoaded) {
      alert('Please upload an image and draw a mask first.');
      return;
    }
    
    // 1. Redraw the canvas without the dotted lines and anchor points
    this.drawCanvas(true);
    
    // 2. Extract the image data
    const canvas = this.canvasRef.nativeElement;
    const dataUrl = canvas.toDataURL('image/png');
    
    // 3. Create a formatted date string (e.g., 2026-10-17)
    const dateString = new Date().toISOString().split('T')[0];
    
    // 4. Create a temporary download link and trigger it
    const link = document.createElement('a');
    
    // 5. Append the date string to the filename
    link.download = `smart-wall-design-${dateString}.png`;
    
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 6. Restore the UI lines for the user
    this.drawCanvas(false);
  }

  clearMask() {
    this.points = [];
    this.drawCanvas();
  }

  resetCanvas() {
    this.imageLoaded = false;
    this.points = [];
    this.selectedTexture = 'none';
    this.img.src = '';
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    }
  }

  saveProject() {
    if (!this.imageLoaded || this.points.length === 0) {
      alert('Please upload an image and draw a mask before saving.');
      return;
    }

    const newProject = {
      id: Date.now(),
      color: this.wallColor,
      texture: this.selectedTexture,
      date: new Date().toLocaleDateString()
    };

    const existingProjects = JSON.parse(localStorage.getItem('smartWallProjects') || '[]');
    existingProjects.push(newProject);
    localStorage.setItem('smartWallProjects', JSON.stringify(existingProjects));

    alert('Project saved! Check your dashboard for updated stats.');
  }

  private getTextureSvgBase64(type: string): string {
    let svgString = '';
    const strokeProps = `stroke="#000000" stroke-opacity="0.5" stroke-width="3"`;
    if (type === 'stucco') {
      svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="2" fill="#000000" fill-opacity="0.4"/></svg>`;
    } else if (type === 'stripes') {
      svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path d="M20,0 V40" ${strokeProps} fill="none"/></svg>`;
    } else if (type === 'brick') {
      svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="30"><path d="M0,15 H60 M30,0 V15 M0,15 V30 M60,15 V30" ${strokeProps} fill="none"/></svg>`;
    }
    return 'data:image/svg+xml;base64,' + window.btoa(svgString);
  }
}
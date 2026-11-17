import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="dashboard-layout">
      <aside class="sidebar">
        <h2>Smart Wall</h2>
        <nav>
          <a routerLink="/dashboard" class="active">Dashboard</a>
          <a routerLink="/visualizer">Visualizer</a>
          <a routerLink="/login">Logout</a>
        </nav>
      </aside>

      <main class="main-content">
        <header>
          <h1>Welcome back, Anmol</h1>
          <p>Here is an overview of your recent wall designs and metrics.</p>
        </header>

        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total Saved Designs</h3>
            <p class="stat-number">{{ totalProjects }}</p>
          </div>
          <div class="stat-card">
            <h3>Textured Walls</h3>
            <p class="stat-number">{{ texturedProjects }}</p>
          </div>
          <div class="stat-card">
            <h3>Latest Color Used</h3>
            <div class="color-preview" [style.backgroundColor]="latestColor">
              <span class="color-text">{{ latestColor }}</span>
            </div>
          </div>
        </div>

        <div class="projects-section">
          <div class="section-header">
            <h2>Project History</h2>
            <button routerLink="/visualizer" class="primary-btn small-btn">+ New Project</button>
          </div>
          
          @if (recentProjects.length === 0) {
            <div class="empty-state">
              <p>No projects saved yet. Open the visualizer to create your first design!</p>
            </div>
          } @else {
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date Saved</th>
                    <th>Base Color</th>
                    <th>Applied Texture</th>
                    <th class="action-column">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @for (project of recentProjects; track project.id) {
                    <tr>
                      <td>{{ project.date }}</td>
                      <td>
                        <div class="color-badge">
                          <span class="color-swatch" [style.backgroundColor]="project.color"></span>
                          {{ project.color }}
                        </div>
                      </td>
                      <td class="texture-name">{{ project.texture }}</td>
                      <td class="action-cell">
                        <!-- Added the Load button here -->
                        <button class="load-btn" (click)="loadProject(project)">Load</button>
                        <button class="delete-btn" (click)="deleteProject(project.id)">Delete</button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-layout { display: flex; min-height: 100vh; background-color: #f4f7f6; font-family: sans-serif; }
    .sidebar { width: 250px; background-color: #2c3e50; color: white; padding: 20px; display: flex; flex-direction: column; }
    .sidebar h2 { margin-top: 0; margin-bottom: 30px; font-size: 24px; text-align: center; letter-spacing: 1px; }
    .sidebar nav { display: flex; flex-direction: column; gap: 10px; }
    .sidebar a { color: #ecf0f1; text-decoration: none; padding: 12px; border-radius: 4px; transition: background 0.2s; }
    .sidebar a:hover, .sidebar a.active { background-color: #34495e; }
    .main-content { flex: 1; padding: 40px; overflow-y: auto; }
    header h1 { color: #333; margin-top: 0; margin-bottom: 5px; }
    header p { color: #666; margin-bottom: 40px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
    .stat-card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #0056b3; }
    .stat-card h3 { margin: 0; font-size: 14px; color: #666; text-transform: uppercase; }
    .stat-number { margin: 10px 0 0; font-size: 32px; font-weight: bold; color: #333; }
    .color-preview { margin-top: 10px; height: 35px; border-radius: 4px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; }
    .color-text { background: rgba(255,255,255,0.7); padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; color: #333; }
    .projects-section { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .section-header h2 { margin: 0; color: #333; font-size: 20px; }
    .primary-btn { padding: 12px 24px; background-color: #0056b3; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; transition: background 0.2s; text-decoration: none; display: inline-block; }
    .primary-btn:hover { background-color: #004494; }
    .small-btn { padding: 8px 16px; font-size: 14px; }
    .empty-state { text-align: center; padding: 40px; color: #666; font-style: italic; background: #f9f9f9; border-radius: 8px; border: 1px dashed #ccc; }
    .table-container { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { padding: 15px; border-bottom: 2px solid #eee; color: #666; font-weight: bold; text-transform: uppercase; font-size: 13px; }
    td { padding: 15px; border-bottom: 1px solid #eee; color: #333; }
    tr:hover { background-color: #f9f9f9; }
    .color-badge { display: flex; align-items: center; gap: 10px; font-family: monospace; font-size: 14px; }
    .color-swatch { width: 24px; height: 24px; border-radius: 4px; border: 1px solid #ccc; display: inline-block; }
    .texture-name { text-transform: capitalize; }
    .action-column, .action-cell { text-align: right; }
    .delete-btn { padding: 6px 12px; background-color: #ffebee; color: #d32f2f; border: 1px solid #ffcdd2; border-radius: 4px; cursor: pointer; transition: all 0.2s; font-size: 12px; font-weight: bold; margin-left: 8px; }
    .delete-btn:hover { background-color: #f44336; color: white; border-color: #f44336; }
    /* Styles for the load button */
    .load-btn { padding: 6px 12px; background-color: #e3f2fd; color: #1976d2; border: 1px solid #bbdefb; border-radius: 4px; cursor: pointer; transition: all 0.2s; font-size: 12px; font-weight: bold; }
    .load-btn:hover { background-color: #1976d2; color: white; border-color: #1976d2; }
  `]
})
export class DashboardComponent implements OnInit {
  totalProjects: number = 0;
  texturedProjects: number = 0;
  latestColor: string = '#ffffff';
  recentProjects: any[] = [];

  // Inject Router here
  constructor(private router: Router) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    const savedProjects = JSON.parse(localStorage.getItem('smartWallProjects') || '[]');
    this.totalProjects = savedProjects.length;
    this.texturedProjects = savedProjects.filter((p: any) => p.texture !== 'none').length;
    
    if (savedProjects.length > 0) {
      this.latestColor = savedProjects[savedProjects.length - 1].color;
    } else {
      this.latestColor = '#ffffff';
    }
    
    this.recentProjects = [...savedProjects].reverse();
  }

  deleteProject(projectId: number) {
    let savedProjects = JSON.parse(localStorage.getItem('smartWallProjects') || '[]');
    savedProjects = savedProjects.filter((p: any) => p.id !== projectId);
    localStorage.setItem('smartWallProjects', JSON.stringify(savedProjects));
    this.loadDashboardData();
  }

  // Navigates to the visualizer and passes the config in the URL
  loadProject(project: any) {
    this.router.navigate(['/visualizer'], { 
      queryParams: { 
        color: project.color, 
        texture: project.texture 
      } 
    });
  }
}
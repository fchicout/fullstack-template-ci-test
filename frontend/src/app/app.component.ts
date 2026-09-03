import { Component, OnInit, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface HealthStatus {
  status: string;
  application: string;
  environment: string;
  timestamp: string;
  uptimeMillis: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = signal('Fullstack Starter (Spring Boot 3 + Angular 22 Zoneless)');
  healthStatus = signal<HealthStatus | null>(null);
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.checkBackendHealth();
  }

  checkBackendHealth(): void {
    this.http.get<HealthStatus>('/api/v1/health').pipe(
      catchError(() => of({
        status: 'OFFLINE (Local Dev Mode)',
        application: 'fullstack-api',
        environment: 'mock',
        timestamp: new Date().toISOString(),
        uptimeMillis: 0
      }))
    ).subscribe((data) => {
      this.healthStatus.set(data);
    });
  }
}

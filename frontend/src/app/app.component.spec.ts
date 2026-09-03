import '@angular/compiler';
import { describe, it, expect } from 'vitest';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should be defined and instantiate properly', () => {
    expect(AppComponent).toBeDefined();
    expect(typeof AppComponent).toBe('function');
  });

  it('should have standard component metadata and default values', () => {
    const comp = new AppComponent();
    expect(comp.title()).toContain('Fullstack Starter');
    expect(comp.healthStatus()).toBeNull();
    expect(comp.helloMessage()).toBe('Carregando saudação do backend...');
  });

  it('should set fallback hello message in standalone mode', () => {
    const comp = new AppComponent();
    comp.fetchHelloMessage();
    expect(comp.helloMessage()).toContain('Olá, Mundo!');
  });
});

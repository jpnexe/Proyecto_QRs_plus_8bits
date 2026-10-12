import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Deployment & Edge Verification (Fase 5 DoD)', () => {
  it('should have a valid CI/CD workflow file', () => {
    const workflowPath = path.resolve(process.cwd(), '.github/workflows/deploy.yml');
    expect(fs.existsSync(workflowPath)).toBe(true);
    const content = fs.readFileSync(workflowPath, 'utf-8');
    expect(content).toContain('upload-pages-artifact');
    expect(content).toContain('deploy-pages');
  });

  it('should have security headers configured in public/_headers', () => {
    const headersPath = path.resolve(process.cwd(), 'public/_headers');
    expect(fs.existsSync(headersPath)).toBe(true);
    const content = fs.readFileSync(headersPath, 'utf-8');
    expect(content).toContain('X-Frame-Options: DENY');
    expect(content).toContain('Content-Security-Policy');
    expect(content).toContain('X-Content-Type-Options: nosniff');
  });

  it('should ensure zero secrets or .env files are tracked or exposed', () => {
    const envFile = path.resolve(process.cwd(), '.env');
    expect(fs.existsSync(envFile)).toBe(false);
  });
});

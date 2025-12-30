import { test, expect } from '@playwright/test';

const routes = [
    '/',
    '/about',
    '/acquisitions',
    '/architecture',
    '/concepts',
    '/core',
    '/defense',
    '/iec62443',
    '/logic',
    '/national-defense',
    '/nis2',
    '/offense',
    '/playbook-manufacturer',
    '/playbook-operator',
    '/sbom',
    '/services',
    '/soc',
    '/solutions',
    '/strategy',
    '/vision',
    '/workshop'
];

test.describe('Smoke Tests - Route Verification', () => {
    for (const route of routes) {
        test(`should load ${route} successfully`, async ({ page }) => {
            const consoleErrors: string[] = [];
            page.on('console', msg => {
                if (msg.type() === 'error') {
                    consoleErrors.push(msg.text());
                }
            });

            const response = await page.goto(route);
            expect(response?.status()).toBe(200);

            // Check for common hydration error signatures in console (optional, but good for Next.js)
            const hydrationErrors = consoleErrors.filter(err =>
                err.includes('Hydration failed') ||
                err.includes('There was an error while hydrating') ||
                err.includes('Text content does not match server-rendered HTML')
            );

            if (hydrationErrors.length > 0) {
                console.warn(`Hydration errors found on ${route}:`, hydrationErrors);
            }

            // We can assert no critical errors if we want strict mode
            // expect(hydrationErrors.length).toBe(0);

            // Basic visibility check
            await expect(page.locator('body')).toBeVisible();
        });
    }
});

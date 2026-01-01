
import { test, expect } from '@playwright/test';

const routes = [
    '/',
    '/offense',
    '/defense',
    '/vision',
    '/about',
    '/nis2',
    '/iec62443',
    '/soc',
    '/soc-v2',
    '/acquisitions',
    '/corporate/strategic-planning',
    '/playbook-operator',
    '/playbook-manufacturer',
    '/workshop',
    '/corporate/services-portfolio',
    '/corporate/enhancements',
    // Load Check Only (Content might be English still, but Nav should be translated)
    '/architecture',
    '/core',
    '/theory',
    '/logic',
    '/solutions',
    '/concepts'
];

const locales = [
    { code: 'en', advisory: 'Advisory' },
    { code: 'nl', advisory: 'Advies' },
    { code: 'de', advisory: 'Beratung' }
];

test.describe('Comprehensive i18n Verification', () => {

    for (const locale of locales) {
        test.describe(`Locale: ${locale.code}`, () => {

            for (const route of routes) {
                test(`should render ${route} correctly`, async ({ page }) => {
                    // 1. Inject Locale into LocalStorage (Zustand Persist Format)
                    await page.addInitScript((code) => {
                        window.localStorage.setItem('oxot-locale', JSON.stringify({
                            state: { locale: code, _hasHydrated: true },
                            version: 0
                        }));
                    }, locale.code);

                    // 2. Navigate
                    const response = await page.goto(route);
                    expect(response?.status()).toBe(200);

                    // 3. Smoke Check for hydration/runtime errors
                    const bodyText = await page.locator('body').innerText();
                    expect(bodyText).not.toContain("Application error");
                    expect(bodyText).not.toContain("Minified React error");

                    // 4. Verify I18n Integration (Check Navigation Sidebar)
                    // The sidebar headers are h3s. 
                    // We check if the "Advisory" group title matches the target language.
                    // This proves the translation store was loaded and applied to the layout.
                    await expect(page.locator('nav h3').filter({ hasText: locale.advisory }).first()).toBeVisible();

                    // 5. Specific Content Checks for Key Pages
                    if (route === '/workshop') {
                        if (locale.code === 'nl') {
                            // Check Translated CTA
                            await expect(page.getByText('Klaar voor praktijktraining?')).toBeVisible();
                        }
                        if (locale.code === 'de') {
                            // Check Translated CTA
                            await expect(page.getByText('Bereit für praxisnahes Training?')).toBeVisible();
                        }
                    }

                    if (route === '/soc-v2') {
                        if (locale.code === 'nl') {
                            await expect(page.getByText('Telemetrie-Mirroring')).toBeVisible();
                        }
                        if (locale.code === 'de') {
                            await expect(page.getByText('Telemetrie-Spiegelung')).toBeVisible();
                        }
                    }

                    if (route === '/nis2') {
                        if (locale.code === 'nl') {
                            // "De Nieuwe Standaard" is the Hero Title in NL
                            await expect(page.getByRole('heading', { name: 'De Nieuwe Standaard' })).toBeVisible();
                        }
                    }
                });
            }
        });
    }
});

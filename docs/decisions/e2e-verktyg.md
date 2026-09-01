# Beslut: verktyg för E2E-tester

**Datum:** 2026-08-28
**Beslut:** Vi använder Playwright för end-to-end-tester.

## Bakgrund

Vi behöver ett E2E-smoketest i CI (M2) och vill kunna mocka API:et.
Teamet kan Cypress sedan tidigare. Playwright utvärderades idag.

## Vad vi såg (era observationer – inte tutorialens)

|                            | Cypress                     | Playwright                          |
| -------------------------- | --------------------------- | ----------------------------------- |
| Tid till första gröna test | 953 ms                      | 1,7 s                               |
| Hur man hittar element     | `cy.get()`, `cy.contains()` | `getByRole()`, `getByPlaceholder()` |
| Mockning av nätverk        | `cy.intercept()`            | `page.route()`                      |
| Väntan / flakiness         | Behöver ibland `cy.wait()`  | `expect` väntar automatiskt         |
| Felmeddelanden             |                             |                                     |

## Motivering

Vi väljer Playwright eftersom det är tydligt att se både testkoden och var felet uppstår. Det gör debugging enklare och hjälper oss att snabbare förstå vad som behöver ändras.

## Konsekvenser

Om vi vill byta verktyg senare behöver vi skriva om E2E-testerna och uppdatera CI-konfigurationen. Playwright är lite långsamare, medan Cypress kan vara lättare att komma i gång med.

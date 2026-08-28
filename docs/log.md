## 2026-08-28 · Boiler Room 1
### Jia

**Gjort:** Dokumenterat vårt beslut att använda Playwright för E2E-tester och skapat en PR för beslutet.

**Grönt:** -

**Kvar till M1-taggen tisdag:** Göra enhetstester för flyttanmälans formulär och statusChip.

**E2E:** valde Playwright · smoke + mockat test gröna: ja

**Fastnat på:** Idag var jag förvirrad över om flyttanmälans formulär ska testas som ett komponenttest eller ett enhetstest. AI:n gav förslag på komponenttest eftersom formuläret har interaktion med användaren. Men som jag förstår det ska vi inte testa riktig data eller hela användarflödet, utan funktionerna i formuläret, till exempel att ett felmeddelande visas när användaren skriver fel. Därför tänker jag att det ska vara ett enhetstest.

### Rabbiya

**Gjort:** Körde Cypress e2e test tillsammans med Jia. Skrev test om Stores/user.js .. Lyckades få den grön

**Grönt:** -

**Kvar till M1-taggen tisdag:** Flera enhetstester och komponentstester.  Ska välja annan test att göra. 

**E2E:** valde Playwright · smoke + mockat test gröna: ja

**Fastnat på:** Var osäkert på vart user.test.js ska ligga, men det löste sig när jag frågade Jonatan. Jag stötte på ett problem där npm test inte fångade upp några testfiler. Anledningen var att vitest varken var installerat som beroende eller tillagt under "scripts" i package.json. 


### Leo

**Gjort:** Missade förmiddagens tillfälle men gjorde playwright-tester på eftermiddagen

**Grönt:** - 

**Kvar till M1-taggen tisdag:** Fler enhetstester samt något komponentstest

**E2E:** valde Playwright  · smoke + mockat test gröna: ja

**Fastnat på:** Inget jag sitter fast på. Ska ligga i och göra tester på måndag.

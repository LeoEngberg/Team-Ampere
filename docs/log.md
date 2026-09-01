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

**Kvar till M1-taggen tisdag:** Flera enhetstester och komponentstester. Ska välja annan test att göra.

**E2E:** valde Playwright · smoke + mockat test gröna: ja

**Fastnat på:** Var osäkert på vart user.test.js ska ligga, men det löste sig när jag frågade Jonatan. Jag stötte på ett problem där npm test inte fångade upp några testfiler. Anledningen var att vitest varken var installerat som beroende eller tillagt under "scripts" i package.json.

### Leo

**Gjort:** Missade förmiddagens tillfälle men gjorde playwright-tester på eftermiddagen

**Grönt:** -

**Kvar till M1-taggen tisdag:** Fler enhetstester samt något komponentstest

**E2E:** valde Playwright · smoke + mockat test gröna: ja

**Fastnat på:** Inget jag sitter fast på. Ska ligga i och göra tester på måndag.

# 2026-08-31

### Jia

### Vad har jag gjort idag?

Idag har jag gjort klart enhetstester för StatusChip och API-klienten. Det gick bra och båda testerna blev godkända.

### Vad var svårt?

I början var jag förvirrad över skillnaden mellan komponenttester och enhetstester. Efter att ha gjort research och fått hjälp av AI förstår jag nu att enhetstester handlar om att testa en enskild funktion, medan komponenttester handlar om att testa en UI-komponents beteende och hur den fungerar i sitt sammanhang.

### Vilka hinder har jag?

Inga hinder idag.

### Leo

### Vad har jag gjort idag?

Idag har jag gjort komponentstest och E2E-test

**Kvar till M1-taggen tisdag:** FIxa husky och lint-stage

### Vad var svårt?

Fick ett par konflikter efter att jag skulle committa och merga mina tester men det löste sig.

### Vilka hinder har jag?

Inga hinder idag.

### Rabbiya

### Vad har jag gjort idag?

Föregående arbetsdag skrev jag testet för endast **load()**-funktionen för användardata i user.js. Idag utökade jag user.test.js med tester för **save()** funktionen, samt en test som hanterar **alert()**-anropet. Därefter skrev jag ett E2E-test för navigering mellan olika sidor i appen.

### Vad var svårt?

När jag skrev testet för **save()** fick jag ett misslyckat test, och jag var till en början osäker på hur jag skulle testa **alert()**-anropet och varför det behövdes. Med hjälp av AI förstod jag att window.alert behöver mockas i testet, annars stör den riktiga webbläsarpopupen testkörningen — och att detta fortfarande räknas som ett enhetstest eftersom **alert()** bara är ett vanligt JavaScript-API, inte en Vue-komponent.

Att skriva E2E-testet var enklare, eftersom jag kunde navigera igenom hela flödet och se det visuellt i Playwrights UI. Det gjorde det lättare att upptäcka problem i testet och åtgärda dem direkt.

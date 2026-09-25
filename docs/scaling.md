# Skalning – Kraftly Mina sidor

## Vad vi vet om trafiken

(40 000 kunder/mån, topparna: fakturadagen, elprisnyheter, Norge i vår. Vad betyder det i anrop per minut i värsta fall? Gissa, men skriv ner gissningen.)

## Vad vi mätte

Kommando: `npx autocannon -c 50 -d 10..` mot imagen lokalt, <datum>

| Anrop                  | Req/s (avg) | p99   | Kommentar                                                                                                        |
| ---------------------- | ----------- | ----- | ---------------------------------------------------------------------------------------------------------------- |
| GET /                  | 8,411.4     | 18ms  | nginx, statisk index.html. Jätte snabbt, tar lite tid för att det är statisk filen och är inte påverkad med last |
| GET /assets/index-*.js | 887         | 83ms  | nginx, statisk JS. Men Är långsammare                                                                            |
| GET /api/user          | 709.2       | 170ms | Node API.                                                                                                        |
| Mot staging (-c 10):   | 177         | 117ms |                                                                                                                  |

## Vad siffrorna säger

- Startsidan är det snabbast : 8411 anrop/sekund, p99 är 18ms. Nginx visar statisk filen och nästan ingen jobb för servern.
- JS-filen är lite långammare: bara 887 anrop/sekund och p99 på 83ms. Kankse filen är stor (vi såg 347 MB/s i genomströmning).
- `/api/user` har lägst genomströmning (709 anrop/sekund). Node gör riktig jobb för varje anrop, till skillnad från nginx som bara skickar en fil.

Så **flaskhalsen** är : **API.et (Node)**

**INTE flaskhalsan** : nginx/startsidan - den klara mycket hög belastning utan problem.

## Vad vi gjorde

### 1. Cache-headers:

Lade till Cache-Control för hashade filer (/assets/) och satte no-cache för index.html, config.js och version.txt. Detta sparar bandbredd och tid för återkommande användare – deras browser slipper ladda ner samma fil igen om den inte ändrats.

### 2. CDN

**Förslag: Senare**

Just nu har vi bara en instans och ganska låg trafik i staging, så ett CDN löser inget akut problem. Men den stora JS-filen (347 MB/s i vår mätning) är precis den typen av fil ett CDN är gjort för: statiska, hashade filer som kan cachas nära användaren i stället för att alltid hämtas från vår egen server.

**Vad krävs för att lägga till det:**

- Filerna måste redan ha rätt Cache-Control-headers.
- Ett CDN sätts framför vår domän, eller framför bara /assets/-mappen
- Vi behöver se till att index.html, config.js och version.txt INTE cachas av CDN:et på samma sätt (de har redan no-cache, så det bör fungera automatiskt)
- Ingen kodändring behövs i appen – det är en infrastrukturändring

**Varför inte nu:** Vi har inte tillräckligt med trafik eller bevis på att bandbredden är ett verkligt problem för riktiga användare än. Det är en optimering vi kan göra när trafiken faktiskt ökar (t.ex. inför Norge-lanseringen).

### 3. Fler instanser: vid vilken siffra?

Baserat på vår mätning klarade en instans av `/api/user` cirka 700 anrop/sekund lokalt, men bara 177 anrop/sekund mot staging (Render, som har mindre resurser).

### 4. Det vi inte kan påverka (API:et), och vad vi säger till backend-teamet.

API:et är den svagaste länken. Vi kan inte ändra dess kod själva

## Varför (inte) Kubernetes

(Tre meningar. Om ni gjorde övning 2 B: vad fick ni, vad kostade det.)

## När stänger man en flagga i stället för att rulla tillbaka?

|                                                                | Feature flag | Rollback |
| -------------------------------------------------------------- | ------------ | -------- |
| Tar                                                            |              |          |
| Påverkar                                                       |              |          |
| Passar när                                                     |              |          |
| Regeln vi enats om: …                                          |
| (Fyll i tiderna i morgon, när ni gjort rollbacken på riktigt.) |

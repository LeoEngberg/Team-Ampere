# Beslut: Hosting av Team-Ampere (Kraftly)

## Datum

2026-09-22

## Beslut

Vi kör staging på **Render**, som två separata webbtjänster byggda från samma
Dockerfiler som vi redan använder lokalt (`Dockerfile` för frontend/nginx,
`mock-api/Dockerfile` för mock-API:t). CI bygger och pushar imagen till GHCR,
och en deploy-hook talar om för Render vilken image-tag som ska köras.

## Bakgrund

Vår app består av två containrar som pratar med varandra via en nyckel som
sätts på servern:

- **web** (nginx) serverar den byggda Vue-appen och proxar `/api/*` vidare,
  och lägger på headern `X-Api-Key` åt oss (se `nginx.conf.template`).
- **api** (mock-API:t) svarar bara på anrop som har rätt `X-Api-Key`.
  Lokalt körs båda med `docker compose`. I molnet behövde vi en plattform som
  kan köra våra Dockerfiler som de är, låta oss sätta miljövariabler
  (`API_URL`, `API_KEY`) per tjänst, och gå att koppla ihop med GitHub
  Actions så att `main` deployas automatiskt efter att testerna gått igenom.

## Alternativ vi jämförde

|                                     | **Render**                                                                                                                                                                         |     | **Azure Container Apps**                                                                                                                                       | **Vercel / Netlify**                                                                                                                                                            |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kör vår image som den är?           | Ja – bygger direkt från Dockerfile, eller kör en färdig image från ett register (GHCR) via "Existing Image".                                                                       |     | Ja – Container Apps kan peka på valfritt register, inklusive GHCR.                                                                                             | Nej – båda är byggda för statiska sajter/serverless-funktioner. Ingen av dem kör en generell Dockerfile med en långlevande nginx-process framför ett eget API. Uteslöts direkt. |
| Kostnad & kort                      | Gratis-nivå finns för webbtjänster, men Render kräver ofta ett betalkort för kontoverifiering redan på free-planen (en tillfällig $1-reservation). Betald start: ca $7/tjänst/mån. |     | Liknande free tier som Cloud Run (180 000 vCPU-sekunder, 2 miljoner anrop/mån), del av Azures allmänna free-tier-konto som också kräver kort vid registrering. | –                                                                                                                                                                               |
| Var hamnar nyckeln?                 | I Render → Environment, per tjänst. Nyckeln injiceras i nginx-configen vid containerstart och skickas aldrig till klienten – samma modell som lokalt.                              |     | Som miljövariabel eller "secret" i Container Apps-resursen, med möjlighet att koppla till Azure Key Vault.                                                     | –                                                                                                                                                                               |
| Kallstart                           | Free-tjänster somnar efter 15 min inaktivitet, ~30–60 sekunder att vakna. Betald Starter-nivå har ingen kallstart.                                                                 |     | Samma modell (Consumption plan skalar till noll); kallstart i samma härad som Cloud Run, styrs av `minReplicas`.                                               | –                                                                                                                                                                               |
| Hur mycket är leverantörsspecifikt? | Bara **deploy-hooken** (URL:en CI POST:ar till) och sättet vi anger `imgURL` som query-parameter. Allt annat (Dockerfile, nginx-mall, env-variabler) är standard.                  |     | Motsvarande: `az containerapp update` och Azures sätt att hantera secrets är plattformsspecifikt, resten är standard.                                          | –                                                                                                                                                                               |

## Motivering

Nästan allt i vår lösning fungerar på precis samma sätt oavsett vilken
plattform vi väljer, eftersom vi bara använder helt vanlig Docker-teknik:
två Dockerfiler och tre miljövariabler (`PORT`, `API_URL`, `API_KEY`) som
nginx läser när containern startar. Det är inte kopplat till Render på
något sätt – det hade fungerat likadant på Cloud Run eller Azure.

Den enda delen som faktiskt är knuten till Render är ett enda steg i vårt
GitHub Actions-skript (`ci.yml`): raden som skickar ett anrop till Renders
"deploy hook" för att säga "kör den här nya versionen nu". Om vi hade
bytt plattform hade vi bara behövt byta ut den ena raden mot motsvarande
kommando för Google eller Azure – resten av skriptet (bygga appen, köra
tester, skicka upp imagen) hade varit exakt likadant.

Vi valde Render för att det var enklast att komma igång med som nybörjare
i en liten grupp: enkelt gränssnitt för att sätta miljövariabler (vilket vi
behövde felsöka flera gånger under projektet), och deploy-hooken är lätt
att koppla ihop med GitHub Actions utan att behöva sätta upp inloggning
mot ett stort molnkonto.

## Konsekvenser

**Det här klarar vi av i staging** (vår testmiljö, inte den riktiga
appen som riktiga användare skulle använda):

- Att sidan somnar och tar en minut att vakna om ingen använt den på ett
  tag.
- Att det bara finns en enda kopia av appen igång – om den kraschar finns
  ingen backup som tar över.
- Att hemligheter (som API-nyckeln) bara ligger i Render och GitHub sina
  vanliga inställningssidor, inte i ett särskilt säkerhetsverktyg.
  **Det här skulle INTE funka i en riktig, färdig produkt (produktion):**
- Kallstarten – riktiga användare ska inte behöva vänta en minut på att
  sidan vaknar. Det kräver en betald plan utan viloläge.
- Att det bara finns en fast, delad nyckel istället för att varje
  användare loggar in på riktigt.
- Ingen övervakning som varnar oss om appen skulle sluta svara.
- Att mock-API:t glömmer allt vid omstart, eftersom det inte sparar något
  permanent. En riktig produkt behöver en riktig databas.

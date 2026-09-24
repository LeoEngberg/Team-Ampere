# M3

[x] Multi-stage Dockerfile i repots rot: byggsteg med Node, serveringssteg med nginx. Ingen Node och ingen node_modules i den färdiga imagen

[x] .dockerignore med minst node_modules, dist och .git

[x] nginx.conf med SPA-fallback – omladdning på /fakturor ger appen, inte 404

[x] Imagen är under 100 MB – skärmdump av docker image ls i docs/containers.md. Har du två storlekskolumner gäller DISK USAGE, den första

[x] docker compose up --build från ett rent klon startar frontend (localhost:8080) och mock-API, och man kan logga in och se dashboarden

[x] docker build som eget jobb i CI (image), grönt på main, med imagens storlek i loggen

[x] docs/containers.md enligt mallen från workshopen: hur man kör, storlekstabell med uppmätta siffror (minst naiv vs. multi-stage), tre beslut (basimage · hur mock-API:t körs · hur browsern når API:t), vad som körs i CI, kända begränsningar

[x] README Getting started omskriven: ett sätt med Docker, ett utan – och npm start-felet borta (skulden från M0)

[x] Logg i docs/log.md: en post per arbetsdag, inklusive vem som gjorde vad. Ny tech lead presenterad i loggen

# M4

[x] Nyckeln ut ur koden: ingen API-nyckel i src/ och inga hemligheter i VITE_-variabler. Appen anropar /api relativt, och nginx lägger på X-Api-Key från miljön (nginx.conf.template)

[x] Den gamla nyckeln är död – och ni har bevisat det: curl mot test-API:t med nyckeln från api.js ger 401, och utskriften står i docs/deploy.md. Teamets nya nyckel finns bara i Render

[x] Lokalt fungerar som förut: .env.example i repot, .env i .gitignore och .dockerignore. Från en ren klon: cp .env.example .env + docker compose up --build → man kan logga in

[x] Bygg en gång: pipelinen bygger imagen en gång per commit och pushar den till GHCR taggad med commitens sha – bara från main, aldrig från en PR

[x] Automatisk deploy till staging: merge till main deployar till Render via deploy hook. Hooken ligger som secret i GitHub-miljön staging, adressen som variable. Ingen klickar i Render för att släppa en version

[x] Verifierad deploy: deploy-jobbet väntar tills /version.txt visar commitens sha och gör sedan ett röktest mot /api – jobbet blir rött om något av dem misslyckas

[x] Miljökonfig via variabler: API_URL och API_KEY sätts i Render, inte i imagen. Samma image kör lokalt i compose
docs/deploy.md enligt mallen från workshopen (flöde, miljöer, var varje variabel bor, nyckeln, rollback, uppmätta tider, kända begränsningar) + beslutsdokument docs/decisions/hosting.md med minst tre jämförda alternativ

[x] README med staging-adressen och Kom igång som börjar med cp .env.example .env · logg i docs/log.md, en post per arbetsdag, med vem som gjorde vad

# DoD-punkt 3

```text
$ curl https://team-ampere-main.onrender.com/config.js
window.__KRAFTLY__ = {
  env: 'lokal',
  features: { norway: true }
}

$ curl https://kraftly-teamampere.onrender.com/config.js
window.__KRAFTLY__ = {
  env: 'production',
  features: { norway: false }
}
```

# DoD-punkt 5

## Före

![alt text](<Screenshot 2026-09-24 152336.png>)

## Efter

![alt text](<Screenshot 2026-09-24 155741.png>)

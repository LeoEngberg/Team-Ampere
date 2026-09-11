# Containers

## Hur man kör

Projektet kan startas med Docker Compose från projektets rotmapp.

```bash
docker compose up --build
```

Detta startar både frontend och mock-API.

Frontend kan sedan öppnas i webbläsaren på:

```bash
http://localhost:8080
```

För att stoppa containrarna:

```bash
docker compose down
```

Image-storlek

Vi mätte Docker-imagernas storlek lokalt med:

```bash
docker image ls
```

Vi jämförde en naiv build med vår multi-stage-build.

| Image                            | Build       | DISK USAGE |
| -------------------------------- | ----------- | ---------- |
| team-ampere-frontend:naive       | Naiv        | 1.52 GB    |
| team-ampere-frontend:multi-stage | Multi-stage | 43.7 MB    |

![alt text](<Screenshot 2026-09-11 at 12.37.11.png>)

Multi-stage-imagen är 43.7 MB, vilket är under kravet på 100 MB.

Skillnaden beror på att den naiva imagen innehåller Node.js, node_modules, källkod och byggmiljö i den slutliga imagen. I multi-stage-builden används Node.js endast för att bygga frontend. Den slutliga imagen innehåller endast de färdiga frontend-filerna och Nginx.

Uppmätt image-storlek

## Tre containerbeslut

### 1. Basimage

Vi använder node:22-alpine som basimage för byggsteget.

Den slutliga frontend-imagen använder nginx:1-alpine3.24-slim.

Vi valde Alpine-baserade images eftersom de är relativt små. Vi använder också en multi-stage-build för att hålla Node.js och byggmiljön utanför den slutliga frontend-imagen.

### 2. Hur mock-API:t körs

Mock-API:t körs som en separat service i Docker Compose.

Servicen använder node:22-alpine och startas med:

node server.js

Den lokala mappen mock-api monteras in i containern och API:t körs på port 4000 i Docker-nätverket.

### 3. Hur webbläsaren når API:t

Webbläsaren ansluter till frontend via:

```bash
http://localhost:8080
```

Nginx serverar frontend och skickar requests från /api/ vidare till mock-API:t.

Flödet är:

Webbläsare > localhost:8080 > Nginx > api:4000 > Mock-API

Webbläsaren ansluter alltså till Nginx via localhost:8080. Nginx använder Docker Compose-servicen api för att nå mock-API:t.

## CI

CI-pipelinen kör flera kontroller och byggsteg:

lint
unit tests
frontend build
Docker build
E2E-tester

Docker-builden körs som ett eget CI-jobb.

Docker-imagen byggs med:

```bash
docker build -t team-ampere-frontend:ci .
```

Image-storleken visas sedan i CI-loggen med:

```bash
docker image ls team-ampere-frontend:ci
```

På detta sätt kan vi kontrollera att Docker-imagen byggs korrekt och se dess storlek i CI.

Kända begränsningar
Mock-API:t är endast avsett för utveckling och testning.
Mock-API:t är inte ett produktions-API.
Docker Compose-konfigurationen är främst avsedd för lokal utveckling och CI.
Frontend-imagen använder Nginx för att servera statiska, färdigbyggda filer.
Node.js och byggmiljön finns inte i den slutliga multi-stage-imagen.
Mock-API:t använder ingen riktig produktionsdatabas eller persistent produktionsdata.

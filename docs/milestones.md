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

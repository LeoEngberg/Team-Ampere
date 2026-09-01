# Problem som uppstår i koden

### 1. Autentiseringen går att kringgå

- Api-nyckeln ligger i api.js och är tillgänglig direkt i koden vilket kan läcka.

**Var**: src/services/api.js

### 2. Ingen validering av e-postfältet i ProfileView

- E-postfältet är av typen text istället för email, och ingenting i save()-funktionen kontrollerar att det som skrivs in faktiskt är en giltig e-postadress. Man kan skriva namn, siffror eller vad som helst i fältet och det sparas ändå via store.save().

**Var** : src/views/ProfileView.vue, rad 10

### 3. Inga labels på formulärfälten

- Inputfälten för namn, e-post och adress har varken <label>-element eller placeholder-text. En användare som öppnar sidan ser tre tomma fält utan att veta vad som ska skrivas i vart och ett.

**Var** : src/views/ProfileView.vue, rad 9–11

### 4. Inloggningen är bara en mock

- Login-flödet skickar email och lösenord, men mock-API:t kontrollerar inte om uppgifterna är korrekta. API:t returnerar alltid en fake token.

**Var**: src/services/api.js skickar:

request('/api/login', {
method: 'POST',
body: JSON.stringify({ email, password })
})

### 5. Ingen validering av e-postfältet i MoveFormView

- flyttanmälningsformuläret har ingen validering alls (det finns bokstavligen en // TODO validation-kommentar). Man kan skicka in tomma fält eller ett skräpdatum och det går ändå igenom.

**Var**: src/views/MoveFormView.vue

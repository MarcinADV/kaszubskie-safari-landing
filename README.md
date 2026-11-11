# Kaszubskie Safari — projekt landing page 2027

## Status
Wersja robocza do zatwierdzenia. **Nie publikować i nie łączyć z kampanią reklamową** bez wykonania checklisty.

## Technologia
Vite + React + Tailwind (obecny projekt, bez nowych zależności).

## Strona
- Marka oparta na doświadczeniu, nie wynajmie pojazdów.
- Pakiety: Mini 1h (699 zł), Classic 2h (1 299 zł), Golden Hour VIP 3–4h (1 899 zł).
- Ceny są **hipotezami do testu**, a nie ofertą do rezerwacji.
- Lokalna historia, kurhany (wariant koncepcyjny, zależny od finalnej trasy).
- Segmenty: rodziny, pary, osoby indywidualne, grupy i wydarzenia.
- Sezon maj–wrzesień 2027.
- Formularz zainteresowania z pakietem, miesiącem, liczbą osób, typem wyprawy, e-mailem, opcjonalnym imieniem/telefonem i zgodami.

## Formularz — ważne
Domyślnie działa **w trybie podglądu**: nie zapisuje i nie przesyła żadnych danych. Pokazuje wyraźny komunikat, że odbiorca zgłoszeń nie jest skonfigurowany.

Aby włączyć wysyłanie po zatwierdzeniu projektu, trzeba podać `VITE_LEAD_ENDPOINT`. Endpoint musi przyjmować POST z JSON, weryfikować dane po stronie serwera, posiadać właściwie skonfigurowany CORS, zabezpieczenia antyspamowe, politykę retencji i zwracać sukces tylko po rzeczywistym zapisaniu zgłoszenia. Zgoda na kontakt w sprawie zapytania jest oddzielna od opcjonalnej zgody marketingowej.

**Uwaga:** zmienne `VITE_*` są publiczne w paczce przeglądarkowej. Nie wolno wpisywać sekretów API do `VITE_LEAD_ENDPOINT` ani innych zmiennych Vite.

Przed uruchomieniem trzeba dodać rzeczywistą informację o administratorze danych i politykę prywatności, prawidłowo określić podstawę prawną kontaktu oraz przetestować integrację i procedurę usuwania danych.

## Zdjęcia
Istniejąca grafika Gemini w `public/Gemini_Generated_Image_ps2e3fps2e3fps2e.png` jest jedynie poglądowa. Przed płatną kampanią zalecane autentyczne zdjęcia z tras. Do portfolio kurhanów nie dodano niepotwierdzonych fotografii.

## Lokalne uruchomienie
```bash
npm install
npm run dev
npm run build
```

## Lista przed publikacją
1. Zatwierdzić teksty, pakiety, ceny testowe i nowe zdjęcia.
2. Zweryfikować faktyczny wariant floty, liczbę miejsc, uprawnienia i ubezpieczenie.
3. Podłączyć bezpieczny odbiornik leadów i politykę prywatności.
4. Usunąć `noindex,nofollow` dopiero w publicznej wersji po zatwierdzeniu.
5. Sprawdzić koszty i warunki komercyjnego hostingu.
6. Przetestować mobile, dostępność, formularz, raportowanie konwersji i antyspam.

**Gałąź robocza:** `review/landing-safari-2027` — `main` pozostaje bez zmian.

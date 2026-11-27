# Automatische Tests

`node tests/app.test.js [index.html]` prüft mit **reinen Testdaten** (nie echte Daten):

- JavaScript-Syntax des Inline-Skripts (`node --check`)
- iPhone 13 und iPhone SE, hell und dunkel: alle Tabs und Fortschritt-Umschalter, Einstellungen, kein horizontales Scrollen
- Training komplett: starten, Satz mit RIR bestätigen, Pause als Leiste, Rückgängig, Pause beenden, nächste Übung, Abschluss
- Daten-Erhalt: bisherige Trainings und übrige gespeicherte Schlüssel unverändert, Jarvis-Sync (GitHub-API simuliert) überträgt alle
  Trainings, Backup enthält alles, altes Backup ohne neue Felder lädt
- keine Konsolenfehler

Variablen: `BROWSERS=chromium,webkit`, `DEVICES="iPhone 13"`, `TEST_OUT=<ordner>` für Screenshots.
Läuft automatisch bei jedem Pull Request (`.github/workflows/tests.yml`). WebKit läuft vorerst nur zur Info.

## Vorschau

`.github/workflows/vorschau.yml` kopiert `index.html` eines Branches nach `preview/index.html` (Start per «Run workflow» oder
Label `vorschau` am PR). Adresse: https://geissi23.github.io/Kraftwerk/preview/ – liest die echten Daten, schreibt nur in
`kraftwerk.preview:…`, Claude-Sync und Jarvis-Sync sind dort aus, Fotos getrennt. Oben steht «Vorschau».

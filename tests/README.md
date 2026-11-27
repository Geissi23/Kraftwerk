# Automatische Tests

`node tests/app.test.js [index.html]` prüft mit **reinen Testdaten** (nie echte Daten):

- JavaScript-Syntax des Inline-Skripts (`node --check`)
- iPhone 13 und iPhone SE, hell und dunkel: alle Tabs und Fortschritt-Umschalter, Einstellungen, kein horizontales Scrollen
- Training komplett: starten, Satz mit RIR bestätigen, Pause als Leiste, Rückgängig, Pause beenden, nächste Übung, Abschluss
- Daten-Erhalt: bisherige Trainings und übrige gespeicherte Schlüssel unverändert, Jarvis-Sync (GitHub-API simuliert) überträgt alle
  Trainings, Backup enthält alles, altes Backup ohne neue Felder lädt
- keine Konsolenfehler

Variablen: `BROWSERS=chromium,webkit`, `DEVICES="iPhone 13"`, `TEST_OUT=<ordner>` für Screenshots.
Läuft automatisch bei jedem Pull Request (`.github/workflows/tests.yml`). WebKit (Safari-Engine) ist seit 27.11. ebenfalls Pflicht.

## Vorschau

`.github/workflows/vorschau.yml` kopiert `index.html` eines Branches nach `preview/index.html` (Start per «Run workflow» oder
Label `vorschau` am PR). Adresse: https://geissi23.github.io/Kraftwerk/preview/ – liest die echten Daten, schreibt nur in
`kraftwerk.preview:…`, Claude-Sync und Jarvis-Sync sind dort aus, Fotos getrennt. Oben steht «Vorschau».

Hinweise: Die Vorschau prüft im Workflow, dass der Branch den Schutz enthält (sonst Abbruch) und setzt eine Build-Kennung;
bei einer neuen Vorschau-Version wird der alte Vorschau-Stand gelöscht. Auf dem iPhone hat Safari einen anderen Speicher als
die Home-Bildschirm-App: Dann in der Vorschau unter Einstellungen › Jarvis-Sync verbinden, die Sicherung wird nur gelesen.
Es gibt nur eine Vorschau gleichzeitig (der letzte Start gewinnt).

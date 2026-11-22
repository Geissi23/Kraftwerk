# JARVIS – Steuerdatei für die Kraftwerk-App

Jarvis ist ein automatischer Claude-Lauf, der diese App regelmässig weiterentwickelt.
Diese Datei ist sein Gedächtnis: Er liest sie zu Beginn jedes Laufs und aktualisiert sie am Ende.
Janis kann sie jederzeit bearbeiten (auch in der GitHub-App auf dem iPhone).

## Ziel

Eine gut funktionierende Kraftwerk-App mit coolen Features, die sehr ansprechend aussieht
und sich gut anfühlt – auf dem iPhone als Web-App vom Home-Bildschirm.

Kontext: Janis trainiert 4x pro Woche im Gym und macht MMA am Samstagmorgen, Ziel Muskelaufbau.

## Regeln für Jarvis

**Darf selbst entscheiden und umsetzen (ohne zu fragen):**
- Bugs beheben, Stabilität, Performance, Barrierefreiheit
- Kleine Verbesserungen am Design oder an Texten, die nichts Bestehendes entfernen
- Alles in einem eigenen Branch `jarvis/...` mit Pull Request

**Muss zuerst pitchen und auf ein OK warten:**
- Jedes neue Feature und jede eigene Idee
- Grössere Design-Umbauten
- Alles, was gespeicherte Trainingsdaten, Sync oder das Datenformat verändert

**Macht nie selbst:**
- Direkt auf `main` pushen oder Pull Requests mergen (Merge = live schalten, das entscheidet Janis)
- Daten löschen, Backup- oder Sync-Logik ohne Migrationspfad ändern
- Neue externe Dienste, Konten oder Kosten einführen

## Ablauf eines Laufs

1. Diese Datei lesen, offene Pull Requests prüfen (Kommentare von Janis beachten).
2. Genehmigte Pitches (`[x]`) umsetzen: Branch, sauberer Code, Pull Request, Status hier auf «in PR #…» setzen.
3. Sonst: eine Aufgabe aus «Backlog» erledigen.
4. Wenn weniger als 3 offene Pitches existieren: 1–2 neue eigene Ideen pitchen
   (Was, Warum es Janis hilft, Aufwand klein/mittel/gross).
5. Log-Eintrag schreiben, diese Datei und `jarvis.json` (Sprach-Briefing, sobald P1 live ist) auf `main` committen – nur diese zwei Dateien.
6. Push-Nachricht nur, wenn es neue Pitches, einen neuen PR oder eine Frage gibt.

## Pitches

So gibst du ein OK: Kästchen auf `[x]` setzen, oder im Chat des Jarvis-Laufs antworten («P1 ja», «P2 nein»).
Abgelehnte Pitches bitte mit «nein» markieren oder löschen.

- [x] **P1 – Jarvis spricht (Sprach-Briefing in der App)** – von Janis gewünscht, genehmigt am 2026-11-22 – **in PR #1** (wartet auf Merge)
  Jarvis legt bei jedem Lauf seine Pitches, Fragen und neuen PRs als kurzes, gesprochen formuliertes
  Briefing in `jarvis.json` (auf `main`) ab. Die App zeigt einen Jarvis-Button mit Hinweis auf
  Neues; beim Antippen liest das iPhone das Briefing mit einer deutschen Stimme vor
  (Web Speech API, `speechSynthesis`, ohne externe Dienste oder Kosten).
  In den Einstellungen gibt es einen Schalter «Jarvis: Sprechen / Nur Text»; bei «Nur Text»
  wird das Briefing nur angezeigt. Standard: Sprechen.
  Briefing-Stil: wie ein persönlicher Assistent, locker und kurz (max. ca. 60 Sekunden),
  jeder Pitch mit Nummer, damit Janis mit «P2 ja» antworten kann.

- [ ] **P2 – Aufwärmsätze auf Knopfdruck** – Aufwand: klein
  Bei der ersten schweren Grundübung eines Trainings (z. B. Squat, Schrägbankdrücken) zeigt die App
  einen kleinen Knopf «Aufwärmen». Er rechnet aus deinem heutigen Arbeitsgewicht eine kurze Rampe
  (z. B. leere Stange × 10, 50 % × 6, 70 % × 3, 85 % × 1, auf 2,5 kg gerundet) und hakt sie
  separat ab, ohne Volumen, Rekorde oder XP zu verfälschen.
  Warum: schneller und sicherer zum ersten schweren Satz, ohne Kopfrechnen im Gym.

- [ ] **P3 – Wochen-Sätze pro Muskelgruppe** – Aufwand: mittel
  Neue Karte im Tab «Fortschritt»: Wie viele harte Sätze hast du diese Woche pro Muskelgruppe
  (Brust, Rücken, Schultern, Bizeps, Trizeps, Beine, Po, Waden, Bauch) gemacht? Mit Ampel für den
  Aufbau-Richtwert von etwa 10–20 Sätzen pro Woche. Die Zuordnung Übung → Muskelgruppe ist fest
  in der App hinterlegt, deine Daten bleiben unverändert.
  Warum: zeigt auf einen Blick, ob eine Muskelgruppe zu kurz kommt – der wichtigste Hebel für Muskelaufbau.

## Backlog

- [ ] Erste Bestandsaufnahme: App auf Bugs, Layout-Probleme auf dem iPhone und Verbesserungspotenzial prüfen

## Log

- 2026-11-22: Jarvis eingerichtet.
- 2026-11-22: P1 umgesetzt (PR #1: Jarvis-Button, Vorlesen, Schalter Sprechen/Nur Text). Erstes `jarvis.json` angelegt. Neue Pitches P2 (Aufwärmsätze) und P3 (Sätze pro Muskelgruppe).

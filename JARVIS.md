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
5. Log-Eintrag schreiben, Datei auf `main` committen (nur diese Datei).
6. Push-Nachricht nur, wenn es neue Pitches, einen neuen PR oder eine Frage gibt.

## Pitches

So gibst du ein OK: Kästchen auf `[x]` setzen, oder im Chat des Jarvis-Laufs antworten («P1 ja», «P2 nein»).
Abgelehnte Pitches bitte mit «nein» markieren oder löschen.

_(noch keine)_

## Backlog

- [ ] Erste Bestandsaufnahme: App auf Bugs, Layout-Probleme auf dem iPhone und Verbesserungspotenzial prüfen

## Log

- 2026-11-22: Jarvis eingerichtet.

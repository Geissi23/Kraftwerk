# JARVIS – Steuerdatei für die Kraftwerk-App

Jarvis ist ein automatischer Claude-Lauf, der diese App regelmässig weiterentwickelt.
Diese Datei ist sein Gedächtnis: Er liest sie zu Beginn jedes Laufs und aktualisiert sie am Ende.
Janis kann sie jederzeit bearbeiten (auch in der GitHub-App auf dem iPhone).

## Ziel

Eine gut funktionierende Kraftwerk-App mit coolen Features, die sehr ansprechend aussieht
und sich gut anfühlt – auf dem iPhone als Web-App vom Home-Bildschirm.

Kontext: Janis trainiert meist 3x pro Woche im Gym, ausnahmsweise 4x. Ziel Muskelaufbau. **Kein MMA mehr** (seit 22.11.2026).
Plan: 3 Kern-Trainings (Oberkörper, Unterkörper, Ganzkörper) + optionales Bonus-Training (Schultern & Arme).
Nicht gewünscht: Hip Thrust, Kreuzheben (auch rumänisches).

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
5. Log-Eintrag schreiben und diese Datei auf `main` committen – nur diese Datei.
6. **Briefing im Claude-Chat** (wie ein Mitarbeiter, der seinem Chef rapportiert): Was erledigt wurde
   (PRs mit Link), neue Pitches nummeriert mit Was / Warum / Aufwand, offene Fragen. Danach wartet Jarvis
   auf Janis' Antwort im Chat («P2 ja», «P3 nein») und arbeitet erst mit OK an neuen Features weiter.
   Push-Nachricht nur, wenn es neue Pitches, einen neuen PR oder eine Frage gibt.

## Pitches

So gibst du ein OK: im Chat des Jarvis-Laufs antworten («P2 ja», «P3 nein») oder Kästchen hier auf `[x]` setzen.
Abgelehnte Pitches bitte mit «nein» markieren oder löschen.

- ~~P1 – Jarvis spricht (Sprach-Briefing in der App)~~ – **verworfen am 2026-11-22**: Janis will das Briefing
  im Claude-Chat statt in der App. PR #1 geschlossen, Branch `jarvis/sprach-briefing` bleibt als Reserve.

- [x] **P2 – Aufwärmsätze auf Knopfdruck** – Aufwand: klein – genehmigt am 2026-11-22, **live** (PR #3 gemergt)
  Bei der ersten schweren Grundübung eines Trainings (z. B. Squat, Schrägbankdrücken) zeigt die App
  einen kleinen Knopf «Aufwärmen». Er rechnet aus deinem heutigen Arbeitsgewicht eine kurze Rampe
  (z. B. leere Stange × 10, 50 % × 6, 70 % × 3, 85 % × 1, auf 2,5 kg gerundet) und hakt sie
  separat ab, ohne Volumen, Rekorde oder XP zu verfälschen.
  Warum: schneller und sicherer zum ersten schweren Satz, ohne Kopfrechnen im Gym.

- [x] **P3 – Wochen-Sätze pro Muskelgruppe** – Aufwand: mittel – genehmigt am 2026-11-22, **live** (PR #3 gemergt)
  Neue Karte im Tab «Fortschritt»: Wie viele harte Sätze hast du diese Woche pro Muskelgruppe
  (Brust, Rücken, Schultern, Bizeps, Trizeps, Beine, Po, Waden, Bauch) gemacht? Mit Ampel für den
  Aufbau-Richtwert von etwa 10–20 Sätzen pro Woche. Die Zuordnung Übung → Muskelgruppe ist fest
  in der App hinterlegt, deine Daten bleiben unverändert.
  Warum: zeigt auf einen Blick, ob eine Muskelgruppe zu kurz kommt – der wichtigste Hebel für Muskelaufbau.

- [x] **P4 – Plateau-Melder** – Aufwand: mittel – genehmigt am 2026-11-22, **live** (PR #3 gemergt)
  Wenn eine Übung drei Trainings in Folge beim geschätzten Maximalgewicht nicht vorankommt,
  zeigt die App im Training einen dezenten Hinweis mit 1–2 konkreten Auswegen
  (z. B. «Gewicht 10 % runter und neu aufbauen», «Wdh.-Bereich wechseln» oder eine Alternative
  aus der Übungsbibliothek mit einem Tipp). Rein berechnet aus vorhandenen Daten, nichts wird gespeichert.
  Warum: Stillstand fällt sonst oft erst nach Wochen auf. Gegensteuern bringt mehr Muskelaufbau.

- [x] **P5 – Scheibenrechner** – Aufwand: klein – genehmigt am 2026-11-22, **live** (PR #3 gemergt)
  Tipp auf das Gewicht eines Langhantel-Satzes zeigt, welche Scheiben pro Seite drauf müssen
  (Stange 20 kg, Scheiben 25/20/15/10/5/2,5/1,25 – anpassbar), als kleine farbige Grafik.
  Warum: kein Kopfrechnen zwischen den Sätzen, besonders bei Squat, Kreuzheben und Overhead Press.

## Backlog

- [x] Erste Bestandsaufnahme (2026-11-22) – Fixes **live** (PR #2 gemergt): Pausen-Leiste blockierte Tabs, iOS-Zoom
  in Eingabefeldern, abgeschnittene Kacheln/Knöpfe auf kleinen iPhones, Bildschirmsperre beim Verwerfen.
- [x] Supersatz-Pausen: Janis will es so lassen wie bisher (Pause nach jedem Satz). Entschieden am 2026-11-22.
- [ ] Gewichte im Training einheitlich mit Komma anzeigen (Eingabefelder zeigen nach dem Abhaken «22.5», sonst überall «22,5»)

## Log

- 2026-11-22: Jarvis eingerichtet.
- 2026-11-22: P1 umgesetzt (PR #1: Jarvis-Button, Vorlesen, Schalter Sprechen/Nur Text). Erstes `jarvis.json` angelegt. Neue Pitches P2 (Aufwärmsätze) und P3 (Sätze pro Muskelgruppe).
- 2026-11-22 (2. Lauf): Erste Bestandsaufnahme gemacht, 7 iPhone-Fixes in PR #2. PR #1 noch offen, kein Feedback. Neue Pitches P4 (Plateau-Melder) und P5 (Scheibenrechner). Frage zu Supersatz-Pausen im Backlog.
- 2026-11-22: Janis will das Briefing im Claude-Chat, nicht in der App. P1 verworfen, PR #1 geschlossen, `jarvis.json` entfernt.
- 2026-11-22: Janis hat im Chat P2, P3, P4 und P5 genehmigt, alle vier in PR #3 umgesetzt. Supersatz-Pausen bleiben wie bisher.
- 2026-11-22: Janis hat im Chat das Mergen von PR #2 und #3 freigegeben, beide sind live.
- 2026-11-22: Neuer Plan nach Janis' Lieblingsübungen (3 Kern + Bonus, ohne Hip Thrust/Kreuzheben), MMA aus der App entfernt → PR #4, gemergt und live.

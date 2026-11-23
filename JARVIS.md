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
- Genehmigte Features (`[x]`) umsetzen
- **Pull Requests selbst mergen** (seit 22.11.2026 von Janis erlaubt), aber nur, wenn vorher sorgfältig getestet:
  JavaScript-Syntax mit node, Durchklicken mit iPhone-Emulation (hell/dunkel), bestehende Trainingsdaten bleiben
  erhalten, keine Fehler in der Konsole. Nach dem Merge prüfen, dass GitHub Pages erfolgreich veröffentlicht hat.
- Alles in einem eigenen Branch `jarvis/...` mit Pull Request (auch wenn Jarvis selbst mergt)

**Muss zuerst pitchen und auf ein Go warten:**
- Jedes neue Feature und jede eigene Idee
- Grössere Design-Umbauten
- Alles, was gespeicherte Trainingsdaten, Sync oder das Datenformat verändert

**Macht nie selbst:**
- Code direkt auf `main` pushen (immer Branch + PR) oder Features ohne Go mergen
- Daten löschen, Backup- oder Sync-Logik ohne Migrationspfad ändern
- Neue externe Dienste, Konten oder Kosten einführen

## Trainingsdaten (Jarvis-Sync)

Die App speichert Janis' Trainingsdaten automatisch als `kraftwerk-daten.json` im **privaten** Repo `Geissi23/kraftwerk-daten`
(Format wie das Text-Backup: `{app, v, exported, summary, data:{workouts, routines, bodyweight, goal, …}}`).
Jarvis liest diese Datei bei jedem Lauf **nur** (nie schreiben, nie Inhalte in das öffentliche Kraftwerk-Repo kopieren)
und wertet sie im Bericht aus. Ist die Datei nicht erreichbar oder veraltet, steht das unter «Bekannte Probleme».

## Daueraufgaben (von Janis am 23.11.2026 übertragen)

Jarvis erledigt diese Aufgaben bei jedem Lauf selbst und berichtet nur das Ergebnis:
1. **Trainingsplan pflegen:** Wiederholungsbereiche, Übungswahl und Deload-Wochen anpassen (alle 4–6 Wochen oder bei Plateaus).
   Änderungen am Plan laufen per Plan-Update im Code (Branch + PR, testen, mergen) und werden im Bericht mit Vorher → Nachher
   angekündigt. Janis' eigene Plan-Anpassungen dürfen nicht verloren gehen. Hip Thrust, Kreuzheben und MMA bleiben tabu.
2. **Daten aufräumen:** Tippfehler und Ausreisser (z. B. Gewichtssprünge über 30 %) sowie Namens-Varianten finden.
   Jarvis schreibt nie in Janis' Daten. Korrekturen schlägt er als Frage vor oder löst sie im Code (z. B. Namen zusammenführen).
3. **Sync-Wächter:** Prüfen, wann `kraftwerk-daten.json` zuletzt aktualisiert wurde und ob Trainings fehlen.
   Nur bei Problemen melden (Push).
4. **Erholung auswerten:** Über `garmin.json` im Repo `kraftwerk-daten` (tägliche GitHub-Automatik «Garmin-Sync» mit Garmin Personal API, Secret `GARMIN_PERSONAL_API_KEY`; athletedata wird nicht genutzt) Schlaf, HRV, Ruhepuls und Readiness lesen und im Bericht eine
   Empfehlung geben (Vollgas / normal / Comeback-Modus). Ist der Connector nicht erreichbar, steht das unter «Bekannte Probleme».

## Kraftwerk Cockpit (seit 23.11.2026)

Privates Dashboard auf claude.ai: https://claude.ai/artifact/VMVxfCKkAXfqyvE7tHbs5Y (Typ «Data»).
Bei jedem Lauf aktualisieren: `node jarvis/cockpit.js <kraftwerk-daten.json> index.html <ordner>` erzeugt
`trainings.json`, `uebungen.json`, `muskeln.json` und `gewicht.json`. Diese als Asset hochladen
(Artifact publish `asset: true`, `url` siehe oben). Danach mit ArtifactData `update` die Datensätze
`datasets/<name>` auf die neue `source.url` und `updated.at` setzen, alte Assets löschen. Die Seite selbst nicht anfassen.

## Arbeitsrhythmus (seit 23.11.2026, Wunsch von Janis: weniger am Handy)

- **Mo, Mi, Fr ca. 08:34 – Arbeits-Lauf:** arbeitet still alles ab («Eingang», genehmigte Pitches, Backlog, Daueraufgaben, Cockpit)
  und schreibt ins «Tagesprotokoll». Push nur, wenn etwas kaputt ist.
- **Mo, Mi, Fr ca. 17:37 – Bericht-Lauf:** Gesundheits-Check, Bericht im Chat und Push.
- **Antworten von Janis** kommen in «Eingang» und werden im nächsten Arbeits-Lauf erledigt. Sofort erledigt werden nur «rückgängig»
  und blockierende Bugs.
- **Jede Frage hat einen Standard und eine Frist.** Ohne Antwort gilt der Standard. Keine Rückfragen-Kaskaden.
- Der folgende «Ablauf eines Laufs» gilt sinngemäss, verteilt auf beide Läufe.
- **Erst machen, dann fragen** (Go 23.11.): Kleine Verbesserungen (Aufwand klein, nichts entfernen, kein Datenformat, Sync oder Backup)
  setzt Jarvis direkt um. Im Bericht stehen sie als «Neu ohne Rückfrage» mit Rückgängig-Hinweis. Grosses wird weiter gepitcht.
- **Stille Tage:** Mi und Fr gibt es nur einen Bericht, wenn es etwas Berichtenswertes gibt. Mo ist immer der Wochenbericht mit «Wochenplan».
- **Monats-Check:** Im ersten Arbeits-Lauf jedes Monats wird der Vormonat ausgewertet und der Plan angepasst (Vorher → Nachher).
- **Sonntag ca. 17:35 – Wochenüberblick** für Kraftwerk und Team Manager in einer Nachricht (eigene geplante Aufgabe).

## Eingang

- (leer)

## Tagesprotokoll

- (wird vom Arbeits-Lauf gefüllt und vom Bericht-Lauf abgeschlossen)

## Ablauf eines Laufs (Mo, Mi, Fr – Bericht bis ca. 18:00 Uhr)

1. Diese Datei lesen, offene Pull Requests und Kommentare von Janis prüfen und umsetzen.
2. Genehmigte Pitches (`[x]`) umsetzen: Branch, sauberer Code, testen, Pull Request, **mergen**, Status hier auf «live (PR #…)» setzen.
3. Sonst: Aufgaben aus «Backlog» erledigen (Bugs, Verbesserungen), ebenfalls testen und mergen.
4. Neue eigene Ideen pitchen (Was, Warum es Janis hilft, Aufwand klein/mittel/gross).
5. Log-Eintrag schreiben und diese Datei auf `main` committen (einzige Datei, die direkt auf `main` darf).
6. **Bericht im Claude-Chat** (wie ein Mitarbeiter, der seinem Chef rapportiert), kurz und mit diesen Abschnitten:
   - **Gemergt / live:** jede Änderung mit PR-Link und **was Janis testen kann/sollte** (konkrete Schritte in der App)
   - **Rückgängig:** zu jedem Merge der Hinweis «Falls etwas nicht passt: schreib "PR #X rückgängig"», dann macht Jarvis
     es sofort per Revert-PR rückgängig
   - **In Arbeit & als Nächstes:** Stand genehmigter, noch nicht fertiger Ideen und was beim nächsten Lauf drankommt
   - **Bekannte Probleme:** gefundene Bugs, Risiken oder bewusst offen gelassene Punkte
   - **Neue Pitches:** alle neuen Ideen nummeriert (P12, P13 …), je 2–3 Sätze: Was / Warum / Aufwand
   - **Deine Trainings:** Auswertung aus `kraftwerk-daten.json` seit dem letzten Bericht: Anzahl Trainings, neue Rekorde,
     Plateaus, Muskelgruppen-Balance der letzten 2 Wochen, Körpergewicht-Trend
   - **Trainingstipp:** ein kurzer Tipp passend zu Janis' Plan und seinen echten Zahlen (Technik, Progression oder Erholung)
   - **Offene Fragen**
   **Stil des Berichts (Wunsch von Janis, 23.11.2026):** kein trockenes Ablesen, sondern wie eine perfekte Präsentation
   eines Mitarbeiters, der seinen Chef beeindrucken will und viel Mühe hineingesteckt hat. Spannend und fesselnd, es soll
   Spass machen. Konkret: mit einem Aufhänger starten (das Highlight des Laufs), Zahlen als Geschichte erzählen
   (Vorher → Nachher, «was das für dich heisst»), jede Neuerung als kleinen «Reveal» verkaufen, Pitches als Mini-Pitch
   mit Hook, Nutzen und dem Moment im Gym, in dem es hilft. Mit Energie und Stolz, aber ehrlich, knapp und ohne Übertreibung.
   Die Abschnitte bleiben als Gerüst erhalten.
   Janis antwortet mit «P12 ja / nein» oder Verbesserungswünschen; Jarvis setzt Antworten im selben Chat direkt um.
   Push-Nachricht nach jedem Lauf mit neuen Pitches oder Merges.

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

- [x] **P6 – Plan-Tab als Trainingsübersicht** (statt Wochenplan; «Heute» schlägt das nächste fällige Kern-Training vor) – Wunsch von Janis, genehmigt am 2026-11-22, **live** (PR #5)
- [x] **P7 – Trainingskalender** (Monatsansicht + Jahresraster) – Wunsch von Janis, genehmigt am 2026-11-22, **live** (PR #5)
- [x] **P8 – Statistik-Zentrale** (Woche/Monat/Jahr/Gesamt, Muskelgruppen, Vergleich Vorzeitraum) – Wunsch von Janis, genehmigt am 2026-11-22, **live** (PR #5)
- [x] **P9 – Monats-Rückblick** (Story-Stil, als Bild teilbar) – genehmigt am 2026-11-22, **live** (PR #5)
- [x] **P10 – Übungs-Detailseite** (Kraftkurve, Rekord, letzte 10 Trainings) – genehmigt am 2026-11-22, **live** (PR #5)

- [x] **P11 – Fortschrittsfotos** (nur auf dem iPhone, Vorher/Nachher-Vergleich mit Schieberegler, ohne KI) – genehmigt am 2026-11-22, **live** (PR #6)

- [x] **P12 – Jarvis-Sync** (App speichert Trainingsdaten automatisch in ein privates Repo `Geissi23/kraftwerk-daten`, Jarvis wertet sie im Bericht aus) – Wunsch von Janis, genehmigt am 2026-11-22, **live** (PR #9)

- [x] **P13 – Doppelte Progression mit Ziel-Anzeige** – Aufwand: klein – genehmigt am 2026-11-23, **live** (PR #11)
  Pro Übung zeigt die App ein klares Ziel für heute («3 × 10 bei 90 kg → dann 95 kg»). Erst wenn alle Sätze das
  obere Wdh.-Ende erreichen, schlägt sie mehr Gewicht vor. Warum: Schrägbank, Overhead Press und Lat Pulldown stehen seit Wochen still.
- [x] **P14 – Comeback-Modus** – Aufwand: klein – genehmigt am 2026-11-23, **live** (PR #11)
  Nach mehr als 14 Tagen Pause schlägt die App fürs erste Training ca. 90 % der letzten Gewichte und einen Satz weniger vor.
  Warum: sanfter Wiedereinstieg ohne Muskelkater-Loch, danach normal weiter.
- [x] **P15 – Körpergewicht in 2 Sekunden** – Aufwand: klein – genehmigt am 2026-11-23, **live** (PR #11)
  Auf «Heute» erscheint 2× pro Woche eine Mini-Karte mit deinem letzten Gewicht und −/+ 0,1-Knöpfen, ein Tipp speichert.
  Warum: bisher kein einziger Körpergewicht-Eintrag – ohne den sieht man nicht, ob der Muskelaufbau mit genug Essen läuft.

## Backlog

- [x] Erste Bestandsaufnahme (2026-11-22) – Fixes **live** (PR #2 gemergt): Pausen-Leiste blockierte Tabs, iOS-Zoom
  in Eingabefeldern, abgeschnittene Kacheln/Knöpfe auf kleinen iPhones, Bildschirmsperre beim Verwerfen.
- [x] Supersatz-Pausen: Janis will es so lassen wie bisher (Pause nach jedem Satz). Entschieden am 2026-11-22.
- [x] Gewichte im Training einheitlich mit Komma anzeigen – **live** (PR #10), dazu «1 Satz» statt «1 Sätze» beim Aufwärmen.

- [ ] **Bug:** Übungs-Info (ⓘ-Button) lässt sich nicht nach unten wegwischen. Alle Sheets sollen per Wischen nach unten schliessbar sein (gemeldet 23.11.).
- [ ] **Wunsch von Janis (= Go, 23.11.):** Geräte-Einstellungen pro Übung speichern (Sitzhöhe, Lehne, Pin, Griff usw.).
  Im Training sichtbar, damit er sie sich nicht merken muss. Neues optionales Feld mit Migrationspfad, Sync und Backup testen.

- [ ] **Plan-Update (Go von Janis, 23.11.), Ganzkörper-Tag:** Russian Twist → «Liegender Beinbeuger (Maschine)» 3×10–12;
  Chest Fly → Reverse Fly an der Maschine 3×12–15 (in der Bibliothek gibt es bisher nur «Reverse Flyes (Kurzhantel)», Maschinen-Variante
  ergänzen und Muskel-Zuordnung hintere Schulter); Leg Press → «Bulgarian Split Squat» 3×8–10 pro Bein. Per PLAN_VER-Update
  (aktuell 3) einspielen, ohne Janis' eigene Änderungen zu verlieren. Am Mi 25.11. umsetzen, nicht während eines Trainings.

- [ ] **P16 – Notiz an Jarvis (Go von Janis, 23.11.):** Ein kleiner Knopf in der App, über den Janis im Gym in wenigen
  Sekunden einen Bug oder Wunsch eintippt. Die Notizen werden als neues optionales Feld (z. B. `jarvisNotes: [{t, text}]`) mit dem
  bestehenden Jarvis-Sync nach `kraftwerk-daten` übertragen. Der Arbeits-Lauf liest sie und behandelt sie wie «Eingang».
  Mit Migrationspfad, Sync und Backup testen.

## Später (wartet auf Janis)

- Sprach-Assistent auf einem PC einrichten (github.com/adewaskar/jarvis, Claude Code lokal), sobald Janis einen PC hat:
  zu Hause per Sprache Status abfragen und Pitches beantworten («P6 ja» → JARVIS.md). Die Cloud-Läufe machen weiter die Arbeit.
  Janis meldet sich dafür selbst.

## Log

- 2026-11-22: Jarvis eingerichtet.
- 2026-11-22: P1 umgesetzt (PR #1: Jarvis-Button, Vorlesen, Schalter Sprechen/Nur Text). Erstes `jarvis.json` angelegt. Neue Pitches P2 (Aufwärmsätze) und P3 (Sätze pro Muskelgruppe).
- 2026-11-22 (2. Lauf): Erste Bestandsaufnahme gemacht, 7 iPhone-Fixes in PR #2. PR #1 noch offen, kein Feedback. Neue Pitches P4 (Plateau-Melder) und P5 (Scheibenrechner). Frage zu Supersatz-Pausen im Backlog.
- 2026-11-22: Janis will das Briefing im Claude-Chat, nicht in der App. P1 verworfen, PR #1 geschlossen, `jarvis.json` entfernt.
- 2026-11-22: Janis hat im Chat P2, P3, P4 und P5 genehmigt, alle vier in PR #3 umgesetzt. Supersatz-Pausen bleiben wie bisher.
- 2026-11-22: Janis hat im Chat das Mergen von PR #2 und #3 freigegeben, beide sind live.
- 2026-11-22: Neuer Plan nach Janis' Lieblingsübungen (3 Kern + Bonus, ohne Hip Thrust/Kreuzheben), MMA aus der App entfernt → PR #4, gemergt und live.
- 2026-11-22: Janis will statt Wochenplan eine Trainingsübersicht, Kalender und Statistiken. P6–P10 gepitcht und genehmigt.
- 2026-11-22: P6–P10 umgesetzt → PR #5.
- 2026-11-22: PR #5 gemergt (live). P11 Fortschrittsfotos genehmigt.
- 2026-11-22: P11 Fortschrittsfotos umgesetzt → PR #6.
- 2026-11-22: PR #6 gemergt, alles live. Keine offenen PRs.
- 2026-11-22: Janis fand die App unübersichtlich. Redesign (Icons, Unter-Tabs, weniger Text) → PR #7, gemergt und live.
- 2026-11-22: Körper-Icons statt bunter Hantel-Icons → PR #8, gemergt und live.
- 2026-11-22: Janis: Läufe Mo/Mi/Fr mit Bericht bis 18:00, Jarvis darf getestete PRs selbst mergen, Bericht mit Testhinweisen, Rückgängig-Hinweis, In Arbeit, Problemen, Pitches und Trainingstipp.
- 2026-11-22: P12 Jarvis-Sync (Variante B: privates GitHub-Repo) von Janis genehmigt.
- 2026-11-22: P12 Jarvis-Sync live (PR #9). Wartet auf Einrichtung durch Janis (privates Repo + Token).
- 2026-11-23: Backlog Komma-Anzeige erledigt + «1 Satz»-Fix → PR #10, gemergt und live. Daten-Sync vom 22.11. gelesen (letztes Training 3.11.). Neue Pitches P13–P15.
- 2026-11-23: Janis hat P13–P15 genehmigt → PR #11, gemergt und live. Pause seit 3.11. ohne Training (Beine seit 22.9.), heute will er Beine trainieren.
- 2026-11-23: Janis wünscht spannendere Berichte (wie ein Pitch, der den Chef beeindruckt). Als Stilregel unter «Ablauf» festgehalten.
- 2026-11-23: Janis will die Idee «Live-Dashboard». Kraftwerk Cockpit gebaut (Skript via PR #12). Die übrigen Ideen hat er abgelehnt. Er wünscht sich, dass Jarvis ihm mehr Arbeit abnimmt, statt neue Features vorzuschlagen.
- 2026-11-23: Janis überträgt Jarvis 4 Daueraufgaben (Plan pflegen, Daten aufräumen, Sync-Wächter, Erholung via Garmin). athletedata ist verbunden, wartet aber noch auf Garmin-Verknüpfung + Abo.
- 2026-11-23: Janis wählt die Gratis-Variante Garmin Personal API statt athletedata. Jarvis hat `garmin.yml` und `garmin_sync.py` gebaut. Schreiben in `kraftwerk-daten` ist im Lauf gesperrt, deshalb legt Janis die Dateien selbst an. Key-Ablauf beachten (max. 1 Jahr).
- 2026-11-23: Garmin-Sync läuft (erster Lauf erfolgreich, alle 6 Endpunkte liefern Daten). Skript liegt in `kraftwerk-daten` unter `.github/workflows/scripts/garmin_sync.py`, täglich 04:17 UTC.
- 2026-11-23: Janis meldet für Mittwoch: Info-Sheet nicht wegwischbar (Bug) und Wunsch nach Geräte-Einstellungen pro Übung. Beides im Backlog, Umsetzung im Lauf am Mi 25.11.
- 2026-11-23: Balance-Check des Plans: Beinbizeps (4 Sätze/Wo.), hintere Schulter (0) und Po zu schwach. Janis hat 3 Tausche am Ganzkörper-Tag genehmigt.
- 2026-11-23: Neuer Rhythmus: Arbeits-Lauf Mo/Mi/Fr 08:34 + Bericht-Lauf 17:37, Antworten über «Eingang», Fragen mit Standard. Erster Arbeits-Lauf am Mi 25.11.
- 2026-11-23: Janis genehmigt alle 7 Ablauf-Ideen: Team Manager auf Arbeits- und Bericht-Lauf umgestellt, erst machen dann fragen, stille Tage, Wochenplan am Montag, P16 Notiz-Knopf, Monats-Check, Sonntags-Wochenüberblick für beide Apps.

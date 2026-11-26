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

## Leitbild (Janis, 23.11.2026, gilt für Kraftwerk und Team Manager)

**Immer besser werden** – die App und die Person, die sie nutzt.
- Offen und kritisch sein: zu sich selbst, zu Jarvis' eigener Arbeit und zur App. Nicht betriebsblind werden.
- Bestehende Features hinterfragen: Wird es genutzt? Hilft es Janis wirklich weiter (Kraft, Muskelaufbau, Gewohnheit)?
  Geht es einfacher? Wenn möglich verbessern, vereinfachen oder zusammenlegen.
- **Kritischer Blick:** Jeder Arbeits-Lauf nimmt sich mindestens ein bestehendes Feature oder einen Ablauf vor und prüft es
  ehrlich, bei Kraftwerk möglichst mit echten Nutzungsdaten. Ergebnis: behalten, verbessern (klein → direkt umsetzen),
  vereinfachen oder entfernen (Entfernen nur mit Go). Im Bericht kommt dazu ein kurzer Abschnitt «Kritischer Blick».
- Auch Jarvis' eigene Arbeit gehört dazu: Was lief in diesem Lauf schlecht, was mache ich nächstes Mal besser? Eine Zeile im Log.
- Für Janis selbst: Rückmeldungen ehrlich formulieren, auch wenn sie unbequem sind (z. B. Trainingslücken, Plateaus, zu wenig Schlaf).

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

- **⛔ 26.11. 15:41 STOPP für den Zusatzlauf von 15:38 (Janis, über die Jarvis-Zentrale):** Design NICHT umsetzen, nichts mergen.
  Janis will das Design zuerst mit der Zentrale im Chat zusammen anschauen (grob, schnell), erst danach wird umgesetzt.
  Falls du schon einen Branch/PR hast: offen lassen, nicht mergen, im Tagesprotokoll vermerken. Erlaubt: nur Befund + Screenshots
  (Vorher, Testdaten) unter `docs/design-befund/` ablegen und verlinken. Kein Push an Janis nötig.
- **Alle Einträge vom 25.11. erledigt** (Janis wollte «alles jetzt», Chat 25.11. abends):
  Squat Maschine → PR #18 · P17 + P18 → PR #19 · Design v2 «Das Instrument» + Logo L1 → PR #20 (alle gemergt, live) ·
  P19 nein · Ernährung → Pitch P20 · Garmin-Verspätung: Vorschlag zweiter cron an Janis (kraftwerk-daten, nur er darf schreiben).
  Für Fr 27.11.: kein neues Konzept, Design ist live. Stattdessen Feinschliff nach Janis' Rückmeldung zum echten Gerät
  (Webfonts in der Sandbox nicht prüfbar). Titel «GANZKÖRPER» auf Heute → erledigt in PR #21 (Arbeits-Lauf 25.11. abends).
- **25.11. 17:58 (Jarvis-Zentrale, Go von Janis):** Problem (b) Garmin-Sync erledigt: zweiter Zeitplan `- cron: "43 6 * * *"` in
  `kraftwerk-daten/.github/workflows/garmin.yml` eingetragen (Commit 7a3f96b, nur diese Zeile). Ab Do 26.11. beobachten, ob die Daten morgens da sind.
- **Design-Auftrag 25.11. (unübersichtlich, vollgepackt, springende Schriftgrössen) erledigt am 26.11.** auf Wunsch von Janis vorgezogen:
  PR #22 (Tafel) + PR #23 (alle Screens). Details im Tagesprotokoll 26.11. Feinschliff nur noch nach Janis' Rückmeldung vom iPhone.
- App-Notizen (`jarvisNotes` im privaten Repo): 2 Notizen vom 25.11. (im Training) → beide erledigt in PR #22. Zuletzt gelesen: 26.11.2026 15:40.

## Tagesprotokoll

Hinweis: Trainings- und Gesundheitszahlen stehen nie hier (öffentliches Repo). Der Bericht-Lauf liest sie selbst aus `kraftwerk-daten`.

### Do 26.11.2026 – Zusatzlauf «Design jetzt» (Wunsch Janis über die Jarvis-Zentrale, ca. 16:00) (Berichtenswert: **ja**)

**Gemergt / live** (getestet: node, Playwright iPhone 13 hell/dunkel + iPhone SE, alle Tabs und Unter-Tabs, Training komplett inkl.
Supersatz, keine Konsolenfehler, gespeicherte Daten unverändert)
- PR #23 https://github.com/Geissi23/Kraftwerk/pull/23 – **Design v2 ruhiger** (Stil und Logo unverändert, keine Funktion entfernt):
  - Heute: Titel feste Grösse · Erholung als eine Zeile (Skalen/Verlauf im Tab Körper) · Ring + Level + Woche → eine Karte «Diese Woche»
    (Level/XP weiter unter Fortschritt) · «Anderes Training starten» eingeklappt.
  - Training: Sätze/Pause in der Kopfzeile, Ziel und Extras nur bei der aktuellen Übung.
  - Plan: Kennzahlen in einer Zeile. Fortschritt: Zeitraum zuerst, «Einzelne Muskeln» eingeklappt, Rückgang im Vergleich grau statt rot.
  - Typografie: keine automatische Verkleinerung je nach Länge mehr (Tafel-Zahlen PR #22, Startkarten-Titel PR #23).
- **Vorher/Nachher-Screenshots** (nur Testdaten): https://github.com/Geissi23/Kraftwerk/blob/main/jarvis/screens/2026-11-26/README.md
  (Skript: `jarvis/screens/demo-screens.js`). Der Bericht-Lauf Fr zeigt sie.
- Testen: Heute → kürzer; Training starten; Fortschritt → «Einzelne Muskeln» aufklappen. Rückgängig: «PR #23 rückgängig».
- Ehrlich offen: Beim ersten Satz einer Übung ist der Knopf in der Tafel auf dem iPhone 13 meist noch unter dem Rand; dann übernimmt der
  untere Knopf. Wird erst mit echter Schrift auf dem Gerät beurteilt (Rückmeldung von Janis abwarten).
- Push an Janis: keiner (Arbeits-Lauf, nichts kaputt). Bericht kommt Fr 17:37.

### Do 26.11.2026 – Arbeits-Lauf (Zusatzlauf, ausserhalb des Rhythmus gestartet, ca. 15:40) (Berichtenswert: **ja**, für den Fr-Bericht)

**Gemergt / live** (getestet: node-Syntax, Playwright iPhone 13 hell/dunkel + iPhone SE, Oberkörper mit echtem Datenstand inkl.
Supersatz durchgeklickt, keine Konsolenfehler, gespeicherte Daten unverändert, Pages auf `bd182a0` veröffentlicht)
- PR #22 https://github.com/Geissi23/Kraftwerk/pull/22 – **Neu ohne Rückfrage**, aus Janis' zwei App-Notizen vom 25.11. und der
  Schriftgrössen-Rückmeldung:
  - «Satz abschliessen» sitzt jetzt in der gelben Tafel direkt unter den Werten. Der Knopf unten erscheint nur noch, wenn die Tafel
    nicht im Bild ist.
  - «Springt zur nächsten Übung, obwohl noch 2 Sätze offen»: kein Zufall, sondern der **Supersatz-Wechsel** (Oberkörper: Seated Row ↔
    Lateral Raise = Supersatz A, Curls ↔ Trizeps = B). Die App zeigte das nicht an. Jetzt: Tafel «Supersatz A · im Wechsel», Hinweis
    «Supersatz A: weiter mit …», Pause nennt die nächste Übung.
  - Gewicht und Wiederholungen immer gleich gross (vorher wurde «82,5» kleiner als «80» gezeigt). Übungsnamen ohne Worttrennung.
  - Testen: Training starten → Knopf in der gelben Tafel. Oberkörper nach Schrägbank → Hinweis Supersatz A. Rückgängig: «PR #22 rückgängig».

**Offene Frage** (neu): Supersätze im Wechsel lassen oder Übungen nacheinander abarbeiten? Standard: **im Wechsel lassen** (jetzt
klar angezeigt). Frist Mo 30.11. Wer nacheinander will, kann auch einzelne Sätze antippen (Satznummer).

**Befund Übersichtlichkeit für Fr 27.11.** (mit echten Daten, hell/dunkel durchgeklickt):
- Training: Kopf der Übung hat 5 Textzeilen vor der Tafel (Ziel, Ziel-Zusatz, Letztes Mal, Satz-/Pausen-Zeile, Knöpfe). Vorschlag:
  Ziel + «Letztes Mal» zu 2 Zeilen zusammenfassen, Satz-/Pausen-Zeile in die Tafel-Kopfzeile, Aufwärmen/Scheiben/Einstellung als
  kleine Icon-Leiste. Dann ist der Knopf in der Tafel beim ersten Satz ohne Scrollen sichtbar.
- Heute: 6 Blöcke untereinander (Startkarte, Erholung, Gewicht, Level, Woche, andere Trainings). Hauptaktion = Startkarte; Level
  und Woche zu einer Zeile zusammenlegen, «Andere Trainings» einklappen.
- Fortschritt/Übersicht: sehr lang (Kraftkurve, Zeitraum-Kacheln, Muskelbalance mit Radar + Liste + Einzelmuskeln + Legende + Text,
  Wochenvolumen, Rückblick, Level, Abzeichen). Muskelbalance auf eine Ansicht reduzieren, Level/Abzeichen ans Ende einklappen.
- Rote Prozent-Badges in den Zeitraum-Kacheln wirken strafend (schon am 25.11. notiert).

**Kritischer Blick:** Supersätze. Der Plan setzt sie ein, aber die App hat den Wechsel nie erklärt → für Janis sah es wie ein Bug aus.
Verbessert (PR #22). Ausserdem beim Durchklicken gefunden: der untere Knopf verdeckte beim ersten Satz die Tafel nicht, aber man sah den
Tafel-Knopf erst nach Scrollen → Abhilfe kommt mit dem Befund oben (Fr).

**Kraftwerk Cockpit** aktualisiert (4 neue Assets mit dem Training vom 25.11., Datensätze auf 26.11. gesetzt, alte Assets gelöscht).

**Daueraufgaben** (Zahlen liest der Bericht-Lauf selbst)
- Sync-Wächter: Jarvis-Sync ok (25.11. abends, nach dem Training, `planVer` 5). Garmin-Sync lief heute erfolgreich, aber erst
  13:50 UTC. Der zweite Zeitplan (06:43 UTC) hat **keinen eigenen Lauf** erzeugt – GitHub hat offenbar beide verzögert/zusammengelegt.
  Nicht kritisch (Daten kommen täglich), beobachten. Kein Push.
- Garmin: Die fehlenden Nächte sind jetzt nachgeliefert (seit Janis' Garmin-Connect-Update vollständig).
- Erholung: HRV im Normalbereich, leicht sinkend; letzte Nacht gut. Empfehlung **normal**. Nächstes Training: Ganzkörper (Fr/Sa).
- Daten aufräumen: Training vom 25.11. geprüft, keine Ausreisser, keine neuen Namens-Varianten.
- Plan pflegen: keine Änderung (Plan v5 frisch). Kein Wochenplan (kein Montag), kein Monats-Check (Mi 2.12.).

**Offene Fragen:** Squat-Aufwärmsätze → «so lassen» bis Mo 30.11. · P20 → «Etappe A umsetzen» bis Mo 30.11. · Supersätze → «im Wechsel lassen» bis Mo 30.11.

### Mi 25.11.2026 – Arbeits-Lauf (Berichtenswert: **ja**)

**Gemergt / live** (alle getestet: node-Syntax, Playwright iPhone 13 hell/dunkel, keine Konsolenfehler, Trainingsdaten unverändert, Pages veröffentlicht)
- PR #13 https://github.com/Geissi23/Kraftwerk/pull/13 – Bug: Alle Sheets (z. B. ⓘ Übungs-Info) lassen sich nach unten wegwischen.
  Testen: Training starten → ⓘ → Sheet nach unten ziehen. Kurz ziehen federt zurück, weit ziehen schliesst.
- PR #14 https://github.com/Geissi23/Kraftwerk/pull/14 – Plan-Update v4 Ganzkörper-Tag (Go 23.11.). Vorher → Nachher:
  Leg Press 3×10–12 → Bulgarian Split Squat 3×8–10 pro Bein · Chest Fly 2×12–15 → Reverse Fly (Maschine) 3×12–15 ·
  Russian Twist 3×15 → Liegender Beinbeuger (Maschine) 3×10–12. Eigene Änderungen bleiben erhalten (gezielter Tausch statt Neuaufbau).
  Dazu Fix: Beim liegenden Beinbeuger wurde «Rumänisches Kreuzheben» als Alternative vorgeschlagen (tabu) → jetzt Beinbeuger stehend.
  Testen: Plan → Ganzkörper ansehen.
- PR #15 https://github.com/Geissi23/Kraftwerk/pull/15 – **Neu ohne Rückfrage** (Wunsch 25.11.): Muskelgruppen feiner.
  Vorher 9 Gruppen mit Einheits-Richtwert 10–20 → Nachher 16 Muskeln in 6 aufklappbaren Hauptgruppen (Brust · Rücken: Latissimus,
  Oberer, Unterer · Schultern: Seitliche, Hintere, Vordere · Arme: Bizeps, Trizeps, Unterarme · Beine: Quadrizeps, Beinbeuger,
  Gesäss, Waden, Adduktoren · Rumpf: Bauch), eigene Richtwerte, «indirekt» grau ohne Richtwert. Hauptmuskel 1 Satz, Hilfsmuskel ½.
  Fix nebenbei: Reverse Fly zählte bisher als Brust. Cockpit-Datei `muskeln.json` mitgezogen.
  Testen: Fortschritt → Übersicht → Karte Muskelgruppen, «Beine» aufklappen.
- PR #16 https://github.com/Geissi23/Kraftwerk/pull/16 – P16 Notiz an Jarvis + Geräte-Einstellungen pro Übung (beides Go 23.11.,
  neue optionale Felder `jarvisNotes` und `gear` mit Migration, Claude-Sync, Jarvis-Sync und Backup getestet).
  Testen: oben «✎ Jarvis» oder im Training ✎ → Notiz senden. Im Training bei einer Maschine «⚙ Einstellung» → z. B. Sitz 4 · Lehne 2.
- PR #17 https://github.com/Geissi23/Kraftwerk/pull/17 – **Neu ohne Rückfrage** (Bug aus dem kritischen Blick): Auf «Heute» stand bei
  Oberkörper «Noch nie gemacht», weil Trainings aus dem alten Plan (alte IDs) nicht zugeordnet wurden. Jetzt korrekt. Folge: Vorschlag
  «Als Nächstes» ist jetzt **Ganzkörper** statt Oberkörper. Testen: Heute.
- Rückgängig jeweils mit «PR #X rückgängig».

**Kraftwerk Cockpit** aktualisiert (4 neue Assets, Datensätze auf 25.11. gesetzt, alte Assets gelöscht). Die Muskel-Karte zeigt jetzt
16 Zeilen; die Ampel-Grenzen der Cockpit-Seite sind noch 10/20 (Seite bewusst nicht angefasst).

**Design (Go 25.11., Jarvis frei):** Befund + Gesamtkonzept «Gym zuerst» mit Mockups hell/dunkel (Beispielwerte) als private Seite:
https://claude.ai/artifact/EqFvSSNdG3T5MrPtDGFcsV (Training, Heute, Körper). Befund kurz: gut = Farben, Zahlen, Startkarte;
wirkt alt = alles Karte mit Rand, rote Prozent-Badges strafen bei wenigen Trainings; umständlich = Ziel/Limit als kleine blaue Textzeile
im Training, 3 Navigationsebenen in Fortschritt, 3 Knöpfe pro Plan-Karte. Etappen: 1 Training → 2 Heute → 3 Fortschritt → 4 Plan →
5 Körper (braucht P17/P18). Etappe 1 kommt im Lauf am Fr 27.11.

**Neue Pitches** (Körper-Seite, Eintrag 24.11.; je Standard «nicht umsetzen», Frist Mo 30.11.): P17, P18, P19 (siehe «Pitches»).
Ehrliche Einschätzung Fotos: lohnen sich nur mit gleicher Pose, gleichem Licht und Abstand und frühestens alle 4 Wochen;
sichtbarer Muskelaufbau braucht eher 8–12 Wochen. Gewicht und Taillenumfang sind die verlässlicheren Zahlen.
Ein Live-Umriss über der Kamera ist in iPhone-Web-Apps unzuverlässig, darum in P18 die Vorlage vor dem Foto plus Geisterbild-Vergleich danach.

**Kritischer Blick:** «Als Nächstes» auf Heute geprüft → Bug gefunden und behoben (PR #17). Ausserdem Fortschritt-Kacheln:
Vergleich mit dem Vorzeitraum ist bei wenigen Trainings kaum aussagekräftig und rot → kommt in Etappe 3 (neutraler Pfeil, erst ab 3 Trainings).

**Daueraufgaben** (Zahlen dazu liest der Bericht-Lauf aus dem privaten Repo)
- Sync-Wächter: Jarvis-Sync aktuell (heute früh). Garmin-Sync läuft, aber GitHub verzögert den geplanten Lauf (04:17 UTC) stark,
  am 24.11. um rund 10 Stunden. Heute bis 07:50 UTC noch kein Lauf. Kein Push, beobachten.
- Garmin-Lücken: An mehreren Tagen der letzten Woche fehlen Schlaf und Body Battery (Uhr nicht getragen oder nicht synchronisiert?).
- Erholung: Empfehlung **normal**; Schlaf ist der Hebel (Details im Bericht).
- Daten aufräumen: Beim letzten Squat-Training sind Aufwärmsätze als Arbeitssätze erfasst. Das bläht Sätze und Volumen auf und
  erzeugt einen falschen Rekord. Frage: so lassen? Standard «so lassen» (nichts wird geändert), Frist Mo 30.11.
  Tipp für den Bericht: Aufwärmsätze über den Knopf «Aufwärmen» abhaken, die zählen nicht.
- Plan pflegen: Plan v4 eingespielt (s. o.). Kein Monats-Check (erst im ersten Lauf im Dezember, Mi 2.12.), kein Wochenplan (Mittwoch).

**Offene Fragen** (mit Standard und Frist): P17/P18/P19 → «nicht umsetzen» bis Mo 30.11. · Squat-Aufwärmsätze → «so lassen» bis Mo 30.11.

### Mi 25.11.2026 – Bericht-Lauf (abgeschlossen)

- Gesundheits-Check: keine offenen PRs, #13–#17 gemergt, GitHub Pages auf dem neusten Commit veröffentlicht. Jarvis-Sync heute früh
  (vor den Merges, darum noch alte Plan-Version im Sync; v4 wird beim nächsten Öffnen der App eingespielt, im nächsten Lauf prüfen).
  Garmin-Sync lief heute erfolgreich, wieder stark verzögert (Nachmittag statt 04:17 UTC). Garmin liefert für die letzten Nächte keine Werte
  (Uhr nicht synchronisiert?) → im Bericht erwähnt.
- Kein Fix nötig. Bericht + Push verschickt.
- 15:25: Nachtrag fürs Training heute Abend (Janis geht ca. 17:00 ins Gym): Empfehlung Oberkörper im Comeback-Modus statt Ganzkörper.
  **Der reguläre Bericht-Lauf um 17:37 bleibt still**, ausser seither ist etwas wirklich Neues passiert.

### Mi 25.11.2026 – regulärer Bericht-Lauf 17:37 (stiller Tag)

- GitHub Pages auf dem neusten Commit (#18) veröffentlicht. PR #18 (Squat Maschine, Plan v5) gemergt.
- Jarvis-Sync lief am Nachmittag, App ist auf `planVer` 5 → Bekanntes Problem (a) «Plan v4 im Sync» erledigt. Keine App-Notizen.
- **PR #19 (P17 + P18) ist offen** (aus der Chat-Sitzung am Nachmittag, laut PR getestet, konfliktfrei). Nicht gemergt, weil Janis gerade
  im Gym ist und die Chat-Sitzung den PR selbst führt. → Arbeits-Lauf Fr 27.11.: falls noch offen, selbst gegenprüfen (node, Playwright
  hell/dunkel, Daten unverändert) und mergen.
- Garmin-Sync lief (Nachmittag, wieder verzögert). Die letzten Nächte fehlen noch, der Abruf war aber vor Janis' Garmin-Connect-Update
  → Fr prüfen, ob die Nächte nachgeliefert wurden.
- Heutiges Training noch nicht im Sync (Janis war beim letzten Sync wohl noch nicht fertig) → Fr auswerten.
- Nichts Neues seit dem vorgezogenen Bericht → kein Bericht, kein Push.

### Mi 25.11.2026 – Arbeits-Lauf (verspätet gestartet, ca. 17:50) (Berichtenswert: nein, Kleinigkeit für den Fr-Bericht)

- Ausgangslage: Eingang war bereits von der Chat-Sitzung erledigt (#18–#20 live). Keine offenen PRs, keine App-Notizen.
- **Neu ohne Rückfrage – PR #21** https://github.com/Geissi23/Kraftwerk/pull/21 (gemergt, Pages veröffentlicht): Auf «Heute» wurde der
  grosse Trainingsname mitten im Wort getrennt («GANZKÖR-/PER»). Jetzt wird die Schrift verkleinert, bis das Wort passt; auf kleinen
  iPhones bleibt «Training starten» einzeilig. Getestet: node, Playwright iPhone 13 hell/dunkel + iPhone SE, keine Konsolenfehler,
  gespeicherte Daten unverändert. Testen: Heute → «Ganzkörper» in einer Zeile. Rückgängig: «PR #21 rückgängig».
- **Kritischer Blick:** Design v2 (#20) mit echten Daten durchgeklickt (alle 4 Tabs, hell/dunkel): keine Fehler, Daten bleiben erhalten.
  Gefunden: Worttrennung im Startkarten-Titel (behoben, s. o.). Auf dem Plan-Tab ist der Unterkörper-Auszug noch «Squat · …» –
  prüfen am Fr, ob der Name im Plan wirklich «Squat (Maschine)» heisst oder nur gekürzt angezeigt wird.
- **Cockpit** aktualisiert (4 neue Assets, Datensätze auf 25.11. abends, alte Assets gelöscht).
- **Sync-Wächter:** Jarvis-Sync ok (heute Nachmittag, `planVer` 5). Das heutige Abendtraining ist noch nicht im Sync → Fr auswerten.
  Garmin-Sync lief heute 14:15 UTC, also **vor** Janis' Garmin-Connect-Update; die letzten Nächte fehlen darum noch. Fr prüfen. Kein Push.
- **Erholung:** keine neue Nacht in `garmin.json`, Empfehlung bleibt wie am Morgen.
- Kein Wochenplan (Mittwoch), kein Monats-Check (erst Mi 2.12.).
- Offene Fragen unverändert: Squat-Aufwärmsätze → «so lassen» bis Mo 30.11. · P20 → Standard «Etappe A umsetzen» bis Mo 30.11.

### Mi 25.11.2026 – Zusatzlauf «Design v2 mergen» (~17:55)

- War schon erledigt: PR #20 https://github.com/Geissi23/Kraftwerk/pull/20 (Branch `jarvis/design-v2`, Kopf 89b7863) ist seit 16:48 UTC
  gemergt, der Branch hat keine neueren Commits. P17/P18 (#19) und Squat-Korrektur (#18) sind in `main` enthalten.
- Gegengeprüft (im Arbeits-Lauf kurz davor): Playwright iPhone 13 hell/dunkel, alle 4 Tabs, keine Konsolenfehler, Trainingsdaten
  unverändert. Pages auf dem neusten Commit veröffentlicht. Push «Design v2 ist live» an Janis (Rückgängig: «PR #20 rückgängig»).

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
- [x] **P16 – Notiz an Jarvis** – Go am 2026-11-23, **live** (PR #16)

- [x] **P17 – Erholung von Garmin auf der Körper-Seite** – Aufwand: mittel – Go am 2026-11-25, **live (PR #19)**
  Karte «Erholung» mit Schlaf, HRV-Status, Ruhepuls und Body Battery der letzten Nacht plus 7-Tage-Mini-Kurven, und eine Ampel
  in der Startkarte auf «Heute». Die App liest `garmin.json` zur Laufzeit mit dem bestehenden Jarvis-Sync-Schlüssel aus dem privaten
  Repo; nichts davon landet im öffentlichen Code. Warum: Du siehst vor dem Training, ob Vollgas oder lockerer sinnvoll ist.
- [x] **P18 – Foto-Pose-Hilfe** – Aufwand: klein bis mittel – Go am 2026-11-25, **live (PR #19)**
  Vor dem Foto eine Vorlage (Umriss, Abstand ca. 2 m, Handy auf Brusthöhe, gleiches Licht, morgens), danach legt die App das neue
  Foto halbtransparent über das letzte, damit du die Pose prüfen kannst. Erinnerung alle 4 Wochen. Fotos bleiben nur auf dem iPhone.
- ~~P19 – Körpermasse (Taille, Brust, Arm)~~ – **nein (Janis, 25.11.)**
  Optional alle 2 Wochen drei Masse in cm, mit Trend. Neues optionales Feld (Datenformat, darum Pitch).
  Warum: Taille stabil + Arm/Brust wächst = sauberer Aufbau. Verlässlicher als Fotos.
- [ ] **P20 – Ernährung (Wunsch von Janis, 25.11.)** – Aufwand: gross, darum in Etappen – Standard: Etappe A umsetzen, Frist Mo 30.11.
  A (klein): Eiweiss-Zähler auf «Heute» – Tagesziel ca. 1,6–2 g pro kg Körpergewicht aus dem letzten Gewicht, Schnell-Knöpfe für
  häufige Portionen (selbst anlegbar, z. B. «Skyr 25 g», «Shake 30 g»), Wochenkurve. Neues optionales Feld mit Migration.
  B (mittel): Kalorien grob dazu (Portion mit kcal), ohne Lebensmittel-Datenbank. C (mittel): Rezepte – eigene Sammlung mit Eiweiss pro
  Portion, ein paar Startrezepte. D (gross): Konfigurator «was habe ich zuhause» → passende Rezepte; ohne externen Dienst nur aus der
  eigenen Rezeptsammlung (KI-Variante bräuchte einen Dienst → eigener Pitch). Ehrlich: Für Muskelaufbau bringt A am meisten,
  ein volles Kalorien-Tracking scheitert meist am Aufwand im Alltag.

## Backlog

- [x] Erste Bestandsaufnahme (2026-11-22) – Fixes **live** (PR #2 gemergt): Pausen-Leiste blockierte Tabs, iOS-Zoom
  in Eingabefeldern, abgeschnittene Kacheln/Knöpfe auf kleinen iPhones, Bildschirmsperre beim Verwerfen.
- [x] Supersatz-Pausen: Janis will es so lassen wie bisher (Pause nach jedem Satz). Entschieden am 2026-11-22.
- [x] Gewichte im Training einheitlich mit Komma anzeigen – **live** (PR #10), dazu «1 Satz» statt «1 Sätze» beim Aufwärmen.

- [x] **Bug:** Übungs-Info (ⓘ-Button) lässt sich nicht nach unten wegwischen – **live** (PR #13). Alle Sheets sollen per Wischen nach unten schliessbar sein (gemeldet 23.11.).
- [x] **live (PR #16)** – **Wunsch von Janis (= Go, 23.11.):** Geräte-Einstellungen pro Übung speichern (Sitzhöhe, Lehne, Pin, Griff usw.).
  Im Training sichtbar, damit er sie sich nicht merken muss. Neues optionales Feld mit Migrationspfad, Sync und Backup testen.

- [x] **live (PR #14, PLAN_VER 4)** – **Plan-Update (Go von Janis, 23.11.), Ganzkörper-Tag:** Russian Twist → «Liegender Beinbeuger (Maschine)» 3×10–12;
  Chest Fly → Reverse Fly an der Maschine 3×12–15 (in der Bibliothek gibt es bisher nur «Reverse Flyes (Kurzhantel)», Maschinen-Variante
  ergänzen und Muskel-Zuordnung hintere Schulter); Leg Press → «Bulgarian Split Squat» 3×8–10 pro Bein. Per PLAN_VER-Update
  (aktuell 3) einspielen, ohne Janis' eigene Änderungen zu verlieren. Am Mi 25.11. umsetzen, nicht während eines Trainings.

- [x] **live (PR #16)** – **P16 – Notiz an Jarvis (Go von Janis, 23.11.):** Ein kleiner Knopf in der App, über den Janis im Gym in wenigen
  Sekunden einen Bug oder Wunsch eintippt. Die Notizen werden als neues optionales Feld (z. B. `jarvisNotes: [{t, text}]`) mit dem
  bestehenden Jarvis-Sync nach `kraftwerk-daten` übertragen. Der Arbeits-Lauf liest sie und behandelt sie wie «Eingang».
  Mit Migrationspfad, Sync und Backup testen.

- [x] Muskelgruppen feiner (Wunsch 25.11.) – **live** (PR #15).
- [x] Bug «Oberkörper – Noch nie gemacht» (alte Plan-IDs) – **live** (PR #17).
- [x] **Design v2 «Das Instrument» + Logo L1 – live (PR #20)**, alle Etappen auf einmal (Wunsch Janis 25.11.). Konzept: https://claude.ai/artifact/3NHhgUsJ1sneHQk9Pk6EBp
  (altes Konzept EqFvSSNdG3T5MrPtDGFcsV verworfen: «zu ähnlich wie jetzt»). Offen: Feinschliff nach Test auf dem iPhone.
- [x] App-Notizen 25.11.: Satz-Knopf weit unten / «Sprung» zur nächsten Übung (Supersatz) / Schriftsprünge – **live (PR #22)**.
- [x] Übersichtlichkeit Design v2 pro Screen – **live (PR #23)**, vorgezogen am 26.11.
- [ ] Cockpit-Seite: Muskel-Ampel nutzt noch feste Grenzen 10/20 statt `richtwert` (Seite nur auf Wunsch anfassen).

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
- 2026-11-23: Leitbild «Immer besser werden» von Janis aufgenommen: kritischer Blick auf Features, auf Jarvis' eigene Arbeit und ehrliches Feedback an Janis. Gilt auch für den Team Manager.
- 2026-11-23: Aufgeräumt: Team-Manager-Jarvis wird ab jetzt nur in der Team-Manager-Sitzung gepflegt (eigene JARVIS.md, Freeze). Diese Kraftwerk-Sitzung ändert nichts mehr am Team Manager. Der Sonntags-Wochenüberblick liest beide Apps.
- 2026-11-25: Erster Arbeits-Lauf. PR #13 (Sheets wischen), #14 (Plan v4), #15 (Muskelgruppen fein), #16 (P16 Notizen + Geräte-Einstellungen), #17 (Zuletzt mit alten Plan-IDs) gemergt und live. Cockpit aktualisiert. Design-Konzept mit Mockups veröffentlicht. Neue Pitches P17–P19.
- 2026-11-25 (selbstkritisch): Den Bug mit den alten Plan-IDs hätte ich beim Plan-Umbau am 22.11. finden müssen; künftig bei Plan-Änderungen «Zuletzt»/Vorschlag mit echtem Verlauf mittesten. Ausserdem: In PR-Texten und JARVIS.md keine Trainings- oder Gesundheitszahlen, auch keine Anzahlen.
- 2026-11-25 (Bericht): Gesundheits-Check ok, Bericht und Push zu PR #13–#17 verschickt. Plan v4 im Sync noch nicht sichtbar (Sync lief vor dem Merge) → nächster Lauf prüft.
- 2026-11-25: Bericht 25.11. vorgezogen verschickt (Nachtrag 15:25 mit Empfehlung fürs Training heute Abend).
- 2026-11-25: Antwort von Janis im Eingang: P17/P18 ja, P19 nein, neue Designphilosophie (neues Konzept Fr), Idee Ernährung (Pitch P20), Squat 23.11. war Maschine (Korrektur Fr).
- 2026-11-25 (selbstkritisch): Den Squat-«Rekord» habe ich ungeprüft gemeldet. An der Maschine war das kein Rekord. Künftig Rekorde gegen Varianten derselben Übung gegenprüfen und bei neuen Übungsnamen nachfragen.
- 2026-11-25 (Bericht-Lauf 17:37): stiller Tag. Pages ok, `planVer` 5 im Sync, PR #19 (P17/P18) offen → Fr prüfen und mergen.
- 2026-11-25 (abends, Chat): Alles sofort umgesetzt: PR #18 Squat Maschine, PR #19 P17 Erholung + P18 Foto-Pose, PR #20 Design v2 «Das Instrument» + Logo L1 (alle getestet und gemergt). P20 Ernährung gepitcht.
- 2026-11-25 (selbstkritisch): Merge- und PR-Aufruf nie parallel schicken; GitHub-API war mehrfach 500/502, geduldig wiederholen.
- 2026-11-25 (Arbeits-Lauf, verspätet ~17:50): PR #21 Titel ohne Worttrennung (neu ohne Rückfrage), Cockpit aktualisiert, Sync/Pages ok.
- 2026-11-25 (selbstkritisch): Vor der Arbeit erst `git pull` auf JARVIS.md – eine Chat-Sitzung hatte parallel geschrieben. Und Playwright-Route-Filter nicht auf Wörter wie «claude» setzen (trifft auch file://-Pfade).
- 2026-11-25 (Zusatzlauf): «Design v2 mergen» war bereits erledigt (PR #20), geprüft und per Push bestätigt.
- 2026-11-26 (Zusatz-Arbeits-Lauf Do): App-Notizen erledigt → PR #22 (Satz-Knopf in der Tafel, Supersatz-Hinweis, feste Zahlengrösse), Cockpit aktualisiert, Befund Übersichtlichkeit für Fr notiert.
- 2026-11-26 (selbstkritisch): Supersätze habe ich beim Plan-Umbau eingebaut, ohne zu prüfen, wie sich der Wechsel im Training anfühlt. Bei Plan-Änderungen künftig ein Training einmal komplett durchklicken.
- 2026-11-26 (Zusatzlauf Design): PR #23 «Design v2 ruhiger» gemergt (alle Screens), Vorher/Nachher-Screenshots mit Testdaten unter jarvis/screens/2026-11-26.
- 2026-11-26 (selbstkritisch): Ein Auto-Scroll, der den Tafel-Knopf ins Bild holen sollte, hat den Übungsnamen abgeschnitten – erst im Screenshot bemerkt und zurückgenommen. Visuelle Änderungen immer zuerst im Screenshot prüfen, nicht nur per Messwert.

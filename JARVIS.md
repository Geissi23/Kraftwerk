# JARVIS – Steuerdatei für die Kraftwerk-App

Jarvis ist ein automatischer Claude-Lauf, der diese App weiterentwickelt. Diese Datei ist sein Gedächtnis: Er liest sie zu Beginn
jedes Laufs und aktualisiert sie am Ende. Janis kann sie jederzeit bearbeiten (auch in der GitHub-App auf dem iPhone).
Ältere Protokolle, erledigte Pitches und frühere Regeln: `JARVIS-ARCHIV.md`.

## Ziel und Leitbild

Eine gut funktionierende Kraftwerk-App mit coolen Features, die sehr ansprechend aussieht und sich gut anfühlt – auf dem iPhone als
Web-App vom Home-Bildschirm. Janis trainiert meist 3× pro Woche im Gym (selten 4×), Ziel Muskelaufbau. Kein MMA (seit 22.11.2026).

**Immer besser werden** (Janis, 23.11.2026) – die App und die Person, die sie nutzt. Offen und kritisch sein, auch zu Jarvis' eigener
Arbeit. Jeder Arbeits-Lauf prüft mindestens ein bestehendes Feature ehrlich (möglichst mit echten Nutzungsdaten): behalten, verbessern,
vereinfachen oder entfernen (Entfernen nur mit Go). Rückmeldungen an Janis ehrlich, auch wenn unbequem. Eine Zeile Selbstkritik im Log.

## Grenzen (gelten immer)

- Code nie direkt auf `main` (immer Branch `jarvis/…` + PR). Direkt auf `main` nur JARVIS.md, JARVIS-ARCHIV.md und Doku unter `docs/`.
  (`preview/` schreibt nur der Workflow «Vorschau».)
- Nie Daten löschen; Backup-, Sync- oder Datenformat-Änderungen nur mit Migrationspfad und neuen Feldern als optional.
- Keine neuen externen Dienste, Konten oder Kosten.
- Nie in `kraftwerk-daten` schreiben; keine Trainings- oder Gesundheitszahlen (auch keine Anzahlen) ins öffentliche Repo.
- Hip Thrust, Kreuzheben (auch rumänisches) und MMA bleiben tabu.

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
5. **Nutzung lernen** (seit 27.11.): aus `kraftwerk-daten.json` auswerten, welche Funktionen genutzt werden und welche nie; Unbenutztes
   zum Entfernen vorschlagen (Push mit Standard und Frist). `fb` (👍/👎 zu «Neu im Test») auswerten.
6. **Wochenplan** jeden Montag im ersten Lauf (Training pro Tag nach Erholung und dem, was letzte Woche fehlte).
   **Monats-Check** im ersten Lauf jedes Monats (Vormonat auswerten, Plan anpassen, Vorher → Nachher im Tagesprotokoll).

## Kraftwerk Cockpit (seit 23.11.2026)

Privates Dashboard auf claude.ai: https://claude.ai/artifact/VMVxfCKkAXfqyvE7tHbs5Y (Typ «Data»).
Bei jedem Lauf aktualisieren: `node jarvis/cockpit.js <kraftwerk-daten.json> index.html <ordner>` erzeugt
`trainings.json`, `uebungen.json`, `muskeln.json` und `gewicht.json`. Diese als Asset hochladen
(Artifact publish `asset: true`, `url` siehe oben). Danach mit ArtifactData `update` die Datensätze
`datasets/<name>` auf die neue `source.url` und `updated.at` setzen, alte Assets löschen. Die Seite selbst nicht anfassen.

## Arbeitsweise ab 27.11.2026 (Go von Janis: «ja alles»)

- **Takt:** Arbeits-Lauf täglich 08:34, 13:34, 18:34. Gibt es nichts Sinnvolles zu tun, Lauf nach kurzer Prüfung beenden (nur
  Log-Zeile). Aufträge von Janis startet die Jarvis-Zentrale zusätzlich sofort. Kein täglicher Abendbericht mehr;
  Wochenbericht am Montag 17:37 bleibt, Sonntag kommt der Wochenüberblick beider Apps mit Produkt-Review.
- **Push statt Bericht:** Pro Lauf höchstens EINE Push-Benachrichtigung, nur wenn etwas live ging oder eine Entscheidung ansteht.
  Inhalt: was live ist (mit «PR #X rückgängig») und alle offenen Fragen gebündelt, jede mit Standard und Frist
  («Ohne Antwort mache ich um <Zeit/Tag> X»). Antworten von Janis kommen in diesem Lauf-Chat oder über die Zentrale in «Eingang».
- **Mehr Freiheit:** Jarvis baut und mergt selbst, auch mittlere Features und eigene Ideen, wenn sie zum Produkt-Profil passen
  und auf der Roadmap unter «Jetzt» stehen. Go per Push nötig nur für: neue grosse Bereiche, Änderungen am gespeicherten
  Datenformat, Entfernen von Funktionen.
- **Qualität:** (1) Jeder PR läuft durch die automatischen Tests (GitHub Actions, siehe Eingang) und wird nur bei Grün gemergt.
  (2) Grössere PRs prüft vor dem Merge ein separater Review-Agent, der die Arbeit nicht gemacht hat (frische Augen; Befunde
  beheben, dann mergen). (3) Kleine PRs, ein Thema pro PR.
- **Neu im Test (Schalter):** Grosse Neuerungen, die den Ablauf im Gym verändern, kommen mit einem Schalter unter
  Einstellungen › «Neu im Test». Höchstens 3 gleichzeitig. Testphase 2 Wochen, dann fragt Jarvis per Push «behalten oder weg»
  (Standard: behalten → Schalter entfernen; weg → Funktion ausbauen). Kleine Änderungen nie mit Schalter.
- **Vorschau:** Sichtbare Änderungen zuerst auf der Vorschau (siehe Eingang) mit Push «zum Ausprobieren». Ohne Einwand innert
  24 h live. Bugfixes direkt live.
- **Nutzung lernen:** Jarvis wertet aus kraftwerk-daten.json aus, welche Funktionen genutzt werden und welche nie, und schlägt
  Unbenutztes zum Entfernen vor. Nach einem Training mit Neuem kurz 👍/👎 in der App (siehe Eingang).
- **Grosses zuerst gemeinsam:** Grössere Design- oder Konzeptfragen zuerst als Mockups mit Janis (über die Zentrale), dann bauen.

## Werkzeuge (eingerichtet am 27.11.2026)

- **Automatische Tests** (`tests/app.test.js`, Workflow «Tests», PR #30): bei jedem PR. Chromium ist Pflicht (Merge nur bei Grün),
  WebKit (Safari-Engine) ist seit PR #35 ebenfalls Pflicht. Lokal:
  `DEVICES="iPhone 13" node tests/app.test.js` (Bash bricht nach 2 Min. ab, darum Geräte einschränken). WebKit gibt es nur in der CI.
- **Vorschau** https://geissi23.github.io/Kraftwerk/preview/ (PR #31): Actions › «Vorschau» › Run workflow mit Branch (oder Label
  `vorschau` am PR); Branch `main` setzt zurück. Liest echte Daten, schreibt nur `kraftwerk.preview:…`, Sync aus, Fotos getrennt.
  iPhone: Safari hat einen anderen Speicher als die Home-Bildschirm-App → in der Vorschau Einstellungen › Jarvis-Sync verbinden,
  dann lädt sie die Sicherung (nur lesen). Ablauf: sichtbare Änderung → Vorschau + Push «zum Ausprobieren» → ohne Einwand nach 24 h mergen.
- **Neu im Test** (PR #32): Liste `BETA` in index.html (max. 3, `since`), `betaOn(id)` im Code. Schalter unter Einstellungen.
  Nach 2 Wochen Push «behalten oder weg» (Standard behalten → Eintrag und Schalter entfernen, Code bleibt).
- **👍/👎 nach dem Training** (PR #33): Feld `fb: [{t,id,v,w}]` in `kraftwerk-daten.json`.
- **Review-Agent:** grössere PRs vor dem Merge von einem frischen Agenten prüfen lassen (nur lesen), Befunde beheben.

## Produkt-Profil (was Janis will – jeder Lauf hält sich daran)

- Ziel: gut funktionierende, moderne, ansprechende App; einfach zu bedienen: wenig Text, klare Icons, wenig Scrollen.
- Kein «KI-Look» (keine generischen Karten-Stapel, keine Verläufe, keine Emoji-Deko). Ruhig, übersichtlich, nicht vollgepackt.
- Design v3: Schrift Saira «Tempo» (Titel und grosse Zahlen kursiv/schmal), feste Grössenstufen, gleiche Werte gleich gross,
  eine Hauptaktion pro Screen (Gelb), 3 Tabs Übersicht · Plan · Fortschritt. Vorlage: `docs/design-v3/`.
- Training: 3 Kern-Trainings (Oberkörper, Unterkörper, Ganzkörper) + Bonus Schultern & Arme; meist 3×/Woche Gym; Ziel
  Muskelaufbau. Kein MMA, keine Hip Thrusts, kein Kreuzheben.
- Ernährung: nur Eiweiss und Wasser, keine Kalorienzählung. Kein BMI.
- Janis will möglichst wenig am Handy sein: Entscheidungen gebündelt, mit Standard und Frist, keine Rückfragen-Ketten.

## Roadmap (Jetzt · Als Nächstes · Später – Jarvis arbeitet nur an «Jetzt», Janis verschiebt sonntags)

- **Jetzt:**
  1. **Design v3 Etappe 2 Rest** (Go 26.11.): Aufwärm-Markierung als Datenfeld + Aufwärm-Vorschläge 40 %/60 % (nach #36, berührt
     Satz-Zählung und Abschluss). Abschluss-Screen PR #36 in der Vorschau; Gewichtsschritt pro Übung PR #37 fertig, Vorschau nach #36.
  2. **Nutzung lernen – erste Auswertung:** welche Bereiche (Fotos, Rückblick, Level/Abzeichen, Körpermasse, Notizen, Geräte-Einstellungen,
     Scheibenrechner) werden genutzt? Erste Sicht 27.11.: Körpermasse/Zielgewicht noch nie, Notizen und Geräte-Einstellungen ja,
     Eiweiss/Wasser erst seit heute live. Fotos, Rückblick, Level, Scheibenrechner hinterlassen keine Spur → Nutzungszähler (Frage offen).
     Entfernen-Fragen erst mit genug Daten (frühestens Mitte Dezember).
  3. **Eiweiss-Portionen selbst anlegen** (P20 A Rest, z. B. «Skyr 25 g»), klein.
- **Als Nächstes:** Körper-Tab Zeitraum-Umschalter wie Mockup · «In den Plan übernehmen» bei der Coach-Empfehlung (ändert den Plan
  per Knopf → nur mit Go) · Cockpit-Muskel-Ampel mit `richtwert` statt 10/20.
- **Später:** P20 B–D (Kalorien, Rezepte, Konfigurator; Standard «nicht umsetzen») · Sprach-Assistent auf einem PC (Janis meldet sich).

## Eingang

- App-Notizen 27.11. 13:35 geprüft: keine neuen. Jarvis-Sync läuft (neuer Sync 27.11. 13:21) → Punkt «Jarvis-Sync einrichten» erledigt.

## Offene Fragen (Standard gilt ohne Antwort)

- Squat-Aufwärmsätze vom 23.11. als Arbeitssätze erfasst → Standard **so lassen**, Frist Mo 30.11.
- Supersätze im Wechsel oder nacheinander → Standard **im Wechsel lassen**, Frist Mo 30.11.
- P20 Ernährung B–D → Standard **nicht umsetzen**, Frist Mo 30.11.
- PR #36 Abschluss-Screen (Vorschau) → Standard **live**, Frist Sa 28.11. 13:34.
- PR #37 Gewichtsschritt: Sa 28.11. 13:34 nach #36 in die Vorschau + Push «zum Ausprobieren» → Standard **live**, Frist So 29.11. 13:34.
- Nutzungszähler (neues optionales Feld `use` in der Sicherung: wie oft Fotos, Rückblick, Level, Scheibenrechner usw. geöffnet werden;
  nur Zähler) → Standard **einbauen**, Frist Mo 30.11. 18:34.

## Tagesprotokoll

Hinweis: Trainings- und Gesundheitszahlen stehen nie hier (öffentliches Repo).

### Fr 27.11.2026 – Sofort-Lauf «Einrichtung neue Arbeitsweise» (ca. 11:00–11:45)

**Gemergt / live** (Pages veröffentlicht):
- PR #30 https://github.com/Geissi23/Kraftwerk/pull/30 – automatische Tests bei jedem PR (Syntax, iPhone 13 + SE hell/dunkel, alle Tabs,
  Training komplett, Daten-Erhalt inkl. Jarvis-Sync und altem Backup, keine Konsolenfehler). Absichtlich kaputte Version wird erkannt.
- PR #31 https://github.com/Geissi23/Kraftwerk/pull/31 – Vorschau unter `/preview/` (Review-Agent: 1 blockierender Befund – Workflow
  prüft jetzt, dass der Branch den Schutz enthält – plus Aufräumen alter Vorschau-Stände, Laden aus der Sicherung in Safari; behoben).
  Vorschau steht auf dem Live-Stand. Rückgängig: «PR #31 rückgängig».
- PR #32 https://github.com/Geissi23/Kraftwerk/pull/32 – Einstellungen › «Neu im Test» (Grundgerüst, gerade leer). Neues optionales Feld `beta`.
- PR #33 https://github.com/Geissi23/Kraftwerk/pull/33 – Daumen hoch/runter im Abschluss-Screen, nur wenn etwas im Test ist. Feld `fb`.
- Testen: Einstellungen → Zeile «Neu im Test · Gerade nichts im Test.» Sonst nichts Sichtbares. (Morgenlauf 27.11. steht im Archiv.)

**Nachtrag (zweiter Sofort-Lauf, ca. 11:40):** PR #34 https://github.com/Geissi23/Kraftwerk/pull/34 gemergt – iPhone SE: Übersicht und
Fortschritt liessen sich in Safari 3–7 px seitwärts schieben. Gewichtskarte schmaler, Kalendertage dürfen schmaler werden, Inhalt seitlich
begrenzt (`overflow-x:clip`, Umschalter bleibt oben haften – geprüft). WebKit-Tests jetzt grün → PR #35 macht sie zur Pflicht.
Rückgängig: «PR #34 rückgängig». Kein weiterer Push (keine neue Entscheidung).

**Kritischer Blick:** Testbarkeit der App selbst. Bisher hat jeder Lauf von Hand durchgeklickt; dabei gingen Dinge wie die SE-Breite in
Safari durch, weil lokal nur Chromium läuft. Jetzt prüft WebKit in der CI mit – und hat direkt einen echten Fehler gefunden.

**Daueraufgaben:** Sync-Wächter ok (Jarvis-Sync 26.11. abends, Garmin-Sync gestern 2×, heute noch nicht – üblich Nachmittag).
Erholung unverändert seit dem Morgen, Empfehlung **normal**. Daten aufräumen / Plan pflegen: nichts Neues. Cockpit: erledigt im Morgenlauf.

### Fr 27.11.2026 – Arbeits-Lauf 13:34

- PR #36 https://github.com/Geissi23/Kraftwerk/pull/36 – Abschluss-Screen wie Mockup 5 (Vollbild: Name, Training der Woche, Dauer/Sätze/
  Ø Wdh im Tank, Rekorde mit bestem Satz, Vergleich zum letzten Mal). Tests grün, Vorschau steht. Testen: in der Vorschau ein Training
  beenden. Ohne Einwand live am Sa 28.11. ab 13:34.
- Kritischer Blick: alter Abschluss hatte 4 Kacheln plus 3 Textzeilen (XP, Prozent, «so viel wie …») – zu viel Text für den Moment nach
  dem Training. Jetzt eine Aussage pro Zeile.
- Daueraufgaben: Jarvis-Sync ok (heute 13:21), Garmin-Sync heute noch nicht (üblich Nachmittag), Erholung unverändert → **normal**.
  Keine neuen Trainings → Daten aufräumen / Plan pflegen nichts. Cockpit: Morgenlauf.

### Fr 27.11.2026 – Arbeits-Lauf 18:34

- PR #37 https://github.com/Geissi23/Kraftwerk/pull/37 – Gewichtsschritt pro Übung: im Übungsmenü «Gewichtsschritt · x kg» (1–10 kg
  oder Standard). Wirkt auf +/−, Ziel-Gewicht, «Nächster Satz», Comeback, Aufwärmen, Deload. Optionales Feld `wstep` mit Migration.
  Review-Agent: keine blockierenden Befunde; behoben: 1,25-kg-Werte wurden auf 0,1 gerundet/angezeigt, nur gültige Schritte zulassen,
  Test hing vom gestarteten Training ab. Bewusst so: Kurzhanteln steigen jetzt um 2 kg (wie die Tafel) statt 2,5.
  Noch nicht in der Vorschau (dort steht #36 bis morgen 13:34). Kein Push (nichts live, keine neue Entscheidung).
- Kritischer Blick: Übungsmenü hat jetzt 13 Knöpfe – zu viel für «eine Aktion pro Screen». Kandidat zum Vereinfachen (Gruppen oder
  seltene Punkte nach unten), aber erst mit Nutzungszahlen.
- Daueraufgaben: Jarvis-Sync zuletzt 13:21 (keine neuen Trainings, ok), Garmin-Sync heute 2× ok. Erholung: HRV ausgeglichen, Schlaf
  etwas kurz → **normal**. App-Notizen: keine neuen. Daten aufräumen / Plan pflegen: nichts. Cockpit: Morgenlauf.

## Backlog

- [ ] Rest von Design v3 Etappe 2 (siehe Roadmap «Jetzt»).
- [ ] Cockpit-Seite: Muskel-Ampel nutzt noch feste Grenzen 10/20 statt `richtwert` (Seite nur auf Wunsch anfassen).
- [ ] Verwaister Branch `jarvis/ci-test-probe` auf GitHub (Löschen über den Proxy nicht möglich) – Janis kann ihn bei Gelegenheit löschen.

## Log (ältere Einträge im Archiv)

- 2026-11-27 (Arbeits-Lauf): Design v3 Etappe 4 Fortschritt (PR #28) und Etappe 5 Eiweiss/Wasser + Körpermasse (PR #29) live. Nur Rest von Etappe 2 offen.
- 2026-11-27 (selbstkritisch): Die erste Coach-Empfehlung erzeugte 16 Tipps – mit echten Daten sofort sichtbar. Generierte Listen immer mit echtem,
  lückenhaftem Datenstand prüfen und begrenzen. Playwright-Klicks scheiterten am festen Umschalter + Navigation → `scroll-padding` gesetzt (hilft auch echten Nutzern).

- 2026-11-27 (Sofort-Lauf): Neue Arbeitsweise eingerichtet: Tests (#30), Vorschau (#31), Neu im Test (#32), 👍/👎 (#33). SE-Breite offen (#34).
  JARVIS.md entschlackt, Roadmap gefüllt.
- 2026-11-27 (selbstkritisch): Den lokalen `main`-Zweig nicht geprüft – er war veraltet, erst `git log` hat es gezeigt. Zu Beginn immer
  `git reset --hard origin/main`. Und CSS-Fixes «auf Verdacht» ohne Messung (Kalender) kosten einen CI-Durchgang: erst Diagnose, dann Fix.
- 2026-11-27 (zweiter Sofort-Lauf, gleicher Auftrag): Einrichtung war schon erledigt → nur PR #34 (SE-Breite) fertig und gemergt, PR #35 WebKit Pflicht.
- 2026-11-27 (selbstkritisch): Beim ersten Versuch auf Verdacht am Kalender gedreht; das Sicherheitsnetz `overflow-x:clip` plus Messung hätte gleich gereicht.
- 2026-11-27 (Arbeits-Lauf 13:34): PR #36 Abschluss-Screen v3 in die Vorschau, Nutzung erste Sicht, Jarvis-Sync bestätigt.
- 2026-11-27 (Arbeits-Lauf 18:34): PR #37 Gewichtsschritt pro Übung (Review-Agent, Befunde behoben), wartet auf Vorschau.
- 2026-11-27 (selbstkritisch, 18:34): Ausgewählter Chip war im Blatt kaum sichtbar (`#sheet .pill` überschreibt `.pill.on`) und der
  Titel «Gewichtsschritt» stand am Rand – beides erst im Screenshot. Im Blatt für Auswahl-Chips `.plchips` nehmen, Titel kurz halten.
- 2026-11-27 (selbstkritisch): Der Titel brach auf dem SE mitten im Wort («OBERKÖRP-ER») – nur im Screenshot gesehen. Grosse Titel immer
  mit `min(…, vw)` begrenzen und auf dem SE ansehen; und keine Review-Runde, weil klein – beim nächsten sichtbaren PR wieder Review-Agent.

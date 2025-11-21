# My Clock Project

This project demonstrates a small digital + analog clock implemented in web technologies and a Java Swing desktop version.

## Contents
- `index.html` — Web UI (digital + analog)
- `styles.css` — Visual styling
- `script.js` — JavaScript clock logic (reads system time, updates every second)
- `java/ClockSwing.java` — Simple Java Swing application showing a digital clock
- `README.md` — This file

## How it works (web)
- Uses `new Date()` (system time) and updates every second.
- Aligns updates to the next second boundary for better timing accuracy.

## How to run (web)
1. Open `index.html` in a modern browser (Chrome, Firefox, Edge).
2. The clock reads local system time and updates automatically.

## How to run (Java)
Requires Java 8+.
1. Compile: `javac ClockSwing.java`
2. Run: `java ClockSwing`


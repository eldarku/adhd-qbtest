# ADHD QBTest Clone

> **⚠️ WARNING: This is NOT a medical tool.**
>
> This project was built for educational and entertainment purposes only. It is **not** a validated diagnostic instrument and must **not** be used for clinical decision-making or self-diagnosis.
>
> **Practicing with this tool can compromise your real QBTest/QbCheck results.** The official QBTest relies on the task being unfamiliar — repeated exposure to the test format creates a learning effect that may invalidate your scores when you take the actual clinical assessment. If you have an upcoming QBTest evaluation, **do not use this tool**.
>
> If you suspect you have ADHD, please consult a qualified healthcare professional.

> **IMPORTANT: TAKE THE TEST NORMALLY. DO NOT TRY TO "ACE" IT.**
>
> Complete the test the way you would normally behave. **Do not try to sit unusually still, suppress natural head movement, or optimize your behavior for a "better" result.** The point of the task is to observe your usual response style and activity patterns.
>
> If you intentionally force yourself to stay unnaturally still or try to game the task, the result may become **strange, misleading, and hard to interpret**.

A browser-based clone of the QBTest — a Continuous Performance Test (CPT) used in ADHD assessment. It simultaneously measures **attention**, **impulsivity**, and **motor activity** in a single session using only a webcam and keyboard/mouse.

**Live demo:** [https://eldarku.github.io/adhd-qbtest/](https://eldarku.github.io/adhd-qbtest/)

**Repo:** [https://github.com/eldarku/adhd-qbtest](https://github.com/eldarku/adhd-qbtest)

## Usage

### Before Starting

- Enter **full-screen mode** (F11 in most browsers) to minimize distractions
- Close all other tabs, notifications, and applications
- Disable system notification sounds and pop-ups
- Sit in a quiet room with consistent lighting
- Position yourself at a comfortable distance from the screen with the webcam facing you
- Take the test **as you normally would**. Do **not** try to sit unnaturally still or "perform well" for the camera.
- Do not use timers, alarms, or clocks visible on screen during the test

### Running the Test

1. Open the page and allow webcam access
2. Set test duration (default: 20 minutes)
3. Click **Start**
4. Respond (click or spacebar) when the same shape and color appear twice in a row, while otherwise behaving as naturally as possible
5. Results appear automatically when the test ends
6. Click **Export as Text** to download results and raw data

### Loading & Comparing Saved Results

1. Click **Load Results** and select an exported `.txt` file to view past results
2. Click **Compare Results** and select two exported `.txt` files to see a side-by-side comparison

## How It Works

### The Test (Continuous Performance Task)

Four shapes are shown one at a time in random order: red rectangle, blue rectangle, red circle, blue circle. The participant must respond (click or press spacebar) whenever the **same shape and color appear twice in a row**. Each stimulus appears for 300–600 ms with a 1–3 second interval between stimuli. The default test duration is 20 minutes.

### Movement Tracking

During the test, the webcam tracks the participant's head position using **pico.js** face detection. The face center coordinates are recorded every frame, producing a continuous movement trace. This is drawn live on screen and used to compute activity metrics after the test.

### Quarters

The test is divided into four equal time periods (Q1–Q4). Q1 is treated as a warm-up period — only Q2–Q4 data is used for the final aggregate scores, following the standard QBTest protocol. Per-quarter breakdowns are still shown individually.

## Metrics

### Activity (from head movement)

| Metric | Description |
|---|---|
| Distance | Total path length of head movement (px) |
| Surface Area | Bounding box area of head positions (px²) |
| Micro-movements | Count of frame-to-frame displacements < 5 px |
| Movement Time | Percentage of frames with displacement > 2 px |

### Attention (from correct responses)

| Metric | Description |
|---|---|
| Reaction Time | Mean RT of correct responses (ms) |
| RT Variance | Standard deviation of correct RTs (ms) |
| Omission Errors | Missed targets / total targets × 100 (%) |
| Normalized Variation | Coefficient of variation: RT_SD / RT_mean × 100 (%) |

### Impulsivity

| Metric | Description |
|---|---|
| Commission Errors | Responses to non-targets / total non-targets × 100 (%) |
| Error Rate | (missed + commissions) / total stimuli × 100 (%) |

## Q-Scores

Each metric is compared to normative data from the **QbCheck Technical Manual Rev F (2022), Table 4** (adults 20–60, averaged across gender). A Q-score is a z-score: `(value − mean) / SD`, clamped to [−3, +3] and converted to a percentile.

Three composite scores summarize overall performance:

- **QbActivity** — average Q-score of movement time, distance, surface area, micro-movements
- **QbInattention** — average Q-score of RT variance, omission, reaction time, normalized variation
- **QbImpulsivity** — average Q-score of commission errors, error rate

## Results Page

- Q-score bars with color gradient (green → yellow → red) and percentiles
- Head movement trajectory plots for each quarter (Q1–Q4)
- Smoothed distance-over-time plot showing instantaneous head movement across the full test
- Reaction time scatter plot (correct, commission errors, anticipatory, omissions)
- Activity and Attention/Impulse tables with per-metric Q-scores
- Full results exportable as a `.txt` file

## Export, Load & Compare

**Export** — after a test, click "Export as Text" to save all results and raw data to a `.txt` file. The file includes composite Q-scores, per-metric tables, per-quarter summaries, and full raw data (stimulus events, responses, omissions, head movement coordinates).

**Load Results** — click "Load Results" on the start screen and select a previously exported `.txt` file. The full results page is reconstructed from the file: Q-score bars, movement trajectory plots, distance-over-time plot, reaction time scatter, and all tables.

**Compare Results** — click "Compare Results" and select two exported `.txt` files (Test 1 and Test 2). A side-by-side comparison view is shown with:
- Dual Q-score bars (Test 1 and Test 2 markers on the same bar)
- Side-by-side head movement trajectory canvases
- Side-by-side reaction time scatter plots
- Comparison tables with Result, Q-score, and Percentile columns for each test

## Tech Stack

- Single HTML file — no build step, no backend
- **pico.js** — real-time face detection (cascade classifier)
- **camvas.js** — webcam-to-canvas helper
- **Plotly.js** — reaction time scatter plot
- **Canvas 2D API** — movement visualizations, stimulus display, distance plot

## References

- QbCheck Technical Manual, Revision F. Qbtech AB, 2022.
- Parameter Interpretation Guide (EN). Qbtech AB.
- Hult N, Kadesjö J, Kadesjö B, Gillberg C, Billstedt E. ADHD and the QbTest: Diagnostic Validity of QbTest. Journal of Attention Disorders, 22(11), 1074–1080, 2018. DOI: 10.1177/1087054715595697
- Nylander E, Sparding T, Floros O, Rydén E, Åsberg Johnels J, Waern M. The quantified behavioural test plus (QbTest+) in adult ADHD. Nordic Psychology, 2023. DOI: 10.1080/19012276.2022.2036628
- Ulberstad F, Boström H, Chavanon ML, Billstedt E, Gillberg C, Melchior P. Objective measurement of attention deficit hyperactivity disorder symptoms outside the clinic using the QbCheck: Reliability and validity. International Journal of Methods in Psychiatric Research, 29(3), 2020. DOI: 10.1002/mpr.1822
- Markus N. pico.js — a face-detection library in 200 lines of JavaScript. https://github.com/nenadmarkus/picojs

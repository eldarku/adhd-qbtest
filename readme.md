---
permalink: /index.html
---

# ADHD QBTest Clone

> **⚠️ WARNING: This is NOT a medical tool.**
>
> This project was built for educational and entertainment purposes only. It is **not** a validated diagnostic instrument and must **not** be used for clinical decision-making or self-diagnosis.
>
> **Practicing with this tool can compromise your real QBTest/QbCheck results.** The official QBTest relies on the task being unfamiliar — repeated exposure to the test format creates a learning effect that may invalidate your scores when you take the actual clinical assessment. If you have an upcoming QBTest evaluation, **do not use this tool**.
>
> If you suspect you have ADHD, please consult a qualified healthcare professional.

A browser-based clone of the QBTest — a Continuous Performance Test (CPT) used in ADHD assessment. It simultaneously measures **attention**, **impulsivity**, and **motor activity** in a single session using only a webcam and keyboard/mouse.

**Live demo:** [https://eldarku.github.io/adhd-qbtest/](https://eldarku.github.io/adhd-qbtest/)

## How It Works

### The Test (Continuous Performance Task)

Four shapes are shown one at a time in random order: red rectangle, blue rectangle, red circle, blue circle. The participant must respond (click or press spacebar) whenever the **same shape appears twice in a row**. Each stimulus appears for 300–600 ms with a 1–3 second interval between stimuli. The default test duration is 20 minutes.

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

## Tech Stack

- Single HTML file — no build step, no backend
- **pico.js** — real-time face detection (cascade classifier)
- **camvas.js** — webcam-to-canvas helper
- **Plotly.js** — reaction time scatter plot
- **Canvas 2D API** — movement visualizations, stimulus display, distance plot

## Usage

1. Open the page and allow webcam access
2. Set test duration (default: 20 minutes)
3. Click **Start**
4. Respond (click or spacebar) when the same shape appears twice in a row
5. Results appear automatically when the test ends
6. Click **Export Results** to download raw data

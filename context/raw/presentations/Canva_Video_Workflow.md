# Global Leaves → YouTube Video via Canva (Free Tier)

## What You Have
- `Global_Leaves_CrossTab_v4.pptx` — 10 slides with speaker notes
- `Global_Leaves_Narration_Script.txt` — cleaned narration script (~1,543 words, ~10 min)

## Workflow Overview

**Path A (Recommended): Record your own voice**
Canva Free includes "Present and Record" — you narrate live over each slide. This produces the most authentic result for a research presentation and costs nothing.

**Path B: AI voice narration**
Canva Free does NOT include AI voiceover. Options:
- **Canva Pro** ($13/mo, 30-day trial available) has AI narrator built in
- **Free workaround**: Generate audio clips externally (see Step 3B below), then import into Canva as audio tracks per slide

---

## Step 1: Import PPTX into Canva

1. Go to [canva.com](https://canva.com) and sign in (free account)
2. Click **Create a design** → **Presentation (16:9)**
3. On the editor screen, click **File** → **Import** (or just drag-and-drop the .pptx file)
4. Canva converts each slide to an editable Canva page
5. **Review**: click through all 10 pages to confirm formatting survived. Cross-tab grids and custom colors occasionally shift — fix anything that looks off

> **Tip**: If the import mangles the data tables badly, an alternative is to export each slide as an image from PowerPoint (File → Save As → PNG, "All Slides") and import those images as static backgrounds in Canva. You lose editability but gain visual fidelity.

---

## Step 2: Set Slide Durations

Canva defaults to 5 seconds per page. Your narration needs more:

| Slide | Title | Duration |
|-------|-------|----------|
| 1 | Global Leaves (Title) | 1:00 |
| 2 | The Proof-of-Concept | 1:05 |
| 3 | Not Your Usual Comparison | 1:35 |
| 4 | Population Share | 1:05 |
| 5 | Measurement Asymmetry | 1:20 |
| 6 | India | 0:30 |
| 7 | China | 0:30 |
| 8 | USA | 0:30 |
| 9 | Three Stories | 1:30 |
| 10 | Governance Implication | 1:30 |

**How to set**: Click the timing indicator below each slide in the filmstrip. Type the duration. Or — if using Present and Record (Path A) — the timing is set automatically by how long you spend on each slide.

---

## Step 3A: Record Your Own Narration (Recommended)

1. Click **Present** (top-right) → **Present and Record**
2. Canva opens a recording studio view with your webcam (optional) and microphone
3. Open `Global_Leaves_Narration_Script.txt` in a separate window as your teleprompter
4. Click **Start Recording**
5. Advance slides manually as you speak — Canva captures the timing automatically
6. Click **End Recording** when done
7. Canva produces a video with your narration synced to slides

**Tips for recording**:
- Use a headset mic if available (reduces echo)
- Speak slightly slower than conversational pace
- Pause 1–2 seconds between slides for natural transitions
- You can re-record individual slides without redoing the whole thing

---

## Step 3B: Free AI Voice Alternative (if you don't want to record)

Generate audio clips externally, then import:

### Option 1: Microsoft Edge Read Aloud (completely free, no signup)
1. Open `Global_Leaves_Narration_Script.txt` in Microsoft Edge browser
2. Press **Ctrl+Shift+U** or right-click → **Read Aloud**
3. Choose a natural voice (e.g., "Guy" or "Jenny" — the Neural voices sound good)
4. Use **OBS Studio** or **Audacity** (both free) to capture the system audio
5. Split the recording into per-slide clips using Audacity
6. Import each clip into the corresponding Canva slide (drag audio file onto the slide)

### Option 2: ElevenLabs Free Tier
1. Go to [elevenlabs.io](https://elevenlabs.io) — free tier gives 10,000 characters/month
2. Your script is ~8,500 characters — fits in one month's free quota
3. Paste each slide's narration text, generate, download the MP3
4. Import each MP3 into the corresponding Canva slide

### Option 3: Google NotebookLM (free, experimental)
1. Upload the narration script to [notebooklm.google.com](https://notebooklm.google.com)
2. Ask it to generate an "Audio Overview" — it produces a podcast-style narration
3. Download and import into Canva
4. **Caveat**: NotebookLM tends to editorialize and add conversational filler. Good for a casual explainer, less suitable if you want the script read verbatim.

---

## Step 4: Add Transitions (Optional)

1. Click between any two slides in the filmstrip
2. Click the **+** icon → choose a transition (Dissolve or Match & Move work well for data presentations)
3. Set duration to 0.5s
4. Apply to all slides for consistency

---

## Step 5: Export as MP4

1. Click **Share** (top-right) → **Download**
2. File type: **MP4 Video**
3. Quality: **1080p** (free tier supports this)
4. Click **Download**
5. Canva renders and downloads the video file

---

## Step 6: Upload to YouTube

1. Go to [studio.youtube.com](https://studio.youtube.com)
2. Click **Create** → **Upload Videos**
3. Upload the MP4
4. Suggested metadata:
   - **Title**: Global Leaves: Where Does Humanity Live? — Density × Wealth Cross-Tabulation
   - **Description**: A proof-of-concept cross-tabulating 7,101 administrative units across 237 countries by population density and per-capita economic output. Reveals a 38× measurement asymmetry between rich/sparse and poor/dense regions.
   - **Tags**: development data, subnational, population density, wealth inequality, administrative data, governance, OconEco
   - **Category**: Education or Science & Technology
   - **Visibility**: Unlisted (for selective sharing) or Public

---

## Decision Summary

| Approach | Cost | Quality | Effort |
|----------|------|---------|--------|
| Path A: Your voice via Present & Record | Free | High (authentic) | ~30 min |
| Path B + Edge Read Aloud | Free | Medium (synthetic but decent) | ~1 hour |
| Path B + ElevenLabs Free | Free | High (natural AI voice) | ~45 min |
| Canva Pro AI narrator | $13/mo | High (integrated) | ~15 min |

**My recommendation**: Start with Path A. For a research presentation like Global Leaves, your own voice carries authority that AI narration doesn't. If you're unhappy with the recording, fall back to ElevenLabs — the free tier covers this script in one go.

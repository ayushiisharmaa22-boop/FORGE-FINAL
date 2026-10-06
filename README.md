# FORGE — MSME × University Connector

A lightweight prototype connecting MSMEs with university professors for **Sell / Source, Consultation, and Project Collaboration**.

## Demo
The first version contains a Manipur sample using four district datasets and a faculty directory.

## Add more states
1. Put each state's MSME CSV inside `data/`.
2. In `app.js`, add its filename to the `STATE_FILES` object.
3. Refresh the site. The dashboard will load the new state.

For a production version, move the data to a backend/database and add login, messaging, project requests and approvals.

## Run locally
Open with VS Code Live Server, or run:

```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Deploy on GitHub Pages
Upload this folder to a GitHub repository named `forge`, then enable **Settings → Pages → Deploy from branch → main → / (root)**.

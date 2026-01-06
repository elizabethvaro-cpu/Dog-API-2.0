# Dog Breed Explorer

React web app for exploring random dog breeds (image + name + fun facts), powered by the Dog CEO API.

## Requirements

- Node.js 18+ (recommended)

## Run locally

```bash
npm install
npm run dev
```

Then open the URL printed in your terminal (usually `http://localhost:5173`).

## Notes

- Each click on ◀ / ▶ loads a **new random** breed (matching the PRD).
- Breed names are extracted from the image URL returned by the API.
- Fun facts are mapped from a local data file with a graceful fallback when a breed isn’t in the list.


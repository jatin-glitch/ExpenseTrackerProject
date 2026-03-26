# Expense Tracker Frontend

This is a modern, minimal Expense Tracker frontend built with Next.js (App Router), Tailwind CSS, Framer Motion and Recharts.

Run locally:

```bash
cd frontend
npm install
npm run dev
```

Notes:
- The UI is client-driven and uses a small Zustand store (`store.js`) for demo persistence (local session).
- Use the Add Expense page to create demo data. Charts and tables read from the local store.

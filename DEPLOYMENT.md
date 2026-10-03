# Deploying to Vercel

This project is a Vite SPA plus one serverless function (`api/time.js`).
`vercel.json` already tells Vercel how to build it, so deployment is a
two-step process:

## 1. Log in (one-time)

```bash
npx vercel login
```

Pick a login method (GitHub is easiest since the repo is already on
GitHub), then **finish the flow in your browser** — click the
confirmation link it opens or emails you. The CLI will print
`Success!` once it's actually logged in. If it doesn't, the login
didn't take and `vercel whoami` will say `Logged out`.

## 2. Deploy

```bash
npm run deploy
```

The first run will ask a few setup questions (link to a new or existing
Vercel project, which scope/team, etc.) — accept the defaults unless you
want a specific project name. Every run after that redeploys straight to
production.

## Connecting the GitHub repo instead (optional)

If you'd rather have Vercel auto-deploy on every push instead of running
the CLI by hand:

1. Go to https://vercel.com/new
2. Import `srujanmaddderla/WordClock`
3. Framework preset: Vite (should auto-detect from `vercel.json`)
4. Deploy

After that, every push to `main` redeploys automatically.

## Verifying after deploy

```bash
curl "https://<your-deployment-url>/api/time?tz=Asia/Kolkata"
```

Should return JSON with `phrase`, `time24`, `utcOffset`, etc.

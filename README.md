# Weekly Report Tracker – how to deploy

## Option 1 – Quick (data stays in each browser)

1. Go to https://app.netlify.com/drop
2. Drag in **index.html** on its own (or this whole folder).
3. Done. Open the link on any device.

With this option your weeks are saved in that browser only. To move data to another
computer, use **Settings & data → Download backup** and then **Load backup** on the other one.

## Option 2 – Cloud sync (same data on every device)

This uses the small function in `netlify/functions/reports.mjs`, which saves your data in Netlify Blobs.
Drag-and-drop on Netlify Drop doesn't build functions, so deploy with Git or the Netlify CLI.

**With the Netlify CLI:**

```
cd weekly-report-tracker
npm install
npx netlify-cli login
npx netlify-cli init        # create a new site
npx netlify-cli env:set SYNC_KEY "pick-a-long-passcode"
npx netlify-cli deploy --prod
```

**With GitHub:** push this folder to a repo, then in Netlify pick *Add new site → Import from Git*.
Then go to *Site configuration → Environment variables* and add `SYNC_KEY` with a passcode you choose,
and redeploy.

Then open the site, go to **Settings & data → Cloud sync**, type the same passcode and press **Connect**.
Do this once on each device. The top-right corner shows "☁ Synced" when it's working.

The function also keeps one backup copy per day in the same Blobs store.

## Weekly use

1. **Upload** → drop in the new weekly report PDF → check the numbers → **Save week**.
2. **Dashboard** → switch between Weekly / Monthly and pick a date range.
3. **Email report** → pick the week → **Copy email** (paste into Outlook/Gmail)
   or **Download for Outlook (.eml)** to open a ready draft with the chart.

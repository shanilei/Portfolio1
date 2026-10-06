# shanileibner.com

Static site. No build step.

## Deploy to Vercel
1. Push this folder to a new GitHub repo.
2. vercel.com → Add New → Project → import the repo → Deploy (framework: Other).
3. Settings → Domains → add your domain.

Local preview: `python3 -m http.server` in this folder, then open http://localhost:8000

## Adding screens
Put images in `assets/img/<project>/`. Replace each `<div class="ph">…</div>` with:
`<img src="/assets/img/checkout/card.png" alt="What the screen shows" width="1600" height="1000">`
Keep the `<figcaption>` — every screen says which decision it shows.

## Open items (search the code for TODO)
- Checkout: Reflection; confirm role wording with the PM; decide on "Shipped to 500K+".
- Dream Journal: final name; how explicit to be about trauma; Reflection; screens from Figma.
- Hotjar: confirm the four "Change" lines with the team; your specific part; prototype URL.
- Tiny Cart: confirm role; final screens (Figma link); Reflection.
- Home: headshot, real email + LinkedIn, og:image (1200×630).

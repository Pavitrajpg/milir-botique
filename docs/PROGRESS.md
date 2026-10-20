# Progress log

## 2026-10-18 — Session 1
Done
- Audited uploads (see AUDIT.md).
- Hero: extracted 60 frames (6 per second) from the 10 s film at 1280 px wide (WebP), plus a poster frame. `app.js` `initHero()` maps cursor X across the hero to a frame position, eases toward it, cross-fades adjacent frames, returns to the first frame when the pointer leaves, and plays a slow idle loop on touch devices. Reduced-motion users get the still poster only.
- The film is zoomed 1.2x and anchored to the top so the generator's corner mark falls outside the frame.
- Optimised 23 of the 43 images to WebP (max 1400 px). Wired into 8 sample products (5 boutique, 3 rental), beauty photo strip, gallery, rental band.
- Storage keys bumped to `milir_products_v2` / `milir_jewellery_v2` so old demo data in a browser cannot show broken images.

Tested
- Rendered at 1440 and 390 px: no horizontal overflow, no console errors, no failed requests; cursor scrub verified by screenshot (pose changes between left and right).

Not done / known limits
- The film is a performance, not gaze tracking: cursor position selects a moment in the clip.
- Nothing from the master prompt's backend is built (database, payments, loyalty ledger, inventory, POS, rental calendar, booking, CRM, marketing, dashboard). Products and prices are still sample data.
- 20 of the 43 images are unused. Kitten image deliberately excluded.

Next
1. Owner decisions listed in AUDIT.md.
2. Phase 1: Next.js + Supabase scaffold, schema, RLS, diagrams.
3. Phase 2: central inventory (products, variants, locations, movements, suppliers, receiving, transfers, counts) with tests.

## 2026-10-18 — Session 1, later: real brand content
Source: seven screenshots of Milir's Instagram posts supplied by the owner.
- Header and footer now use the real Milir Boutique logo (cropped from a post; replace with the original logo file for sharper results).
- Boutique grid replaced with the six real collection posters (Earthy Elegance, Olive Bloom, Timeless Tradition, Indigo Elegance, Timeless Grace, Pastel Grace), cropped to remove Instagram UI. Prices shown as "Price on enquiry" because no per-item prices were visible. Only price seen: "Mulchanderi Kurti set, Price 1600", in a caption not shown with its poster.
- Bridal section added from the "Book Your Big Day" poster: HD, Glass Skinfinish and Airbrush makeup packages, premium jewels offer.
- Contact section now lists both locations and numbers: Boutique 80980 98143 (Koodal Nagar); Beauty Lounge 80980 91299 (Ground floor, Madurai City Centre, 137/93 Kamaraiar Salai). Instagram handles added.
To confirm with owner: Beauty Lounge number and address wording (the poster crops the address); whether the Beauty number accepts WhatsApp; terms of the free-jewels offer; "Vertican slik" on the Pastel Grace poster looks like a typo; opening hours.

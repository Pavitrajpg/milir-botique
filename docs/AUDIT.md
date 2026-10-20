# Milir — project audit (Phase 1)

## What was provided
- `milir-boutique-webapp.zip`: static prototype (index.html, styles.css, app.js, 3 collage images, README). ~46 KB of source, no framework, no build step, no backend.
- `milir-individual-images.zip`: 43 individual images (38 AI-generated concepts, 5 Unsplash stock photos) plus README.
- `Animate_bridal_fashion_film_1080p`: 10 s, 1920x1080, 24 fps H.264 clip of a bride in a maroon silk saree.
- `Milir_Claude_Master_Build_Prompt.txt`: the full platform specification (boutique commerce, loyalty, inventory, POS, rental, Beauty Lounge, CRM, marketing, reporting).

## What exists and works
Responsive single-page site: home, filterable catalogue, product modal, bag, rental jewellery grid, Beauty Lounge services, gallery, enquiry form that opens a WhatsApp draft, contact. Local "admin preview" that edits demo products in the browser.

## What is incomplete or unsafe for production
- No server, database, authentication, payments, orders, inventory, booking calendar or invoices. All data lives in `localStorage`.
- Admin preview is not secure and must never be exposed publicly.
- Prices, stock and products are illustrative. The README says so; the site labels them "mockup".
- Imagery is generated or stock. Needs replacing with real product and salon photography.
- Contact details (80980 98143, Koodal Nagar), hours and service list are unverified.
- Image set includes a kitten (not used) and "Training Academy" scenes (not used; the master prompt does not list a training business).

## What can be reused
Brand palette (cream, burgundy, gold, olive, indigo), layout, copy tone, WhatsApp handoff, filter and cart interaction patterns, all 43 images after optimisation.

## What must be protected
Original zips are untouched. All work happens in a separate copy.

## Recommended architecture
Follow the master prompt: Next.js + TypeScript, PostgreSQL on Supabase (Auth, RLS, Storage), server-side business rules, Razorpay in test mode first. Central inventory is the single source of truth for storefront, POS, rental and salon consumables. Keep integrations modular.

## First implementation phase
Done in this pass: prototype upgraded with the interactive film hero and real imagery.
Next (Phase 1 proper): repo + Next.js scaffold, design tokens from this prototype, Supabase project, schema and migrations for profiles/roles, products/variants, locations, stock balances, stock movements; RLS; ER and architecture diagrams.

## Decisions needed from the owner
Domain and Beauty subdomain name; Supabase account; Razorpay merchant status; GST registration and product tax classes; loyalty redemption value (earning rule is fixed at 1 point per Rs 100); real product list with SKUs, costs and stock counts.

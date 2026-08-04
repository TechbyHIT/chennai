# Keyword Strategy (No Doorway Pages)

The long keyword list (price, cheap, best, installer, for balcony, etc.) is stored as **intent clusters**, not as thousands of thin URLs.

## What we create

For each real service:

- `/services/[service]/`
- `/[city]/[service]/`
- `/[city]/[area]/[service]/` (priority areas first)
- related `/solutions/[problem]/`
- guides such as `/pricing-guide/`

## What we do not create

One page for every modifier like:

- `invisible grills cheap in Adyar`
- `invisible grill best company in Porur`
- `balcony net for pets for cats for dogs in RS Puram`

Those become doorway/thin pages and are blocked by design.

## New service lines added from your keyword themes

- Safety Nets
- Kids Safety Nets
- Pet Safety Nets
- Bird Spikes
- Cloth Hangers
- Sports Nets

## Files

- `src/data/keyword-clusters.ts`
- `src/data/additional-services.ts`
- `scripts/keyword-coverage.ts`

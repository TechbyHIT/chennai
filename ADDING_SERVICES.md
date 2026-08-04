# Adding Services

1. Add a service object to `src/data/initial-services.ts`.
2. Set `publicationStatus`, `allowIndexing`, `contentReviewed`, `qualityScore`.
3. Fill unique introduction, problems, benefits, materials, FAQs and related IDs.
4. Run `npm run pages:count` and `npm run seo:audit`.
5. Confirm routes:
   - `/services/[slug]/`
   - `/[city]/[slug]/`
   - `/[city]/[area]/[slug]/`

# Publishing Workflow

```txt
Draft
→ Automated validation
→ Content audit
→ Local-data verification
→ Duplicate-content audit
→ SEO audit
→ Human review
→ Approved
→ Published
→ Sitemap inclusion
→ Performance monitoring
→ Content review
```

## Commands

```bash
npm run pages:create -- --type=service-location --limit=1000
npm run pages:audit -- --status=review --limit=1000
npm run pages:publish -- --batch-size=100
npm run pages:noindex -- --quality-below=80
npm run pages:count
```

Never publish all possible combinations in one step.

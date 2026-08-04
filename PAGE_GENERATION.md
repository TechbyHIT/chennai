# Page Generation

Page records are generated automatically from published entities:

- Service pages
- Location pages
- Area pages
- Service × city pages
- Service × area pages
- Solution pages
- Property-type × service pages
- Guide and blog pages

Generator: `src/lib/pages/create-page-record.ts`  
Registry: `src/lib/pages/page-registry.ts`

Dynamic App Router pages resolve records with `getPageByPath()` and render `ProgrammaticPage`.

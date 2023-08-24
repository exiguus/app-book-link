# book_link App

Search a Book by ISBN or Title and Author.
And retrieve the book cover and description.
Share the book with your friends.

Try it: https://book-link.vercel.app/

## Use Cases

- [x] Search a book by ISBN
- [x] Copy the results to the clipboard
- [x] Share a book with your friends via Link
- [x] Share a book with your friends via System-level share target picker
- [ ] Search a book by Title and Author

## Motivation

- Digitialize and share my bookshelf
- Take a closer look at Nuxt 3 and Vue 3 Composition API and Vue + TypeScript
- Deploy, Develop and Run Vercel Serverless Functions

---

## Monorepo

```text
/
| apps/
|     | nuxt/
|     | ...
| packages/
|         | dev-utils/
|         | serverless/
|         | utils/
|         | ...
```

### apps/

#### Book Search App

Scan a book barcode and search for it on the web.
Or search for a book by title, author or ISBN.

### packages/

use tsc commonjs and esm builds

---

## Headless

### Frontend

Nuxt as static site generator is a tool that generates a full static HTML website based on raw data and a set of templates.

- [x] Static Site Generation
- [x] Server Side Rendering
- [x] Client Side Rendering
- [x] Incremental Static Regeneration
- [x] Pre-rendering
- [x] Code Splitting
- [x] Data Fetching
- [x] Routing
- [x] Preview Mode

Solution: <https://nuxt.com/>

### Backend

Serverless is a cloud computing execution model where the cloud provider dynamically manages the allocation and provisioning of servers.

- [ ] Serverless Functions

### Developnment and Infrastructure

In this Monorepo, multiple projects and components are stored in a single repository, allowing shared code and dependencies to be centralized and versioned.

- [x] Development and Design Workflow
- [x] Continuous Integration
- [x] Continuous Deployment
- [x] Development Environments
- [x] Preview Environments
- [x] Production Environments
- [x] Linting
- [x] Formatting
- [x] Testing
- [x] Dependency Management
- [x] Versioning
- [x] Documentation
- [x] Performance Optimization
- [x] Security
- [x] Accessibility
- [ ] Monitoring
- [ ] Analytics
- [ ] Error Tracking

Solution: <https://pnpm.io/>, <https://turbo.build>, <https://vercel.com/> and https://github.com/

### Testing

Testing involves various methods and techniques to assess the quality and functionality of the software application.

- [x] Unit Testing
- [x] Integration Testing
- [ ] System Testing
- [ ] Performance Testing
- [x] Accessibility Testing
- [x] Security Testing

Solutions: <https://jestjs.io/>, <https://testing-library.com/>, <https://playwright.dev/> and <https://github.com/>

## Documentation

- [PACKAGES.md](packages/PACKAGES.md)
- [DEVELOPMENT.md](DEVELOPMENT.md)
- [TODO.md](TODO.md)

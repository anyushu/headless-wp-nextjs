## Getting Started

First, run the development server:

```bash
# Install dependencies
yarn install

# Enable husky
yarn prepare

# Start dev server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Installed Packages

- [Next.js](https://nextjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Typescript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [husky](https://typicode.github.io/husky/#/)
- [lint-staged](https://github.com/okonet/lint-staged#readme)
- [PostCSS](https://postcss.org/)
- [Prettier](https://prettier.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next SEO](https://github.com/garmeeh/next-seo#readme)
- [Next SiteMap](https://github.com/iamvishnusankar/next-sitemap)

## Project Structure

```md
app
├─ .husky
├─ .vscode
├─ public
├─ src
│  ├─ components
│  │  ├─ atoms
│  │  ├─ molecules
│  │  ├─ organisms
│  │  └─ templates
│  ├─ context
│  ├─ lib
│  ├─ models
│  ├─ pages
│  ├─ styles
│  └─ util
├─ .babelrc
├─ .env.example
├─ .eslintrc.json
├─ .node-version
├─ .prettierrc.json
├─ lint-staged.config.js
├─ next-env.d.ts
├─ next.config.js
├─ postcss.config.js
├─ tailwind.config.js
├─ tsconfig.json
└─ yarn.lock
```

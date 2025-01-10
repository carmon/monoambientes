Monoambientes "Orlando" contact links page
==========================================

Static page build from TypeScript and deployed over vercel.

### APP has 3 stages

#### 0_PRELOAD

This is basically *vanilla typescript*, it uses __fs__ to read a `settings.json` file for variables and a local `index.html` and writes a target `index.html` into `/public` folder.
Also uses __dotenv__ to write *private* needed variables to make the links work. TypeScript is run through __ts-node__.

#### 1_INCLUDES

JS utilities that area going to be consumed from `pu_blic/index.html`, and line on `public/js`, mainly TypeScript -> JavaScript code.

#### 2_BACKEND

Uses [HTMX]('http://htmx.org') and [Vercel]('http://vercel.com') API routes on the end.

### How to run

__Requirements:__ 
- node modules: `npm i`
- vercel cli: `npm i -g vercel`

__BUILD__
- `npm run generate-html`

__RUN__
- `vercel dev`
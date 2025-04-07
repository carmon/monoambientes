Monoambientes "Orlando" page
============================

Static page build from TypeScript and deployed over vercel.

### The app has 2 sides

#### Preload

This is basically *vanilla typescript* -check `build-index.ts`- that loads a `base.html` and inserts HTML code inside a _<root>_ and 
saves it in `public/index.html` so vercel can pick it up.

#### Backend

Uses [HTMX]('http://htmx.org') and [Vercel]('http://vercel.com') API routes on the end.

### How to run

__Requirements:__ 
- node modules: `npm i`
- vercel cli: `npm i -g vercel`

__BUILD__
- `npm run build`

__RUN__
- `vercel dev`

##### Known issues

- [MODULE_TYPELESS_PACKAGE_JSON] error: node is currently unable to run --input-type=module on a single file, renaming it to a *.mjs will make TypeScript useless and adding "type": "module" to package.json will break vercel build.


##### TODO
- Make dropdown disabled when no daily or monthly room options available. 

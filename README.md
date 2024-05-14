Monoambientes "Orlando" contact links page
==========================================

Static page build from TypeScript and deployed over vercel.
Loosely based on a [Glitch](https://glitch.com/) links page project.

# How does it work?

This is basically *vanilla typescript*, it uses __fs__ to read a `settings.json` file for variables and a local `index.html` and writes a target `index.html` into `/public` folder.
Also uses __dotenv__ to write *private* needed variables to make the links work. TypeScript is run through __ts-node__.

Production URL is [shipped to Vercel](https://monoambientes.carmon.dev), but locally you can just `npm run dev` to mount `/public` to an http server.
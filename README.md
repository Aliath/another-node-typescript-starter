# another-node-typescript-starter

Tired of constantly searching for a template to bootstrap your project in node.js? Are the suggested solutions too heavy, not working or just outdated? Let's face it - this template will probably age quickly too. However, if you would like to use it, let me explain why you should choose this one.

## Why to use it?

As you can guess `another-node-typescript-boilerplate` is another boilerplate that you can use to start with new project.

What distinguishes this framework? Inspired by the automatic definition of views in libraries such as `nuxt` and` next` - controllers are imported automatically (so far only at the lowest level, without subdirectories), and their path is based on the name of the file they point to - for example the controller exported in the path `@/api/controllers/getRandomNumber` will be registered to`${HOST}/api/v1/get-random-number`. You no longer have to get lost in huge files containing controller imports, or look for what path they refer to. In addition, the template itself is not imposed, except for the layout of the controllers, you can freely create directories and place files tailored to your needs.

Relative imports were another problem that was a barrier that prevented me from using ready-made solutions. According to the documentation of ready-made starters, in deep directories we should be stuck in a hell of paths that looks something like this: `import * from '../../../../api/...'`. To avoid this, the recommended solution is to include the library in the main script. Here I solved it at the typescript configuration level - I used [ttypescript](https://github.com/cevek/ttypescript) to make it as painless as possible, so starting the path with `@` - you are referring to the `src` directory. Sounds simple?

## package.json scripts

```bash
yarn dev       # start server with nodemon listening (development purposes)
yarn build     # create build from source
yarn start     # start server from built source in /dist
yarn test      # run tests (so far only unit)
yarn test:unit # run unit tests only
yarn lint      # run linter
yarn lint:fix  # run linter fix
```

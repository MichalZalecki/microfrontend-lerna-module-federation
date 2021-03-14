# microfrontend-lerna-module-federation

Micro frontend monorepo setup with Lerna and Module Federation.

## Usage

#### Setup

With workspaces don't have to call `lerna bootstrap`

    yarn install

You can also use npm workspaces

    npm install --global npm     # installs npm v7 (npm@6 to downgrade)
    npm install

#### Develop

    yarn develop

or (with previews)

    WITH_PREVIEWS=1 yarn develop

#### Single remote production build

    yarn clean
    yarn single:build
    yarn single:start

#### Multiple remotes production build

    yarn clean
    yarn multi:build
    yarn multi:start

### Docker

Build image with yarn

    docker build . -t mlmf -f yarn.Dockerfile

Build image with npm (requires creating `package-lock.json`)

    npm install
    docker build . -t mlmf -f npm.Dockerfile

Run ([localhost:8080](http://localhost:8080))

    docker run --rm -it -p 8080:80 --name mlmf mlmf

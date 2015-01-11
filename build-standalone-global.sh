#!/usr/bin/env sh
./node_modules/.bin/browserify-standalone
mkdir -p dist/build
mv element-calcum-style.js dist/build/

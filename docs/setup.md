# app setup

Theoretically speaking, our app should work off heroku with no setup required.

The current version is the heroku deployment patch, meaning we modified server.ts to not use localhost. If you were to use localhost, the necessary setup steps would be as follows:

* clone the git repository into a new folder
* $ npm init -y
* $ npm install typescript
* $ npm install
* $ ts-node server.ts
* go to localhost:8080
* There's the app! Tadaaa!
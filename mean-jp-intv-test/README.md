# JPAuthTest

## Getting Started

### Updating .env file

```
export MONGO_URL=[mongo db path]
export PASSPORT_SECRET=[some random strings]
export AUTHY_API_KEY=[authy api key]
```

### Run

```
npm i
npm start
```

## Task

> "You can choose any of Python, PHP, Javascript, Node JS or Angular for tech stack and you can choose to automate it as well."

* Create a simple sign-up form and add validation
  * Validate and sanitise inputs
  * Use any secure password hashing
  * Create user table to store user credentials
* Create user sign-in form and add validation
  * Validate and sanitise inputs
  * Match password using the secure hash
* Add Two-factor Authentication to the sign-in using Authy (https://www.twilio.com/authy)
  * Authentication via SoftToken from Authy App
  * Authentication using Authy OneTouch


## Development approach

As given criteria of technology stack; I chosed `node.js/ MongoDB`.

> But, alternatively I also was considering to go with GraphQL API for backend and React.js for view layer. Considering simple functionlity of the app, I was finally dicided to go with node.js/MongoDB stack.

There is three pages/routes: `/`, `sign-in`, `user`. 'Sign Up' form shows in the home page.

I have used here; 
* `express` for handling routing/http request and `ejs` as templating engine. 
* `express-validator` for validate form inputs
* `passport.js` as helper library for user authentication
* `bcrypt-nodejs` for password hashing
* `mongoose` as MongoDB ODM.
* `authy` for Authy API handling (2FA)
* `gulp` for transpile less files into css
* `nodemon` to watch the development changes automate the app running process

All the API Credentials & configurations pass into app as environment variables through the `.env` file.

#### package.json

```
 "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-less": "^3.3.0"
  },
  "dependencies": {
    "authy": "^1.2.0",
    "bcrypt-nodejs": "latest",
    "body-parser": "~1.0.0",
    "bootstrap": "^3.3.7",
    "connect-flash": "~0.1.1",
    "cookie-parser": "~1.0.0",
    "ejs": "~0.8.5",
    "express": "~4.0.0",
    "express-session": "~1.0.0",
    "express-validator": "^3.0.0",
    "gravatar": "^1.6.0",
    "method-override": "~1.0.0",
    "mongoose": "^4.4.20",
    "morgan": "~1.0.0",
    "passport": "~0.1.17",
    "passport-facebook": "~1.0.2",
    "passport-google-oauth": "~0.1.5",
    "passport-local": "~0.1.6",
    "passport-twitter": "~1.0.2"
  }
  ```


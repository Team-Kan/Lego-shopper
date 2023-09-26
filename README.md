# Lego Shopper aka [reKANstructed](https://rekanstructed.onrender.com/)
reKANstructed is a buy-back LEGO site, allowing users to sell their old LEGO sets and others to purchase and "reconstruct" a previously owned set. Visitors to the site can see all products, filter by collection, purchase products through a standard checkout process, and receive an order confirmation email.

reKANstructed was created using the PERN stack, Javascript, Jest, bcrypt, CSS, Tailwind CSS, JSON Web Token, nodemailer, and render.
The backend of the site is comprised of a PostgreSQL database, passwords encrypted through bcrypt, express routes created through node.js and tested by Jest, and email confirmation setup through nodemailer.
The frontend of the site was constructed through React routes and Javascript, using JSON Web Token to verify user login credentials, and styled by CSS and Tailwind CSS.

## Getting Started 

Install Packages

    npm i
    
Create a .env file to keep track of your SECRETS:

    SALT_ROUNDS
    JWT
    ANTHONY_PASSWORD
    KRISTY_PASSWORD
    NABEEL_PASSWORD
    MODE=development
    STRIPE_KEY
    STRIPE_SECRET_END
    EMAIL
    EMAIL_PASSWORD

To create static CSS for the dist folder:

    npx tailwindcss -i ./static/styles.css -o ./dist/styles.css

## To set up Email Confirmation 
Use a Gmail account and the app password set up by Gmail


## NPM Codes
Running Application

    npm run start:dev

Running Tests

    npm run test

## Deploying Application on Render
Build Application

    npm run build

Create a database and copy the Internal Database URL
Create a web service with Environmental Variables:

    DATABASE_URL
    MODE = production
    NODE_VERSION = 14.18.1

Add a secret file .env to the web service with the values of your .env file.

Use Build Command

    npm i && npm run build && npx tailwindcss -i ./static/styles.css -o ./dist/styles.css
    
Use Start Command

    node server/index.js



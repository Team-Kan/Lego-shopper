# Build App

```shell
  npm install
```

- Create a .env file to keep track of your SECRETS:

```YAML
# Authentication
SALT_ROUNDS=10
JWT=your_jwt_secret_key

# Admin User Passwords
ANTHONY_PASSWORD=admin_password
KRISTY_PASSWORD=admin_password
NABEEL_PASSWORD=admin_password

# Environment
MODE=development

# Email Configuration (Gmail required)
EMAIL=your_gmail_address@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

to set up email conformation
EMAIL

- current setup requires a gmail account

EMAIL_PASSWORD

- needs to be the app password set up by gmail

build the database with

```shell
createdb brick_db
```

or

```shell
psql
```

```sql
-- then use the command
create database brick_db
```

and then with the db built use the command

```shell
npm run start:dev
```

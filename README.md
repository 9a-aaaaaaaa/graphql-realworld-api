# nodejs typescript express

The most convenient combination of nodejs and typescript makes it easy to start a project quickly, reducing project configuration time.

If you don't like Express, you can just replace the app. No other files need to be changed. `app.js`

# use

```bash
gen ..
```

# pm2 or nodemon

Cause O&M tools depend on production environment configuration, logs, etc., the dependency can be set to global dependency. Of course, it can be set to package automatic dependency, but this does not make sense in actual production.

[doc](https://pm2.keymetrics.io/docs/usage/quick-start/)

```
 pm2 list
 pm2 logs
 pm2 restart app_name
 pm2 reload app_name
 pm2 stop app_name
 pm2 delete app_name
```

```bash
npm install pm2@latest -g
yarn global add pm2
```

More convenient to view logs and app running status.

# dotenv

The dotenv package is used to read environment variables from the .env file. Create it in the root of your Node.js app, then create the environment variable for PORT=8000.

# concurrently

Run multiple commands concurrently.

```json
"start": "concurrently \"command1 arg\" \"command2 arg\""
```

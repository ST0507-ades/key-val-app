# Key Value App

## Setup

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with the following content:

```
DATABASE_URL='mysql://USERNAME:PASSWORD@HOST/DATABASE?ssl={"rejectUnauthorized":true}'
```

> Replace USERNAME, PASSWORD, HOST, and DATABASE accordingly.

4. Run `npm run init-db` to initialize the table required.
5. Run `npm start` to start the server
6. Go to `localhost:3000` to see the app

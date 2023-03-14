
## Take Home Test Backend Service

This is the take home test backend service that you will connect with your frontend

## Instructions

- Clone the repo on your system

-  Install all dependencies by running ```npm install```

## Database Connection

For database connection, you will have to have mongodb running locally.
Edit `app.module.ts` file by updating `line 16` with your local mongodb connection. 
You can also keep the current connection and this will work for most systems.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The application runs on `localhost:3000`

There are 2 GET endpoints:
- `/` : Home url
- `/users?limit=10&page=2` : All users endpoint with optional query parameters

There is also a websocket endpoint which is `localhost:3000`
The event to listen for is the `users-created` event

You can test this in Postman before you start development. Select the Socket.IO option

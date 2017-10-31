# JSON Server plus JWT auth

This project implements "json-server" package with an basic authentication system based on JWT.

You get information about "JSON-Server" in https://github.com/typicode/json-server

## Specific instructions to use this software

Enter this command to start your API REST server:

```node index```

In this case, JSON server starts on Port 3000 and uses a json file the path: "json-samples/default.json".

Port configuration and JSON file can be configured via args:

```node index --file=./json-samples/series.json --port=3333```

### Auth system routes

* **Login**: /login
* **Sign-in**: /sign-in
* **Verify user**: /verify (This route only tests the authenticity of a token)

Send to /login and /sign-in routes a POST request with user object in body, like this:

```{email: "user@example.com", password: "1234"}```

Send to "/verify" route the auth token in the HTTP headers.

```
{
  "Content-Type': "application/json",
  "token": "Put_here_the_token"
}
```

Users are stored in memory. So, all users are deleted in server restarts. When the application starts, one user is setup for direct use. 

email: user@example.com
password: 1234

You can edit the file index.js to configure this user with other data, or setup another users on application start.

### API Authenticated routes vs API Public routes

* All GET routes of the REST API produced by JSON Server are public routes.
* Other HTTP methods (POST, PUT, DELETE...) are behind authenticated routes

Like "/verify" route, send to authenticated API routes the token in the headers:

```
{
  "Content-Type': "application/json",
  "token": "Put_here_the_token"
}
```
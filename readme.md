  

## Express Server

  

  

To run your Express server, follow these steps:

  

  

1.  **Install Dependencies**: Before running the server, make sure you have Node.js and npm installed on your machine. Then, navigate to the project directory in your terminal and run the following command to install the necessary dependencies:

  

  

```bash

  

npm  install

  

```

  

  

2.  **Start the Server**: To start your Express server, run the following command:

  

  

```bash

  

npm  start

  

```

  

  

This will start the server, and you should see a message like "Express started. Listening on [port]" in the console, indicating that the server is running.

  

  

3.  **Access the API**: You can access the following API endpoints:

  

  

-  **POST /profile**: Create a new user profile.

  

-  **GET /profile/:id**: Get a user profile by ID.

  

-  **POST /profile/comment**: Create a new comment on a user profile.

  

-  **GET /profile/:id/comments**: Get comments for a user profile by ID.

  

-  **GET /**: Access the homepage, which may display a random user profile.

  

  

## Jest Tests

  

  

To run Jest tests for your Express server, follow these steps:

  

  

1.  **Run Tests**: Run the Jest tests using the following command:

  

  

```bash
npm  test
```

  

  

This will execute your test suite, and you should see the test results in the console.

  

  

## API Calls

  

  

Here are the available API calls in your code:

  

  

1.  **POST /profile**:

  

  

- Create a new user profile.

  

- Request Payload: `{ "name": "User Name" }`

  

- Response (Success):

  

```
Status: 201 Created
{
"success": true,
"message": "Profile created successfully.",
"data": { "profile data" }
}
```

  

  

2.  **GET /profile/:id**:

  

  

- Get a user profile by ID.

  

- Replace `:id` with the actual profile ID.

  

- Response (Success):

  

```
Status: 200 OK
Renders profile data if the profile is in db
else 
renders a 404 ejs page
```

  

  

3.  **POST /profile/comment**:

  

  

- Create a new comment on a user profile.

  

- Request Payload: `{ "title": "Comment Title", "profileId":"<profile_id>", "commentedBy": "<profile_id>", "description": "Comment Description", "personalityVote": "mbti" }`

  

- Response (Success):

  

```
Status: 201 Created
{
"success": true,
"message": "Profile created successfully.",
"data": { "comment data" }
}
```

  

  

4.  **GET /profile/:id/comments**:

  

  

- Get comments for a user profile by ID.

  

- Replace `:id` with the actual profile ID.

- By default it sorts by `likes` in `descending` order

- By default `all` filter is applied

- If you want to change the default `sort` and `filter` you can replace the values as below:

```

localhost:3000/profile/:id/comments?filter=zodiac&sortBy=likes&sortOrder=ascending

```

  

- Response (Success):

  

```
Status: 200 OK
{
"success": true,
"data": [{ "comment data" }, { "comment data" }, ...]
}
```

  

  

5.  **GET /**:

  

  

- Access the homepage, which may display a random user profile.

  

- Response (Success):

  

```
Status: 200 OK

Renders homepage with a random (latest) profile if found in db
else
it renders a 404 page
```
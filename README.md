# Project Documentation

## Description

This API project enables two-way conversations with private rooms where clients and operators can communicate securely.

## Project Setup

### Starting the Service using Docker

1. **Prerequisites**

- Install the latest version of [Docker](https://www.docker.com/).
- Ensure that no services are running on ports `5432` (Postgres) and `3005` (API service) as the project will occupy these ports.

2. **Navigate to the Project Directory and ensure docker is running**

   Open your terminal and navigate to the root folder of the project:

   ```bash
   cd path-to/nestjs-project
   ```

   Check if docker is running on the machine.

3. **Run Docker Containers**
   to start the services with Docker, run the following command:

   ```bash
    docker-compose up
   ```

   This will:

- Spin up a Docker container for Postgres.
- Start the API service.
- Automatically apply migrations to set up the database schema and populate initial data. There are 5 pre existing users, 2 admins and 3 normal users and the rooms 'tehnika', 'pogovor', 'storitev'.

### Running the Service Without Docker

If you prefer to run the services locally without Docker, ensure the following:

- A Postgres instance is running on `localhost:5432`.

- The database user and schema are correctly set up with the following credentials:

  - Username: `postgres`
  - Password: `password`
  - Database Schema: `postgres`

Once the database is set up, you can start the service locally by running:

```bash
npm run start
```

This will compile and launch the project on your machine and initialize the database as in the above example.

## API Endpoints

The project exposes several endpoints, there is a Postman Colection, that will make the proces of understanding the service easier.

### Postman Collection

To make it easier to explore the API, you can import the Postman collection for the available endpoints. This collection contains all the request examples, pre-configured with the correct URLs, request bodies, and headers.

The postman is located inside the project for convenience: [Get Postman Collection](./postman/endpoints-postman.json).

### The endpoints

#### Login

- **Endpoint**: `POST /login`
- **Description**: The endpoint authenticates the user and returns a Bearer token, that is to be used in all other calls.
- **Bearer**: Not required.
- **Request Body Example**:
  The request requires a username and password.
  ```json
  {
    "username": "TestAdmin1",
    "password": "passw6"
  }
  ```
- **Response Example**:
  ```json
  {
    "access_token": "eyJhbGciOiJI..."
  }
  ```

#### Get all rooms

- **Endpoint**: `GET /getRooms`
- **Description**: The endpoint returnes all the rooms in an array.
- **Bearer**: Not required.
- **Response Example**:
  ```json
  [
    {
      "id": 1,
      "name": "tehnika"
    },
    {
      "id": 3,
      "name": "pogovor"
    },
    {
      "id": 2,
      "name": "storitve"
    }
  ]
  ```

#### New conversation

- **Endpoint**: `POST /createNewConversation`
- **Description**: The endpoint creats a new conversation thread and returnes the conversation entity.
- **Bearer**: Required.
- **Request Body Example**:
  ```json
  {
    "roomId": 1
  }
  ```
- **Response Example**:
  ```json
  {
    "userId": 4,
    "userName": "TestUser2",
    "room": 1,
    "status": 0,
    "workerId": null,
    "id": 4
  }
  ```

#### Get existing conversation

- **Endpoint**: `GET /continueConversation`
- **Description**: The endpoint returns all the assigned conversations to the user/operator.
- **Bearer**: Required.
- **Response Example**:
  ```json
  [
    {
      "id": 6,
      "userId": 4,
      "userName": "TestUser2",
      "room": 1,
      "workerId": 3,
      "status": 1
    }
  ]
  ```

#### Add message

- **Endpoint**: `POST /addMessage`
- **Description**: The endpoint adds a message to the conversation.
- **Bearer**: Required.
- **Request Body Example**:
  ```json
  {
    "message": "Test message.",
    "conversationId": 6
  }
  ```
- **Response Example**:
  ```json
  {
    "message": "est message.",
    "senderId": 3
  }
  ```

#### Get all messages for conversation

- **Endpoint**: `POST /getAllMessagesFromConversation`
- **Description**: The endpoint returns all messages from the conversation. The only people able to see the conversation is the assigned operator and the user sending the messages.
- **Bearer**: Required.
- **Request Body Example**:
  ```json
  {
    "conversationId": 6
  }
  ```
- **Response Example**:
  ```json
  [
    {
      "message": "Test Message number 1.",
      "senderId": 4
    },
    {
      "message": "Test Message number 2.",
      "senderId": 2
    }
  ]
  ```

#### Take conversation

- **Endpoint**: `POST /takeConversation`
- **Description**: This endpoint is only for the operators and assignes an operator a conversation. After calling it returns the array of conversation data and messages that were written to the conversation.
- **Bearer**: Required.
- **Request Body Example**:
  ```json
  {
    "conversationId": 8
  }
  ```
- **Response Example**:
  ```json
  [
    {
      "roomId": 1,
      "senderId": 1,
      "senderName": "TestAdmin1"
    },
    [
      {
        "message": "Test response from administrator.",
        "senderId": 1
      }
    ]
  ]
  ```

#### Get all messages for conversation

- **Endpoint**: `GET /getAllConversations`
- **Description**: This is a endpoint for the operators, to see all the conversations in the system. The assigned ones have a workerId set and the status set to 1.
- **Bearer**: Required.
- **Response Example**:
  ```json
  [
    {
      "id": 6,
      "userId": 4,
      "userName": "TestUser2",
      "room": 1,
      "workerId": 3,
      "status": 1
    },
    {
      "id": 7,
      "userId": 4,
      "userName": "TestUser3",
      "room": 1,
      "workerId": null,
      "status": 0
    }
  ]
  ```

## Support

For any additional information or questions, feel free to contact me at matejfortuna9@gmail.com.

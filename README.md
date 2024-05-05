# Notes Taking System API

This API allows users to manage a simple "Notes Taking System" where they can create, read, update, and delete notes.

## Setup Instructions

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/luharinos/notes-api.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

The API server should now be running on `http://localhost:3000`.

## API Endpoints

### Retrieve all notes

- **URL**: `/api/notes`
- **Method**: `GET`
- **Parameters**: None
- **Example Request**:

    ```bash
    curl --location 'localhost:3000/api/notes/' \
    --header 'x-api-key: test-api-key'
    ```

- **Example Response**:

    ```JSON
    [
        {
            "id": "de958e21-dba2-41c5-b64c-47d1af6a7917",
            "title": "Travel Checklist",
            "description": "bags, shoes, medicines, clothes",
            "createdAt": "2024-05-05T16:50:30.080Z",
            "updatedAt": "2024-05-05T16:51:29.163Z"
        },
        {
            "id": "c760df25-0d9f-4edd-b37a-7c0713ce979a",
            "title": "Market Total",
            "description": "veg - 180, fruits - 450",
            "createdAt": "2024-05-05T16:57:22.572Z",
            "updatedAt": "2024-05-05T16:57:22.572Z"
        }
    ]
    ```

### Retrieve a specific note by ID

- **URL**: /api/notes/:id
- **Method**: GET
- **Parameters**: id (Note ID)
- **Example Request**:

    ```bash
    curl --location 'localhost:3000/api/notes/841d99e7-3d83-4594-85b1-f0bb233bd5d9' \
    --header 'x-api-key: test-api-key'
    ```

- **Example Response**:

    ```JSON
    {
        "id": "841d99e7-3d83-4594-85b1-f0bb233bd5d9",
        "title": "Test Title",
        "description": "test description 0",
        "createdAt": "2024-05-05T15:45:04.357Z",
        "updatedAt": "2024-05-05T15:45:04.357Z"
    }
    ```

### Create a new note

- **URL**: /api/notes
- **Method**: POST
- **Parameters**:
  - title (String): Title of the note
  - description (String): Description of the note
- **Example Request**:

    ```bash
    curl --location 'localhost:3000/api/notes' \
    --header 'Content-Type: application/json' \
    --header 'x-api-key: test-api-key' \
    --data '{
        "title": "Travel Checklist",
        "description": "bags, shoes, medicines"
    }'
    ```

    Example Response:

    ```JSON
    {
        "id": "de958e21-dba2-41c5-b64c-47d1af6a7917",
        "title": "Travel Checklist",
        "description": "bags, shoes, medicines",
        "createdAt": "2024-05-05T16:50:30.080Z",
        "updatedAt": "2024-05-05T16:50:30.080Z"
    }
    ```

### Update a specific note by ID

- **URL**: /api/notes/:id
- **Method**: PUT
- **Parameters**: id (Note ID)
- **Example Request**:

    ```bash
    curl --location --request PUT 'localhost:3000/api/notes/de958e21-dba2-41c5-b64c-47d1af6a7917' \
    --header 'Content-Type: application/json' \
    --header 'x-api-key: test-api-key' \
    --data '{
        "title": "Travel Checklist",
        "description": "bags, shoes, medicines, clothes"
    }'
    ```

- **Example Response**:

    ```JSON
    {
        "id": "de958e21-dba2-41c5-b64c-47d1af6a7917",
        "title": "Travel Checklist",
        "description": "bags, shoes, medicines, clothes",
        "createdAt": "2024-05-05T16:50:30.080Z",
        "updatedAt": "2024-05-05T16:51:29.163Z"
    }
    ```

### Delete a specific note by ID

- **URL**: /api/notes/:id
- **Method**: DELETE
- **Parameters**: id (Note ID)
- **Example Request**:

    ```bash
    curl --location --request DELETE 'localhost:3000/api/notes/841d99e7-3d83-4594-85b1-f0bb233bd5d9' \
    --header 'x-api-key: test-api-key'
    ```

- **Example Response**: `Status 204 (No Content)`

> The above curl request commands can be executed in the [Postman Tool](https://www.postman.com/downloads/) by importing [the collection](/Notes%20API.postman_collection.json).

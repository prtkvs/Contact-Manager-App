## API Routes

### User Routes

- **POST /api/users/register**  
  Registers a new user.

- **POST /api/users/login**  
  Logs in a user and returns a JWT token.

- **GET /api/users/current**  
  Retrieves the current logged-in user's profile.  
  *Requires token*

---

### Contacts Routes (Requires Token)

- **GET /api/contacts**  
  Retrieves a list of all contacts.

- **GET /api/contacts/:id**  
  Retrieves a single contact by ID.

- **POST /api/contacts**  
  Creates a new contact.

- **PUT /api/contacts/:id**  
  Updates an existing contact by ID.

- **DELETE /api/contacts/:id**  
  Deletes a contact by ID.

---

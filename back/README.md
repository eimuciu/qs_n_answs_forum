Use 'npm start' command to start the project

Routes:

**\***USER ROUTES**\***
**public**
POST /user/login
POST /user/register

**\***QUESTION ROUTES**\***
**public**
GET /questions
GET /questions/:id/answers
**private**
POST /questions
POST /questions/:id/answers
DELETE /questions/:id
PUT /questions/:id

**\***ANSWER ROUTES**\***
**private**
DELETE /answers/:id
PUT /answers/:id

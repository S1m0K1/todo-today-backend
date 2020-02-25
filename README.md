# Todo-Today Backend

This is the back end API of a Todo Application, built through the Tech Returners Your Journey Into Tech course, and BBC Step into Tech. 
It is consumed by a front end React application, available here and connects to an RDS Database.

The hosted version of the application is available here: https://github.com/S1m0K1/todo-today-backend.git

### Technology Used

This project uses the following technology:
 - Serverless Framework
 - JavaScript (ES2015+)
 - Express
 - SQL
 - Mysql library
 - AWS Lambda and API Gateway
 - AWS RDS

## Endpoints

The API exposes the following endpoints:

**GET /tasks**

https://a7nqp1d856.execute-api.eu-west-2.amazonaws.com/dev/tasks

Responds with JSON containing all tasks in the Database.

---

**POST /tasks**



Will create a new task when sent a JSON payload in the format:

```
{
  "id": uuidv4(),
  "text": "A brand new todo!",
  "completed": false
}
```

---

**DELETE /tasks/:taskId**

https://a7nqp1d856.execute-api.eu-west-2.amazonaws.com/dev/tasks/{taskId}

Deletes a task with the given ID.

---

**PUT /tasks/:taskId**

https://a7nqp1d856.execute-api.eu-west-2.amazonaws.com/dev/tasks/{taskId}

Will update a task when sent a JSON payload in the format:

```
{
  "id": uuidv4(),
  "text": "A brand new todo!",
  "completed": false  
}
```

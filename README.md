# rabbitMQ

The two microservices are **user_management** and **logger_service** defined in there own folders.

**docker-compose** file is used to run the **RabbitMQ** container.

### Start the application
1. Add the env values for both the services
2. start the docker container by **docker-compose up** in the file directory.
3. start individual services once the contaner is up.

### end points avaliable are

user management api's
1. /api/register - to register the user
2. /api/login - to login he user
3. /api/logout - to logout the user (auth token required)
4. /api/sendMessage - to send the message. (auth token required)

logger service api's
1. / - html page to view the logs

### logs
Logs for individual user activity are stored in the data directory of the logger service.
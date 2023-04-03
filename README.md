## A simple project to learn about Microservices with Kafka using Docker.

- The User Service has a User Entity that must be created and sent to Kafka with the User's properties;
- Post Service has an Author that takes the properties of the User from the Message Broker and uses it to create an Author in the Database;

# Simple Web Chat App

The above project is a simple web chat app, which can be used to chat all whoever in online. App works real time and whenever user login/logout the data will be updated in list of users. Since all this app is developed in almost 1 day and concentrated mostly on deployment and features. There is actually a list of issues(Non-feature), Please refer #Known Issues.

# Features

- Real time messages
- Real time user online status updates
- Able to chat any user in online
- Very light weight as there is not much of data streaming.
- No history
- Persistent storing of recent messages
- Sign up

## RUN

Application is completely dockerized and can be run in single command
```
docker-compose up -d --build
```
Now Open browser and hit `http://localhost:3500/`

## Tech Stack Used

- Node.js
- Express.js
- React.js
- Postgresql
- Socket.io
- Docker
- Docker-compose

## Tech Stack that will Included

- Nginx
- Elasticsearch
- Redux

## Deployment

This App is deployed in AWS. Log-On to [http://3.17.135.197:3502](http://3.17.135.197:3502/) and two demo users are already added for testing. 1. user1@gmail.com 2. user2@gmail.com
Having **password** as _pasword_ for both the accounts.

## Features To Be added

- Notification-in-app when new user pings
- searching user
- Chat history, list of users, even when there are not in online

## Known Issues

- Mobile Responsive
- Validation when directly hitting the API
- Security wise, easily hackable
- Not Much of coding standards followed

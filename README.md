# MongoDB TodoApp

> A repo to play with MongoDB

## Requirements

The Nodejs version specified in `.nvmrc`.

## MongoDB Requirements

In order for this project to work it needs to connect to a MongoDB database.

I used [mongoDB Atlas](https://www.mongodb.com/try) at the free tier as follows:

1. Create an account at [mongoDB Atlas](https://www.mongodb.com/try)
2. Create a cluster
3. Add a new user (copy username and password)
4. Setup connection to cluster:
   * Use _**Connect** button_ to open **Connect to <YOUR_CLUSTER_NAME>** settings.
   * Under **Connect to your application** choose ***Drivers - Access you Atlas data using MongoDB's native drivers (e.g. Node.js, Go, etc.)***
   * Select ***Node.js*** as the **Driver** and highest **Version** number (***5.5 or later*** at time of writing this.)
   * Copy your **connection string**: 
     * It will look something like this: `mongodb+srv://<username>:<password>@<cluster>.jeyn3hs.mongodb.net/?retryWrites=true&w=majority`.
     * Be sure to substitute `<password>` with your user's password. 
     * I've also removed my `<username>` and `<cluster>` names from the above connection string.
5. Create a `.env` file in the project root and add `DB_CONNECT = mongodb+srv://<username>:<password>@<cluster>.jeyn3hs.mongodb.net/?retryWrites=true&w=majority` — obviously your `<username>`, `<password>`, and `<cluster>` will be different.

***Never publish your `.env` file anywhere as it contains sensitive information!***

## Installation

```bash
npm install
```

## Run the App Locally

```bash
npm start
```

# Task Manager Requirements

To get Started You need to make sure you have to meet the following requirements

```
Node >= v20.11.0
MySQL
Process manager (Example, nodemon or PM2)
```

# Getting Started

Once you have made sure that you have all the requirements for running the `Task Manager` you need to check the code out and running the following command

```
npm install
```

Once you have run the install command you can then move into the `src` directory using the command

```
cd src
```

In the `src` folder you will need to create a .env file see section on .env settings.

Next is to run your favourite process manager, the system recommends that you use nodemon while in developmet

```
nodemon app.ts
```

Once you have run the above command the system will create the default tables needed for the `Task Management` system.

Once you are ready you are now able to move to the testing section and can use the different test cases to make sure the system runs correct

# .env settings

The .env file has the following settings note there are default settings and will need to be changed to your local settings

```
DB_HOST=localhost
DB_PORT=Database Port
DB_USER=Database User
DB_PASSWORD=Database Password
DB_NAME=Database Name
JWT_SECRET=HERE
```

# Compiling

Once you are done testing and are ready to compile the project you can run the following command `npx tsc` this will then create a folder called `dist`

Make sure to copy the .env file into the `dist` folder and then you are able to run all your node process managers from the dist folder

# Testing

In order order to run the tests there is a folder inside called `test` in the folder there are two files, `postman_collection.json` and `test.http`.

**postman_collection.json** is used to import inside Postman, you are able to import the file and run the different test cases from inside Postman

**test.http** uses the vscode `REST Client` to run HTTP calls, here you are able to use internal to test your code quickly

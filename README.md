Steps to Set Up the Project

Install npm dependencies
Run the following command in your project directory to install all dependencies: npm install

Create MongoDB database
Create a database named seller-product in your local MongoDB instance.

Import MongoDB collections
Import the necessary collections into the seller-product database using MongoDB Compass or the mongoimport CLI tool.

Import Postman collection
Open the Postman app and import the provided Postman collection (usually a .json file).

Set environment variables in .env file
Create a .env file in the root directory of your project and add the following variables:

MONGO_URI=mongodb://localhost:27017/seller-product
PORT=3000
JWT_SECRET=bhbjHVBU&(*Gb&Ub&98y&GhubVF^$^D)BLIUB&*TvyvF%DGUI%R7r5rBHBL&&Y7ugUHKYGUUIGuiVYG&&P*&YUhbhjvV&G&UGUHBHjvbHJVUG&GKhbjbggyugo77ggyuvygog7g7y87o&*T&*&GYGvukvhv

Start the development server
Run the following command to start the project in development mode: npm run dev

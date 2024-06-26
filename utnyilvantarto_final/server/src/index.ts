import { AppDataSource } from './data';
import express from 'express';
import { getRoutes } from './routes';
import boolParser from 'express-query-boolean';

async function main() {
  try {
    // DB connection
    await AppDataSource.initialize();

    // Create express app
    const app = express();

    // Middleware for parsing JSON request body
    app.use(express.json());

    // Booleans passed in query parameters don't get mistaken for strings
    app.use(boolParser());

    // Use router from routes.ts
    app.use('/api', getRoutes());

    app.listen(3000, () => {
      console.log('Listening on port 3000...');
    });

  } catch (error) {
    console.log(error);
  }
}

main();

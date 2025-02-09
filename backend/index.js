import dotenv from 'dotenv';
import {dbConnect} from './src/config/db.config.js';
import app from './src/app.js';

dotenv.config();

// Connect to the database
dbConnect();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
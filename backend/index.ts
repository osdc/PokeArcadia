import express, { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const directoryPath = path.join(__dirname, '../Entries');

  // Read all files in the Entries directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Unable to scan directory:', err);
      res.status(500).send('Error reading directory');
      return;
    }

    // Array to hold numbers read from files
    const numbers: number[] = [];

    // Iterate through all files
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      // Read the content of each file
      const data = fs.readFileSync(filePath, 'utf8');
      const number = parseInt(data, 10);
      
      // Check if the data is a valid number before adding to array
      if (!isNaN(number)) {
        numbers.push(number);
      }
    });

    console.log(numbers); // This will log the array of numbers
    res.json({ numbers }); // Send the array as JSON to the frontend
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

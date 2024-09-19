import express, { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const directoryPath = path.join(__dirname, '../Entries');
console.log("The directory path is: ", );
  // Read all files in the Entries directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Unable to scan directory:', err);
      res.status(500).send('Error reading directory');
      return;
    }

    // Array to hold the objects with number and name
    const users: { number: number; name: string }[] = [];

    // Iterate through all files
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      // Read the content of each file
      const data = fs.readFileSync(filePath, 'utf8');
      
      // Split the content by the comma
      const [numberStr, name] = data.split(',').map(item => item.trim());
      
      // Parse the number
      const number = parseInt(numberStr, 10);
      
      // Check if the data is valid before adding to the array
      if (!isNaN(number) && name) {
        users.push({ number, name });
      }
    });

    console.log(users); // This will log the array of objects
    res.json({ userPokemons: users }); // Send the array as JSON to the frontend
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import express, { Request, Response } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

interface UserEntry {
  name: string;
  enrl: string;
  number: number;
  oneLiner: string;
}

app.get('/', async (req: Request, res: Response) => {
  const directoryPath = path.resolve(__dirname, './Entries');
  console.log("Resolved directory path:", directoryPath);

  try {
    // Check if the directory exists
    await fs.access(directoryPath);
  } catch (err) {
    console.error('Directory does not exist', err);
    res.status(500).send('Entries directory not found');
    return;
  }

  try {
    const files = await fs.readdir(directoryPath);
    console.log('Files found:', files);

    const users: UserEntry[] = [];

    // Process files concurrently
    await Promise.all(files.map(async (file) => {
      if (path.extname(file) !== '.txt') {
        console.warn(`Skipping non-txt file: ${file}`);
        return;
      }

      const filePath = path.join(directoryPath, file);

      try {
        const data = await fs.readFile(filePath, 'utf8');

        if (!data) {
          console.warn(`Empty file found: ${file}`);
          return;
        }

        const parts = data.split(';').map(item => item.trim()).filter(Boolean);

        if (parts.length < 4) {
          console.warn(`Incomplete data in file ${file}:`, parts);
          return;
        }

        const [name, enrl, numberStr, oneLiner] = parts;

        const number = parseInt(numberStr, 10);

        if (isNaN(number)) {
          console.warn(`Invalid number in file ${file}: ${numberStr}`);
          return;
        }

        const userEntry: UserEntry = {
          name,
          enrl,
          number,
          oneLiner
        };

        users.push(userEntry);
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
    }));

    if (users.length === 0) {
      console.warn("No valid user entries found in the Entries directory.");
    } else {
      console.log('Parsed User Entries:', users);
    }

    res.json({ userPokemons: users });
  } catch (err) {
    console.error('Error processing files:', err);
    res.status(500).send('Error processing entries');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

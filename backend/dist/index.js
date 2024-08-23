"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    const directoryPath = node_path_1.default.join(__dirname, '../Entries');
    // Read all files in the Entries directory
    node_fs_1.default.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Unable to scan directory:', err);
            res.status(500).send('Error reading directory');
            return;
        }
        // Array to hold the objects with number and name
        const users = [];
        // Iterate through all files
        files.forEach((file) => {
            const filePath = node_path_1.default.join(directoryPath, file);
            // Read the content of each file
            const data = node_fs_1.default.readFileSync(filePath, 'utf8');
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

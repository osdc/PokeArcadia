# PokeArcadia: A Fun Way to Learn GitHub Workflow!

Welcome to **PokeArcadia**! 🎉 This project is designed to help kids learn the basics of GitHub workflow through a fun and engaging game. You'll learn how to use GitHub features like push, pull, and more while working on a cool project.

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [File Format](#file-format)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Licenses](#licenses)

## Introduction

PokeArcadia is a fun game where you get to work with a Pokémon-themed project. The project is divided into two main parts: the frontend and the backend. You'll be adding data to the backend, and your changes will be reflected in the frontend. Along the way, you'll get hands-on experience with GitHub by learning how to make changes, push them to GitHub, and collaborate with others.

## Project Structure

Here's a quick overview of the project structure:

Poke/
 │├── frontend/ # The frontend of the game <br />
   │└── cdn/ # The folder where you will add your .txt files <br />
     │└── README.md # This file! <br />

     
## How to Contribute

To contribute to PokeArcadia, you'll be adding your own .txt file to the `backend/Entries/` folder. Follow the instructions below to get started.

# File Format

When you add a new `.txt` file to the `pokedc/cdn/` folder, make sure it follows this format:
<br>
your_name;<br>
enrol_no;<br>
pokemon_index;<br>
message;<br>
## Examples -><br>
akshit;<br>
21480248;<br>
24;<br>
osdc>>; <br>

This file format is used to record the Pokémon ID and the name of the contributor.

## Getting Started

Here’s a step-by-step guide to get started with PokeArcadia and learn GitHub workflow:

1. **Fork the Repository:**
   - Go to the [PokeArcadia GitHub page](https://github.com/osdc/pokedc) and click the "Fork" button to create your own copy of the repository.

2. **Clone Your Fork:**
   Clone the forked repository on your account: Click on the code and then copy the link that shows up. Then go to your terminal and enter the git 
   clone command, it should look something like this:
    ```
    git clone https://github.com/your-name/pokedc.git
    ```

3. **Navigate to the Backend Folder:**
   Go to the repository directory and then to cdn directory:
    ```
    cd pokedc/cdn/
    ```

4. **Add Your File:**
      Create a file, with the name `your_enrol_no.txt`, eg. 22105251.txt
    ### File Structure of txt file:
    - your_name;
    - your_enrol_no;
    - A number for your Pokemon (between 1 and 600);
    - Text you want to display;
        
        (Add a semicolon after each line)

        eg:
        
        Arnav;

        23104173;

        151;

        Hello world!;

5. **Stage Your Changes:**
   - Add the file to the staging area:
     ```
     git add your-file.txt
     ```

6. **Config your user:**
    Config your user for this repo:
   ```
   git config user.email 'example@abc.xyz'
   git config user.name 'your-name'
   ```

7. **Commit Your Changes:**
   - Commit the changes with a meaningful message:
     ```bash
     git commit -m "Added new Pokémon entry for [Your Name]"
     ```

8. **Create a personal access token :**
     Step 1: Go to the menu button on the top-right of GitHub. <br>
   Step 2: Settings -> Developer Settings -> Personal Access Tokens -> Tokens (classic)<br>
   Step 3: Generate New Token (classic)<br>
   Step 4: Tick [✔️] the Repo option.<br>
   Step 5: generate the token and copy it (don't close the window with the token yet)
      
9. **Push Your Changes:**
   - Push the changes to your forked repository:
     ```bash
     git push origin main
     ```

10. **Authorization :**
    If a Windows GitHub login pop-up appears :<br>
        proceed with the sign-in<br>
    Else (if it asks for a username, password) :<br>
        enter your GitHub username.<br>
        enter the token you generated in {step 8} for the password.<br>
11. **Create a Pull Request:**
   - Go to the PokeArcadia GitHub page and create a pull request to merge your changes from your forked repository to the original repository.


---

Have fun contributing to PokeArcadia and learning about GitHub workflow! 🌟 If you have any questions, don’t hesitate to reach out to us. Happy Open Sorcering! 🚀



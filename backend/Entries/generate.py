import random

def generate_files(num_files):
    for i in range(1, num_files + 1):
        random_number = random.randint(1, 600)
        content = f"{random_number}, Sampl"

        # Generate the filename as 1.txt, 2.txt, etc.
        filename = f"{i}.txt"

        # Write the content to the file
        with open(filename, "w") as file:
            file.write(content)
        print(f"Generated {filename} with content: {content}")

def main():
    # Ask for the number of files to generate
    num_files = int(input("Enter the number of files to generate: "))

    # Generate the files
    generate_files(num_files)

if __name__ == "__main__":
    main()

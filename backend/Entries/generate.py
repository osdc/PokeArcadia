import random

def generate_files(num_files):
    names = ["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George", "Hannah"]
    one_liners = [
        "Hello world!",
        "Just a random one-liner.",
        "Python is awesome!",
        "Learning is fun.",
        "Keep coding!",
        "This is a test.",
        "Adventure awaits.",
        "Dream big!"
    ]

    for i in range(1, num_files + 1):
        # Randomly select a name from the list
        random_name = random.choice(names)

        # Generate a random enrollment number
        random_enrl = f"ENRL{random.randint(1000, 9999)}"

        # Generate a random number
        random_number = random.randint(1, 600)

        # Randomly select a one-liner from the list
        random_one_liner = random.choice(one_liners)

        # Format the content with semicolons and new lines
        content = f"{random_name};\n{random_enrl};\n{random_number};\n{random_one_liner};\n"

        # Generate the filename as 1.txt, 2.txt, etc.
        filename = f"{i}.txt"

        # Write the content to the file
        with open(filename, "w") as file:
            file.write(content)

        print(f"Generated {filename} with content:\n{content}")

def main():
    # Ask for the number of files to generate
    num_files = int(input("Enter the number of files to generate: "))

    # Generate the files
    generate_files(num_files)

if __name__ == "__main__":
    main()

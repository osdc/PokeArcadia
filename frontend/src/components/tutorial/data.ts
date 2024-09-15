export const dataArray: {
  name: string;
  index: number;
  module: { tip: string; imageData: { src: string | null; large: boolean } }[];
}[] = [
  {
    name: "Introduction",
    index: 0,
    module: [
      {
        tip: "Welcome to the world of Open Source!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Think of Open Source as a big, friendly library where everyone can contribute.",
        imageData: { src: null, large: false },
      },
      {
        tip: "The best part? The source code is open for everyone to see, tweak, and share.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Want to improve something or add a feature? Just dive in and make your changes!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Projects like Linux and Firefox thrive on this collaborative spirit.",
        imageData: { src: null, large: false },
      },
      {
        tip: "It’s all about sharing knowledge and making software better together.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Get involved, and you’ll be part of an awesome community that values transparency and teamwork!",
        imageData: { src: null, large: false },
      },
    ],
  },
  {
    name: "VersionControl",
    index: 1,
    module: [
      {
        tip: "Alright, let’s get into Version Control—it’s like having a magic time machine for your projects!",
        imageData: { src: null, large: false },
      },
      {
        tip: "With Version Control, you can track every change made to your files, see who did what, and roll back to earlier versions if needed.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Tools like Git are your best friends here. They help manage your project’s history and let you collaborate with others seamlessly.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Want to try something new without messing up your main project? Just create a branch and merge it back when you’re ready.",
        imageData: { src: null, large: false },
      },
      {
        tip: "It’s like saving different game states and loading them whenever you want!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Version Control keeps your projects organized and your collaboration smooth. Dive in and start managing your code like a pro!",
        imageData: { src: null, large: false },
      },
    ],
  },
  {
    name: "TheTerminal",
    index: 2,
    module: [
      {
        tip: "Hey there! Ready to dive into some terminal magic?",
        imageData: { src: null, large: false },
      },
      {
        tip: "As coders, the terminal’s our superpower—it makes everything fast and efficient!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Alright, let's kick off your new project from the command line!",
        imageData: { src: null, large: false },
      },
      {
        tip: 'First, go ahead and open your terminal and type "pwd".',
        imageData: { src: null, large: false },
      },
      {
        tip: "That’ll tell us where we are in the system—like finding our spot on the map!",
        imageData: { src: null, large: false },
      },
      {
        tip: "By the way, we call folders “directories” here. Just Unix things!",
        imageData: { src: null, large: false },
      },
      {
        tip: 'Next up, let’s see what’s around us. Type "ls" to list all the files and directories hanging out here.',
        imageData: { src: null, large: false },
      },
      {
        tip: 'Want to create your own directory? Type "mkdir" followed by the name of your choice.',
        imageData: { src: null, large: false },
      },
      {
        tip: "Go on, try it! mkdir something cool!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Awesome, you’ve just created your very own directory!",
        imageData: { src: null, large: false },
      },
      {
        tip: 'Now, let’s head inside it. Use the "cd" command to enter your new directory.',
        imageData: { src: null, large: false },
      },
      {
        tip: 'Remember, you can always use "cd .." to go back if needed.',
        imageData: { src: null, large: false },
      },
      {
        tip: 'To double-check where you are, type "pwd" again.',
        imageData: { src: null, large: false },
      },
      {
        tip: 'And if your screen gets a bit messy, type "clear" to wipe the slate clean!',
        imageData: { src: null, large: false },
      },
      {
        tip: "You're doing great! Now let's take things up a notch—let's get started with Git!",
        imageData: { src: null, large: false },
      },
    ],
  },
  {
    name: "Git",
    index: 3,
    module: [
      {
        tip: "Alright, now that we're comfy with the terminal, let’s take things up a notch—Git time!",
        imageData: { src: null, large: false },
      },
      {
        tip: "First things first, let's set up Git in your project folder.",
        imageData: { src: null, large: false },
      },
      {
        tip: 'Just type "git init" to initialize a Git repository here.',
        imageData: { src: null, large: false },
      },
      {
        tip: "Boom! Your project is now under version control. It’s like a checkpoint in a game—now we can track changes!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Alright, let’s add your files to the staging area. It’s like getting them ready for a snapshot.",
        imageData: { src: null, large: false },
      },
      {
        tip: 'Type "git add <filename>" to add specific files or "git add ." to stage everything at once.',
        imageData: { src: null, large: false },
      },
      {
        tip: "Now, we’ll commit our changes. Committing is like saving your progress.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Type \"git commit -m 'First commit'\"",
        imageData: { src: null, large: false },
      },
      {
        tip: "Awesome! You've just made your first commit. Now the fun begins.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Let’s talk branching—it’s like creating alternate paths for your project.",
        imageData: { src: null, large: false },
      },
      {
        tip: "You start off in the main branch",
        imageData: { src: null, large: false },
      },
      {
        tip: "This branch is the actual part used by your users",
        imageData: { src: null, large: false },
      },
      {
        tip: "We use branches so that you can code and make changes without affecting the main branch",
        imageData: { src: null, large: false },
      },
      {
        tip: "You can make a different branch of your code at any point, and add your new feature!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Test it and if it works fine, merge it with your main branch, no messing up the main branch.",
        imageData: { src: null, large: false },
      },
      {
        tip: 'Type "git branch <branch-name>" to create a new branch. This lets you experiment without affecting the main project.',
        imageData: { src: null, large: false },
      },
      {
        tip: 'To switch to the new branch, type "git checkout <branch-name>". You\'re in a new timeline now!',
        imageData: { src: null, large: false },
      },
      {
        tip: "Made some changes? Once you’re happy, it’s time to merge your branch back into the main one.",
        imageData: { src: null, large: false },
      },
      {
        tip: 'First, switch back to the main branch with "git checkout main" (or "master" depending on your setup).',
        imageData: { src: null, large: false },
      },
      {
        tip: 'Now, let’s merge your changes. Type "git merge <branch-name>". Your work comes together!',
        imageData: { src: null, large: false },
      },
      {
        tip: "If you get any merge conflicts, don’t worry! It just means Git wants you to decide how to combine changes. You can handle it!",
        imageData: { src: null, large: false },
      },
    ],
  },
  {
    name: "GitHub",
    index: 4,
    module: [
      {
        tip: "Alright, now that you’ve got the local stuff down, let’s explore GitHub—where collaboration happens!",
        imageData: { src: null, large: false },
      },
      {
        tip: "First, let's talk about forking. Forking is like making your own copy of someone else’s project.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Head over to the project you want to contribute to on GitHub and click that 'Fork' button at the top.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Congrats, you've just created your own version of the project under your account!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Now, we need to get it onto your local machine. Time to clone!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Go back to your terminal and type 'git clone <repo-link>' using the link from your forked project.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Boom! You've just cloned the project to your local machine. It’s ready for you to tinker with.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Make changes, add features, fix bugs—anything you want!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Once you're happy with your changes, let’s commit them locally, just like before. 'git commit -m “Describe your changes here”.'",
        imageData: { src: null, large: false },
      },
      {
        tip: "Push your changes to *your* forked repo with 'git push origin <branch-name>'.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Ready to contribute to the main project? Let’s create a Pull Request (PR).",
        imageData: { src: null, large: false },
      },
      {
        tip: "Go to your forked repo on GitHub. You’ll see a button to 'Compare & pull request.' Click it!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Give a nice, clear description of what changes you made and why.",
        imageData: { src: null, large: false },
      },
      {
        tip: "When you're ready, submit the pull request!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Now the project maintainer can review your work and, if everything looks good, merge it into the main project.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Keep an eye on the PR for any feedback or changes you might need to make.",
        imageData: { src: null, large: false },
      },
      {
        tip: "You’re well on your way to becoming a pro contributor!",
        imageData: { src: null, large: false },
      },
    ],
  },
  {
    name: "Capstone",
    index: 5,
    module: [
      {
        tip: "Let us put your skills to the test!",
        imageData: { src: null, large: false },
      },
      {
        tip: "Head over to GitHub, fork this repository.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Now make a different branch.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Go to backend/Entries.",
        imageData: { src: null, large: false },
      },
      {
        tip: "And add a file there.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Now add, commit, and push your changes.",
        imageData: { src: null, large: false },
      },
      {
        tip: "Go back to the website and now contribute to the main site.",
        imageData: { src: null, large: false },
      },
    ],
  },
];

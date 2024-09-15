export const dataArray: {
  name: string;
  index: number;
  module: { tip: string; imageData: { src: string | null; large: boolean } }[];
}[] = [
  {
    name: "Version Control Tools",
    index: 0,
    module: [
      {
        tip: "Git is a distributed version control system.",
        imageData: {
          src: "https://git-scm.com/images/logo@2x.png",
          large: true,
        },
      },
      {
        tip: "Git helps in tracking changes in source code.",
        imageData: {
          src: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*ogPtJWe61oKEXVPcpkG6BA.png",
          large: false,
        },
      },
    ],
  },
  {
    name: "Web Development Technologies",
    index: 1,
    module: [
      {
        tip: "HTML is the standard markup language for creating web pages.",
        imageData: {
          src: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
          large: false,
        },
      },
      {
        tip: "CSS is used to style and layout web pages.",
        imageData: {
          src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
          large: true,
        },
      },
      {
        tip: "JavaScript adds interactivity to web pages.",
        imageData: {
          src: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
          large: true,
        },
      },
    ],
  },
  {
    name: "Programming Languages",
    index: 2,
    module: [
      {
        tip: "Python is a high-level, interpreted programming language.",
        imageData: {
          src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
          large: false,
        },
      },
      {
        tip: "Java is a widely-used object-oriented programming language.",
        imageData: {
          src: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
          large: true,
        },
      },
      {
        tip: "Rust is a systems programming language focusing on safety and performance.",
        imageData: {
          src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg",
          large: true,
        },
      },
    ],
  },
];

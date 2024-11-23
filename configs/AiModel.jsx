const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate a course tutorial in JSON format with the following details:\n- Category: "programming"\n- Topic: "python"\n- Level: "basic"\n- Duration: "1 hour"\n- Number of Chapters: 5\n\nEach chapter should include:\n- Name: Chapter name\n- Duration: Chapter duration\n- About: Chapter description\n\nThe AI should generate appropriate values for the course name, description, chapter names, durations, and descriptions.\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "courseName": "Python Programming Fundamentals",\n  "description": "This introductory course provides a foundational understanding of Python programming, covering essential concepts and syntax.",\n  "category": "programming",\n  "topic": "python",\n  "level": "basic",\n  "duration": "1 hour",\n  "chapters": [\n    {\n      "name": "Getting Started with Python",\n      "duration": "10 minutes",\n      "about": "Setting up your Python environment.  Writing and running your first Python program.  Understanding basic syntax and comments."\n    },\n    {\n      "name": "Variables and Data Types",\n      "duration": "15 minutes",\n      "about": "Declaring and using variables.  Exploring different data types: integers, floats, strings, booleans.  Type conversion and casting."\n    },\n    {\n      "name": "Operators and Expressions",\n      "duration": "15 minutes",\n      "about": "Arithmetic, comparison, logical, and assignment operators.  Operator precedence and associativity.  Evaluating expressions."\n    },\n    {\n      "name": "Control Flow: Conditional Statements and Loops",\n      "duration": "15 minutes",\n      "about": "Using `if`, `elif`, and `else` statements for decision-making.  Iterating with `for` and `while` loops.  `break` and `continue` statements."\n    },\n    {\n      "name": "Introduction to Functions",\n      "duration": "15 minutes",\n      "about": "Defining and calling functions.  Function parameters and arguments.  Return values.  Understanding function scope."\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());

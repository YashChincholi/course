const { GoogleGenerativeAI } = require("@google/generative-ai");

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
          text: "Generate a course tutorial in JSON format with the following details Each chapter should include:- Name: Chapter name, Duration: Chapter duration, About: Chapter description.,noOfChapters : no of chapters The AI should generate appropriate values for the course name, description, chapter names, durations, and descriptions. Category: programming, Topic: Advanced Three.js Techniques, Level: Advanced, Duration: More than 3 hours, Number of Chapters: 6",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "courseName": "Mastering Advanced Three.js: From Fundamentals to Cutting-Edge Techniques",\n  "description": "Dive deep into the world of Three.js and unlock its full potential. This advanced course explores complex techniques, pushing the boundaries of 3D web development.  Learn to create stunning visuals and interactive experiences that go beyond the basics.",\n  "category": "programming",\n  "topic": "Advanced Three.js Techniques",\n  "level": "advanced",\n  "duration": "More than 3 hours",\n  "noOfChapters": 6,\n  "chapters": [\n    {\n      "name": "Advanced Scene Graph Management",\n      "duration": "45 minutes",\n      "about": "Master efficient scene graph organization for complex projects. Learn about object parenting, scene management strategies, and optimization techniques for improved performance."\n    },\n    {\n      "name": "Custom Shaders and Material Creation",\n      "duration": "1 hour 15 minutes",\n      "about": "Go beyond pre-built materials.  Learn to write custom shaders using GLSL to create unique visual effects, manipulate lighting, and achieve unparalleled levels of control over your 3D scenes."\n    },\n    {\n      "name": "Physics Integration with Three.js",\n      "duration": "1 hour",\n      "about": "Integrate realistic physics into your Three.js applications using physics engines like Ammo.js.  Create interactive simulations with dynamic objects, collisions, and realistic movement."\n    },\n    {\n      "name": "Post-Processing Effects and Filters",\n      "duration": "45 minutes",\n      "about": "Enhance the visual appeal of your scenes with post-processing effects like bloom, depth of field, and anti-aliasing. Learn how to implement these effects using shaders and rendering techniques."\n    },\n    {\n      "name": "Advanced Animation Techniques",\n      "duration": "30 minutes",\n      "about": "Explore advanced animation techniques beyond simple keyframes. Learn about procedural animation, morph targets, and skeletal animation for creating realistic and dynamic character animations."\n    },\n    {\n      "name": "Optimizing Performance for Large Scenes",\n      "duration": "1 hour",\n      "about": "Learn strategies for optimizing performance in complex Three.js projects. Explore techniques like level of detail (LOD), occlusion culling, and efficient geometry management to maintain high frame rates."\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

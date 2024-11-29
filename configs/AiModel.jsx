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

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in detail on Topic: Python, Chapter: Advanced Data Structures and Algorithms, in JSON format with an list of array with following fields as title, explanation on given chapter in detail, Code example(Code Field in <precode> format) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "title": "Python: Advanced Data Structures and Algorithms",\n  "chapters": [\n    {\n      "title": "Heaps and Priority Queues",\n      "explanation": "Heaps are tree-based data structures that satisfy the heap property: the value of each node is greater than or equal to the value of its children (for a max-heap) or less than or equal to the value of its children (for a min-heap).  This property allows for efficient retrieval of the minimum (min-heap) or maximum (max-heap) element. Python\'s `heapq` module provides functions to work with heaps, offering operations like `heappush`, `heappop`, `heapify` (to transform a list into a heap), and `nlargest`/`nsmallest` for finding the n largest or smallest elements. Priority queues are abstract data structures that allow elements to be retrieved based on priority; heaps are commonly used to implement priority queues.",\n      "code": "<precode>\\nimport heapq\\n\\n# Max-heap example (using negative values to simulate a max-heap with heapq)\\nheap = []\\nheapq.heappush(heap, -5)\\nheapq.heappush(heap, -10)\\nheapq.heappush(heap, -2)\\n\\nprint(f\\"Heap: {heap}\\") # Note: this shows the underlying heap representation\\nprint(f\\"Largest element (using negative values): {-heapq.heappop(heap)}\\")\\n\\n# Min-heap example\\nmin_heap = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]\\nheapq.heapify(min_heap)\\nprint(f\\"Min-heap: {min_heap}\\")\\nprint(f\\"Smallest element: {heapq.heappop(min_heap)}\\")\\n\\n# nlargest example\\nprint(f\\"3 largest elements: {heapq.nlargest(3, [1, 8, 2, 23, 7, 5])}\\")\\n</precode>"\n    },\n    {\n      "title": "Graphs and Graph Algorithms",\n      "explanation": "Graphs are collections of nodes (vertices) connected by edges. They are used to model various relationships and are fundamental in many applications.  Python doesn\'t have a built-in graph data structure, but they can be easily implemented using dictionaries (adjacency lists) or matrices (adjacency matrices). Common graph algorithms include Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra\'s algorithm (for shortest paths in weighted graphs), and Prim\'s/Kruskal\'s algorithms (for minimum spanning trees).",\n      "code": "<precode>\\n# Adjacency list representation\\ngraph = {\\n    \'A\': [\'B\', \'C\'],\\n    \'B\': [\'D\', \'E\'],\\n    \'C\': [\'F\'],\\n    \'D\': [],\\n    \'E\': [\'F\'],\\n    \'F\': []\\n}\\n\\n# Breadth-First Search (BFS) example\\ndef bfs(graph, start):\\n    visited = set()\\n    queue = [start]\\n    while queue:\\n        vertex = queue.pop(0)\\n        if vertex not in visited:\\n            visited.add(vertex)\\n            queue.extend(neighbor for neighbor in graph[vertex] if neighbor not in visited)\\n    return visited\\n\\nprint(f\\"BFS traversal starting from \'A\': {bfs(graph, \'A\')}\\")\\n</precode>"\n    },\n    {\n      "title": "Trees and Tree Traversal Algorithms",\n      "explanation": "Trees are hierarchical data structures with a root node and branches of child nodes.  Various tree types exist, such as binary trees, binary search trees (BSTs), and AVL trees (self-balancing BSTs).  Tree traversal algorithms (like pre-order, in-order, post-order) are used to visit all nodes in a systematic way.  Python doesn\'t have a built-in tree structure, but they can be implemented using classes and objects.",\n      "code": "<precode>\\nclass Node:\\n    def __init__(self, data):\\n        self.data = data\\n        self.left = None\\n        self.right = None\\n\\n# In-order traversal example\\ndef inorder_traversal(node):\\n    if node:\\n        inorder_traversal(node.left)\\n        print(node.data, end=\\" \\")\\n        inorder_traversal(node.right)\\n\\nroot = Node(1)\\nroot.left = Node(2)\\nroot.right = Node(3)\\nroot.left.left = Node(4)\\nroot.left.right = Node(5)\\n\\nprint(\\"In-order traversal:\\")\\ninorder_traversal(root)\\n</precode>"\n    },\n    {\n      "title": "Dynamic Programming",\n      "explanation": "Dynamic programming is an optimization technique that solves problems by breaking them down into smaller overlapping subproblems, solving each subproblem only once, and storing their solutions to avoid redundant computations.  This approach is particularly useful for problems exhibiting optimal substructure and overlapping subproblems.  Examples include the Fibonacci sequence calculation, knapsack problem, and longest common subsequence.",\n      "code": "<precode>\\n# Fibonacci sequence using dynamic programming\\ndef fibonacci_dp(n):\\n    fib = [0, 1]\\n    for i in range(2, n + 1):\\n        fib.append(fib[i - 1] + fib[i - 2])\\n    return fib[n]\\n\\nprint(f\\"Fibonacci(6) using DP: {fibonacci_dp(6)}\\")\\n</precode>"\n    },\n    {\n      "title": "Greedy Algorithms",\n      "explanation": "Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum.  They don\'t guarantee the best solution but are often efficient and provide reasonably good results.  Examples include Dijkstra\'s algorithm (shortest paths), Huffman coding (data compression), and Kruskal\'s algorithm (minimum spanning tree).",\n      "explanation": "Greedy algorithms are a type of algorithmic approach that makes the best choice at each step with the hope of finding a global optimum solution. They don\'t always guarantee the best possible solution, but they are often very efficient and frequently provide good approximations.  Classic examples include Dijkstra\'s algorithm (shortest paths), Huffman coding (data compression), and Kruskal\'s algorithm (minimum spanning tree)."\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

// ================= TYPES =================

export type Language =
  | "C"
  | "C++"
  | "Java"
  | "Python"
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "TSX";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type TopicKey =
  | "Introduction"
  | "Variables"
  | "Data Types"
  | "Loops"
  | "Functions"
  | "Programs"
  | "Projects";

// ================= INTERFACES =================

export interface SubSection {
  title: string;
  content?: string;
  code?: string;
  list?: string[];
  examples?: string[];
  practice?: string[];
  interview?: string[];
  features?: string[];
  difficulty?: Difficulty;
}

export interface TopicDetail {
  title: string;
  description: string;
  sections: SubSection[];
}

// ================= DEFAULT EMPTY STRUCTURE =================

const emptyTopic: TopicDetail = {
  title: "Coming Soon",
  description: "This module is under development.",
  sections: []
};

const emptyLanguage: Record<TopicKey, TopicDetail> = {
  Introduction: emptyTopic,
  Variables: emptyTopic,
  "Data Types": emptyTopic,
  Loops: emptyTopic,
  Functions: emptyTopic,
  Programs: emptyTopic,
  Projects: emptyTopic
};

// ================= DATA =================

export const courseData: Record<
  Language,
  Record<TopicKey, TopicDetail>
> = {
  // ================= C =================
 C: {
  Introduction: {
    title: "C: System-Level Programming",
    description:
      "C is a powerful, low-level programming language used for system programming, embedded systems, OS development, and high-performance applications.",
    sections: [
      {
        title: "History & Evolution",
        content:
          "C was developed by Dennis Ritchie in 1972 at Bell Labs. It was designed for implementing UNIX OS. Over time, it became the foundation of modern programming languages.",
        difficulty: "Beginner",
        list: [
          "Developed in 1972",
          "Used in UNIX",
          "Foundation of C++, Java",
          "Portable and efficient"
        ],
        interview: [
          "Why is C called middle-level language?",
          "Why is C fast?",
          "Difference between C and Python?"
        ]
      },
      {
        title: "Compilation Process",
        content:
          "Compilation converts C code into machine code using multiple steps.",
        code: `#include <stdio.h>

int main(){
  printf("Hello C");
  return 0;
}`,
        practice: [
          "Explain preprocessing",
          "Explain linking",
          "Difference between compile and run"
        ]
      }
    ]
  },

  Variables: {
    title: "Variables & Memory",
    description:
      "Variables represent memory locations and allow manipulation of data.",
    sections: [
      {
        title: "Basic Variables",
        content:
          "Variables store data values and must be declared before use.",
        code: `int a = 10;
float b = 3.5;`,
        practice: [
          "Declare all data types",
          "Find size of variables"
        ]
      },
      {
        title: "Dynamic Memory",
        content:
          "Memory allocated at runtime using malloc, calloc.",
        code: `int *ptr = (int*)malloc(5*sizeof(int));`,
        interview: [
          "malloc vs calloc",
          "memory leak"
        ]
      }
    ]
  },

  "Data Types": {
    title: "Data Types",
    description: "Defines type of data stored.",
    sections: [
      {
        title: "Basic Types",
        code: `int a;
float b;
char c;`,
      },
      {
        title: "Structures",
        code: `struct Student {
  int id;
  char name[20];
};`
      },
      {
        title: "Pointers",
        code: `int a = 10;
int *p = &a;`
      }
    ]
  },

  Loops: {
    title: "Loops",
    description: "Used for repetition.",
    sections: [
      {
        title: "For Loop",
        code: `for(int i=0;i<5;i++){
  printf("%d", i);
}`
      },
      {
        title: "While Loop",
        code: `int i=0;
while(i<5){
  i++;
}`
      }
    ]
  },

  Functions: {
    title: "Functions",
    description: "Reusable code blocks.",
    sections: [
      {
        title: "Basic Function",
        code: `int add(int a,int b){
  return a+b;
}`
      },
      {
        title: "Recursion",
        code: `int fact(int n){
  if(n==0) return 1;
  return n*fact(n-1);
}`
      }
    ]
  },

  Programs: {
    title: "Programs",
    description: "Problem solving programs.",
    sections: [
      {
        title: "Factorial",
        code: `int fact(int n){
  int f=1;
  for(int i=1;i<=n;i++){
    f*=i;
  }
  return f;
}`
      },
      {
        title: "Prime Number",
        code: `int isPrime(int n){
  for(int i=2;i<n;i++){
    if(n%i==0) return 0;
  }
  return 1;
}`
      },
      {
        title: "Sorting",
        code: `for(int i=0;i<n;i++){
  for(int j=i+1;j<n;j++){
    if(arr[i]>arr[j]){
      int temp=arr[i];
      arr[i]=arr[j];
      arr[j]=temp;
    }
  }
}`
      }
    ]
  },

  Projects: {
    title: "Projects",
    description: "Real-world applications.",
    sections: [
      {
        title: "Student System",
        features: [
          "Add student",
          "Delete student",
          "Search",
          "File handling"
        ]
      },
      {
        title: "Bank System",
        features: [
          "Deposit",
          "Withdraw",
          "Account management"
        ]
      }
    ]
  }
},

  // ================= C++ =================
 "C++": {
  Introduction: {
    title: "C++: Multi-Paradigm Programming Language",
    description:
      "C++ is an extension of C that supports procedural, object-oriented, and generic programming. It is widely used in game development, system software, and high-performance applications.",
    sections: [
      {
        title: "History & Evolution",
        content:
          "C++ was developed by Bjarne Stroustrup in 1979 as an extension of C. It introduced classes and object-oriented programming features.",
        difficulty: "Beginner",
        list: [
          "Developed in 1979",
          "Extension of C",
          "Supports OOP and STL",
          "Used in games, OS, and software"
        ],
        interview: [
          "Difference between C and C++?",
          "Why is C++ powerful?",
          "What is OOP?"
        ]
      },
      {
        title: "Basic Structure",
        content:
          "C++ programs use iostream for input/output and follow structured syntax.",
        code: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello C++";
  return 0;
}`,
        practice: [
          "Write Hello World program",
          "Explain main function"
        ]
      }
    ]
  },

  Variables: {
    title: "Variables & Memory",
    description:
      "C++ supports variables similar to C but adds references and advanced memory features.",
    sections: [
      {
        title: "Basic Variables",
        code: `int a = 10;
float b = 3.5;`,
        difficulty: "Beginner"
      },
      {
        title: "Reference Variables",
        content:
          "Reference variables act as aliases for other variables.",
        code: `int a = 10;
int &ref = a;
ref = 20;`,
        difficulty: "Intermediate",
        interview: [
          "Difference between pointer and reference?"
        ]
      },
      {
        title: "Dynamic Memory",
        code: `int *p = new int;
*p = 5;
delete p;`,
        difficulty: "Advanced"
      }
    ]
  },

  "Data Types": {
    title: "Data Types & STL",
    description:
      "C++ provides advanced data types and STL containers.",
    sections: [
      {
        title: "Basic Types",
        code: `int a;
float b;
char c;`
      },
      {
        title: "String",
        code: `#include <string>
string s = "Hello";`
      },
      {
        title: "Vector (STL)",
        code: `#include <vector>
vector<int> v = {1,2,3};`,
        practice: [
          "Insert and delete elements",
          "Iterate vector"
        ]
      },
      {
        title: "Map",
        code: `#include <map>
map<int,string> m;
m[1] = "A";`
      }
    ]
  },

  Loops: {
    title: "Loops & Iteration",
    description:
      "C++ supports traditional loops and modern iteration.",
    sections: [
      {
        title: "For Loop",
        code: `for(int i=0;i<5;i++){
  cout<<i;
}`
      },
      {
        title: "Range-Based Loop",
        code: `for(auto x : v){
  cout<<x;
}`
      }
    ]
  },

  Functions: {
    title: "Functions & Templates",
    description:
      "Functions can be overloaded and templated.",
    sections: [
      {
        title: "Function Overloading",
        code: `int add(int a,int b){
  return a+b;
}

float add(float a,float b){
  return a+b;
}`
      },
      {
        title: "Templates",
        code: `template<typename T>
T add(T a, T b){
  return a+b;
}`,
        difficulty: "Advanced",
        interview: [
          "What is template?",
          "Why use templates?"
        ]
      }
    ]
  },

  Programs: {
    title: "OOP Programs",
    description:
      "C++ supports Object-Oriented Programming concepts.",
    sections: [
      {
        title: "Class & Object",
        code: `class Student {
public:
  int id;
  void show(){
    cout << id;
  }
};`
      },
      {
        title: "Inheritance",
        code: `class A {
public:
  void show(){
    cout<<"A";
  }
};

class B : public A {};`
      },
      {
        title: "Polymorphism",
        code: `class Shape {
public:
  virtual void draw(){
    cout<<"Shape";
  }
};

class Circle : public Shape {
public:
  void draw(){
    cout<<"Circle";
  }
};`,
        difficulty: "Advanced"
      }
    ]
  },

  Projects: {
    title: "Real-World Projects",
    description:
      "Apply OOP and STL in real applications.",
    sections: [
      {
        title: "Library Management System",
        difficulty: "Advanced",
        features: [
          "Book management",
          "User login",
          "Issue/Return system",
          "File handling"
        ]
      },
      {
        title: "Bank System",
        difficulty: "Advanced",
        features: [
          "Account creation",
          "Deposit/Withdraw",
          "Transaction history"
        ]
      }
    ]
  }
},

  // ================= OTHER LANGUAGES (SAFE) =================
  Java: {
  Introduction: {
    title: "Java: Object-Oriented & Platform Independent Language",
    description:
      "Java is a high-level, object-oriented programming language known for its platform independence, security, and robustness. It is widely used in web, mobile, and enterprise applications.",
    sections: [
      {
        title: "History & Features",
        content:
          "Java was developed by James Gosling at Sun Microsystems in 1995. It follows the principle 'Write Once, Run Anywhere' using JVM.",
        difficulty: "Beginner",
        list: [
          "Platform independent (JVM)",
          "Object-Oriented",
          "Secure and robust",
          "Automatic memory management"
        ],
        interview: [
          "Why is Java platform independent?",
          "What is JVM, JRE, JDK?",
          "Difference between C++ and Java?"
        ]
      },
      {
        title: "Basic Program Structure",
        content:
          "Every Java program runs inside a class and starts from main method.",
        code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello Java");
  }
}`,
        practice: [
          "Write Hello World",
          "Explain main method syntax"
        ]
      }
    ]
  },

  Variables: {
    title: "Variables & Memory",
    description:
      "Variables store data and Java manages memory automatically using Garbage Collection.",
    sections: [
      {
        title: "Data Types",
        content:
          "Java supports primitive and non-primitive types.",
        code: `int a = 10;
float b = 3.5f;
char c = 'A';`,
        difficulty: "Beginner"
      },
      {
        title: "Type Casting",
        code: `int a = 10;
double b = a; // implicit

double x = 9.8;
int y = (int)x; // explicit`,
        difficulty: "Intermediate"
      },
      {
        title: "Garbage Collection",
        content:
          "Java automatically deletes unused objects using Garbage Collector.",
        interview: [
          "What is garbage collection?",
          "Can we manually free memory in Java?"
        ]
      }
    ]
  },

  "Data Types": {
    title: "Classes & Objects",
    description:
      "Java is fully object-oriented, everything revolves around classes and objects.",
    sections: [
      {
        title: "Class & Object",
        code: `class Student {
  int id;

  void display() {
    System.out.println(id);
  }
}

public class Main {
  public static void main(String[] args) {
    Student s = new Student();
    s.id = 1;
    s.display();
  }
}`
      },
      {
        title: "Constructor",
        code: `class A {
  A() {
    System.out.println("Constructor called");
  }
}`
      },
      {
        title: "Encapsulation",
        code: `class A {
  private int x;

  public void setX(int x){
    this.x = x;
  }

  public int getX(){
    return x;
  }
}`,
        difficulty: "Intermediate"
      }
    ]
  },

  Loops: {
    title: "Control Flow",
    description:
      "Loops and conditions control program execution.",
    sections: [
      {
        title: "For Loop",
        code: `for(int i=0;i<5;i++){
  System.out.println(i);
}`
      },
      {
        title: "While Loop",
        code: `int i=0;
while(i<5){
  i++;
}`
      },
      {
        title: "Switch",
        code: `switch(day){
  case 1: System.out.println("Mon"); break;
}`
      }
    ]
  },

  Functions: {
    title: "Methods",
    description:
      "Methods define behavior in Java classes.",
    sections: [
      {
        title: "Method Example",
        code: `int add(int a,int b){
  return a+b;
}`
      },
      {
        title: "Method Overloading",
        code: `int add(int a,int b){
  return a+b;
}

double add(double a,double b){
  return a+b;
}`,
        difficulty: "Intermediate"
      },
      {
        title: "Recursion",
        code: `int fact(int n){
  if(n==0) return 1;
  return n*fact(n-1);
}`
      }
    ]
  },

  Programs: {
    title: "OOP Concepts",
    description:
      "Java strongly follows OOP principles.",
    sections: [
      {
        title: "Inheritance",
        code: `class A {
  void show(){
    System.out.println("A");
  }
}

class B extends A {}`
      },
      {
        title: "Polymorphism",
        code: `class A {
  void show(){
    System.out.println("A");
  }
}

class B extends A {
  void show(){
    System.out.println("B");
  }
}`
      },
      {
        title: "Abstraction",
        code: `abstract class A {
  abstract void show();
}`
      },
      {
        title: "Interface",
        code: `interface A {
  void show();
}`
      }
    ]
  },

  Projects: {
    title: "Real-World Projects",
    description:
      "Java is widely used in enterprise and application development.",
    sections: [
      {
        title: "Bank Management System",
        difficulty: "Advanced",
        features: [
          "Account creation",
          "Deposit/Withdraw",
          "Transaction history",
          "File handling"
        ]
      },
      {
        title: "Student Management System",
        difficulty: "Advanced",
        features: [
          "Add/Delete/Search",
          "Database integration",
          "GUI (Swing/JavaFX)"
        ]
      }
    ]
  }
},
  Python: {
  Introduction: {
    title: "Python: High-Level & Versatile Language",
    description:
      "Python is a high-level, interpreted programming language known for its simplicity, readability, and versatility. It is widely used in web development, data science, AI, automation, and scripting.",
    sections: [
      {
        title: "History & Features",
        content:
          "Python was created by Guido van Rossum in 1991. It emphasizes readability and simplicity, making it one of the most popular programming languages.",
        difficulty: "Beginner",
        list: [
          "Easy syntax (English-like)",
          "Interpreted language",
          "Dynamically typed",
          "Huge libraries (NumPy, Pandas, etc.)",
          "Used in AI, ML, Web, Automation"
        ],
        interview: [
          "Why is Python popular?",
          "Difference between Python and C?",
          "What is interpreted language?"
        ]
      },
      {
        title: "Basic Program",
        content:
          "Python programs are simple and do not require semicolons or curly braces.",
        code: `print("Hello Python")`,
        practice: [
          "Print your name",
          "Take input and print output"
        ]
      }
    ]
  },

  Variables: {
    title: "Variables & Data Handling",
    description:
      "Python variables do not require explicit type declaration.",
    sections: [
      {
        title: "Variable Declaration",
        code: `a = 10
b = 3.5
name = "Python"`,
        difficulty: "Beginner"
      },
      {
        title: "Multiple Assignment",
        code: `a, b, c = 1, 2, 3`,
      },
      {
        title: "Type Checking",
        code: `a = 10
print(type(a))`,
        interview: [
          "What is dynamic typing?",
          "Difference between Python and Java variables?"
        ]
      }
    ]
  },

  "Data Types": {
    title: "Data Types & Collections",
    description:
      "Python provides powerful built-in data structures.",
    sections: [
      {
        title: "Basic Types",
        code: `int, float, str, bool`
      },
      {
        title: "List",
        code: `lst = [1,2,3]
lst.append(4)`,
        practice: [
          "Reverse a list",
          "Find max element"
        ]
      },
      {
        title: "Tuple",
        code: `t = (1,2,3)`
      },
      {
        title: "Dictionary",
        code: `d = {"a":1, "b":2}
print(d["a"])`
      },
      {
        title: "Set",
        code: `s = {1,2,3}`
      }
    ]
  },

  Loops: {
    title: "Loops & Control Flow",
    description:
      "Loops are used to repeat tasks efficiently.",
    sections: [
      {
        title: "For Loop",
        code: `for i in range(5):
    print(i)`
      },
      {
        title: "While Loop",
        code: `i = 0
while i < 5:
    i += 1`
      },
      {
        title: "Break & Continue",
        code: `for i in range(5):
    if i == 3:
        break`
      }
    ]
  },

  Functions: {
    title: "Functions & Lambda",
    description:
      "Functions help in modular programming.",
    sections: [
      {
        title: "Function Example",
        code: `def add(a, b):
    return a + b`
      },
      {
        title: "Lambda Function",
        code: `add = lambda a, b: a + b`,
        difficulty: "Intermediate"
      },
      {
        title: "Recursion",
        code: `def fact(n):
    if n == 0:
        return 1
    return n * fact(n-1)`
      }
    ]
  },

  Programs: {
    title: "Problem Solving",
    description:
      "Python is widely used for solving problems efficiently.",
    sections: [
      {
        title: "Prime Number",
        code: `def is_prime(n):
    for i in range(2,n):
        if n % i == 0:
            return False
    return True`
      },
      {
        title: "Factorial",
        code: `def fact(n):
    f = 1
    for i in range(1,n+1):
        f *= i
    return f`
      },
      {
        title: "Sorting",
        code: `lst = [3,1,2]
lst.sort()`
      }
    ]
  },

  Projects: {
    title: "Real-World Projects",
    description:
      "Python is widely used in real-world applications.",
    sections: [
      {
        title: "Student Management System",
        difficulty: "Advanced",
        features: [
          "Add/Delete/Search student",
          "File handling",
          "Sorting"
        ]
      },
      {
        title: "Web Scraper",
        difficulty: "Advanced",
        features: [
          "Scrape websites",
          "Store data",
          "Automation"
        ]
      },
      {
        title: "AI Chatbot (Basic)",
        difficulty: "Advanced",
        features: [
          "User input handling",
          "Basic NLP",
          "Response system"
        ]
      }
    ]
  }
},
  HTML: {
  Introduction: {
    title: "HTML: Structure of the Web",
    description:
      "HTML (HyperText Markup Language) is the standard language used to create and structure web pages. It defines the layout and content of web applications.",
    sections: [
      {
        title: "What is HTML?",
        content:
          "HTML is a markup language used to structure content on the web using elements (tags). It is not a programming language but forms the backbone of every website.",
        difficulty: "Beginner",
        list: [
          "Used to create web pages",
          "Uses tags and elements",
          "Works with CSS and JavaScript",
          "Platform independent"
        ],
        interview: [
          "What is HTML?",
          "Difference between HTML and CSS?",
          "Is HTML a programming language?"
        ]
      },
      {
        title: "Basic Structure",
        content:
          "Every HTML document has a standard structure including head and body.",
        code: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`,
        practice: [
          "Create a simple webpage",
          "Add heading and paragraph"
        ]
      }
    ]
  },

  Variables: {
    title: "HTML Elements & Attributes",
    description:
      "HTML uses elements and attributes to define content and behavior.",
    sections: [
      {
        title: "Basic Elements",
        code: `<h1>Heading</h1>
<p>Paragraph</p>
<a href="#">Link</a>`
      },
      {
        title: "Attributes",
        content:
          "Attributes provide additional information about elements.",
        code: `<img src="image.jpg" alt="Image">`,
        interview: [
          "What are attributes?",
          "Difference between id and class?"
        ]
      }
    ]
  },

  "Data Types": {
    title: "Text & Media Elements",
    description:
      "HTML supports text formatting and media embedding.",
    sections: [
      {
        title: "Text Formatting",
        code: `<b>Bold</b>
<i>Italic</i>
<u>Underline</u>`
      },
      {
        title: "Images",
        code: `<img src="img.jpg" width="200">`
      },
      {
        title: "Audio & Video",
        code: `<video controls>
  <source src="video.mp4">
</video>`
      }
    ]
  },

  Loops: {
    title: "Lists & Navigation",
    description:
      "Lists are used to organize content.",
    sections: [
      {
        title: "Ordered List",
        code: `<ol>
  <li>Item 1</li>
</ol>`
      },
      {
        title: "Unordered List",
        code: `<ul>
  <li>Item 1</li>
</ul>`
      },
      {
        title: "Navigation Bar",
        code: `<nav>
  <a href="#">Home</a>
</nav>`
      }
    ]
  },

  Functions: {
    title: "Forms & Input",
    description:
      "Forms are used to collect user input.",
    sections: [
      {
        title: "Form Example",
        code: `<form>
  <input type="text">
  <button>Submit</button>
</form>`
      },
      {
        title: "Input Types",
        code: `<input type="email">
<input type="password">`
      },
      {
        title: "Validation",
        code: `<input type="text" required>`
      }
    ]
  },

  Programs: {
    title: "Advanced HTML",
    description:
      "Modern HTML includes semantic elements and accessibility features.",
    sections: [
      {
        title: "Semantic Tags",
        code: `<header></header>
<section></section>
<footer></footer>`,
        interview: [
          "What are semantic tags?",
          "Why use semantic HTML?"
        ]
      },
      {
        title: "Iframe",
        code: `<iframe src="https://example.com"></iframe>`
      },
      {
        title: "Meta Tags (SEO)",
        code: `<meta name="description" content="My site">`
      }
    ]
  },

  Projects: {
    title: "Real-World Projects",
    description:
      "HTML is used to build real web pages and layouts.",
    sections: [
      {
        title: "Portfolio Website",
        difficulty: "Intermediate",
        features: [
          "About section",
          "Projects showcase",
          "Contact form"
        ]
      },
      {
        title: "Login Page",
        difficulty: "Beginner",
        features: [
          "Username/password input",
          "Form validation",
          "Responsive design"
        ]
      },
      {
        title: "Landing Page",
        difficulty: "Advanced",
        features: [
          "Hero section",
          "Call-to-action",
          "SEO optimized"
        ]
      }
    ]
  }
},
  CSS: {
  Introduction: {
    title: "CSS: Styling the Web",
    description:
      "CSS (Cascading Style Sheets) is used to style and design web pages. It controls layout, colors, fonts, and responsiveness of websites.",
    sections: [
      {
        title: "What is CSS?",
        content:
          "CSS is used to style HTML elements. It separates content (HTML) from design, making websites more flexible and maintainable.",
        difficulty: "Beginner",
        list: [
          "Controls layout and design",
          "Works with HTML",
          "Supports responsive design",
          "Used in all websites"
        ],
        interview: [
          "What is CSS?",
          "Difference between inline, internal, external CSS?",
          "What is specificity?"
        ]
      },
      {
        title: "Basic Syntax",
        content:
          "CSS uses selectors and properties to style elements.",
        code: `h1 {
  color: red;
  font-size: 20px;
}`,
        practice: [
          "Change text color",
          "Apply background color"
        ]
      }
    ]
  },

  Variables: {
    title: "Selectors & Properties",
    description:
      "Selectors target HTML elements, and properties define styles.",
    sections: [
      {
        title: "Basic Selectors",
        code: `h1 { color: blue; }
.class { color: red; }
#id { color: green; }`
      },
      {
        title: "Box Model",
        content:
          "Every element is a box consisting of margin, border, padding, and content.",
        code: `div {
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
}`
      },
      {
        title: "Display Property",
        code: `div { display: block; }
span { display: inline; }`,
        interview: [
          "Difference between block and inline?",
          "What is display:flex?"
        ]
      }
    ]
  },

  "Data Types": {
    title: "Colors, Units & Fonts",
    description:
      "CSS supports multiple formats for styling.",
    sections: [
      {
        title: "Colors",
        code: `color: red;
color: #ff0000;
color: rgb(255,0,0);`
      },
      {
        title: "Units",
        code: `width: 100px;
font-size: 2em;
height: 50%;`
      },
      {
        title: "Fonts",
        code: `font-family: Arial;
font-size: 16px;
font-weight: bold;`
      }
    ]
  },

  Loops: {
    title: "Flexbox (Layout System)",
    description:
      "Flexbox is used to create flexible layouts.",
    sections: [
      {
        title: "Flex Container",
        code: `div {
  display: flex;
  justify-content: center;
  align-items: center;
}`
      },
      {
        title: "Flex Direction",
        code: `flex-direction: row;
flex-direction: column;`
      },
      {
        title: "Gap & Spacing",
        code: `gap: 10px;`
      }
    ]
  },

  Functions: {
    title: "CSS Grid",
    description:
      "Grid is used for advanced 2D layouts.",
    sections: [
      {
        title: "Grid Example",
        code: `div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}`
      },
      {
        title: "Grid Gap",
        code: `gap: 20px;`
      },
      {
        title: "Grid Area",
        code: `grid-column: span 2;`,
        difficulty: "Intermediate"
      }
    ]
  },

  Programs: {
    title: "Advanced CSS",
    description:
      "Modern CSS includes animations, transitions, and responsiveness.",
    sections: [
      {
        title: "Transitions",
        code: `button {
  transition: 0.3s;
}
button:hover {
  background: blue;
}`
      },
      {
        title: "Animations",
        code: `@keyframes move {
  from { left: 0; }
  to { left: 100px; }
}`
      },
      {
        title: "Media Queries",
        code: `@media (max-width: 768px) {
  body { background: red; }
}`,
        interview: [
          "What is responsive design?",
          "What are media queries?"
        ]
      }
    ]
  },

  Projects: {
    title: "Real-World Projects",
    description:
      "CSS is used to create beautiful UI and responsive layouts.",
    sections: [
      {
        title: "Responsive Website",
        difficulty: "Advanced",
        features: [
          "Mobile-friendly design",
          "Flexbox & Grid",
          "Media queries"
        ]
      },
      {
        title: "Glass UI (like your project)",
        difficulty: "Advanced",
        features: [
          "Backdrop blur",
          "Transparency",
          "Modern UI"
        ]
      },
      {
        title: "Animated Landing Page",
        difficulty: "Advanced",
        features: [
          "Hover effects",
          "Transitions",
          "Animations"
        ]
      }
    ]
  }
},
  JavaScript: {
  Introduction: {
    title: "JavaScript: The Brain of the Web",
    description:
      "JavaScript is a high-level, dynamic programming language used to make web pages interactive. It is essential for frontend and also used in backend (Node.js).",
    sections: [
      {
        title: "What is JavaScript?",
        content:
          "JavaScript adds interactivity to web pages. It works with HTML and CSS to create dynamic websites.",
        difficulty: "Beginner",
        list: [
          "Client-side scripting",
          "Used in browsers",
          "Dynamic and flexible",
          "Supports OOP and functional programming"
        ],
        interview: [
          "What is JavaScript?",
          "Difference between JS and Java?",
          "Is JS synchronous or asynchronous?"
        ]
      },
      {
        title: "Basic Example",
        code: `console.log("Hello JS");`,
        practice: [
          "Print numbers",
          "Take input using prompt"
        ]
      }
    ]
  },

  Variables: {
    title: "Variables & Data Types",
    description:
      "JavaScript variables store data dynamically.",
    sections: [
      {
        title: "Variable Types",
        code: `let a = 10;
const b = 20;
var c = 30;`,
        interview: [
          "Difference between var, let, const?"
        ]
      },
      {
        title: "Data Types",
        code: `let num = 10;
let str = "Hello";
let bool = true;
let obj = {};`,
      },
      {
        title: "Type Conversion",
        code: `Number("10");
String(10);`
      }
    ]
  },

  "Data Types": {
    title: "Arrays & Objects",
    description:
      "Arrays and objects are core data structures in JavaScript.",
    sections: [
      {
        title: "Array",
        code: `let arr = [1,2,3];
arr.push(4);`,
        practice: [
          "Reverse array",
          "Find max value"
        ]
      },
      {
        title: "Object",
        code: `let obj = {
  name: "JS",
  age: 10
};`
      },
      {
        title: "Destructuring",
        code: `let {name} = obj;`,
        difficulty: "Intermediate"
      }
    ]
  },

  Loops: {
    title: "Loops & Conditions",
    description:
      "Loops and conditions control flow of execution.",
    sections: [
      {
        title: "For Loop",
        code: `for(let i=0;i<5;i++){
  console.log(i);
}`
      },
      {
        title: "While Loop",
        code: `let i=0;
while(i<5){
  i++;
}`
      },
      {
        title: "ForEach",
        code: `arr.forEach(x => console.log(x));`
      }
    ]
  },

  Functions: {
    title: "Functions & ES6",
    description:
      "Functions define reusable logic.",
    sections: [
      {
        title: "Function",
        code: `function add(a,b){
  return a+b;
}`
      },
      {
        title: "Arrow Function",
        code: `const add = (a,b) => a+b;`,
        difficulty: "Intermediate"
      },
      {
        title: "Callback",
        code: `function greet(cb){
  cb();
}`
      }
    ]
  },

  Programs: {
    title: "DOM & Events",
    description:
      "JavaScript interacts with HTML using DOM.",
    sections: [
      {
        title: "DOM Selection",
        code: `document.getElementById("id");`
      },
      {
        title: "Event Handling",
        code: `button.onclick = () => {
  alert("Clicked");
};`
      },
      {
        title: "Form Handling",
        code: `form.addEventListener("submit", e => {
  e.preventDefault();
});`,
        interview: [
          "What is DOM?",
          "What is event bubbling?"
        ]
      }
    ]
  },

  Projects: {
    title: "Async JavaScript & Projects",
    description:
      "Modern JS uses asynchronous programming.",
    sections: [
      {
        title: "Promises",
        code: `let p = new Promise((res, rej)=>{
  res("Done");
});`
      },
      {
        title: "Async/Await",
        code: `async function fetchData(){
  let res = await fetch(url);
}`
      },
      {
        title: "Fetch API",
        code: `fetch("https://api.com")
.then(res => res.json())
.then(data => console.log(data));`
      },
      {
        title: "Projects",
        difficulty: "Advanced",
        features: [
          "Todo App",
          "Weather App (API)",
          "Quiz App",
          "Portfolio Website"
        ]
      }
    ]
  }
},
  TSX: {
  Introduction: {
    title: "TSX: React with TypeScript",
    description:
      "TSX is used in React applications with TypeScript. It combines HTML-like syntax with JavaScript logic and strong typing.",
    sections: [
      {
        title: "What is TSX?",
        content:
          "TSX allows writing React components using TypeScript. It ensures type safety, better code quality, and improved developer experience.",
        difficulty: "Beginner",
        list: [
          "Used in React apps",
          "Combines JSX + TypeScript",
          "Type-safe development",
          "Better error detection"
        ],
        interview: [
          "What is TSX?",
          "Difference between JSX and TSX?",
          "Why use TypeScript in React?"
        ]
      },
      {
        title: "Basic Component",
        code: `function App() {
  return <h1>Hello TSX</h1>;
}`,
        practice: [
          "Create a component",
          "Render heading"
        ]
      }
    ]
  },

  Variables: {
    title: "Props & State",
    description:
      "Props and state are core concepts in React for managing data.",
    sections: [
      {
        title: "Props Example",
        code: `type Props = {
  name: string;
};

function Greeting({ name }: Props) {
  return <h1>Hello {name}</h1>;
}`
      },
      {
        title: "State Example",
        code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}`,
        difficulty: "Intermediate"
      }
    ]
  },

  "Data Types": {
    title: "TypeScript in React",
    description:
      "TypeScript adds type safety to React components.",
    sections: [
      {
        title: "Basic Types",
        code: `let a: number = 10;
let name: string = "TSX";`
      },
      {
        title: "Interface",
        code: `interface User {
  name: string;
  age: number;
}`
      },
      {
        title: "Props Typing",
        code: `type Props = {
  title: string;
};`,
        difficulty: "Intermediate"
      }
    ]
  },

  Loops: {
    title: "Rendering Lists",
    description:
      "React uses map() to render lists dynamically.",
    sections: [
      {
        title: "List Rendering",
        code: `const arr = [1,2,3];

return (
  <ul>
    {arr.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);`
      },
      {
        title: "Conditional Rendering",
        code: `{isLoggedIn ? <p>Welcome</p> : <p>Login</p>}`
      }
    ]
  },

  Functions: {
    title: "Hooks",
    description:
      "Hooks allow functional components to manage state and lifecycle.",
    sections: [
      {
        title: "useState",
        code: `const [count, setCount] = useState(0);`
      },
      {
        title: "useEffect",
        code: `useEffect(() => {
  console.log("Mounted");
}, []);`,
        difficulty: "Intermediate"
      },
      {
        title: "Custom Hook",
        code: `function useCounter() {
  const [count, setCount] = useState(0);
  return { count, setCount };
}`,
        difficulty: "Advanced"
      }
    ]
  },

  Programs: {
    title: "Advanced React Concepts",
    description:
      "Modern React uses advanced patterns for scalability.",
    sections: [
      {
        title: "Component Composition",
        code: `<Card>
  <h1>Title</h1>
</Card>`
      },
      {
        title: "Context API",
        code: `const Context = createContext(null);`
      },
      {
        title: "Event Handling",
        code: `<button onClick={() => alert("Clicked")}>
  Click
</button>`
      },
      {
        title: "Forms",
        code: `const [name, setName] = useState("");

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`,
        interview: [
          "What are hooks?",
          "Difference between state and props?"
        ]
      }
    ]
  },

  Projects: {
    title: "Real-World React Projects",
    description:
      "TSX is used to build modern web applications.",
    sections: [
      {
        title: "Todo App",
        difficulty: "Intermediate",
        features: [
          "Add/Delete tasks",
          "State management",
          "Local storage"
        ]
      },
      {
        title: "Dashboard UI",
        difficulty: "Advanced",
        features: [
          "Charts",
          "Responsive layout",
          "API integration"
        ]
      },
      {
        title: "Coding Platform (Your Project)",
        difficulty: "Advanced",
        features: [
          "Course system",
          "Sidebar navigation",
          "Dynamic rendering",
          "Glass UI"
        ]
      }
    ]
  }
}
};

// ================= EXPORT =================

export default courseData;
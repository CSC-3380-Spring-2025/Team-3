# ORCA Industries : [Team 3]
# Members
Project Manager: [Julian Melancon] ([JulianM08])\
Communications Lead: [Alexis Harvey] ([Alexis-Harvey])\
Git Master: [Jack Schliewe] ([thecandylane])\
Design Lead: [Mirina Benferhat] ([Mbenfe1])\
Quality Assurance Tester: [Aaroh Desai] ([AarohD1])

# About Our Software

Hello! Our project aims to combine a website aimed at playing games and allowing developers to upload games to launch their gaming careers. It is a full stack MERN application, allowing users to create accounts and create games all in one site! Currently only in local development, although we plan to go public with our recent investors in the near future!

## Platforms Tested on
- Windows
- MacOS
- UNIX/Linux
# Important Links
Kanban Board: [https://group3kanbanboard.atlassian.net/jira/software/projects/KAN/boards/1?atlOrigin=eyJpIjoiMjNkNTZjYWQwMGQ4NDM0ODg4ZTViNDQ4ODAyOTUxNmMiLCJwIjoiaiJ9]\
Designs: [link]\
Styles Guide(s): [link]

# How to Run Dev and Test Environment

## Dependencies
- List all dependencies here
- Don't forget to include versions
### Downloading Dependencies
Describe where to download the dependencies here. Some will likely require a web download. Provide links here. For IDE extensions, make sure your project works with the free version of them, and detail which IDE(s) these are available in.
"dependencies": {
    "@monaco-editor/react": "^4.7.0",
    "cors": "^2.8.5",
    "framer-motion": "^12.7.4",
    "nanoid": "^5.1.5",
    "next": "^15.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "sqlite": "^5.1.1",
    "sqlite3": "^5.1.7",
    "uuid": "^11.1.0"
  }, 
   "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/sqlite3": "^3.1.11",
    "@types/uuid": "^10.0.0",
    "eslint": "^9",
    "eslint-config-next": "15.1.7",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
  "license": "ISC",
    "dependencies": {
        "bcrypt": "^5.1.1",
        "bcryptjs": "^3.0.2",
        "compression": "^1.8.0",
        "cors": "^2.8.5",
        "dotenv": "^16.4.7",
        "envalid": "^8.0.0",
        "express": "^4.21.2",
        "helmet": "^8.0.0",
        "joi": "^17.13.3",
        "jsonwebtoken": "^9.0.2",
        "module-alias": "^2.2.3",
        "mongoose": "^8.12.1",
        "morgan": "^1.10.0",
        "multer": "^1.4.5-lts.2"
    },
    "devDependencies": {
        "@types/bcrypt": "^5.0.2",
        "@types/compression": "^1.7.5",
        "@types/cors": "^2.8.17",
        "@types/express": "^5.0.0",
        "@types/jsonwebtoken": "^9.0.9",
        "@types/morgan": "^1.9.9",
        "@types/multer": "^1.4.12",
        "@types/node": "^22.13.10",
        "@typescript-eslint/eslint-plugin": "^8.26.1",
        "@typescript-eslint/parser": "^8.26.1",
        "eslint": "^9.22.0",
        "eslint-config-prettier": "^10.1.1",
        "eslint-plugin-prettier": "^5.2.3",
        "nodemon": "^3.1.9",
        "prettier": "^3.5.3",
        "ts-node": "^10.9.2",
        "tsc-watch": "^6.2.1",
        "typescript": "^5.8.2"
    },

	NECESSARY TO RUN:

	You need to be running mongodb through docker desktop to run it as a test environment, we are still working on free vercel deployment. 
	You will also need Mongodb Compass to connect to the database

## Commands
Describe how the commands and process to launch the project on the main branch in such a way that anyone working on the project knows how to check the affects of any code they add.

First, Follow the env.example to fill in mongodb compass credentials and urls. ie, mongodb://localhost:27017/<>  ;  @localhost:27017/mydatabase

Frontend:
git pull
cd mist
npm install && docker-compose up -d
//possibly nvm use node for certain errors
npm run dev

Backend:
cd mist_server
npm install && npm run dev

optional but recommended for testing:
Postman


```sh
Example terminal command syntax
```

It is very common in these sections to see code in peculiar boxes to help them stand out. Check the markdown section of the Project Specifications to see how to add more / customize these.

```python
def code_highlight_example(m: int, m: float, s: str) -> str:
	return s + str(n*m)
```

```java
public static void main(String[] args){
	System.out.println("Hello, World!");
}
```

```c#
static void Main(){
	Console.WriteLine("Hello, World!");
}
```

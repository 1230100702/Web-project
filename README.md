Semester Project – Deliverable 1 (Client-Side Architecture)
STUDENTS NAME:	Laiba Shahzadi , Kinza Rasheed
STUDENTS ROLL NO.	23010101-026 , 23010101-092
TOTAL GRADE POINT: 10
Instructor: Museb Khalid
 
Client-Side Architecture of a Vue 3 PDF Summarizer Application
I. Introduction
PDF Summarizer is a web application intended to let a user upload a PDF file and receive a short text summary of its contents. This report covers Deliverable 1 of the project, in which only the client-side (frontend) is implemented. The interface was built with Vue 3 using the Composition API and script setup syntax, scaffolded and served through Vite. Client-side routing is handled by Vue Router, and navigation is organised around five top-level views: Home, Upload, Summary, History, and Login. Since no backend exists yet, file "upload" and "summarisation" are currently simulated on the client so that the navigation flow, state handling, and component communication can be fully demonstrated ahead of Express.js and MongoDB integration in a later deliverable.
II. System Architecture
A. Component Hierarchy
The application root, App.vue, always renders the Navbar component and a <router-view> outlet. The router-view swaps between the five view components as the route changes. Fig. 1 shows this structure, including the one explicit parent-child relationship formed by a custom component: UploadView.vue embeds the reusable UploadForm.vue and listens for a file-selected event that it emits.
 


B. Directory Structure
Source files are organised under src/ into three concerns: views/ for route-level page components, component/ for smaller reusable UI pieces, and store/ for shared reactive state, with router/ holding the Vue Router configuration. This separation keeps route-bound page logic distinct from generic, reusable widgets.

Two files, DownloadButton.vue and footer.vue, were scaffolded inside component/ for a download-summary button and a shared page footer, but are not yet implemented; they are reserved for a future UI-polish pass and do not currently affect application behaviour.
III. SPA Routing
Vue Router is configured with createWebHistory() so that URLs stay clean (no hash prefix), and every top-level view is mapped to its own path. Navigation between views is performed with <router-link> elements in Navbar.vue, and the matched component is rendered wherever <router-view> appears in App.vue.
import { createRouter, createWebHistory } from 'vue-router'
 
import HomeView from '../views/HomeView.vue'
import UploadView from '../views/UploadView.vue'
import SummaryView from '../views/SummaryView.vue'
import HistoryView from '../views/HistoryView.vue'
import LoginView from '../views/LoginView.vue'
 
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/upload', component: UploadView },
    { path: '/summary', component: SummaryView },
    { path: '/history', component: HistoryView },
    { path: '/login', component: LoginView },
  ],
})
 
export default router
Fig. 3. router/index.js — application route table.
After a file is selected, UploadView.vue also demonstrates programmatic navigation with a query parameter, pushing the user to /summary and passing the chosen file name along in the URL rather than a route parameter, which keeps SummaryView.vue decoupled from how navigation to it was triggered:
router.push({
  path: '/summary',
  query: { file: fileName }
})
IV. Modular Component Architecture
The interface is decomposed so that each view component is responsible for one screen, while cross-cutting or repeated UI is factored into component/. Navbar.vue is rendered once by App.vue and stays mounted across every route change, giving persistent top navigation. UploadForm.vue is the one reusable piece of interactive UI extracted from a view: it owns the local file-selection state (via ref) and exposes a single, well-defined event to its parent rather than performing navigation itself. This keeps UploadForm.vue reusable and easy to test in isolation, since it has no dependency on Vue Router or the shared store.
HistoryList.vue and SummaryBox.vue were also built as standalone presentational components (each currently rendering illustrative static rows/tables) alongside their corresponding views, showing that page-level layout and reusable display widgets are kept in separate files even before the two are fully wired together with live backend data in a later phase.
V. Inter-Component Communication
A. Custom Events ($emit)
The clearest example of upward communication is UploadForm.vue notifying its parent that a file was chosen. The component defines a typed emit contract with defineEmits, and only fires the event once the user confirms the upload, rather than on every file-input change:
// UploadForm.vue
const emit = defineEmits(['file-selected'])
const selectedFile = ref(null)
 
function selectFile(event) {
  selectedFile.value = event.target.files[0]
}
function uploadFile() {
  if (selectedFile.value) {
    emit('file-selected', selectedFile.value.name)
  } else {
    alert('Please select a PDF first.')
  }
}
<!-- UploadView.vue -->
<UploadForm @file-selected="handleFileSelected" />
 
function handleFileSelected(fileName) {
  addFile(fileName)
  router.push({
    path: '/summary',
    query: { file: fileName }
  })
}
Fig. 4. UploadForm.vue emits file-selected; UploadView.vue listens and reacts.
This pattern keeps behaviour execution in the right place: the child (UploadForm.vue) only reports what happened, while the parent (UploadView.vue) decides what to do about it — updating the shared history store and navigating to the summary screen.
B. Props and Downward Data Flow
Custom child components in this deliverable (UploadForm.vue) do not yet declare defineProps, since they currently need no configuration from their parent. Typed, downward props are already exercised through Vue Router's built-in RouterLink component, which accepts a required 'to' prop, as used repeatedly in Navbar.vue:
<router-link to="/upload">Upload</router-link>
<router-link to="/history">History</router-link>
Cross-view data, such as the uploaded file name and its upload history, is instead shared through fileStore.js, a small reactive() store, and through the router's query parameters. This is a deliberate, minimal design for Deliverable 1; as child components take on more configurable, data-driven UI in the next phase (e.g., a reusable summary-card or history-row component fed by backend data), they will receive that data via typed defineProps as described in the task specification.
VI. Application Walkthrough
The following screenshots were captured from the application running locally via Vite's development server (localhost:5173) and demonstrate the navigation flow described above, both before and after a file is uploaded.
 
 SummaryView.vue conditionally rendering based on the file query parameter, and comparing Figs. 8 and 11 shows HistoryView.vue reactively re-rendering as soon as addFile() pushes a new entry into fileStore.files, without any manual refresh.
VII. Conclusion
This deliverable establishes a clean, navigable Vue 3 client for PDF Summarizer: five routed views wired through Vue Router, a reusable upload component communicating upward through a typed custom event, and a lightweight reactive store bridging state across views ahead of backend integration. The next deliverable will connect this frontend to an Express.js and MongoDB backend, replace the simulated upload/summary logic with real API calls, and extend the component tree with data-driven, prop-configured child components as more dynamic content is introduced.
References
[1]  Vue.js Documentation, "Introduction," vuejs.org, 2026. [Online]. Available: https://vuejs.org/guide/introduction.html
[2]  Vue Router Documentation, "Getting Started," router.vuejs.org, 2026. [Online]. Available: https://router.vuejs.org/
[3]  Vite Documentation, "Getting Started," vitejs.dev, 2026. [Online]. Available: https://vitejs.dev/guide/
[4]  Vue.js Documentation, "Component Basics — Props and Events," vuejs.org, 2026. [Online]. Available: https://vuejs.org/guide/components/props.html


//Server side report


1. Introduction
This report presents the PDF Summarizer project, a web application that allows a registered user to upload a PDF document and receive an automatically generated summary of its content. We have built the backend of this project using Express.js as the web framework and MongoDB as the database, along with Mongoose as the connecting layer between the two.
The frontend of the application was already built using Vue.js. Our work, described in this report, was to design and implement the complete server side so that the application could store users, store uploaded files, and store their generated summaries permanently instead of only in the browser's memory.
1.1 Why We Chose Express.js and MongoDB
•Express.js is a lightweight and widely-used Node.js framework that made it simple for us to define routes, middleware, and controllers for the API in a clean and organized way.
•MongoDB is a NoSQL, document-based database that stores data as JSON-like documents, which matches naturally with the JavaScript objects used throughout the application.
•Mongoose gave us schema validation, relationships (references), and an easy query interface on top of MongoDB, without needing a separate query language.
•Together, Express.js and MongoDB let us build the entire backend using JavaScript only, keeping the whole project (frontend and backend) in a single, consistent language.
2. Project Summary
We have made this project using Express.js and MongoDB. Express.js runs as the web server that receives requests from the Vue frontend, and MongoDB (hosted on MongoDB Atlas) is the database where all application data is permanently stored. The table below summarizes what each part of the stack was used for.
Express.js
Role in the Project: Web server framework — defines all API routes, middleware, and request handling
MongoDB
Role in the Project: Database — stores users, uploaded PDF records, and generated summaries
Mongoose
Role in the Project: Connects Express.js to MongoDB and defines the data schemas
JWT (jsonwebtoken)
Role in the Project: Creates secure login tokens for authenticated users
bcryptjs
Role in the Project: Encrypts user passwords before they are stored in MongoDB
Multer
Role in the Project: Handles PDF file uploads coming into the Express.js server
pdf-parse
Role in the Project: Reads the uploaded PDF and extracts its text on the Express.js server
dotenv
Role in the Project: Loads the MongoDB connection string and other secrets safely
cors
Role in the Project: Allows the Vue frontend to communicate with the Express.js server
3. How We Used Express.js
Express.js forms the entire backend server of this project. We used it to:
•Start a single server (server.js) that listens for all incoming requests from the frontend.
•Organize the code using Express Router, so authentication routes and PDF routes are kept separate and easy to maintain.
•Write middleware functions for tasks that need to run before a request reaches its final logic — for example, checking the JWT token, or handling the uploaded file with Multer.
•Write controller functions that contain the actual logic for registering a user, logging in, uploading a PDF, and returning summary history.
•Send consistent JSON responses back to the Vue frontend for every request, whether it succeeded or failed.
3.1 Express.js Server Structure
server/
├── server.js          → creates and starts the Express.js app
├── routes/            → Express.js route definitions
├── controllers/       → request-handling logic
├── middleware/        → auth check, file upload, error handling
├── models/            → Mongoose schemas (MongoDB structure)
└── config/db.js       → connects Express.js to MongoDB
4. How We Used MongoDB
MongoDB is the single database used in this project, hosted on MongoDB Atlas (MongoDB's cloud service). We connected our Express.js server to MongoDB using Mongoose, and created two collections to store the application's data.
4.1 users Collection
Stores every registered account. Passwords are encrypted with bcrypt before MongoDB ever saves them.
name
Stored As: Text — the user's name
email
Stored As: Text — must be unique across the collection
password
Stored As: Text — stored only in encrypted (hashed) form
createdAt / updatedAt
Stored As: Date — added automatically by Mongoose
4.2 pdfs Collection
Stores one entry for every PDF a user uploads, including the summary that was generated from it.
user
Stored As: Reference to the owning document in the users collection
originalName
Stored As: Text — the file name as uploaded by the user
filePath
Stored As: Text — where the file is saved on the server
summary
Stored As: Text — the generated summary of the PDF
status
Stored As: Text — Processing, Completed, or Failed
createdAt / updatedAt
Stored As: Date — added automatically by Mongoose
4.3 Connecting Express.js to MongoDB
The connection is made once when the server starts, using a MongoDB Atlas connection string kept in an environment file so it is never hard-coded into the project:
// config/db.js
const mongoose = require('mongoose');
 
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};
5. Features Built Using Express.js and MongoDB
5.1 User Registration and Login
When a user registers or logs in from the Vue frontend, Express.js receives the request, checks it, and either creates a new document in the MongoDB users collection or verifies an existing one. A JWT token is then generated and sent back so the user stays logged in.
5.2 PDF Upload and Summarization
When a user uploads a PDF, Express.js (with Multer) receives the file, saves it on the server, and creates a new document in the MongoDB pdfs collection. The server then reads the text from the PDF and generates a summary, which is saved back into that same MongoDB document.
5.3 History
The History page in the Vue frontend calls an Express.js route that queries MongoDB for every PDF document belonging to the logged-in user, and returns them ordered by upload date.
5.4 Viewing a Summary
When a user opens a summary, Express.js looks up that single document in MongoDB by its id and returns its stored summary text to the frontend.
6. API Endpoints (Express.js Routes)
The following routes were created in Express.js. Each one reads from or writes to MongoDB.
/api/auth/register
Method: POST
What It Does in MongoDB: Creates a new document in the users collection
/api/auth/login
Method: POST
What It Does in MongoDB: Reads a document from the users collection and verifies the password
/api/auth/me
Method: GET
What It Does in MongoDB: Reads the logged-in user's document from the users collection
/api/pdf/upload
Method: POST
What It Does in MongoDB: Creates a new document in the pdfs collection and saves the summary into it
/api/pdf/history
Method: GET
What It Does in MongoDB: Reads all pdfs documents belonging to the logged-in user
/api/pdf/:id
Method: GET
What It Does in MongoDB: Reads a single pdfs document by its MongoDB id
/api/pdf/:id
Method: DELETE
What It Does in MongoDB: Removes a document from the pdfs collection
7. Testing and Verification
•Installed all Express.js and MongoDB-related packages (express, mongoose, cors, dotenv, jsonwebtoken, bcryptjs, multer, pdf-parse) and confirmed the server starts without errors.
•Confirmed the Express.js server connects successfully to the MongoDB Atlas database using the connection string in the .env file.
•Tested that registering and logging in correctly creates and reads documents in the MongoDB users collection.
•Tested that uploading a PDF correctly creates a document in the MongoDB pdfs collection and that the summary is saved back into it.
•Verified every route file, controller, and model passed a Node.js syntax check.
8. Running the Project
Backend (Express.js + MongoDB)
cd pdf-summarizer/server
npm install
cp .env.example .env      # add your MongoDB Atlas connection string
npm run dev                # starts the Express.js server on port 5000
Frontend (Vue.js)
cd pdf-summarizer
npm install
npm run dev                # starts the Vue app on port 5173
9. Expected Output (Screenshots)
The screens below show the expected output of the application once the Express.js server is running and connected to MongoDB. Data shown (users, files, summaries) is example data rendered by the Vue.js frontend after being returned from the Express.js API.
9.1 Login Page
The user signs in through this page. The credentials are sent to the /api/auth/login route, which is verified against the corresponding document in the MongoDB users collection.

Figure 1 — Login page
9.2 Upload Page
After logging in, the user selects a PDF here. On submit, the file is sent to the /api/pdf/upload route, where Express.js (via Multer) saves it and creates a new record in the MongoDB pdfs collection.

Figure 2 — Upload page
9.3 Summary Result Page
Once processing completes, the generated summary is displayed here. This text is read directly from the summary field of the matching document in the MongoDB pdfs collection.

Figure 3 — Summary result page
9.4 History Page
This page lists every PDF the logged-in user has previously uploaded, fetched from MongoDB via the /api/pdf/history route and ordered by upload date, along with each record's status.

Figure 4 — History page
10. Conclusion
We have successfully made this project using Express.js and MongoDB. Express.js was used to build the complete backend server, including user registration, login, PDF upload, and history features. MongoDB was used as the single database to permanently store users, uploaded PDF records, and their generated summaries. Together with Mongoose, JWT, bcrypt, and Multer, this gives the PDF Summarizer application a fully working, persistent backend that is directly connected to its existing Vue.js frontend.

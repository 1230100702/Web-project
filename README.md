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

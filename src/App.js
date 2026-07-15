// App .js
//Responsible for routing only
// To add a new page: import it and add a new <Router/> below.

// import './App.css';
import{BrowserRouter ,Routes, Route}from "react-router-dom"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Projects from "./pages/Projects/Projects"
import Contact from "./pages/Contact/Contact"
import Sidebar from "./componentss/Sidebar/Sidebar"
import Skills from "./pages/Skills/Skills"
import AnimateBackground from './componentss/AnimatedBackground/AnimatdBackground'
import ChatBot from "./componentss/ChatBot/ChatBot"
function App() {
  return (
    <>
    
    <BrowserRouter>
     <AnimateBackground></AnimateBackground>
      <Sidebar></Sidebar>
      
      <Routes>
        
           <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/projects" element={<Projects></Projects>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/skills" element={<Skills></Skills>}></Route>
      </Routes>
      <ChatBot></ChatBot>
    </BrowserRouter>
    

    </>
    
    
  );
}















export default App;

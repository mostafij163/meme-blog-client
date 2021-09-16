import Header from "./components/Header"
import {BrowserRouter, Route,} from "react-router-dom"
import PostMeme from "./components/PostMeme";
import Home from "./components/Home";
import Signup from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route component={PostMeme} path="/post-meme" exact />
        <Route path="/" component={Home} exact />
        <Route path="/sign-up" component={Signup} exact />
      </BrowserRouter>
    </div>
  );
}

export default App;

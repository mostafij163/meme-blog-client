import Header from "./components/Header"
import {BrowserRouter, Route,} from "react-router-dom"
import PostMeme from "./components/PostMeme";
import Home from "./components/Home";
import Signup from "./components/SignUp";
import {useState, useEffect} from "react"
import MainContext from "./store/main-ctx";
import Login from "./components/Login";

function App() {
  const [userJwt, setUserJwt] = useState("")
  const [loginStatus, setLoginStatus] = useState(false)

  const handleLoginStatus = (jwt)=> {
    localStorage.setItem("user", jwt)
    if (typeof jwt === "string") {
      setUserJwt(jwt)
      setLoginStatus(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setLoginStatus(false)
  }

  useEffect(() => {
    const jwt = localStorage.getItem("user");
    if (typeof jwt === "string") {
      setUserJwt(jwt)
      setLoginStatus(true)
    }
  }, [])

  return (
    <div className="App">
      <MainContext.Provider
        value={{
          handleLoginStatus: handleLoginStatus,
          handleLogout: handleLogout
        }}
      >
      <BrowserRouter>
        <Header loginStatus={loginStatus}/>
        <Route component={PostMeme} path="/post-meme" exact />
        <Route path="/" component={Home} exact />
          <Route path="/sign-up" component={Signup} exact />
          <Route component={Login} path="/login" exact/>
      </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;

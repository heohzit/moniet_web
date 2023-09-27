import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import { Route, Routes } from "react-router-dom";
import Main from "./component/common/Main";
import Dashboard from "./component/dashboard/Dashboard";
import Challenge from "./component/challenge/Challenge";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="App-content">
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/challenge" element={<Challenge></Challenge>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

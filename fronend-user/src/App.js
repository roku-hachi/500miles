import "./App.css";
import Header from "./component/Layout/Header";
import Footer from "./component/Layout/Footer";

function App(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default App;

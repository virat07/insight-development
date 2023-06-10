import {HomePageComponent} from './components/Homepage';
import './App.css';
import Header from './components/Header';
// import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <HomePageComponent/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;

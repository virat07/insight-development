import {HomePageComponent} from './components/homepage';
import './App.css';
import Header from './components/header';
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

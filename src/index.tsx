import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Home} from "./components/Home/Home";
import {Footer} from "./components/footer/Footer";
import backgroundImageUrl from "./components/footer/footer-min.jpg";
import {Nav} from "./components/Nav/Nav";
import {useRoute, RouteProvider} from "./router";
import {Author} from "./components/Author/Author";
import {Naturalism} from "./components/Naturalism/Naturalism";








function App() {

  const route = useRoute();

  return (
    <div className="App">


      <Nav routeName={route.name} />

      {route.name === "home" && <Home/>}
      {route.name === "author" && <Author/>}
      {route.name === "naturalism" && <Naturalism/>}

      <Footer backgroundImageUrl={backgroundImageUrl} />

    </div>



  );


}


ReactDOM.render(
  <RouteProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </RouteProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

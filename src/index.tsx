import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Home} from "./components/Home/Home";
import {Footer} from "./components/footer/Footer";
//import {Nav} from "./components/Nav/Nav";
import {useRoute, RouteProvider} from "./router";
import {Author} from "./components/Author/Author";
/*import {Naturalism, natureRouteGroup} from "./components/Gallerys/Naturalism/Naturalism";
import {Portraits, portraitRouteGroup} from "./components/Gallerys/Portraits/Portraits";
import {Events, eventsRouteGroup} from "./components/Gallerys/Events/Events";*/
import {generatedGalleryAsset} from "./generated/galleryAssets";
import {Portfolio} from "./components/Portfolio/Portfolio";
import naturalismBackground from "./assets/galleryBanners/naturalism/background-min.jpg"
import portraitBackground from "./assets/galleryBanners/portraits/portrait-background.jpg";
import eventsBackground from "./assets/galleryBanners/events/events-background.jpg";
import {description as naturalismDescription} from "./assets/galleryBanners/naturalism/description";
import logoUrl from "./assets/galleryBanners/signature.png";

import {NavMenu} from "./components/NavMenu/NavMenu";
import {routes} from "./router";

function App() {

  const route = useRoute();



  return (
    <div className="App">

      <NavMenu 
        menuItems={[
          {
            routeName: routes.accueil,
    
          },
          {
            routeName: "portfolio",
            subMenu: [
              routes.naturalisme,
              routes.portraits,
              routes.evènements,
            ]
    
          },
          {
            routeName: routes.auteur
          }

        ]}
    

      />

      {route.name === "accueil" && <Home/>}
      {route.name === "auteur" && <Author/>}
      {/*natureRouteGroup.has(route) && <Naturalism route={route}/>*/}
      {/*portraitRouteGroup.has(route) && <Portraits route={route}/>*/}
      {/*eventsRouteGroup.has(route) && <Events route={route} />*/}
      {route.name === "naturalisme" && <Portfolio
        assets={generatedGalleryAsset.directories.naturalism.directories}
        backgroundImageUrl={naturalismBackground}
        title="naturalisme"
        backgroundPosition="center"
        description={naturalismDescription}
        initialImageHeights={[300, 240, 300, 200]}
        backgroundBrightness={0.7}
        logoUrl={logoUrl}


      />}

      {
        route.name === "portraits" && <Portfolio
          assets={generatedGalleryAsset.directories.portraits.directories}
          backgroundImageUrl={portraitBackground}
          title="portraits"
          bannerHeight={70}
          initialImageHeights={[400, 300, 335, 470, 400]}
          logoUrl={logoUrl}
          backgroundBrightness={0.5}
          
        />
      }

      {
        route.name === "evènements" && <Portfolio 

          assets={generatedGalleryAsset.directories.evenements.directories}
          backgroundImageUrl={eventsBackground}
          title="évènements"
          bannerHeight={70}
          backgroundPosition="0 -300px"
          logoUrl={logoUrl}
          initialImageHeights={[300, 451]}
          backgroundBrightness={0.6}
        
        />
      }


     

      


      <Footer routeName={route.name as string}/>

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

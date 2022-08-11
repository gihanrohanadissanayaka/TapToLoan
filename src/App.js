import React, { useRef, useEffect, createContext, useState, useContext } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import UserForm from './views/UserForm';
import UserResults from './views/UserResult';

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const UserContext = createContext();

const App = () => {

  
  const [prediction, setPrediction ] = useState({
      firstName:'', 
      lastName:'',
      arreas_rentals:'',
      safe_amount:'',
      safe_factor:'',
      is_deafult:''
      });
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <UserContext.Provider value={{ prediction, setPrediction }} >
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/form" component={UserForm} layout={LayoutDefault} />
          <AppRoute exact path="/result" component={UserResults} layout={LayoutDefault} />

        </Switch>
      )} >

      </ScrollReveal>
      </UserContext.Provider>
  );
}

export default App;
export const useStateContext = () => useContext(UserContext);

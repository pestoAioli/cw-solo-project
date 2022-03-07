import React, { useContext, useEffect } from 'react';
import { getRoute } from '../Services/APIService';

import RouteSetUpContext from '../Context/routeSetUp';
import RouteContext from '../Context/routeContext';
import Loader from '../Components/Loader';
import NavReady from '../Components/NavReady';

import { initialiseRoute } from '../Services/navigationServices';
import NavArrived from '../Components/NavArrived';
import NavDirections from '../Components/NavDirections';

const Navigation = () => {
  const { routeParams } = useContext(RouteSetUpContext);
  const { currentRoute, setCurrentRoute } = useContext(RouteContext);

  useEffect(() => {
    getRoute(routeParams).then((data) => {
      const routeIndex = 0; // If no alternative routes asked, leave to 0.
      setCurrentRoute(initialiseRoute(data, routeIndex));
    });
  }, []);

  if (true) return <Loader />;
  if (currentRoute.status === 'loaded') return <NavReady />;
  if (currentRoute.status === 'arrived') return <NavArrived />;
  else return <NavDirections />;
};

export default Navigation;

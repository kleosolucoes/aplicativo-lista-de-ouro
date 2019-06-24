import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator, { ProspectosStack, Tabs, Drawer } from './MainTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Tabs: Tabs,
  Main: ProspectosStack,
});

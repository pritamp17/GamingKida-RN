import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import AuthNavigator from './AuthNavigator';
// import ChatNavigator from './ChatNavigator';
// import PaymentNavigator from './PaymentNavigator';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Auth"
        component={AuthNavigator}
        options={{
          tabBarIcon: ({ color }: { color?: string }) => (   //// to be corrected
            <MaterialIcons name="login" size={24} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chat" size={24} color={color} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Payment"
        component={PaymentNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="payment" size={24} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default MainNavigator;

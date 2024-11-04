import { Stack, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LogsContext, LogsContextProvider } from '@/store/logsctx';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
                <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                    title: 'All',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'analytics' : 'analytics-outline'} color={color} />
                    ),
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                    title: 'Current Month',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
                    ),
                    }}
                />
                </Tabs>
  );
}

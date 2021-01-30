import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SettingScreen from '../Screens/SettingsScreen'
import { AppTabNavigator } from './AppTabNavigator.js'
import CustomSideBarMenu from './CustomSideBarMenu'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Donations from '../Screens/MyDonations'
import Notifications from '../Screens/MyNotifications'
import MineAllMine from '../Screens/RecivedBooksScreen'
export const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: { screen: AppTabNavigator },
        Settings: { screen: SettingScreen },
        Donations: { screen: Donations },
        Notifications: { screen: Notifications },
        RecivedBooks: {screen: MineAllMine}
    },
    { contentComponent: CustomSideBarMenu },
    { initalRoutename: 'Home' }
)
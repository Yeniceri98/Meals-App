import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons';     // Header Button 
import { AntDesign } from '@expo/vector-icons';                     // Vector icons
import Colors from '../constants/Colors';


const CustomHeaderButton = (props) => {
    return (
        <HeaderButton 
            {...props} 
            IconComponent={AntDesign} 
            iconSize={20} 
            color={Platform.OS === "android" ? "white" : Colors.primaryColor} 
        />
    )
}

export default CustomHeaderButton



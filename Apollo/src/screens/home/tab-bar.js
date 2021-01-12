import React from 'react'
import {
    useColorScheme,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'

import Text, { Subtext } from '@app/components/text'

import Color from '@app/theme/color.js'

function TabBar(props) {
    const colorScheme = useColorScheme()
    return (
        <View style={{ ...styles.tabBar, ...props.style }}>
            <TouchableOpacity
                onPress={props.onPress}
                style={{
                    ...styles.tab,
                    ...styles.leftTab,
                    ...(!props.active ? styles.activeTab : {}),
                    ...(!props.active
                        ? {
                              backgroundColor:
                                  colorScheme === 'light'
                                      ? Color.light.activeTabBackgroundColor
                                      : Color.dark.activeTabBackgroundColor,
                          }
                        : {
                              backgroundColor:
                                  colorScheme === 'light'
                                      ? Color.light.tabBackgroundColor
                                      : Color.dark.tabBackgroundColor,
                          }),
                }}
            >
                {!props.active ? (
                    <Text
                        style={{
                            ...styles.tabBarText,
                            ...(!props.active
                                ? {
                                      color:
                                          colorScheme === 'light'
                                              ? Color.light.activeTabTextColor
                                              : Color.dark.activeTabTextColor,
                                  }
                                : {
                                      color:
                                          colorScheme === 'light'
                                              ? Color.light.secondaryTextColor
                                              : Color.dark.secondaryTextColor,
                                  }),
                        }}
                    >
                        Upcoming
                    </Text>
                ) : (
                    <Subtext>Upcoming</Subtext>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={props.onPress}
                style={{
                    ...styles.tab,
                    ...styles.rightTab,
                    ...(props.active ? styles.activeTab : {}),
                    ...(props.active
                        ? {
                              backgroundColor:
                                  colorScheme === 'light'
                                      ? Color.light.activeTabBackgroundColor
                                      : Color.dark.activeTabBackgroundColor,
                          }
                        : {
                              backgroundColor:
                                  colorScheme === 'light'
                                      ? Color.light.tabBackgroundColor
                                      : Color.dark.tabBackgroundColor,
                          }),
                }}
            >
                {props.active ? (
                    <Text
                        style={{
                            ...styles.tabBarText,
                            ...(props.active
                                ? {
                                      color:
                                          colorScheme === 'light'
                                              ? Color.light.activeTabTextColor
                                              : Color.dark.activeTabTextColor,
                                  }
                                : {
                                      color:
                                          colorScheme === 'light'
                                              ? Color.light.secondaryTextColor
                                              : Color.dark.secondaryTextColor,
                                  }),
                        }}
                    >
                        Past
                    </Text>
                ) : (
                    <Subtext>Past</Subtext>
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tabBarText: {
        fontWeight: 'bold',
    },
    activeTab: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    leftTab: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    rightTab: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
})

export default TabBar

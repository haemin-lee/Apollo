import React from 'react'
import {
    useColorScheme,
    Alert,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import { useStore } from 'react-redux'

import Text, { Header, Subtext } from '@app/components/text'
import Container from '@app/components/container'
import { RoundButton } from '@app/components/buttons'

import LottieView from 'lottie-react-native'

import { launchImageLibrary } from 'react-native-image-picker'

import Color from '@app/theme/color.js'

import get_client from '@app/api/apollo.js'

function Photos() {
    const store = useStore()

    const colorScheme = useColorScheme()

    const postPhotos = () => {
        const user = store.getState().user
        const client = get_client(user.data.id)
        const item = store.getState().checkIn

        const options = {
            mediaType: 'photo',
            quality: 0.5,
            width: 800,
            height: 800,
            includeBase64: true,
        }
        launchImageLibrary(options, async (image) => {
            if (image.didCancel) return

            const item = store.getState().checkIn
            const doc = {
                appointment: item.id,
                patient: item.data.patient,
                name: image.fileName,
                data: image.base64,
                type: 'IMAGE',
            }
            const res = await client.appointments.post_appointment_document(
                item.id,
                doc
            )

            Alert.alert(
                'Uploaded Photo',
                'Your image has been sent to the doctor. Click attach photos to add another'
            )
        })
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Container style={styles.container}>
                <LottieView
                    source={require('./photo.json')}
                    autoPlay={true}
                    loop={true}
                    style={{
                        width: 300,
                        height: 300,
                        alignSelf: 'center',
                    }}
                />
                <Header>Photos</Header>
                <Subtext style={styles.promo}>
                    Adding some images might help the doctor diagnose your
                    problem easier.
                </Subtext>
                <RoundButton
                    style={{
                        backgroundColor:
                            colorScheme === 'light'
                                ? Color.dark.backgroundColor
                                : Color.light.backgroundColor,
                    }}
                    onPress={postPhotos}
                >
                    <Text
                        style={{
                            color:
                                colorScheme === 'light'
                                    ? Color.dark.textColor
                                    : Color.light.textColor,
                        }}
                    >
                        Attach Photos
                    </Text>
                </RoundButton>
            </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    promo: {
        marginBottom: 30,
    },
})

export default Photos

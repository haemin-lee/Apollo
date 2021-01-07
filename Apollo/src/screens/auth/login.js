import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import Button from '@app/components/buttons'
import { LinkText, Subtext } from '@app/components/text'
import TextInput from '@app/components/text-input'

function Login({ styles, onLinkPress, onSubmit }) {
    const [contact, setContact] = useState('')
    const [pass, setPass] = useState('')

    const login = () => {
        onSubmit()
    }

    return (
        <View>
            <TextInput
                placeholder="Email/Phone"
                style={styles.formItem}
                value={contact}
                onChangeText={(t) => setContact(t)}
            />
            <TextInput
                placeholder="Password"
                style={styles.formItem}
                secureTextEntry={true}
                value={pass}
                onChangeText={(t) => setPass(t)}
            />
            <Button style={styles.formItem} onPress={login}>
                <Subtext>Login</Subtext>
            </Button>

            <TouchableOpacity style={styles.textButton} onPress={onLinkPress}>
                <LinkText>or sign up</LinkText>
            </TouchableOpacity>
        </View>
    )
}

export default Login

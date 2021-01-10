import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import Button from '@app/components/buttons'
import { LinkText, Subtext } from '@app/components/text'
import TextInput from '@app/components/text-input'

import get_client from '@app/api/apollo.js'

function CreateAccount({ styles, onLinkPress, onSubmit, onError }) {
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [pass, setPass] = useState('')

    const createAccount = async () => {
        try {
            const client = get_client()
            const user = await get_client().patients.create_account(
                contact,
                pass
            )
            const id = user.data.id
            onSubmit()
        } catch (e) {
            console.log(e)
            onError(e)
        }
    }

    return (
        <View>
            <TextInput
                placeholder="Name"
                style={styles.formItem}
                value={name}
                onChangeText={(t) => setName(t)}
            />
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
            <Button style={styles.formItem} onPress={createAccount}>
                <Subtext style={styles.buttonText}>Create Account</Subtext>
            </Button>

            <TouchableOpacity style={styles.textButton} onPress={onLinkPress}>
                <LinkText>or sign in</LinkText>
            </TouchableOpacity>
        </View>
    )
}

export default CreateAccount

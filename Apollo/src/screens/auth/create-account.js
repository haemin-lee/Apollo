import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import Button from '@app/components/buttons'
import { LinkText, Subtext } from '@app/components/text'
import TextInput from '@app/components/text-input'

function CreateAccount({ styles, onLinkPress }) {
    return (
        <View>
            <TextInput placeholder="Name" style={styles.formItem} />
            <TextInput placeholder="Email/Phone" style={styles.formItem} />
            <TextInput placeholder="Password" style={styles.formItem} />
            <Button style={styles.formItem}>
                <Subtext>Create Account</Subtext>
            </Button>

            <TouchableOpacity style={styles.textButton} onPress={onLinkPress}>
                <LinkText>or sign in</LinkText>
            </TouchableOpacity>
        </View>
    )
}

export default CreateAccount

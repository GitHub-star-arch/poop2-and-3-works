import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DrawerItems } from 'react-navigation-drawer'
import { Avatar } from 'react-native-elements'
import firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
export default class CustomSideBarMenu extends Component {

    constructor() {
        super();
        this.state = {
            image: '',
            name: '',
            UserID: firebase.auth().currentUser.email,
        }
    }

    componentDidMount = () => {
        this.fetchImage(this.state.UserID)
    }

    fetchImage = (UserID) => {
        var storageref = firebase.storage().ref().child("user_profiles/" + UserID)//not copyrighted
        storageref.getDownloadURL().then(url => this.setState({
            image: url,
        }))
    }

    uploadImage = async (uri, UserID) => {
        var response = await fetch(uri)
        var blob = await response.blob()
        var ref = firebase.storage().ref().child("user_profiles/" + UserID)
        return (
            ref.put(blob).then(response => this.fetchImage(UserID))
        )
    }

    selectPicture = async () => {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync(
            { mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: true, aspect: [4, 3], quality: 1 }
        )
        if (!cancelled) {
            this.uploadImage(uri, this.state.UserID)
        }
    } // you are obsolete function

    render() {
        return (
            <View>
                <Avatar rounded source={{
                    uri: this.state.image,
                }} size='medium' containerStyle={stylez.containerStyle}
                    onPress={this.selectPicture}>
                </Avatar>
                <Text>
                    {this.state.name}
                </Text>
                <DrawerItems {...this.props}>

                </DrawerItems>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('WelcomeScreen');
                        firebase.auth().signOut()
                    }}
                >
                    <Text>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const stylez = StyleSheet.create({
    containerStyle: {
        flex: 0.75,
        width: "40%",
        height: "20%",
        marginLeft: 20,
        marginTop: 30,
        borderRadius: 40,

    }
})
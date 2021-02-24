import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { render } from 'react-dom';


export default class SoundButton extends Component{ 
    playSound = async () => {
        await Audio.Sound.createAsync({
            uri:"http://soundbible.com/mp3/Buzzer-SoundBible.com-188422102.mp3"
        }, {
            shouldPlay:true,
        })
    }
    render(){
        return (
            <View>
                <TouchableOpacity style = {styles.soundbutton}>
                    <Text>
                        Play Sound
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    soundbutton: {
        backgroundColor: "red",
    }
})


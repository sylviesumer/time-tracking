import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class TimerButton extends React.Component {
    render() {
        const {color, title, small, onPress} = this.props;
        return (
            <TouchableOpacity style={[styles.button, {borderColor: color}]} onPress={onPress}>
                <Text style={[styles.buttonText, small ? styles.small : styles.large, {color}]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        minWidth: 100,
        borderWidth: 2,
        borderRadius: 3,
    },
    small: {
        fontSize: 14, 
        padding: 5,
    },
    large: {
        fontSize: 16,
        padding: 10
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bolde',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    elapasedTime: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10
    }
})
import React from 'react';
import { StyleSheet, View } from 'react-native-web';
import TimerForm from './TimerForm';
import TimerButton from './TimerButton';

export default class ToggleableTimerForm extends React.Component {
    render() {
        const {isOpen} = this.props;
        return (
            <View style={[styles.container, !isOpen && styles.buttonPadding]}>
                {isOpen ? (<TimerForm />) : (<TimerButton title="+" color="black" />)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    buttonPadding: {
        paddingHorizontal: 15,
    }
})
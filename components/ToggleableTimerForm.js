import React from 'react';
import { StyleSheet, View } from 'react-native-web';
import TimerForm from './TimerForm';
import TimerButton from './TimerButton';

export default class ToggleableTimerForm extends React.Component {
    state = {
        isOpen: false
    }
    handleFormOpen = () => {
        this.setState({isOpen: true});
    }
    handleFormClose = () => {
        this.setState({isOpen: false})
    }
    handleFormSubmit = (timer) => {
        const {onFormSubmit} = this.props;
        onFormSubmit(timer);
        this.setState({isOpen: false})
    }
    render() {
        const {isOpen} = this.state;
        return (
            <View style={[styles.container, !isOpen && styles.buttonPadding]}>
                {isOpen ? (<TimerForm onFormClose={this.handleFormClose} onFormSubmit={this.handleFormSubmit} />) : (<TimerButton onPress={this.handleFormOpen} title="+" color="black" />)}
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
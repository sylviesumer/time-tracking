import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import TimerButton from './TimerButton';

export default class TimerForm extends React.Component {
    constructor(props) {
        super(props);
        const {id, title, project} = props;
        this.state = {
            title: id ? title : '',
            project: id ? project : '',
        }
    }
    handleTitleChange = (title) => {
        this.setState({title});
    }
    handleProjectChange = (project) => {
        this.setState({project});
    }
    handleSubmit = () => {
        const {onFormSubmit, id} = this.props;
        const {title, project} = this.state;
        onFormSubmit({id, title, project});
    }
    render() {
        const {id, onFormClose} = this.props;
        const {title, project} = this.state;
        const submitText = id ? 'Update' : 'Create';
        return (
            <View style={styles.formContainer}>
                <View style={styles.attributeContainer}>
                    <Text style={styles.textInputTitle}>Title</Text>
                    <View style={styles.textInputContainer}>
                        <TextInput onChangeText={this.handleTitleChange} style={styles.textInput} value={title}  underlineColorAndroid="transparent"  />
                    </View>
                </View>
                <View style={styles.attributeContainer}>
                    <Text style={styles.textInputTitle}>Project</Text>
                    <View style={styles.textInputContainer}>
                        <TextInput onChangeText={this.handleProjectChange} style={styles.textInput} value={project} underlineColorAndroid="transparent"  />
                    </View>
                </View>
                <View style={styles.buttonGroup}>
                    <TimerButton onPress={this.handleSubmit} small color="#21ba45" title={submitText} />
                    <TimerButton onPress={onFormClose} small color="#db2828" title="Cancel" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#fff',
        borderColor: '#d6d7da',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    attributeContainer: {
        marginVertical: 8
    },
    textInputContainer: {
        borderColor: '#d6d7da',
        borderRadius: 2,
        borderWidth: 1,
        marginBottom: 5
    },
    textInput: {
        height: 30,
        padding: 5,
        fontSize: 12,
    },
    textInputTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
import React from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import uuidv4 from "uuid/v4";
import { newTimer } from "./utils/TimerUtils";
import EditableTimer from "./components/EditableTimer";
import ToggleableTimerForm from "./components/ToggleableTimerForm";

export default class App extends React.Component {
  state = {
    intervalId: 0,
    timers: [
      {
        title: "Mow the lawn",
        project: "House Chores",
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: true,
      },
      {
        title: "Bake squash",
        project: "Kitchen Chores",
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false,
      },
    ],
  };
  handleCreateFormSubmit = (timer) => {
    const { timers } = this.state;
    this.setState({ timers: [newTimer(timer), ...timers] });
  };
  handleFormSubmit = (attrs) => {
    const { timers } = this.state;
    this.setState({
      timers: timers.map((timer) => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs;
          return {
            ...timer,
            title,
            project,
          };
        }
        return timer;
      }),
    });
  };
  handleRemovePress = (timerId) => {
    this.setState({
      timers: this.state.timers.filter((t) => t.id !== timerId),
    });
  };
  toggleTimer = (timerId) => {
    this.setState((prevState) => {
      const {timers} = prevState;
      return {
        timers: timers.map((timer) => {
          const {id, isRunning} = timer;
          if (id === timerId) {
            return {
              ...timer,
              isRunning: !isRunning,
            };
          }
          return timer;
        })
      }
    })
  }
  componentDidMount() {
    const TIME_INTERVAL = 1000;
    this.intervalId = setInterval(() => {
      const { timers } = this.state;
      this.setState({
        timers: timers.map((timer) => {
          const { elapsed, isRunning } = timer;
          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };
        }),
      });
    }, TIME_INTERVAL);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    const { timers } = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}></Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.timerListContainer}>
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
            {timers.map(({ title, project, id, elapsed, isRunning }) => (
              <EditableTimer
                onRemovePress={this.handleRemovePress}
                onFormSubmit={this.handleFormSubmit}
                key={id}
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning}
                onStartPress={this.toggleTimer}
                onStopPress={this.toggleTimer}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#d6d7da",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  timerListContainer: {
    flex: 1
  },  
  timerList: {
    paddingBottom: 15,
  },
});

import React from "react";

import TimerForm from "./TimerForm";
import Timer from "./Timer";

export default class EditableTimer extends React.Component {
  state = {
    editFormOpen: false,
  };
  handleEditPress = () => {
    this.openForm();
  };
  handleFormClose = () => {
    this.closeForm();
  };
  handleSubmit = (timer) => {
    const { onFormSubmit } = this.props;
    onFormSubmit(timer);
    this.closeForm();
  };
  closeForm = () => {
    this.setState({ editFormOpen: false });
  };
  openForm = () => {
    this.setState({ editFormOpen: true });
  };
  render() {
    const {
      id,
      title,
      project,
      elapsed,
      isRunning,
      onRemovePress,
      onStartPress,
      onStopPress,
    } = this.props;
    const { editFormOpen } = this.state;
    if (editFormOpen) {
      return (
        <TimerForm
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
          id={id}
          title={title}
          project={project}
        />
      );
    }
    return (
      <Timer
        onRemovePress={onRemovePress}
        onEditPress={this.handleEditPress}
        id={id}
        title={title}
        project={project}
        elapsed={elapsed}
        isRunning={isRunning}
        onStartPress={onStartPress}
        onStopPress={onStopPress}
      />
    );
  }
}

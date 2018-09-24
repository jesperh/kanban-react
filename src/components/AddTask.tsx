import * as React from "react";
import { Button, TextField } from "@material-ui/core";
// import {addTask} from "../actions";

export interface Props {
  onAdd: (taskname: string) => void;
}

export default class AddTask extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = { taskName: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({ taskName: event.target.value });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.props.onAdd(this.state.taskName);
    this.setState({ taskName: "" });
  }

  render() {
    return (
      <React.Fragment>
        <h2>Add task:</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="standard-name"
            label="Name"
            className=""
            value={this.state.taskName}
            onChange={this.handleChange}
            margin="normal"
          />
          <Button
            size="small"
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginLeft: 10 + "px" }}
          >
            Add
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

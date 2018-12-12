import * as React from "react";

export interface IWeatherProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class extends React.Component<IWeatherProps, {}> {

  render() {
    return <h1>Hello World!</h1>;
  }
}

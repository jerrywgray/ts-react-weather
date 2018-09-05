import * as React from "react";

export interface IHelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class extends React.Component<IHelloProps, {}> {
  render() {
    console.log("rendering");
    return <h1>Hello World!</h1>;
  }
}

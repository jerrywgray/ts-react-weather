import * as React from "react";

export interface IHeaderProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export default class extends React.Component<IHeaderProps, {}> {

  render() {
    return <h1>Hello World!</h1>;
  }
}

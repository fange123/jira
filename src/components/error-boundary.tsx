import React, { PropsWithChildren } from "react";
type IFallBack = (props: { error: Error | null }) => React.ReactElement;
export class ErrorBoundary extends React.Component<
  PropsWithChildren<{ fallBack: IFallBack }>,
  { error: Error | null }
> {
  state = { error: null };
  //当子组件跑出异常，这里会接受并调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallBack, children } = this.props;
    if (error) {
      return fallBack({ error });
    }
    return children;
  }
}

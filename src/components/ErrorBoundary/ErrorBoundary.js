import React from "react";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: error };
  }

  render() {
    return this.state.hasError ? <ErrorComponent error={this.state.hasError} /> : this.props.children;
  }
}

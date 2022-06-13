import React, { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/footer/Footer";

export default function HomeTemplace(props) {
  const { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Route
      {...restProps}
      render={(propsRouter) => {
        return (
          <Fragment>
            <Header />
            <Component />
            <Footer />
          </Fragment>
        );
      }}
    />
  );
}

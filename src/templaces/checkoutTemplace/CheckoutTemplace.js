import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { USER_LOGIN } from "../../util/setting/config";

const CheckoutTemplace = (props) => {
  const { Component, ...restProps } = props;
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...restProps}
      render={(propsRouter) => {
        return (
          <Fragment>
            <Component {...propsRouter} />
          </Fragment>
        );
      }}
    />
  );
};

export default CheckoutTemplace;

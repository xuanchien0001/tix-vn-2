import { useRef, useEffect, Profiler } from "react";
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import HomeTemplace from "./templaces/homeTemplace/HomeTemplace";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import HomePage from "./pages/homepage/HomePage";
import Detail from "./pages/Detail/Detail";
import { Route } from "react-router-dom";
import Login from "./pages/login/Login";
import CheckoutTemplace from "./templaces/checkoutTemplace/CheckoutTemplace";
import Checkout from "./pages/checkout/Checkout";
import Register from "./pages/register/Register";
import Loading from "./pages/loading/Loading";
import Profile from "./pages/profile/Profile";
import AdminTemplace from "./templaces/AdminTemplace/AdminTemplace";
import Films from "./pages/admin/films/Films";
import Showtime from "./pages/admin/showtime/Showtime";
import AddNewFilm from "./pages/admin/films/addNewFilm/AddNewFilm";
import EditFilm from "./pages/admin/films/editFilm/EditFilm";
import ListUser from "./pages/admin/user/list_user/ListUser";
import ListUserBootstrap from "./pages/admin/user/list_user/ListUserBootstrap";
const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplace path="/contact" exact Component={Contact} />
        <HomeTemplace path="/about" exact Component={About} />
        <HomeTemplace path="/home" exact Component={HomePage} />
        <HomeTemplace path="/profile" exact Component={Profile} />
        <HomeTemplace path="/detail/:id" exact Component={Detail} />
        <AdminTemplace path="/admin/list-user" exact Component={ListUser} />
        <AdminTemplace path="/admin/list-user-boostrap" exact Component={ListUserBootstrap} />
        <AdminTemplace path="/admin/list-user" exact Component={ListUser} />
        <AdminTemplace path="/admin/films" exact Component={Films} />
        <AdminTemplace path="/admin/addnewfilm" exact Component={AddNewFilm} />
        <AdminTemplace path="/admin/editfilm/:maPhim" exact Component={EditFilm} />
        <AdminTemplace path="/admin/showtime" exact Component={Showtime} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <CheckoutTemplace path="/checkout/:id" exact Component={Checkout} />
        <HomeTemplace path="/" exact Component={HomePage} />
      </Switch>
    </Router>
  );
}
export { history };
export default App;

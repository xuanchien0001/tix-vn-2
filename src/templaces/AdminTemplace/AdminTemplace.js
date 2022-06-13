import "./AdminTemplace.scss";
import { USER_LOGIN } from "../../util/setting/config";
import Swal from "sweetalert2";
import { FileOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { DesktopOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import DropdownUser from "../Layout/Header/DropdownUser";
import { Redirect } from "react-router-dom";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem(<NavLink to="/admin/showtime">Showtime</NavLink>, "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem(<NavLink to="/admin/list-user">Danh sách user</NavLink>, "3"),
    getItem(<NavLink to="/admin/list-user-boostrap">DS User Boostrap</NavLink>, "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Films", "sub2", <TeamOutlined />, [
    getItem(<NavLink to="/admin/films">Films</NavLink>, "6"),
    getItem(<NavLink to="/admin/addnewfilm">Add Film</NavLink>, "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const AdminTemplace = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Component, ...routeProps } = props;
  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  if (!userLogin || userLogin.maLoaiNguoiDung === "KhachHang") {
    Swal.fire("Bạn chưa đăng nhập!");
    return <Redirect to="/home" />;
  }

  return (
    <Route
      {...routeProps}
      render={(PropsRouter) => {
        return (
          <>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <NavLink to="/" className="logo">
                  <img src="./img/logoTixLoading.png" width={100} className="mx-auto" />
                </NavLink>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background text-right"
                  style={{ padding: "0 2rem", backgroundColor: "white" }}
                >
                  <DropdownUser />
                </Header>
                <Content
                  style={{
                    padding: "0 16px",
                  }}
                >
                  <div
                    //   className="site-layout-background"
                    style={{ padding: 0, minHeight: 360 }}
                  >
                    <Component {...PropsRouter} />
                  </div>
                </Content>
              </Layout>
            </Layout>
          </>
        );
      }}
    />
  );
};

export default AdminTemplace;

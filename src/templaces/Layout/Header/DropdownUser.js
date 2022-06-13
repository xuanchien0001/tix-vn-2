import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Menu, Space } from "antd";
import { NavLink } from "react-router-dom";
import { USER_LOGIN } from "../../../util/setting/config";
const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: <NavLink to="/profile">Profile</NavLink>,
      },
      {
        key: "2",
        label: (
          <a href="/home" onClick={() => window.localStorage.clear()}>
            Đăng xuất
          </a>
        ),
      },
    ]}
  />
);

export default function DropdownUser() {
  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  const { t } = useTranslation();

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown overlay={menu} placement="bottomLeft">
          <h3 className="cursor-pointer">
            {t("Welcome")} {userLogin.taiKhoan}
          </h3>
        </Dropdown>
      </Space>
    </Space>
  );
}

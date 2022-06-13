import React, { useState, useEffect, useRef } from "react";
import { Table, Input } from "antd";
import { getListUserAction } from "../../../../redux/actions/QuanLyUserAction/ActionName";
const columns = [
  {
    title: "Tài khoản",
    dataIndex: "taiKhoan",
    key: "taiKhoan",
    //     render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "số điện thoại",
    dataIndex: "soDt",
    key: "soDt",
    width: "20%",
  },

  {
    title: "họ tên",
    dataIndex: "hoTen",
    key: "hoTen",
  },
  {
    title: "mat khau",
    dataIndex: "matKhau",
    key: "matKhau",
  },
];

const App = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const fetchData = (value, soTrang, soPhanTuTrenTrang) => {
    // setLoading(true);
    let valuePromise = getListUserAction(value, soTrang, soPhanTuTrenTrang);
    valuePromise.then((kq) => {
      setData(kq);
      // setLoading(false);
      setPagination({ ...pagination, total: kq.totalCount });
    });
  };

  useEffect(
    () => fetchData(valueSearch, pagination.current, pagination.pageSize),
    [pagination.current, pagination.pageSize]
  );

  const handleTableChange = (newPagination, filters, sorter) => {
    console.log(newPagination);
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  // search debounce
  const isRun = useRef(null);
  const SearchDebounce = (value) => {
    setValueSearch(value);
    if (isRun) clearTimeout(isRun.current);
    isRun.current = setTimeout(
      () => fetchData(value, pagination.current, pagination.pageSize),
      500
    );
  };
  // ket thuc test debounce
  return (
    <div>
      <h3>Danh sách người dùng</h3>
      <Input addonBefore="Tìm kiếm" onChange={(e) => SearchDebounce(e.target.value)} />
      <br />
      <Table
        columns={columns}
        rowKey="taiKhoan"
        dataSource={data?.items}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        // scroll={{ y: 400 }}
      />
    </div>
  );
};

export default App;

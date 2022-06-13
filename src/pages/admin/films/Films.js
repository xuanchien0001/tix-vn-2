import React, { useEffect, useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePhimAction,
  layDanhSachPhim,
  searchPhim,
} from "../../../redux/actions/QuanLyPhimAction/ActionName";
import { history } from "../../../App";
import Swal from "sweetalert2";
const { Search } = Input;
export default function Films() {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const scroll = {};
  scroll.y = 350;
  const [filteredInfo, setFilteredInfo] = useState({});
  useEffect(() => dispatch(layDanhSachPhim()), []);
  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setPagination({ current: pagination.current });
  };
  const { danhSachPhim } = useSelector((state) => state.QuanLyPhimReducer);

  // bắt đầu phần search tên phim
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  // kết thúc phần search tên phim
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      render: (maPhim) => <p>{maPhim}</p>,
      width: "7%",
      sortOrder: "descend",
    },
    {
      title: "Tình trạng",
      dataIndex: "sapChieu",
      filters: [
        { text: "Đang chiếu", value: false },
        { text: "Sắp chiếu", value: true },
      ],
      render: (sapChieu) => (sapChieu ? "Sắp chiếu" : "Đang chiếu"),
      width: "10%",
      onFilter: (value, record) => record.sapChieu === value,
    },
    {
      title: "Tên phim",
      key: "biDanh",
      dataIndex: "tenPhim",
      width: "25%",
      ...getColumnSearchProps("biDanh"),
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      width: "8%",
      // render: (hinhAnh) => <img src={hinhAnh} width={100} />,
      render: (text, record, index) => {
        return (
          <a className="text-center block w-full" onClick={() => PopupImage(record)}>
            <img className="mx-auto" width={40} src={text} /> <span>Zoom</span>
          </a>
        );
      },
    },
    { title: "Mô tả", dataIndex: "moTa", render: (moTa) => `${moTa}`, width: "45%" },
    {
      title: "Action",
      key: "action",
      render: (text) => (
        <div className=" text-center">
          <i
            className="fas fa-edit fa-2x text-green-600 cursor-pointer"
            onClick={() => history.push(`/admin/editfilm/${text.maPhim}`)}
          ></i>
          <br />
          <br />
          <i
            className="fas fa-trash fa-2x text-red-600 cursor-pointer"
            onClick={() =>
              Swal.fire({
                title: "Bạn đang xóa phim?",
                text: `Bạn đang xóa "${text.tenPhim}"`,
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Hủy!",
                confirmButtonText: "Xóa ngay!",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deletePhimAction(text.maPhim));
                  console.log(324);
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  Swal.fire({ title: "Đã hủy!", icon: "error", timer: 700 });
                }
              })
            }
          ></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Search
        placeholder="Tìm kiếm phim"
        onSearch={(value) => dispatch(searchPhim(value))}
        style={{ width: 400, marginBottom: 30 }}
        enterButton="Tìm kiếm"
        onChange={(e) => e.target.value === "" && dispatch(layDanhSachPhim())}
      />
      <Button className="float-right" onClick={() => history.push("/admin/addnewfilm")}>
        Thêm phim
      </Button>
      <Table
        columns={columns}
        rowKey={"maPhim"}
        bordered
        // rowKey={(record) => record.login.uuid}
        dataSource={danhSachPhim}
        pagination={pagination}
        // loading={loading}
        // scroll={scroll}
        onChange={handleTableChange}
      />
    </div>
  );
}

function PopupImage(infoPhim) {
  Swal.fire({
    // title: "Sweet!",
    text: `${infoPhim.tenPhim}`,
    imageUrl: infoPhim.hinhAnh,
    imageWidth: 400,
    imageHeight: "auto",
    confirmButtonText: "Đóng!",
    imageAlt: "Custom image",
  });
}

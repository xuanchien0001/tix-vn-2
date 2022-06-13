import React, { useEffect, useState, useRef } from "react";
import {
  capNhatThongTinNguoiDungAction,
  getListUserAction,
} from "../../../../redux/actions/QuanLyUserAction/ActionName";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cellEditFactory from "react-bootstrap-table2-editor";
import { MA_NHOM } from "../../../../util/setting/config";

//
const { ExportCSVButton } = CSVExport;
const columns = [
  { dataField: "taiKhoan", text: "Tài khoản" },
  {
    dataField: "email",
    text: "Email",
    validator: (newValue, row, column) => validation(newValue, row, column),
  },
  { dataField: "hoTen", text: "Họ tên" },
];
function validation(newValue, row, column) {
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!filter.test(newValue)) {
    return {
      valid: false,
      message: "Email không đúng định dạng!",
    };
  }
  return true;
}
//
let isEditing = false;
const RemotePagination = ({ data, page, sizePerPage, onTableChange, totalSize, ...props }) => (
  <div>
    <BootstrapTable
      remote
      keyField="taiKhoan"
      data={data}
      columns={columns}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      onTableChange={onTableChange}
      cellEdit={cellEditFactory({
        mode: "click",
        blurToSave: true,
        onStartEdit: (row, column, rowIndex, columnIndex) => {
          console.log("start to edit!!!");
        },
        beforeSaveCell: (oldValue, newValue, row, column) => {
          if (oldValue !== newValue) {
            let dataSubmit = { ...row, maNhom: MA_NHOM, [column.dataField]: newValue };
            capNhatThongTinNguoiDungAction(dataSubmit);
            isEditing = true;
          }
        },
        afterSaveCell: (oldValue, newValue, row, column) => {
          console.log("After Saving Cell!!");
        },
      })}
      {...props}
    />
  </div>
);

//
export default function ListUserBootstrap() {
  //
  const [stateiInit, setStateiInit] = useState({
    page: 1,
    data: [],
    sizePerPage: 10,
    totalCount: 10,
  });
  const searchValue = useRef("");
  //
  const fetchData = (value, soTrang, soPhanTuTrenTrang) => {
    let valuePromise = getListUserAction(value, soTrang, soPhanTuTrenTrang);
    valuePromise.then((kq) => {
      setStateiInit(() => ({ data: kq.items, totalCount: kq.totalCount }));
    });
  };

  useEffect(() => {
    fetchData(searchValue.current, 1, 10);
    return () => (isEditing = false);
  }, [isEditing]);

  const handleTableChange = (type, { page, sizePerPage }) => {
    let valuePromise = getListUserAction(searchValue.current, page, sizePerPage);
    valuePromise.then((kq) => {
      setStateiInit(() => ({ page, data: kq.items, sizePerPage }));
    });
  };
  console.log("render", isEditing);
  // xử lu search
  const timer = useRef(null);
  const handleSearch = (e) => {
    searchValue.current = e.target.value;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fetchData(searchValue.current, 1, 10);
    }, 1000);
  };
  //
  const { data, sizePerPage, page } = stateiInit;

  return (
    <>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Tìm kiếm
          </span>
        </div>
        <input onChange={handleSearch} className="form-control" placeholder="Tìm kiếm" />
      </div>

      <ToolkitProvider
        keyField="taiKhoan"
        page={page}
        sizePerPage={sizePerPage}
        totalSize={stateiInit.totalCount}
        onTableChange={handleTableChange}
        data={data}
        columns={columns}
        exportCSV
      >
        {(props) => (
          <div>
            <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton>
            <hr />
            <RemotePagination
              data={data}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={stateiInit.totalCount}
              onTableChange={handleTableChange}
              {...props.baseProps}
            />
            {/* <BootstrapTable {...props.baseProps} /> */}
          </div>
        )}
      </ToolkitProvider>

      {/* <RemotePagination
        data={data}
        page={page}
        sizePerPage={sizePerPage}
        totalSize={stateiInit.totalCount}
        onTableChange={handleTableChange}
      /> */}
    </>
  );
}

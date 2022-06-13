import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter, selectFilter } from "react-bootstrap-table2-filter";
import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
const selectOptions = {
  0: "good",
  1: "Bad",
  2: "unknown",
};

const columns = [
  {
    dataField: "id",
    text: "Product ID",
  },
  {
    dataField: "name",
    text: "Product Name : ",
    filter: textFilter(),
  },
  {
    dataField: "price",
    text: "Gia ban: ",
    formatter: (cell) => selectOptions[cell],
    filter: selectFilter({
      options: selectOptions,
      defaultValue: 0,
    }),
  },
];

export default class Table extends React.Component {
  state = {
    items: [
      {
        taiKhoan: "0901959488",
        matKhau: "12345",
        email: "test11@gmail.com",
        soDt: "12334",
        maNhom: null,
        maLoaiNguoiDung: "QuanTri",
        hoTen: "suomi",
      },
      {
        taiKhoan: "0941234234",
        matKhau: "12345600000",
        email: "lamhoang1@gmail.com",
        soDt: "9999999991",
        maNhom: null,
        maLoaiNguoiDung: "QuanTri",
        hoTen: "string",
      },
      {
        taiKhoan: "11111111a",
        matKhau: "12345",
        email: "long@gmail.com",
        soDt: "12345",
        maNhom: null,
        maLoaiNguoiDung: "QuanTri",
        hoTen: "long",
      },
      {
        taiKhoan: "121212ddd",
        matKhau: "12345678",
        email: "dd@qwe.vcf",
        soDt: "1111111111",
        maNhom: null,
        maLoaiNguoiDung: "QuanTri",
        hoTen: "Ha hiep",
      },
      {
        taiKhoan: "123@111",
        matKhau: "12345678",
        email: "dd@sad.vn",
        soDt: "0912321312",
        maNhom: null,
        maLoaiNguoiDung: "KhachHang",
        hoTen: "nguyen ha",
      },
      {
        taiKhoan: "123@admin",
        matKhau: "123456",
        email: "b@gmail.com",
        soDt: "123213",
        maNhom: null,
        maLoaiNguoiDung: "QuanTri",
        hoTen: "bang12345",
      },
      {
        taiKhoan: "123@admin10",
        matKhau: "13456",
        email: "hjhjhj@gmail.com",
        soDt: "0993333221",
        maNhom: null,
        maLoaiNguoiDung: "QuanTri",
        hoTen: "thai minh",
      },
      {
        taiKhoan: "123@admin4",
        matKhau: "123456",
        email: "bnhg@gmail.com",
        soDt: "1244413",
        maNhom: null,
        maLoaiNguoiDung: "QuanTri",
        hoTen: "bang",
      },
      {
        taiKhoan: "123@admin7",
        matKhau: "123456",
        email: "123admin@gmail.com",
        soDt: "0911555666",
        maNhom: null,
        maLoaiNguoiDung: "QuanTri",
        hoTen: "Changed 3/6/2022",
      },
      {
        taiKhoan: "12312312311",
        matKhau: "123456",
        email: "nmtt1@gmail.com",
        soDt: "0388888888",
        maNhom: null,
        maLoaiNguoiDung: "QuanTri",
        hoTen: "Trí",
      },
      {
        taiKhoan: "123123123r",
        matKhau: "123123123r",
        email: "123123213@gmail.com",
        soDt: "123123123",
        maNhom: null,
        maLoaiNguoiDung: "KhachHang",
        hoTen: "123123123r",
      },
      {
        taiKhoan: "1233211",
        matKhau: "123456",
        email: "xm3213@gmail.com",
        soDt: "0388888889",
        maNhom: null,
        maLoaiNguoiDung: "QuanTri",
        hoTen: "nguyen van teo em",
      },
      {
        taiKhoan: "1234",
        matKhau: "0123456789",
        email: "1234321321@gmail.com",
        soDt: "03489798254",
        maNhom: null,
        maLoaiNguoiDung: "KhachHang",
        hoTen: "string7777",
      },
      {
        taiKhoan: "12341234",
        matKhau: "Aahahaha1234",
        email: "admin@gamil.com",
        soDt: "01234567899",
        maNhom: null,
        maLoaiNguoiDung: "KhachHang",
        hoTen: "nguyen a",
      },
      {
        taiKhoan: "1234a",
        matKhau: "dasdasdasdasd",
        email: "1234aa@gmail.comds",
        soDt: "0983222212",
        maNhom: null,
        maLoaiNguoiDung: "QuanTri",
        hoTen: "Nguyen Thành Long ",
      },
      {
        taiKhoan: "1234z",
        matKhau: "1234",
        email: "1213@gmail.com",
        soDt: "22222666",
        maNhom: null,
        maLoaiNguoiDung: "KhachHang",
        hoTen: "6666",
      },
      {
        taiKhoan: "123qwe",
        matKhau: "123",
        email: "123qwe123@gmail.com",
        soDt: "123",
        maNhom: null,
        maLoaiNguoiDung: "KhachHang",
        hoTen: "123",
      },
      {
        taiKhoan: "123t123",
        matKhau: "123456",
        email: "123t@gmail.com",
        soDt: "0901250813",
        maNhom: null,
        maLoaiNguoiDung: "KhachHang",
        hoTen: "ducbede12345633",
      },
      {
        taiKhoan: "1admin",
        matKhau: "1admin",
        email: "1admin1@gmail.com",
        soDt: "0918394712",
        maNhom: null,
        maLoaiNguoiDung: "KhachHang",
        hoTen: "Admin ",
      },
      {
        taiKhoan: "999033893",
        matKhau: "ilovemyindia28",
        email: "ayush.tamta8@gmail.com",
        soDt: "9990833893",
        maNhom: null,
        maLoaiNguoiDung: "KhachHang",
        hoTen: "ayush",
      },
    ],
  };

  render() {
    const options = {
      custom: true,
      paginationSize: 4,
      pageStartIndex: 1,
      firstPageText: "First",
      prePageText: "Back",
      nextPageText: "Next",
      lastPageText: "Last",
      nextPageTitle: "First page",
      prePageTitle: "Pre page",
      firstPageTitle: "Next page",
      lastPageTitle: "Last page",
      showTotal: true,
      totalSize: this.state.products.length,
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
      <div>
        <PaginationListStandalone {...paginationProps} />
        <div>
          <div>
            <BootstrapTable
              striped
              hover
              keyField="id"
              data={this.state.products}
              columns={columns}
              filter={filterFactory()}
              {...paginationTableProps}
            />
          </div>
        </div>
        <PaginationListStandalone {...paginationProps} />
      </div>
    );

    return (
      <div>
        <PaginationProvider pagination={paginationFactory(options)}>
          {contentTable}
        </PaginationProvider>
      </div>
    );
  }
}

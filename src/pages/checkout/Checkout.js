import React, { Fragment, useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs } from "antd";
import moment from "moment";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { datVeAction, Lay_DS_PhongVe } from "../../redux/actions/QuanLyDatVeAction/ActionName";
import {
  CHON_GHE,
  KIEM_TRA_GHE,
  LICH_SU_DAT_VE,
} from "../../redux/actions/QuanLyDatVeAction/constName";

import "./checkout.scss";
import { getInfoUserAction } from "../../redux/actions/QuanLyUserAction/ActionName";
import { imgNotFound } from "../../util/setting/config";
import { history } from "../../App";

function Checkout() {
  const { userLogin } = useSelector((state) => state.QuanLyUserReducer);
  const { DS_PhongVe, DS_GheDangChon, DS_Ghe_Sold } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Lay_DS_PhongVe(id));
    let timerInterval = setInterval(() => {
      dispatch(Lay_DS_PhongVe(id));
    }, 6000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [id]);

  useEffect(() => {
    dispatch({ type: KIEM_TRA_GHE, payload: DS_GheDangChon });
    return () => {};
  }, [DS_Ghe_Sold.length]);

  let tongTien = () => {
    return DS_GheDangChon?.reduce((tong, gia) => tong + gia.giaVe, 0).toLocaleString("en");
  };
  let thongTinDatVe = () => {
    let danhSachVe = DS_GheDangChon?.map((item) => ({
      maGhe: item.maGhe,
      giaVe: item.giaVe,
    }));
    return { maLichChieu: id, danhSachVe: danhSachVe };
  };

  const datVe = () => {
    if (thongTinDatVe().danhSachVe.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Bạn chưa chọn ghế!",
        text: "Hãy chọn ghế và đặt lại!",
        timer: 2000,
        timerProgressBar: true,
      });
    } else {
      const swalWithTailwincss = Swal.mixin({
        customClass: {
          confirmButton: "bg-green-600 text-white rounded  py-1 px-2",
          cancelButton: "bg-red-600 text-white rounded py-1 px-2 mr-2",
        },
        buttonsStyling: false,
      });

      swalWithTailwincss
        .fire({
          title: "Bạn đang đặt vé?",
          text: "Vé sẽ không được hoàn trả sau khi đặt!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Đặt ngay!",
          cancelButtonText: "Hủy đặt",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(datVeAction(thongTinDatVe()));
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: "Đã hủy!",
              icon: "",
              timer: 1000,
            });
          }
        });
    }
  };
  // debounce
  const isRun = useRef(null);
  function checkTrangThaiGhe() {
    isRun.current && clearTimeout(isRun.current);
    isRun.current = setTimeout(() => dispatch(Lay_DS_PhongVe(id)), 1500);
  }
  //ket thuc debounce

  const renderGhe = () => {
    return DS_PhongVe.danhSachGhe?.map((ghe, index) => {
      let styleGhe = "Thuong";
      if (ghe.loaiGhe === "Vip") styleGhe = "Vip";
      if (ghe.daDat) styleGhe = "daBan";
      if (ghe.taiKhoanNguoiDat === userLogin.taiKhoan) styleGhe = "ghebanDaDat";

      DS_GheDangChon?.map((item) => {
        if (item.maGhe === ghe.maGhe) styleGhe = "daDat";
      });

      return (
        <Fragment key={index}>
          <button
            disabled={ghe.daDat}
            onClick={() => {
              dispatch({ type: CHON_GHE, payload: ghe });
              checkTrangThaiGhe();
            }}
            className={styleGhe}
          >
            {ghe.tenGhe}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="checkout ">
      <div className=" mx-auto ">
        <div className="grid grid-cols-12 h-screen">
          <div className="col-span-8 bg-[#565656] ">
            <div className="bg-black w-4/5 h-4 text-white text-center mx-auto pb-5">Màn hình</div>
            <div className="trapezoid"></div>
            <div className="mt-8 flex justify-center">
              <span>{renderGhe()}</span>
            </div>
            <div className="ml-8">
              <h1 className="text-white font-bold">Chú thích:</h1>
              <div className="flex items-center">
                <button className="Thuong" /> <span className="text-white">Ghế trống</span>
              </div>
              <div className="flex items-center">
                <button className="Vip" /> <span className="text-white">Ghế Vip</span>
              </div>
              <div className="flex items-center">
                <button className="daDat" /> <span className="text-white">Ghế bạn đang chọn</span>
              </div>
              <div className="flex items-center">
                <button className="daBan" /> <span className="text-white">Ghế đã bán</span>
              </div>
              <div className="flex items-center">
                <button className="ghebanDaDat" />{" "}
                <span className="text-white">Ghế bạn đã đặt</span>
              </div>
            </div>
          </div>

          <div className="col-span-4 h-full">
            <h1 className="text-center text-green-600 text-2xl  ">{tongTien()}đ</h1>
            <hr />

            <div className="ml-4 my-4">
              <span className="bg-orange-600 text-white p-1 rounded">C18</span>
              <span className="ml-2 font-bold">{DS_PhongVe.thongTinPhim?.tenPhim}</span>
            </div>
            <div className="ml-4 my-4">
              <h1 className="font-semibold">{DS_PhongVe.thongTinPhim?.tenCumRap}</h1>
              <p>Địa điểm: {DS_PhongVe.thongTinPhim?.diaChi}</p>
              <p className="font-semibold">
                {DS_PhongVe.thongTinPhim?.ngayChieu} - {DS_PhongVe.thongTinPhim?.gioChieu} -{" "}
                {DS_PhongVe.thongTinPhim?.tenRap}
              </p>
            </div>
            <hr />
            <div className="flex justify-between mx-4 my-4">
              <span className="text-orange-600 font-semibold">
                Ghế:{" "}
                {DS_GheDangChon?.map((ghe) => (
                  <span className="mx-1 text-blue-600" key={ghe.stt}>
                    {ghe.stt}
                  </span>
                ))}
              </span>
              <span className="text-green-600 font-bold">{tongTien()}đ</span>
            </div>
            <hr />
            <div className="mx-4 my-4">
              <i>Email: </i>
              <span className="font-bold">{userLogin?.email}</span>
            </div>
            <hr />
            <div className="mx-4 my-4">
              <i>Account: </i>
              <span className="font-bold">{userLogin?.taiKhoan}</span>
            </div>
            <hr />
            <div className="mx-4 my-4">
              <i>Số điện thoại: </i>
              <span className="font-bold">{userLogin?.soDT}</span>
            </div>
            <hr />
            <div className=" flex flex-col justify-end">
              <button
                type="button"
                onClick={() => datVe()}
                className="m-4  text-xl py-3 font-semibold rounded bg-green-400 text-gray-100"
              >
                ĐẶT VÉ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KetQuaDatVe() {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector((state) => state.QuanLyUserReducer);
  useEffect(() => dispatch(getInfoUserAction()), []);

  const renderLichSuDatVe = () =>
    thongTinNguoiDung.thongTinDatVe?.map((item, index) => {
      let dsGhe = [];
      for (let i of item.danhSachGhe) {
        dsGhe.push(i.tenGhe);
      }
      dsGhe = [...new Set(dsGhe)];
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={item.hinhAnh}
              onError={(e) => imgNotFound(e)}
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">{item.tenPhim}</h2>
              <p className="text-gray-500">
                Ngày đặt: {moment(item.ngayDat).format("hh:mm A - DD/MM/YYYY")}
              </p>
              <p>
                Địa điểm: {item.danhSachGhe[0].tenRap} - {item.danhSachGhe[0].tenHeThongRap}{" "}
              </p>
              <p>
                Số ghế:{" "}
                {dsGhe?.map((item) => (
                  <span className="mx-1 text-green-600" key={item}>
                    {item},
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      );
    });
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Lịch sử đặt vé!
          </h1>
        </div>
        <div className="flex flex-wrap -m-2">{renderLichSuDatVe()}</div>
      </div>
    </section>
  );
}

const { TabPane } = Tabs;
const operations = (
  <img
    onClick={() => history.push("/home")}
    src="https://movie-booking-project.vercel.app/img/logoTixLoading.png"
    className="cursor-pointer w-24"
  />
);

export default (props) => {
  const dispatch = useDispatch();
  const { chuyenTab } = useSelector((state) => state.QuanLyDatVeReducer);
  useEffect(() => setTimeout(() => window.scrollTo({ top: 0 }), 1000), []);
  function callback(key) {
    dispatch({ type: LICH_SU_DAT_VE, payload: key });
  }
  return (
    <div className="container mx-auto">
      <Tabs tabBarExtraContent={operations} activeKey={chuyenTab} onChange={callback}>
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
};

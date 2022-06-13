import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Detail.scss";
import { layThongTInLichChieuPhim } from "../../redux/actions/QuanLyRapAction/actionName";
import { Tabs } from "antd";
import moment from "moment";
import { history } from "../../App";
const { TabPane } = Tabs;

export default function Detail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => dispatch(layThongTInLichChieuPhim(id)), [id]);
  const { thongTinLichChieuPhim } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  const renderLichChieu = (arr) => {
    if (Array.isArray(arr) && arr.length === 0) {
      return (
        <div className="text-red-600 font-extrabold text-3xl">
          Phim này chưa có lịch chiếu!
        </div>
      );
    } else {
      return (
        <Tabs tabPosition={"left"} tabBarStyle={{ border: "1px solid #ccc" }}>
          {arr?.map((item, index) => (
            <TabPane tab={<img src={item.logo} width={70} />} key={index}>
              {item.cumRapChieu?.map((item, index) => (
                <div className="border" key={index}>
                  <div className="flex mt-4 ml-4">
                    <img
                      src={item.hinhAnh}
                      alt={item.tenPhim}
                      width={70}
                      onError={(e) => (
                        (e.target.onerror = null),
                        (e.target.src =
                          "https://image.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg")
                      )}
                    />
                    <div>
                      <h4 className="ml-4">{item.tenCumRap}</h4>
                      <p className="ml-4">{item.diaChi}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 grid-cols-6 m-4">
                    {item.lichChieuPhim?.slice(0, 12).map((item, key) => (
                      <button
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        key={key}
                        onClick={() =>
                          history.push(`/checkout/${item.maLichChieu}`)
                        }
                      >
                        {moment(item.ngayChieuGioChieu).format("hh:mm A")}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </TabPane>
          ))}
        </Tabs>
      );
    }
  };
  console.log(thongTinLichChieuPhim);
  return (
    <div
      className="detailPage"
      style={{
        backgroundImage: `url("${thongTinLichChieuPhim.hinhAnh}")`,
      }}
    >
      <div className="box1">
        <div className="container mx-auto py-12 lg:flex px-40">
          <div
            className="h-48 lg:h-96 lg:w-72 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{
              backgroundImage: `url("${thongTinLichChieuPhim.hinhAnh}")`,
            }}
            title={thongTinLichChieuPhim.tenPhim}
          ></div>
          <div className="flex items-center flex-grow bg-[rgba(0,0,0,0.2)] rounded-b lg:rounded-b-none lg:rounded-r p-4 justify-between leading-normal">
            <div className="mr-4">
              <div className="text-white font-bold text-xl text-left mb-2">
                {thongTinLichChieuPhim.tenPhim}
              </div>
              <p className="text-left">
                Tình trạng:{" "}
                {thongTinLichChieuPhim.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
              </p>
              <p className="text-white text-base text-left">
                {thongTinLichChieuPhim.moTa}
              </p>
            </div>
            <div className="">
              <div className="w-24">
                <CircularProgressbar
                  value={thongTinLichChieuPhim.danhGia}
                  maxValue={10}
                  text={`${thongTinLichChieuPhim.danhGia}`}
                  styles={buildStyles({
                    pathColor: `#fcee21`,
                    textColor: "#fcee21",
                    trailColor: "#ccc",
                    backgroundColor: "blue",
                  })}
                />
                <h4 className="text-red-600 font-bold mt-2">IMDb</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto lg:max-w-5xl bg-white rounded-lg ">
          {renderLichChieu(thongTinLichChieuPhim.heThongRapChieu)}
        </div>
      </div>
    </div>
  );
}

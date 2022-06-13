import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "./LichChieuAllFilm.scss";
const { TabPane } = Tabs;
const styleCssdau3cham = {
  width: "300px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineHeight: "16px",
  WebkitLineClamp: 1,
  height: "16px",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
};
export default function LichChieuAllFilm() {
  const { thongTinLichChieuHeThongRap } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  console.log(thongTinLichChieuHeThongRap);
  const renderThongTinLichChieu = () => {
    return thongTinLichChieuHeThongRap?.map((item, index) => (
      <TabPane tab={<img src={item.logo} width={70} />} key={index}>
        <Tabs tabPosition={"left"}>
          {item.lstCumRap?.map((item, index) => (
            <TabPane
              tab={
                <div className="flex">
                  <img src={item.hinhAnh} width={70} />
                  <div>
                    <h5 style={{ ...styleCssdau3cham }}>{item.tenCumRap}</h5>
                    <span className="" style={{ ...styleCssdau3cham }}>
                      {item.diaChi}
                    </span>
                  </div>
                </div>
              }
              key={index}
            >
              {item.danhSachPhim?.map((item) => (
                <div className="border">
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
                      <h4 className="ml-4">{item.tenPhim}</h4>
                      <p className="ml-4">100 phut - TIX 9 </p>
                    </div>
                  </div>
                  <div className="grid gap-4 grid-cols-6 m-4">
                    {item.lstLichChieuTheoPhim?.slice(0, 12).map((item) => (
                      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        {moment(item.ngayChieuGioChieu).format("hh:mm A")}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </TabPane>
          ))}
        </Tabs>
      </TabPane>
    ));
  };
  return (
    <div className="border lichChieuAllFilm max-h-[500px] overflow-y-scroll">
      <Tabs tabPosition={"left"}>{renderThongTinLichChieu()}</Tabs>
    </div>
  );
}

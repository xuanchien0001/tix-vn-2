import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Tabs } from "antd";

import {
  layDanhSachBanner,
  layDanhSachPhim,
} from "../../redux/actions/QuanLyPhimAction/ActionName";
import HomeCarousel from "../../templaces/Layout/homeCarousel/HomeCarousel";
import ListFilm from "./ListFilm/ListFilm";
import LichChieuAllFilm from "./lichChieuAllFilm/LichChieuAllFilm";
import { layThongTinLichChieuHeThongRap } from "../../redux/actions/QuanLyRapAction/actionName";

const { TabPane } = Tabs;

export default function HomePage() {
  const [isDangChieu, setIsDangChieu] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachBanner());
    dispatch(layDanhSachPhim());
    dispatch(layThongTinLichChieuHeThongRap());
  }, []);
  return (
    <>
      <HomeCarousel />
      <div className="container mx-auto lg:max-w-5xl mb-8">
        <Tabs defaultActiveKey="1" centered>
          <TabPane
            tab={<div onClick={() => setIsDangChieu(true)}>Đang chiếu</div>}
            key="1"
          >
            <div className="container mx-auto">
              <ListFilm props={isDangChieu} />
            </div>
          </TabPane>
          <TabPane
            tab={<div onClick={() => setIsDangChieu(false)}>Sắp chiếu</div>}
            key="2"
          >
            <div className="container mx-auto">
              <ListFilm props={isDangChieu} />
            </div>
          </TabPane>
        </Tabs>
      </div>
      <div className="container mx-auto">
        <LichChieuAllFilm />
      </div>
    </>
  );
}

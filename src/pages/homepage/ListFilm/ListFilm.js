import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ListFilm.scss";
import { useSelector } from "react-redux";
import ModalVideo from "react-modal-video";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left"></i>
    </div>
  );
}

export default function ListFilm({ props }) {
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);
  const [linkTrailer, setLinkTrailer] = useState("");
  const btnOpenTrailer = useRef();
  const { danhSachPhim } = useSelector((state) => state.QuanLyPhimReducer);
  let history = useHistory();

  let danhSachDangChieu = danhSachPhim?.filter(
    (item) => item.dangChieu === true
  );
  let danhSachSapChieu = danhSachPhim?.filter((item) => item.sapChieu === true);
  const settings = {
    className: "center",
    // centerMode: true,
    centerPadding: "20px",
    infinite: true,
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const renderListFilm = (listFilm) =>
    listFilm?.map((phim, index) => (
      <div
        className="p-6 rounded-md shadow-md bg-gray-50 text-gray-900"
        key={index}
      >
        <img
          src={phim.hinhAnh}
          alt={index}
          className="object-cover object-center w-full rounded-md h-72 cursor-pointer"
          onClick={() => handleOpenTrailer(phim.trailer)}
        />
        <div className="mt-6 mb-2">
          <span className="block text-xs font-medium tracking-widest uppercase text-red-600">
            {phim.tenPhim}
          </span>
          <h2
            className="text-xl text-white text-center  bg-red-500 cursor-pointer"
            onClick={() => {
              history.push(`/detail/${phim.maPhim}`);
            }}
          >
            ĐẶT VÉ
          </h2>
        </div>
      </div>
    ));

  const handleOpenTrailer = (linkTrailerItem) => {
    setLinkTrailer(linkTrailerItem.slice(linkTrailerItem.length - 11));
    btnOpenTrailer.current.click();
  };

  return (
    <div className="listFilm">
      <React.Fragment>
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpenTrailer}
          videoId={linkTrailer}
          onClose={() => setIsOpenTrailer(false)}
        />

        <button
          ref={btnOpenTrailer}
          className="hidden"
          onClick={() => setIsOpenTrailer(true)}
        >
          Open trailer movie
        </button>
      </React.Fragment>

      <Slider {...settings}>
        {props
          ? renderListFilm(danhSachDangChieu)
          : renderListFilm(danhSachSapChieu)}
      </Slider>
    </div>
  );
}

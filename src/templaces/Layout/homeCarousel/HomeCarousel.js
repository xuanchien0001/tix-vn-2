import React from "react";
import { Carousel, Row, Col } from "antd";
import { useSelector } from "react-redux";
import "./HomeCarousel.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: "white",
        fontSize: "16px",
        lineHeight: "1.5715",
      }}
      onClick={onClick}
    >
      <RightOutlined />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: "white",
        fontSize: "15px",
        lineHeight: "1.5715",
      }}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  );
};
const settings = {
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const contentStyle = {
  height: "560px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default function HomeCarousel(props) {
  const { bannerCarousel } = useSelector((state) => state.QuanLyPhimReducer);
  const renderBannerCarousel = () =>
    bannerCarousel?.map((banner, index) => {
      return (
        <div key={index}>
          <div
            style={{
              ...contentStyle,
              backgroundImage: `url("${banner.hinhAnh}")`,
            }}
          ></div>
        </div>
      );
    });
  return (
    <div className="carousel-home">
      <Row justify="center">
        <Col span={24}>
          <Carousel autoplay arrows {...settings}>
            {renderBannerCarousel()}
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

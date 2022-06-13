import {
  LAY_DANH_SACH_BANNER,
  LAY_DANH_SACH_PHIM,
  LAY_THONG_TIN_PHIM,
  SEARCH_PHIM,
} from "../../actions/QuanLyPhimAction/constName";

const initialState = {
  bannerCarousel: [],
  danhSachPhim: [],
  thongTinPhim: {},
};

const QuanLyPhimReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LAY_DANH_SACH_BANNER:
      state.bannerCarousel = payload;
      return { ...state };

    case LAY_DANH_SACH_PHIM:
      // console.log(payload);
      state.danhSachPhim = payload;
      return { ...state };

    case LAY_THONG_TIN_PHIM:
      state.thongTinPhim = payload;
      return { ...state };

    case SEARCH_PHIM:
      state.danhSachPhim = payload;
      return { ...state };

    default:
      return state;
  }
};
export default QuanLyPhimReducer;

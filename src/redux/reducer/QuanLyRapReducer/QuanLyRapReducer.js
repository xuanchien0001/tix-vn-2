import {
  LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP,
  LAY_THONG_TIN_LICH_CHIEU_PHIM,
} from "../../actions/QuanLyRapAction/constName";

const initialState = {
  thongTinLichChieuHeThongRap: [],
  thongTinLichChieuPhim: {},
};

const QuanLyRapReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP:
      return { ...state, thongTinLichChieuHeThongRap: payload };
    case LAY_THONG_TIN_LICH_CHIEU_PHIM:
      state.thongTinLichChieuPhim = payload;
      return { ...state };
    default:
      return state;
  }
};
export default QuanLyRapReducer;

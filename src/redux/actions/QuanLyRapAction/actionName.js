import { QuanLyRap } from "../../../services/qlRapService";
import {
  LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP,
  LAY_THONG_TIN_LICH_CHIEU_PHIM,
} from "./constName";

export const layThongTinLichChieuHeThongRap = () => {
  return async (dispatch) => {
    let result = await QuanLyRap.LayThongTinLichChieuHeThongRap();
    result.status === 200 &&
      dispatch({
        type: LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP,
        payload: result.data.content,
      });
  };
};

export const layThongTInLichChieuPhim = (id) => {
  return async (dispatch) => {
    let result = await QuanLyRap.LayThongTinLichChieuPhim(id);
    result.status === 200 &&
      dispatch({
        type: LAY_THONG_TIN_LICH_CHIEU_PHIM,
        payload: result.data.content,
      });
  };
};

import { QLDatVeService } from "../../../services/QuanLyDatVeService";
import {
  LOADING,
  NOT_LOADING,
} from "../../reducer/PageLoadingReducer/PageLoadingReudcer";
import { DAT_VE, LAY_DS_VE, LICH_SU_DAT_VE } from "./constName";
import Swal from "sweetalert2";
import { type } from "@testing-library/user-event/dist/type";

export const Lay_DS_PhongVe = (maLichChieu) => {
  return async (dispatch) => {
    try {
      let result = await QLDatVeService.LayDanhSachPhongVe(maLichChieu);
      result.status === 200 &&
        dispatch({ type: LAY_DS_VE, payload: result.data.content });
    } catch (err) {
      console.log(err);
    }
  };
};

export const datVeAction = (thongTinDatVe) => {
  return async (dispatch) => {
    try {
      await dispatch({ type: LOADING });
      let result = await QLDatVeService.DatVe(thongTinDatVe);

      if (result.status === 200) {
        await dispatch({ type: DAT_VE, payload: result.data });
        // console.log(thongTinDatVe);
        await dispatch(Lay_DS_PhongVe(thongTinDatVe.maLichChieu));
      }
      await dispatch({ type: NOT_LOADING });
      Swal.fire({
        title: "Đặt vé thành công!",
        icon: "success",
        timer: 2000,
      });
      dispatch({ type: LICH_SU_DAT_VE, payload: "2" });
    } catch (err) {
      await dispatch({ type: NOT_LOADING });

      console.log("đặt vé error", err);
    }
  };
};

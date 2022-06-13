import { QuanLyPhim } from "../../../services/QLPhimService";
import {
  LAY_DANH_SACH_BANNER,
  LAY_DANH_SACH_PHIM,
  LAY_THONG_TIN_PHIM,
  SEARCH_PHIM,
} from "./constName";
import { history } from "../../../App";
import Swal from "sweetalert2";

export const layDanhSachBanner = () => {
  return async (dispatch) => {
    let result = await QuanLyPhim.LayDanhSachBanner();
    result.status === 200 &&
      dispatch({
        type: LAY_DANH_SACH_BANNER,
        payload: result.data.content,
      });
  };
};

export const layDanhSachPhim = () => {
  return async (dispatch) => {
    let result = await QuanLyPhim.LayDanhSachPhim();
    result.status === 200 &&
      dispatch({
        type: LAY_DANH_SACH_PHIM,
        payload: result.data.content,
      });
  };
};

export const ThemPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await QuanLyPhim.ThemPhimUploadHinh(formData);
      alert("them phim thanh cong");
    } catch (err) {
      console.log("upload phim fail", console.log(err.response));
    }
  };
};

export const LayThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await QuanLyPhim.LayThongTinPhim(maPhim);
      dispatch({ type: LAY_THONG_TIN_PHIM, payload: result.data.content });
    } catch (err) {
      console.log("lay thong tin phim fail", err);
    }
  };
};

export const CapNhatPhimUploadedAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await QuanLyPhim.CapNhatPhimUploaded(formData);
      await dispatch(layDanhSachPhim());
      alert("edit thong tin phim thanh cong!");
      history.push("/admin/films");
    } catch (err) {
      console.log("edit thong tin phim fail", err);
    }
  };
};

export const deletePhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await QuanLyPhim.deletePhim(maPhim);
      dispatch(layDanhSachPhim());
      // Swal.fire("Đã xóa!", "", "success");
      Swal.fire({ title: "Đã xóa!", icon: "success", timer: 2000, timerProgressBar: true });
      history.push("/admin/films");
    } catch (err) {
      console.log("xóa phim fail", err);
    }
  };
};

export const searchPhim = (tenPhim) => {
  return async (dispatch) => {
    try {
      let result = await QuanLyPhim.searchPhim(tenPhim);
      dispatch({ type: SEARCH_PHIM, payload: result.data.content });
    } catch (err) {
      console.log("tìm phim fail", err);
    }
  };
};

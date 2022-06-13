import { QLUserService } from "../../../services/QLNguoiDungService";
import { LOADING, NOT_LOADING } from "../../reducer/PageLoadingReducer/PageLoadingReudcer";
import { LAY_THONG_TIN_NGUOI_DUNG, USER_DANGNHAP } from "../QuanLyUserAction/constName";

export const userDangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      let result = await QLUserService.userDangNhap(thongTinDangNhap);
      if (result.status === 200) {
        dispatch({ type: USER_DANGNHAP, payload: result.data.content });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getInfoUserAction = () => {
  return async (dispatch) => {
    try {
      await dispatch({ type: LOADING });
      let result = await QLUserService.thongTinNguoiDung();
      result.status === 200 &&
        (await dispatch({
          type: LAY_THONG_TIN_NGUOI_DUNG,
          payload: result.data.content,
        }));
      await dispatch({ type: NOT_LOADING });
    } catch (err) {
      console.log("lấy thông tin người dùng thất bại", err);
    }
  };
};

export const getListUserAction = async (tuKhoa = "", soTrang = 1, soPhanTuTrenTrang = 10) => {
  let output;
  try {
    let result = await QLUserService.LayDanhSachNguoiDungPhanTrang(
      tuKhoa,
      soTrang,
      soPhanTuTrenTrang
    );
    output = result.data.content;
  } catch (err) {
    console.log("lay danh sách user theo trang fail", err.response);
  }
  return output;
};

export const capNhatThongTinNguoiDungAction = async (infoUpdata) => {
  try {
    let result = await QLUserService.capNhatThongTinNguoiDung(infoUpdata);
    // result.status === 200 && console.log("cap nhat user thanh cong");
  } catch (err) {
    alert(err.response.data.content);
    console.log("cạp nhat thong tin user fail", err);
  }
};

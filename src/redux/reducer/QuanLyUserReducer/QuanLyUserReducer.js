import { USER_LOGIN, TOKEN } from "../../../util/setting/config";
import {
  LAY_THONG_TIN_NGUOI_DUNG,
  USER_DANGNHAP,
} from "../../actions/QuanLyUserAction/constName";
let userInfo = {};
if (localStorage.getItem(USER_LOGIN)) {
  userInfo = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: userInfo,
  thongTinNguoiDung: {},
};

const QuanLyUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_DANGNHAP:
      localStorage.setItem(USER_LOGIN, JSON.stringify(payload));
      localStorage.setItem(TOKEN, payload.accessToken);
      return { ...state, userLogin: payload };
    case LAY_THONG_TIN_NGUOI_DUNG:
      // console.log(payload);
      return { ...state, thongTinNguoiDung: payload };
    default:
      return state;
  }
};
export default QuanLyUserReducer;

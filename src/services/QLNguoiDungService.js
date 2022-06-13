import { MA_NHOM } from "../util/setting/config";
import { baseService } from "./baseService";

class QLNguoiDungService extends baseService {
  constructor() {
    super();
  }
  userDangNhap = (thongTinDangNhap) => {
    return this.post("api/QuanLyNguoiDung/DangNhap", thongTinDangNhap);
  };
  thongTinNguoiDung = () => {
    return this.post("api/QuanLyNguoiDung/ThongTinTaiKhoan", undefined);
  };

  LayDanhSachNguoiDungPhanTrang = (tuKhoa = "", soTrang = 1, soPhanTuTrenTrang = 10) => {
    if (tuKhoa !== "") {
      return this.get(
        `api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${MA_NHOM}&tuKhoa=${tuKhoa}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
      );
    }
    return this.get(
      `api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${MA_NHOM}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    );
  };

  capNhatThongTinNguoiDung = (infoUpdate) => {
    return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, infoUpdate);
  };
}

export const QLUserService = new QLNguoiDungService();

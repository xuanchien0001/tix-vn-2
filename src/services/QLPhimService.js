import { MA_NHOM } from "../util/setting/config";
import { baseService } from "./baseService";

class QLPHimService extends baseService {
  constructor() {
    super();
  }
  LayDanhSachBanner = () => {
    return this.get("api/QuanLyPhim/LayDanhSachBanner");
  };

  LayDanhSachPhim = () => {
    return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${MA_NHOM}`);
  };
  ThemPhimUploadHinh = (formData) => {
    return this.post("api/QuanLyPhim/ThemPhimUploadHinh", formData);
  };

  LayThongTinPhim = (maPhim) => {
    return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  };

  CapNhatPhimUploaded = (formData) => {
    return this.post("api/QuanLyPhim/CapNhatPhimUpload", formData);
  };

  deletePhim = (maPhim) => {
    return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  };

  searchPhim = (tenPhim) => {
    return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${MA_NHOM}&tenPhim=${tenPhim}`);
  };
}

export const QuanLyPhim = new QLPHimService();

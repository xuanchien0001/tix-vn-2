import { baseService } from "./baseService";

class qlRapService extends baseService {
  constructor() {
    super();
  }
  LayThongTinLichChieuHeThongRap = () => {
    return this.get("api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03");
  };
  LayThongTinLichChieuPhim = (id) => {
    return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
  };
}

export const QuanLyRap = new qlRapService();

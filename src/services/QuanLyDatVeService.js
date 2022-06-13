import { baseService } from "./baseService";

class QuanLyDatVeService extends baseService {
  constructor() {
    super();
  }
  LayDanhSachPhongVe = (maLichChieu) => {
    return this.get(
      `api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  };

  DatVe = (thongTinDatVe) => {
    return this.post(`api/QuanLyDatVe/DatVe`, thongTinDatVe);
  };
}

export const QLDatVeService = new QuanLyDatVeService();

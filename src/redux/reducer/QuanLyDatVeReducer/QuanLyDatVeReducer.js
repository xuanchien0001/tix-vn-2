import React from "react";
import Swal from "sweetalert2";
import {
  CHON_GHE,
  DAT_VE,
  KIEM_TRA_GHE,
  LAY_DS_VE,
  LICH_SU_DAT_VE,
} from "../../actions/QuanLyDatVeAction/constName";
import _ from "lodash";

const initialState = {
  DS_PhongVe: {},
  DS_GheDangChon: [],
  DS_Ghe_Sold: [],
  chuyenTab: "1",
};

const QuanLyDatVeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LAY_DS_VE:
      state.DS_Ghe_Sold = payload.danhSachGhe?.filter((item) => item.daDat === true);
      return { ...state, DS_PhongVe: payload };
    case CHON_GHE:
      let _indexDS_GheDaBan = state.DS_Ghe_Sold.findIndex((item) => item.maGhe === payload.maGhe);
      if (_indexDS_GheDaBan === -1) {
        let index = state.DS_GheDangChon.findIndex((item) => item.maGhe === payload.maGhe);
        if (index === -1) {
          if (state.DS_GheDangChon?.length < 6) {
            state.DS_GheDangChon.push(payload);
          } else {
            Swal.fire({
              text: "Bạn chỉ được đặt tối đa 7 vé cùng lúc!",
              title: "Không được phép ...!",
              icon: "error",
              footer: 'Nếu có thắc mắc liên hệ &nbsp <a href="+tel:19001234">19001234</a>',
            });
          }
        } else {
          state.DS_GheDangChon.splice(index, 1);
        }
      }

      let DS_GheDangChon = _.sortBy(state.DS_GheDangChon, ["stt"]);
      return { ...state, DS_GheDangChon };

    case DAT_VE:
      if (payload.statusCode === 200) {
        state.DS_GheDangChon = [];
      }
      return { ...state };

    case LICH_SU_DAT_VE: {
      state.chuyenTab = payload;
      return { ...state };
    }
    case KIEM_TRA_GHE: {
      let dsGheDaDuocDat = [];
      state.DS_Ghe_Sold.forEach((item) =>
        payload.forEach((a, index) => {
          if (a.maGhe === item.maGhe) {
            payload.splice(index, 1);
            dsGheDaDuocDat.push(a.tenGhe);
          }
        })
      );
      dsGheDaDuocDat.length > 0 &&
        Swal.fire({
          position: "top-end",
          title: `Ghế ${dsGheDaDuocDat.join(", ")} đã bị user khác đặt!`,
          timer: 3000,
          showConfirmButton: false,
        });
      return { ...state };
    }
    default:
      return state;
  }
};
export default QuanLyDatVeReducer;

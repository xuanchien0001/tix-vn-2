import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import QuanLyPhimReducer from "../redux/reducer/QuanLyPhimReducer/QuanLyPhimReducer";
import PageLoadingReudcer from "./reducer/PageLoadingReducer/PageLoadingReudcer";
import QuanLyDatVeReducer from "./reducer/QuanLyDatVeReducer/QuanLyDatVeReducer";
import QuanLyRapReducer from "./reducer/QuanLyRapReducer/QuanLyRapReducer";
import QuanLyUserReducer from "./reducer/QuanLyUserReducer/QuanLyUserReducer";

const rootReducer = combineReducers({
  QuanLyPhimReducer: QuanLyPhimReducer,
  QuanLyRapReducer: QuanLyRapReducer,
  QuanLyUserReducer: QuanLyUserReducer,
  QuanLyDatVeReducer: QuanLyDatVeReducer,
  PageLoadingReudcer: PageLoadingReudcer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };

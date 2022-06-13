export const LOADING = "LOADING";
export const NOT_LOADING = "NOT_LOADING";
const initialState = {
  isLoading: false,
};

const PageLoadingReudcer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      state.isLoading = true;
      return { ...state };
    case NOT_LOADING: {
      state.isLoading = false;
      return { ...state };
    }
    default:
      return state;
  }
};
export default PageLoadingReudcer;

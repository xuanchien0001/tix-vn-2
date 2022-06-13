export const DOMAIN_API = "http://movieapi.cyberlearn.vn";
export const USER_LOGIN = "USER_LOGIN";
export const TOKEN = "accessToken";
export const MA_NHOM = "GP03";

export function imgNotFound(e) {
  return (
    (e.target.onerror = null),
    (e.target.src =
      "https://image.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg")
  );
}

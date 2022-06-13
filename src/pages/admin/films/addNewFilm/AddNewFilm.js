import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import { useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { ThemPhimUploadHinhAction } from "../../../../redux/actions/QuanLyPhimAction/ActionName";
import { useDispatch } from "react-redux";
import { MA_NHOM } from "../../../../util/setting/config";

const AddNewFilm = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [srcViewImg, setSrcViewImg] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: true,
      sapChieu: false,
      hot: true,
      danhGia: 0,
      hinhAnh: null,
      maNhom: MA_NHOM,
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        key === "hinhAnh"
          ? values.hinhAnh !== null &&
            formData.append("hinhAnh", values.hinhAnh, values.hinhAnh.name)
          : formData.append(key, values[key]);
      }
      console.log(formData.get("hinhAnh"));
      dispatch(ThemPhimUploadHinhAction(formData));
    },
  });

  const onFormLayoutChange = ({ size }) => setComponentSize(size);

  const handleChangeSwitch = (name, value) => formik.setFieldValue(name, value);

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (file.type.slice(0, 5) !== "image") {
      alert("file anh không hop le");
      setSrcViewImg("");
      return undefined;
    }
    await formik.setFieldValue("hinhAnh", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => setSrcViewImg(e.target.result);
  };

  return (
    <>
      <h4>Thêm mới phim:</h4>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input onChange={formik.handleChange} value={formik.values.tenPhim} name="tenPhim" />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input onChange={formik.handleChange} value={formik.values.trailer} name="trailer" />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input onChange={formik.handleChange} value={formik.values.moTa} name="moTa" />
        </Form.Item>

        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={(value) => {
              formik.setFieldValue("ngayKhoiChieu", moment(value).format("DD/MM/YYYY"));
            }}
          />
        </Form.Item>
        <Form.Item label="IMBd">
          <InputNumber
            min={1}
            max={10}
            onChange={(value) => handleChangeSwitch("danhGia", value)}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch checked onChange={(checked) => handleChangeSwitch("hot", checked)} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch
            onChange={(checked) => {
              handleChangeSwitch("sapChieu", checked);
              handleChangeSwitch("dangChieu", !checked);
            }}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input type="file" accept="image/*" onChange={(e) => handleChangeFile(e)} />
          <br />
          <img src={srcViewImg} width={100} accept="image/*" />
        </Form.Item>
        <div className="flex justify-center text-white">
          <button className="bg-green-500 p-2 rounded" type="submit">
            Them phim
          </button>
        </div>
      </Form>
    </>
  );
};

export default AddNewFilm;

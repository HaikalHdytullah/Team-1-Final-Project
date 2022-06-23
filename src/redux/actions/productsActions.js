import Swal from "sweetalert2";
import {
  GET_ALL_PRODUCT,
  GET_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  PREVIEW_PROODUCT,
  CLEAR_PRODUCT,
  PRODUCT_ERROR,
} from "./types";

export const addProduct = (data) => async (dispatch) => {
  try {
    var formdata = new FormData();
    formdata.append("idUser", data.idUser);
    formdata.append("nama", data.nama);
    formdata.append("harga", data.harga);
    formdata.append("kategori", data.kategori);
    formdata.append("deskripsi", data.deskripsi);
    if (data.gambar.length > 0) {
      for (var i = 0; i < data.gambar.length; i++) {
        if (
          data.gambar[i].type === "image/jpeg" ||
          data.gambar[i].type === "image/png"
        ) {
          formdata.append("gambar", data.gambar[i]);
        }
      }
    }

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/products",
      {
        method: "POST",
        body: formdata,
      }
    );

    if (response.status === 200) {
      const data = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        payload: data,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const data = await response.json();

      dispatch({
        type: PRODUCT_ERROR,
        payload: data,
      });

      Swal.fire({
        position: "center",
        icon: "error",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: error.response,
    });

    Swal.fire({
      position: "center",
      icon: "error",
      title: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const clearProduct = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT,
  });
};

export const previewImg = (params) => async (dispatch) => {
  dispatch({
    type: PREVIEW_PROODUCT,
    payload: params,
  });
};

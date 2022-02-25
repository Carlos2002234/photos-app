import React from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const ImgInfo = ({
  currentImg,
  setMostrarInfo,
  setFavoritesArray,
  favoritesArray,
}) => {
  const navigate = useNavigate();
  const usuario = useSelector((store) => store.google.user);

  const eliminarDocumento = async () => {
    swal({
      title: "Estás seguro?",
      text: "Una vez borrado, no serás capaz de recuperar el archivo !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("su imagen ha sido borrada correctamente!", {
          icon: "success",
        });
        const filter = favoritesArray.filter((x) => x.id !== currentImg.id);
        setFavoritesArray(filter);
        deleteDoc(doc(db, usuario.nombre, currentImg.id));
        //update de ui
        setMostrarInfo(false);
      } else {
        swal("Su imagen está segura");
      }
    });
  };

  return (
    <div className="containerInfo">
      <div className="containerInfo__info">
        <div className="containerInfo__info__btns">
          <button
            onClick={() => window.open(currentImg.download)}
            className="btn btn-primary mx-3"
          >
            Download
          </button>

          <button onClick={eliminarDocumento} className="btn btn-danger ">
            Eliminar
          </button>
        </div>
        <img
          className="containerInfo__img"
          src={currentImg.imgCard}
          alt="error"
        ></img>
        <a onClick={() => setMostrarInfo(false)} href="#x" className="btnClose">
          X
        </a>
        <h2 className="containerInfo__desc">{currentImg.alt}</h2>
        <h2
          onClick={() => window.open(currentImg.photoGrapherUrl)}
          className="containerInfo__desc__link"
        >
          Photographer : {currentImg.photoGrapherUrl}
        </h2>
      </div>
    </div>
  );
};

export default ImgInfo;

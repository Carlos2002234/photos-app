import React, { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";

export const ImgInfo = ({ currentImg, setMostrarInfo }) => {
  const usuario = useSelector((store) => store.google.user);
  console.log(currentImg);


  const addFireStore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, usuario.nombre));
      const arrayF = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      for (let index = 0; index < arrayF.length; index++) {
        const element = arrayF[index];
       
        if (element.alt === currentImg.alt) {
          return swal("Imagen repetida !!");
        }
      }

      const docRef = await addDoc(collection(db, usuario.nombre), {
        uid: usuario.uid,
        fotoUrl: currentImg.src.medium,
        nombre: usuario.nombre,
        alt: currentImg.alt,
        download: currentImg.url,
        imgCard: currentImg.src.landscape,
        photoGrapherUrl: currentImg.photographer_url,
      });

      swal("Guardada en favoritas");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="containerInfo">
      <div className="containerInfo__info">
        <div className="containerInfo__info__btns">
          <button
            onClick={() => window.open(currentImg.url)}
            className="btn btn-primary mx-3"
          >
            Download
          </button>
          <button onClick={addFireStore} className="btn btn-success ">
            Guardar
          </button>
        </div>
        <img
          className="containerInfo__img"
          src={currentImg.src.landscape}
          alt="error"
        ></img>
        <a onClick={() => setMostrarInfo(false)} href="#x" className="btnClose">
          X
        </a>
        <h2 className="containerInfo__desc">{currentImg.alt}</h2>
        <h2
          onClick={() => window.open(currentImg.photographer_url)}
          className="containerInfo__desc__link"
        >
          Photographer : {currentImg.photographer_url}
        </h2>
      </div>
    </div>
  );
};

export default ImgInfo;

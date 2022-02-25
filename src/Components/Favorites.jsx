import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import db from "./firebase";
import { collection, getDocs, doc, docs } from "firebase/firestore";
import ImgInfoFavorite from "./ImgInfoFavorite";
export const Favorites = () => {
  const user = useSelector((store) => store.google.user);
  const [favorites, setFavorites] = useState([]);
  const [currentImg, setCurrentImg] = useState();
  const [mostrarInfo, setMostrarInfo] = useState(false);
 

  useEffect(() => {
    const obtenerDb = async () => {
      const querySnapshot = await getDocs(collection(db, user.nombre));
      const arrayF = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));


      setFavorites(arrayF);
      console.log(arrayF);
    };
    obtenerDb();
  }, [user.nombre, currentImg]);

  const showInfo = (current) => {
    setCurrentImg(current);
    setMostrarInfo(true);
  };

  return (
    <Fragment>
      {favorites.length <= 0 ? (
        <h2 style={{ textAlign: "center" }}>No tienes favoritas aun</h2>
      ) : (
        <section>
          <div className="gallery">
            {favorites.map((x, i) => (
              <img
                key={i}
                onClick={() => showInfo(x)}
                className="img"
                alt=""
                src={x.fotoUrl}
              ></img>
            ))}
          </div>

          {mostrarInfo ? (
            <ImgInfoFavorite
              currentImg={currentImg}
              setMostrarInfo={setMostrarInfo}
              setFavoritesArray={setFavorites}
              favoritesArray={favorites}
            />
          ) : null}
        </section>
      )}
    </Fragment>
  );
};

export default Favorites;

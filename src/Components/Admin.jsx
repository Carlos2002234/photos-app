import React, { Fragment, useState, useEffect, useCallback } from "react";
import ImgInfo from "./ImgInfo";
export const Admin = () => {
  const [imagenes, setImagenes] = useState([]);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const [currentImg, setCurrentImg] = useState();

  // const url = `https://api.unsplash.com/search/photos?page=${page}&query=${value}&per_page=20&client_id=${token}`;
  const [alert, setAlert] = useState(false);
  const [mostrarInfo, setMostrarInfo] = useState(undefined);

  const plus1 = () => {
    setPage(page + 1);
    api();
  };

  const less1 = () => {
    if (page <= 0) {
      setPage(1);
    } else {
      setPage(page - 1);
      api();
    }
  };

  const api = () => {
    fetch(`https://api.pexels.com/v1/search?query=${value}&page=${page} `, {
      headers: {
        Authorization:
          "563492ad6f91700001000001e6a25acb6c27485491dbf62198f3ca92",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setImagenes(data.photos);
      });
  };

  const handleS = () => {
    if (value === "") {
      setImagenes([]);
      return setAlert(true);
    }
    setAlert(false);
    //setValue("");
    api();
  };

  const showInfo = (current) => {
    setCurrentImg(current);
    setMostrarInfo(true);
  };

  console.log(mostrarInfo);

  return (
    <Fragment>
      <div className="d-flex justify-content-center containerForm">
        <div className="col-10 col-md-6">
          <form className="w-100">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Busca una imagen
              </label>
              <input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
              <div id="emailHelp" class="form-text">
                example cars...
              </div>
            </div>

            <button
              onClick={handleS}
              disabled={mostrarInfo}
              type="button"
              class="btn btn-primary btn-lg w-100"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {alert ? (
        <div class="alert alert-danger d-flex align-items-center mt-3" role="alert">
          <svg
            class="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Danger:"
          ></svg>
          <h2 className="fw-bolder fs-5">Llena el campo !</h2>
        </div>
      ) : null}

      <section className="gallery">
        {imagenes.map((x, i) => (
          <img
            onClick={() => showInfo(x)}
            className="img"
            src={x.src.medium}
            alt="error"
            key={i}
          ></img>
        ))}
      </section>

      {mostrarInfo ? (
        <ImgInfo currentImg={currentImg} setMostrarInfo={setMostrarInfo} />
      ) : null}

      <section className="containerBtns">
        {imagenes.length > 0 ? (
          <>
            <button onClick={plus1} className="btnNext">
              Next
            </button>
            <button onClick={less1} className="btnBefore">
              Before
            </button>
          </>
        ) : null}
      </section>
    </Fragment>
  );
};

export default Admin;

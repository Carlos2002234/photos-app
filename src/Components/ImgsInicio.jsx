import React, { useEffect, useCallback, useState } from "react";

export const ImgsInicio = () => {
  const token = "tXuUjYVSwLeJD8L1Zl1UOan51nvq_CB58H8KFz7mcL8";
  const url = `https://api.unsplash.com/search/photos?page=1&query=office&per_page=20&client_id=${token}`;
  const [imgsInicio, setImgsInicio] = useState([]);

  useEffect(() => {
    fetch("https://api.pexels.com/v1/search?query=people", {
      headers: {
        Authorization:
          "563492ad6f91700001000001e6a25acb6c27485491dbf62198f3ca92",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setImgsInicio(data.photos);
      });
  }, []);

  //console.log(imgsInicio)

  return (
    <div>
      <section className="gallery">
        {imgsInicio.map((x, i) => (
          
            <img key={i} className="img" src={x.src.medium} alt="error"></img>
        
       
        ))}
      </section>
    </div>
  );
};

export default ImgsInicio;

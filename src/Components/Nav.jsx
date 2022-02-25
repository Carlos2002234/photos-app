import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../Redux/googleUsers";
export const Nav = () => {
  const user = useSelector((store) => store.google.user);
  const active = useSelector((store) => store.google.active);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(false);
  const navigate = useNavigate();

  const favorites = () => {
    navigate("/favorites");
    setTitle(!title);
  };

  const search = () => {
    navigate("/admin");
    setTitle(!title);
  };

  return (
    <nav className="navC ">
      <section>
        <h2 className="fw-normal mx-5">
          Photo<span className="fw-bolder ">Span</span>
        </h2>

        {user !== undefined && active ? (
          <button
            onClick={title ? search : favorites}
            className=" btn btn-primary  mx-3 "
          >
            {title ? "search" : "favorites"}
          </button>
        ) : null}
      </section>

      <section>
        {active ? (
          <Link
            onClick={() => dispatch(Logout())}
            to="/"
            className="btn btn-primary mx-3  "
          >
            Logout
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary mx-3  ">
            Login
          </Link>
        )}

        {user !== undefined && active ? (
          <img className="navC__img" src={user.foto} alt="error"></img>
        ) : undefined}
      </section>
    </nav>
  );
};

export default Nav;

/*



const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});


*/

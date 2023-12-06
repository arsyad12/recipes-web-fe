import React from "react";
import "./profile.css";

import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/index";
import { Link } from "react-router-dom";

const style = {
  profileImage: {
    width: 80,
    height: 80,
    jusifyContent: "center",
  },
};

function Profile() {

  const [isNavOpen, setIsNavOpen] = React.useState(false);

  console.log(isNavOpen)

  return (
    <>
      <Navbar />

      <div class="d-flex flex-column mb-3 align-items-center mt-5">
        <div>
          <img
            src="/assets/img/burger.png"
            alt="profile"
            style={{ width: 80, height: 80 }}
          />
        </div>
        <div className="d-flex pt-3">
          <h4>Arsyad</h4>
          <img
            src="/assets/img/pen.jpg"
            alt="edit profile"
            style={{ width: 40, height: 35 }}
            onClick={() => setIsNavOpen((isFalse) => !isFalse)}
          />
        </div>
      </div>

{isNavOpen?(
      <div class="container">
        <div class="mt-3 d-flex flex-column align-items-center">
        <Link to='/form-edit'>
        <button type="button" class="btn btn-secondary">Edit Profile</button>
        </Link>
        <button type="button" class="btn btn-secondary mt-3">Reset Password</button>
        </div>
      </div>
      ):null}

      <div class="container">
        <div class="mt-5 row align-items-start">
          <div class="col-2">My Recipe</div>
          <div class="col-2">Saved Recipe</div>
          <div class="col-2">Liked Recipe</div>
        </div>
      </div>

<hr/>
      <div class="container">
        <div class="mt-3 row align-items-start">
          <div class="col-4">
            <img src="/assets/img/popularFood.png" alt="" className="img-list-recipe" />
          </div>
          <div class="col-4">
            <img src="/assets/img/popularFood.png" alt="" className="img-list-recipe" />
          </div>
          <div class="col-4">
            <img src="/assets/img/popularFood.png" alt="" className="img-list-recipe" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;

import React from "react";
import "./profile.css";

import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/index";

const style = {
  profileImage: {
    width: 80,
    height: 80,
    jusifyContent: "center",
  },
};

function Profile() {
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
        <div>
          <h4>Arsyad</h4>
        </div>
      </div>

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

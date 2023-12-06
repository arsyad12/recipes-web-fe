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

function FormEdit() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  console.log(isNavOpen);

  return (
    <>
      <Navbar />
      <div className="container">
        <div>
          <h3 style={{ textAlign: "center", paddingTop: 20 }}>Edit Photo</h3>
        </div>

        <div className="d-flex flex-row justify-content-center gap-5">
          <div>
            <img
              src="/assets/img/burger.png"
              alt="profile"
              style={{ width: 80, height: 80 }}
            />
          </div>
          <div>
            <button type="button" className="btn btn-warning mt-4">
              <input
                type="file"
                name="myImage"
                accept="image/png, image/gif, image/jpeg"
              />
              Edit Photo
            </button>
          </div>
        </div>

        <div>
          <h3 style={{ textAlign: "center", paddingTop: 60 }}>Edit Profil Identity</h3>
        </div>
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1" className="mt-4">
              First Name
            </label>
            <input
              type="email"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter First Name"
            />
            <label for="exampleInputEmail1" className="mt-4">
              Last Name
            </label>
            <input
              type="email"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Last Name"
            />
            <label for="exampleInputEmail1" className="mt-4">
              Phone Number
            </label>
            <input
              type="email"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Phone Number"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>

        <div>
          <h3 style={{ textAlign: "center", paddingTop: 40 }}>Edit Email</h3>
        </div>

        <form>
          <div className="form-group">
            <label for="exampleInputEmail1" className="mt-4">
             Email
            </label>
            <input
              type="email"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>


        <div>
          <h3 style={{ textAlign: "center", paddingTop: 40 }}>Edit Password</h3>
        </div>

        <form>
          <div className="form-group">
            <label for="exampleInputEmail1" className="mt-4">
            Password
            </label>
            <input
              type="email"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Password"
            />
            </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>

      </div>
      <Footer />
    </>
  );
}

export default FormEdit;

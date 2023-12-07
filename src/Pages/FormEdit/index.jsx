import React from "react";
import "./profile.css";

import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/index";
import axios from "axios";

function FormEdit() {
  const resultToken = localStorage.getItem("token").slice(7);
  const [photo, setPhoto] = React.useState("");
  const [file, setFile] = React.useState();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dataUser, setDataUser] = React.useState([]);

  console.log(file);

  React.useEffect(() => {
    axios
      .get(`${window.env.BE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${resultToken}`,
        },
      })
      .then((res) => {
        setDataUser(res?.data?.data);
      });
  }, []);

  const editPhotoHandler = () => {
    const form = new FormData();
    form.append("myfile", file);

    axios
      .post(`${window.env.BE_URL}/user/profile/update-photo`, form, {
        headers: {
          Authorization: `Bearer ${resultToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const editIdentityHandler = () => {
    axios
      .put(
        `${window.env.BE_URL}/user/profile/edit`,
        {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${resultToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPasswordHandler = () => {
    axios
      .put(
        `${window.env.BE_URL}/user/profile/update-password`,
        {
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${resultToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div>
          <h3 style={{ textAlign: "center", paddingTop: 20 }}>Edit Photo</h3>
        </div>

        {/* photo */}
        <div>
          <div className="d-flex flex-row justify-content-center gap-5">
            <div>
              {file ? (
                <img
                  src={file}
                  alt="profile"
                  style={{ width: 80, height: 80 }}
                />
              ) : (
                <img
                  src={dataUser.photo_profile}
                  alt="profile"
                  style={{ width: 80, height: 80 }}
                />
              )}
            </div>

            <div>
              <input
                className="mt-4 "
                type="file"
                name="myfile"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="button"
                className="btn btn-warning mt-3"
                onClick={() => {
                  editPhotoHandler();
                }}
              >
                Edit Photo
              </button>
            </div>
          </div>
        </div>

        {/* photo */}

        {/* identity */}
        <div>
          <h3 style={{ textAlign: "center", paddingTop: 60 }}>
            Edit Profil Identity
          </h3>
        </div>
        <div>
          <div className="form-group">
            <label for="exampleInputEmail1" className="mt-4">
              First Name
            </label>
            <input
              className="form-control "
              defaultValue={dataUser.first_name}
              onChange={(item) => setFirstName(item.target.value)}
            />
            <label for="exampleInputEmail1" className="mt-4">
              Last Name
            </label>
            <input
              className="form-control "
              defaultValue={dataUser.last_name}
              onChange={(item) => setLastName(item.target.value)}
            />
            <label for="exampleInputEmail1" className="mt-4">
              Phone Number
            </label>
            <input
              className="form-control "
              defaultValue={dataUser.phone_number}
              onChange={(item) => setPhoneNumber(item.target.value)}
            />
          </div>

          <button
            className="btn btn-primary mt-3"
            onClick={() => {
              editIdentityHandler();
            }}
          >
            Edit Identity
          </button>
        </div>
        {/* identity */}

        {/* email */}
        <div>
          <h3 style={{ textAlign: "center", paddingTop: 40 }}>Edit Email</h3>
        </div>

        <div>
          <div className="form-group">
            <label for="exampleInputEmail1" className="mt-4">
              Email
            </label>
            <input className="form-control " defaultValue={dataUser.email} />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </div>
        {/* email */}

        {/* password */}
        <div>
          <h3 style={{ textAlign: "center", paddingTop: 40 }}>Edit Password</h3>
        </div>

        <div>
          <div className="form-group">
            <label for="exampleInputEmail1" className="mt-4">
              Password
            </label>
            <input
              className="form-control "
              placeholder="Enter Password"
              onChange={(item) => {
                setPassword(item.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={() => editPasswordHandler()}
          >
            Edit Password
          </button>
        </div>
        {/* password */}
      </div>
      <Footer />
    </>
  );
}

export default FormEdit;

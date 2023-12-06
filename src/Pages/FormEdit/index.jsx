import React from "react";
import "./profile.css";

import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/index";
import axios from "axios";

function FormEdit() {
  const resultToken = localStorage.getItem("token").slice(7);
  const[photo,setPhoto]=React.useState('')
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const[dataUser,setDataUser] =React.useState([])

  console.log(photo.slice(12))


  React.useEffect(() => {
    axios.get('http://localhost:3001/user/profile',{
      headers:{
        Authorization:`Bearer ${resultToken}`,
      }
    }).then((res) => {
      
      setDataUser(res?.data?.data)

    })
  }, [])

  const editPhotoHandler = () => {
    axios
      .post(
        "http://localhost:3001/user/profile/update-photo",
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

  const editIdentityHandler = () => {
    axios
      .put(
        "http://localhost:3001/user/profile/edit",
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
        "http://localhost:3001/user/profile/update-password",
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
              <img
                src={dataUser.photo_profile}
                alt="profile"
                style={{ width: 80, height: 80 }}
              />
            </div>
            <div>
              <button type="button" className="btn btn-warning mt-4" onClick={(()=>editPhotoHandler())}>
                <input
                  type="file"
                  name="myImage"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={((item)=>setPhoto(item.target.value))}
                />
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
              placeholder={dataUser.first_name}
              onChange={(item) => setFirstName(item.target.value)}
            />
            <label for="exampleInputEmail1" className="mt-4">
              Last Name
            </label>
            <input
              className="form-control "
              placeholder={dataUser.last_name}
              onChange={(item) => setLastName(item.target.value)}
            />
            <label for="exampleInputEmail1" className="mt-4">
              Phone Number
            </label>
            <input
              className="form-control "
              placeholder={dataUser.phone_number}
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
            <input className="form-control " placeholder={dataUser.email} />
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

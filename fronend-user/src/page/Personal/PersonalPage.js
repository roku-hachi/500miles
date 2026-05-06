import { useEffect, useRef, useState } from "react";
import { useForm } from "../../hooks/useForm";
import api from "../../utils/api";
import { useFile } from "../../hooks/useFile";
import { validateEmail } from "../../utils/validate";

const PersonalPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { values, setValues, errors, setErrors, handleChange } = useForm();
  const { files, handleFile } = useFile();
  const user = JSON.parse(localStorage.getItem("user"));
  const inputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setValues({
        name: user.user_name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, []);
  const handleEdit = () => {
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errSubmit = {};
    let flag = true;

    if (values.name === "") {
      errSubmit.name = "Please enter your name";
      flag = false;
    }
    if (values.email === "") {
      errSubmit.email = "Please enter your email";
      flag = false;
    } else if (!validateEmail(values.email)) {
      errSubmit.email = "Invalid email";
      flag = false;
    }
    // if (!files || files.length === 0) {
    //   errSubmit.avatar = "Please upload your avatar";
    //   flag = false;
    // }
    if (values.phone === "") {
      errSubmit.phone = "Please enter your phone";
      flag = false;
    }
    if (values.address === "") {
      errSubmit.address = "Please enter your address";
      flag = false;
    }

    if (!flag) {
      setErrors(errSubmit);
    } else {
      const formData = new FormData();
      formData.append("user_name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      //   formData.append("avatar", files[0]);
      api
        .put("/user/update/" + user.id, formData)
        .then((res) => {
          console.log(res);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <div className="text-center">
          <img
            src={`http://localhost:3002/${user.avatar}`}
            className="rounded-circle mb-3"
            width="120"
            height="120"
            alt="avatar"
          />
          <h4>{user.user_name}</h4>
        </div>

        <hr />

        <div>
          {!isEdit ? (
            <>
              <div className="row g-3">
                {/* Username */}
                <div className="col-md-6">
                  <label className="form-label">Username</label>
                  <span type="text" className="form-control" name="address">
                    {values.name}
                  </span>
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <span type="text" className="form-control" name="address">
                    {values.email}
                  </span>
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <span type="text" className="form-control" name="address">
                    {values.phone}
                  </span>
                </div>

                {/* Address */}
                <div className="col-md-6">
                  <label className="form-label">Address</label>
                  <span type="text" className="form-control" name="address">
                    {values.address}
                  </span>
                </div>
              </div>
              <div className="mt-4 text-end">
                <button className="btn btn-primary" onClick={handleEdit}>
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <div>
              <form className="row g-3" onSubmit={handleSubmit}>
                {/* Username */}
                <div className="col-md-6">
                  <label className="form-label">Username</label>
                  <input
                    ref={inputRef}
                    type="text"
                    className="form-control"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Address */}
                <div className="col-md-6">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-4 text-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;

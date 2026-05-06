import "./Register.css";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { validateEmail } from "../../utils/validate";
import { useFile } from "../../hooks/useFile";
import api from "../../utils/api";

const Register = () => {
  const { values, errors, setErrors, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    passCf: "",
    phone: "",
    address: "",
  });
  const { files, handleFile, uploadFiles } = useFile();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const errSubmit = {};
  //   let flag = true;

  //   if (values.name === "") {
  //     errSubmit.name = "Please enter your name";
  //     flag = false;
  //   }
  //   if (values.email === "") {
  //     errSubmit.email = "Please enter your email";
  //     flag = false;
  //   } else if (!validateEmail(values.email)) {
  //     errSubmit.email = "Invalid email";
  //     flag = false;
  //   }
  //   if (!files || files.length === 0) {
  //     errSubmit.avatar = "Please upload your avatar";
  //     flag = false;
  //   }
  //   if (values.phone === "") {
  //     errSubmit.phone = "Please enter your phone";
  //     flag = false;
  //   }
  //   if (values.address === "") {
  //     errSubmit.address = "Please enter your address";
  //     flag = false;
  //   }
  //   if (values.password === "") {
  //     errSubmit.password = "Please enter your password";
  //     flag = false;
  //   }
  //   if (values.passCf === "") {
  //     errSubmit.passCf = "Please enter a valid password";
  //     flag = false;
  //   } else if (values.passCf != values.password) {
  //     errSubmit.passCf = "Incorrect authentication password";
  //     flag = false;
  //   }

  //   if (!flag) {
  //     setErrors(errSubmit);
  //   } else {
  //     const imageUrls = uploadFiles();
  //     const formData = new FormData();

  //     formData.append("user_name", values.name);
  //     formData.append("email", values.email);
  //     formData.append("phone", values.phone);
  //     formData.append("address", values.address);
  //     formData.append("password", values.password);
  //     formData.append("avatar", imageUrls);

  //     api
  //       .post("/register", formData)
  //       .then((res) => {
  //         console.log("check data:", res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errSubmit = {};
    let flag = true;

    // validate (giữ nguyên của bạn)
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
    if (!files || files.length === 0) {
      errSubmit.avatar = "Please upload your avatar";
      flag = false;
    }
    if (values.phone === "") {
      errSubmit.phone = "Please enter your phone";
      flag = false;
    }
    if (values.address === "") {
      errSubmit.address = "Please enter your address";
      flag = false;
    }
    if (values.password === "") {
      errSubmit.password = "Please enter your password";
      flag = false;
    }
    if (values.passCf === "") {
      errSubmit.passCf = "Please enter a valid password";
      flag = false;
    } else if (values.passCf != values.password) {
      errSubmit.passCf = "Incorrect authentication password";
      flag = false;
    }

    if (!flag) {
      setErrors(errSubmit);
    } else {
      try {
        // 🔥 1. upload ảnh lên Supabase
        const imageUrls = await uploadFiles();

        // 🔥 2. lấy URL avatar
        const avatarUrl = imageUrls[0];

        // 🔥 3. gửi data lên backend (KHÔNG dùng FormData nữa)
        const data = {
          user_name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          password: values.password,
          avatar: avatarUrl, // chỉ gửi URL
        };

        const res = await api.post("/register", data);

        console.log("Success:", res);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="register-main">
      <div className="register-box">
        <div className="logo">
          <img
            src="https://img.icons8.com/color/96/000000/add-user-group-man-man.png"
            alt="Logo"
          />
          <h3 className="text-success">Create Account</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Enter full name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.name}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="phone"
              placeholder="Phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.phone}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Address
            </label>
            <input
              type="text"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              id="address"
              placeholder="Address"
              name="address"
              value={values.address}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.address}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Avatar
            </label>
            <input
              type="file"
              className={`form-control ${errors.avatar ? "is-invalid" : ""}`}
              id="avatar"
              name="avatar"
              onChange={handleFile}
            />
            <div className="invalid-feedback">{errors.avatar}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirm" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.passCf ? "is-invalid" : ""}`}
              id="confirm"
              placeholder="Confirm password"
              name="passCf"
              value={values.passCf}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.passCf}</div>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-success">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

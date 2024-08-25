import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import "../assets/css/signup.css";

const Signup = () => {
  const [formsdata, setFormsData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { email, username, password, confirmPassword } = formsdata;
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { signupUser } = useContext(AuthContext);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@#$%^&*!]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    setFormsData({ ...formsdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages({});

    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    let hasError = false;
    const newErrors = {};

    // Email validation
    if (!trimmedEmail) {
      newErrors.email =
        "Email is required. Please provide a valid email address.";
      hasError = true;
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email =
        "Please enter an email address that contains allowed letters, numbers, and symbols such as ( . ,  _ ,  -), and make sure it includes @ and a valid domain, such as example.user-123@gmail.com.";
      hasError = true;
    }

    // Username validation
    if (!trimmedUsername) {
      newErrors.username = "Username is required. Please enter a username.";
      hasError = true;
    } else if (!validateUsername(trimmedUsername)) {
      newErrors.username =
        "Ensure your username is at least 3 characters long and only contains letters, numbers, dots, underscores, or hyphens, such as user-name_123.";
      hasError = true;
    }

    // Password validation
    if (!trimmedPassword) {
      newErrors.password = "Password is required. Please enter a password.";
      hasError = true;
    } else if (!validatePassword(trimmedPassword)) {
      newErrors.password =
        "Ensure your password is at least 8 characters long, includes at least one lowercase letter, one uppercase letter, one digit, and may use symbols like @, #, $, %, ^, &, *, and !, e.g., Password@1.";
      hasError = true;
    }

    // Confirm password validation
    if (!trimmedConfirmPassword) {
      newErrors.confirmPassword =
        "Confirm Password is required. Please enter a password.";
      hasError = true;
    } else if (trimmedPassword !== trimmedConfirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match. Ensure both password fields are identical.";
      hasError = true;
    }

    if (!isChecked) {
      newErrors.checkbox = "You must agree to the Terms of Service !";
      hasError = true;
    }

    if (hasError) {
      setMessages(newErrors);
      return;
    }

    setIsLoading(true);

    const response = await signupUser(
      trimmedEmail,
      trimmedUsername,
      trimmedPassword,
      trimmedConfirmPassword
    );

    const data = {
      success: response.success ? response.success : "",
      error: response.error ? response.error : "",
      email: response.email ? response.email : "",
      username: response.username ? response.username : "",
      password: response.password ? response.password : "",
      confirmPassword: response.password2 ? response.password2 : "",
    };

    setMessages(data);

    setIsLoading(false);
  };

  return (
    <main className="main-container">
      <section className="auth-sidebar">
        <div className="auth-sidebar-content">
          <Link to="/" className="auth-sidebar-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={76}
              height={30}
              viewBox="0 0 210 59"
              fill="none"
              className="fill-current"
            >
              <title>Dribbble: the community for graphic design</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M206.622 31.928C207.065 31.4116 207.85 31.4352 208.253 31.986H208.25L209.784 34.0834C210.075 34.4864 210.073 35.0425 209.769 35.4349C207.106 38.8893 202.44 42.2143 196.81 42.5359C192.366 42.7887 188.701 41.1051 186.706 37.9221C186.311 37.2925 185.44 37.2557 184.997 37.8511C182.63 41.0286 179.766 43.5134 176.782 43.6845C171.467 43.9876 169.966 40.4228 171.28 32.563C171.412 31.7805 170.726 31.1192 169.987 31.3141C168.885 31.6065 167.715 31.7356 166.528 31.633C166.034 31.5907 165.571 31.8912 165.422 32.3811C163.455 38.8418 158.774 44.8518 152.715 45.1997C148.847 45.421 143.069 43.205 143.647 33.9462C143.695 33.1927 143.019 32.5999 142.323 32.8106C141.11 33.1795 139.804 33.3534 138.474 33.2401C137.981 33.1979 137.52 33.4983 137.371 33.9885C135.404 40.449 130.723 46.4592 124.664 46.8068C120.796 47.0282 115.018 44.8124 115.596 35.5536C115.644 34.7998 114.968 34.207 114.272 34.418C113.059 34.7869 111.753 34.9634 110.423 34.8473C109.93 34.8053 109.469 35.1057 109.32 35.5956C107.352 42.0564 102.672 48.0664 96.6132 48.4142C93.8613 48.5723 90.1398 47.4945 88.4308 43.5264C88.1016 42.7599 87.1144 42.6438 86.6257 43.3105C84.2334 46.5751 81.3193 49.152 78.2762 49.3259C75.1571 49.505 73.4509 48.2535 72.7091 46.0216C72.4458 45.2339 71.4609 45.0467 70.9293 45.6712C68.8002 48.1744 66.3749 50.0082 63.9216 50.1479C60.1393 50.3666 57.9619 47.563 57.7823 44.1667C57.5747 40.204 59.2887 35.564 61.2025 30.4999C61.4684 29.7964 60.9873 29.0348 60.2608 29.0032C59.157 28.956 57.8963 28.8399 56.7113 28.6185C56.1771 28.5159 55.6583 28.8479 55.5063 29.3907C53.243 37.4716 49.7771 45.392 46.8529 50.074C46.5263 50.5984 45.8505 50.7381 45.3593 50.377L43.1264 48.7331C42.6682 48.393 42.5441 47.7397 42.8504 47.247C47.0759 40.478 50.8278 29.8807 52.1215 22.0421C52.2025 21.5415 52.61 21.17 53.0986 21.141L56.0683 20.9697C56.7493 20.9302 57.2861 21.5652 57.162 22.2634L57.1493 22.3372C57.0379 22.959 57.4532 23.5439 58.0532 23.6257C60.7164 23.992 64.6963 24.0366 67.3975 23.9313C68.157 23.9023 68.6938 24.6875 68.4178 25.4226C66.2507 31.1876 63.3469 39.1765 63.5139 42.3382C63.5899 43.7662 64.2204 44.5462 65.3291 44.4829C67.4508 44.3619 70.7141 40.0959 73.1876 35.3455C73.2331 35.261 73.2659 35.169 73.2862 35.0741C74.1196 31.3543 75.3565 27.2068 76.6061 23.0163L76.6837 22.7561C76.8128 22.3188 77.1901 22.0131 77.6306 21.9868L81.1876 21.7839C81.9219 21.7417 82.4712 22.4795 82.2485 23.2093C82.0654 23.8112 81.883 24.409 81.7023 25.0014C78.5723 35.2603 75.9438 43.8759 79.4838 43.6742C81.7978 43.5422 85.0764 39.6164 87.8966 34.0279C87.9421 33.9356 87.9751 33.8381 87.9954 33.7355C88.1372 33.0055 88.3092 32.2416 88.5195 31.4432C90.1639 24.8753 92.0286 18.3691 93.8955 11.855C94.4717 9.8446 95.0481 7.83341 95.6182 5.81945C95.7449 5.37417 96.1245 5.06062 96.57 5.03426L100.221 4.82611C100.963 4.78396 101.512 5.52962 101.279 6.26474C99.8208 10.8388 98.2967 15.7106 96.8487 20.4006C96.5448 21.3887 97.603 22.2107 98.4386 21.6416C99.8791 20.6562 101.545 20.0027 103.158 19.9105C107.267 19.676 110.064 23.0565 110.332 28.1496C110.347 28.4184 110.363 28.7082 110.37 29.0032C110.385 29.5673 110.808 30.023 111.348 30.0704C113.282 30.2417 115.259 29.6673 116.786 28.3051C116.943 28.1654 117.049 27.9757 117.102 27.7701C118.616 21.8916 120.287 16.0568 121.959 10.2147C122.532 8.21455 123.105 6.21353 123.672 4.20956C123.798 3.76427 124.178 3.45072 124.624 3.42438L128.274 3.21623C129.016 3.17408 129.566 3.91972 129.333 4.65484C127.874 9.22892 126.35 14.1007 124.902 18.7907C124.598 19.7788 125.657 20.6008 126.492 20.0317C127.933 19.0463 129.599 18.3929 131.211 18.3006C135.32 18.0662 138.117 21.4466 138.386 26.5399C138.401 26.8084 138.416 27.0985 138.424 27.3935C138.436 27.9573 138.862 28.4132 139.401 28.4607C141.335 28.6318 143.312 28.0573 144.839 26.6951C144.996 26.5557 145.102 26.3659 145.156 26.1604C146.67 20.2818 148.34 14.4471 150.013 8.6051C150.586 6.60484 151.158 4.60372 151.725 2.59968C151.852 2.15439 152.232 1.84085 152.677 1.8145L156.328 1.60635C157.07 1.56419 157.619 2.30985 157.386 3.04497C155.928 7.61902 154.404 12.4908 152.956 17.1808C152.652 18.1689 153.71 18.991 154.546 18.4219C155.986 17.4364 157.652 16.783 159.265 16.6908C163.374 16.4563 166.171 19.8367 166.44 24.9299C166.455 25.2013 166.47 25.4885 166.477 25.7835C166.493 26.3447 166.913 26.8032 167.452 26.8507C169.323 27.0166 171.237 26.4844 172.741 25.2171C172.908 25.0774 173.024 24.8798 173.08 24.6637C174.804 18.0187 177.336 9.31324 179.777 0.981894C179.906 0.541877 180.285 0.236236 180.726 0.209888L184.344 0.0017367C185.078 -0.0404207 185.627 0.692063 185.407 1.42191C182.047 12.5778 179.308 22.3372 177.797 28.0944C175.789 35.9039 175.711 38.1567 177.994 38.025C179.911 37.9143 182.493 35.1952 184.928 31.0847C185.025 30.924 185.075 30.7397 185.083 30.5526C185.402 22.324 190.447 14.8385 197.946 14.409C202.969 14.1218 205.721 17.916 205.918 21.6495C206.293 28.7767 199.248 33.3324 192.42 32.9107C191.625 32.8606 191.047 33.7145 191.397 34.4574C192.351 36.4967 194.359 37.6352 197.787 37.4374C201.048 37.2531 204.468 34.439 206.622 31.928ZM93.7548 33.9278C92.1345 40.4228 94.1017 42.9652 96.646 42.8203C100.823 42.5805 104.864 34.9263 104.553 29.019C104.416 26.4396 102.907 25.0958 101.145 25.1961C98.2106 25.3646 95.0512 28.745 93.7548 33.9278ZM121.808 32.3207C120.188 38.8154 122.155 41.3581 124.7 41.2131H124.697C128.874 40.9734 132.917 33.3192 132.606 27.4119C132.472 24.8324 130.96 23.4886 129.198 23.5887C126.264 23.7574 123.105 27.1379 121.808 32.3207ZM149.862 30.7133C148.242 37.2082 150.209 39.7509 152.753 39.606H152.751C156.925 39.3662 160.971 31.712 160.66 25.8047C160.525 23.2251 159.014 21.8814 157.252 21.9815C154.318 22.1501 151.158 25.5307 149.862 30.7133ZM200.584 22.2239C200.559 20.5218 199.513 19.2887 197.817 19.3862H197.815C194.483 19.5785 191.875 23.1856 191.045 27.562C190.913 28.2577 191.422 28.9058 192.103 28.8899C196.407 28.7821 200.721 25.9416 200.584 22.2239ZM44.3525 25.3837C43.9171 12.1962 35.3423 3.49339 22.6712 3.94658C17.2307 4.19426 11.0052 6.25733 6.32164 9.9461C5.88113 10.2939 5.76719 10.9315 6.06593 11.4163L8.05331 14.6519C8.39254 15.2052 9.11407 15.3185 9.60776 14.9075C13.1724 11.9459 18.0383 10.0041 22.7193 9.79855C31.403 9.43757 37.7828 14.9971 38.1551 25.7367C38.6209 38.2417 30.2157 52.5461 16.7091 53.3207C16.2382 53.3471 15.7471 53.3577 15.2559 53.3577C14.5673 53.3577 14.0585 52.6858 14.2306 51.9901C16.8357 41.4744 19.8763 30.1974 22.9776 19.7029C23.1928 18.973 22.6459 18.2458 21.9143 18.288L17.9648 18.5146C17.5218 18.5409 17.142 18.8492 17.0129 19.2918C14.0331 29.6045 11.0508 40.7895 8.36723 51.284C8.21279 51.89 7.59761 52.2379 7.02544 52.0427C5.62543 51.566 4.34693 51.0232 3.2583 50.3881C2.73677 50.0825 2.07601 50.2987 1.80765 50.8571L0.11142 54.4037C-0.139216 54.9281 0.0455967 55.5709 0.539275 55.8527C4.38489 58.0345 10.223 59.2806 16.0914 58.9462C35.4032 57.8393 44.864 40.0015 44.3525 25.3889V25.3837ZM82.3044 9.18082C79.955 9.31518 77.8713 11.9553 78.0183 14.7377C78.1143 16.5715 79.2917 17.7967 81.1195 17.694C83.4689 17.5596 85.6106 14.7798 85.4714 12.1318C85.3754 10.298 84.0005 9.08333 82.3044 9.18082Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <video
            className="auth-sidebar-video"
            width="320"
            height="240"
            autoPlay
            loop
            muted
          >
            <source
              src={"../assets/Videos/30fd1f7b63806eff4db0d4276eb1ac45.mp4"}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <Link className="auth-sidebar-credit" to="/">
            @glebich
          </Link>
        </div>
      </section>
      <section className="content">
        {show ? (
          <>
            <button className="back-btn btn2" onClick={() => setShow(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </button>
            <div className="auth-content-v2">
              <h2>Sign up to Dribbble</h2>
              {messages.error && (
                <div className="alert-danger">{messages.error}</div>
              )}
              <div className="sign-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-field">
                    <div className="handlaerror">
                      {messages.username && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                        </svg>
                      )}
                      <label htmlFor="user_name">Username</label>
                    </div>
                    <input
                      style={
                        messages.username ? { backgroundColor: "#ffeeee" } : {}
                      }
                      className="text-input"
                      type="text"
                      name="username"
                      value={username}
                      onChange={handleChange}
                    />
                    {messages.username && (
                      <p className="handlaerror">{messages.username}</p>
                    )}
                  </div>
                  <div className="form-field">
                    <div className="handlaerror">
                      {messages.email && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                        </svg>
                      )}
                      <label htmlFor="user_name">Email</label>
                    </div>
                    <input
                      style={
                        messages.email ? { backgroundColor: "#ffeeee" } : {}
                      }
                      className="text-input"
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                    {messages.email && (
                      <p className="handlaerror">{messages.email}</p>
                    )}
                  </div>
                  <div className="form-field">
                    <div className="handlaerror">
                      {messages.password && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                        </svg>
                      )}
                      <label htmlFor="user_name">Password</label>
                    </div>
                    <input
                      style={
                        messages.password ? { backgroundColor: "#ffeeee" } : {}
                      }
                      className="text-input"
                      placeholder="8+ characters"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                    />
                    {messages.password && (
                      <p className="handlaerror">{messages.password}</p>
                    )}
                  </div>
                  <div className="form-field">
                    <div className="handlaerror">
                      {messages.confirmPassword && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                        </svg>
                      )}
                      <label htmlFor="user_name">Confirm Password</label>
                    </div>
                    <input
                      style={
                        messages.confirmPassword
                          ? { backgroundColor: "#ffeeee" }
                          : {}
                      }
                      className="text-input"
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                    />
                    {messages.confirmPassword && (
                      <p className="handlaerror">{messages.confirmPassword}</p>
                    )}
                  </div>
                  <div className="form-last-field">
                    <input
                      type="checkbox"
                      onChange={() => setIsChecked(!isChecked)}
                      style={
                        isChecked
                          ? {
                              backgroundColor: "#ea64d9",
                              borderColor: "#ea64d9",
                            }
                          : {}
                      }
                    />
                    <label htmlFor="user_name">
                      I agree with Dribbble's <a href="">Terms of Service</a>,{" "}
                      <a href=""> Privacy Policy</a>, and default{" "}
                      <a href=""> Notification Settings</a> .
                    </label>
                  </div>
                  {messages.checkbox && (
                    <p className="handlaerror">{messages.checkbox}</p>
                  )}
                  <input
                    type="submit"
                    value="Create Account"
                    disabled={isLoading}
                  />
                  <p>
                    Already have an account ? <Link to="/login">Sign In</Link>
                  </p>
                  <p className="recaptcha-terms">
                    This site is protected by reCAPTCHA and the Google
                    <a href=""> Privacy Policy </a> and
                    <a href=""> Terms of Service </a> apply .
                  </p>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="auth">
            <div className="auth-content">
              <h2>Sign up to Dribbble</h2>
              <a className="auth-connections btn2" href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  role="img"
                  className="icon"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.64 9.20419C17.64 8.56601 17.5827 7.95237 17.4764 7.36328H9V10.8446H13.8436C13.635 11.9696 13.0009 12.9228 12.0477 13.561V15.8192H14.9564C16.6582 14.2524 17.64 11.9451 17.64 9.20419Z"
                    fill="#4285F4"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z"
                    fill="#34A853"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z"
                    fill="#FBBC05"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </a>
              <hr className="divider" />
              <div className="auth-form sign-in-form">
                <button className="btn btn2" onClick={() => setShow(true)}>
                  Continue with email
                </button>
              </div>
              <p>
                By creating an account you agree with our
                <a href="">Terms of Service</a>, <a href="">Privacy Policy</a>,
                and our default <a href="">Notification Settings</a> .
              </p>
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Signup;

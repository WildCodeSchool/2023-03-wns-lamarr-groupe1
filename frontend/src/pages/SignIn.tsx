import FormSignIn from "../components/common/FormSignIn";
import "../styles/SignInUp.scss";
import Navbar from "../components/common/navbar";

const SignIn = () => {
  return (
    <>
      <Navbar />
      <div className="container-page-signin">
        <FormSignIn />
      </div>
    </>
  );
};

export default SignIn;

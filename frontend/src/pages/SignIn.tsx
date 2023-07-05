import FormSignIn from "../components/common/FormSignIn";
import "../styles/SignInUp.scss";
import Navbar from "../components/common/navbar";
("../../src/components/common/navbar");

const SignIn = () => {
  return (
    <div className="container-page-signin">
      <Navbar />
      <FormSignIn />
    </div>
  );
};

export default SignIn;

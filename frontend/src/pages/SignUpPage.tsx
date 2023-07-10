import FormSignUp from "../components/common/FormSignUp";
import Navbar from "../components/common/navbar";

const SignUpPage = () => {
  return (
    <>
      <Navbar />
      <div className="container-page-signin">
        <FormSignUp />
      </div>
    </>
  );
};

export default SignUpPage;

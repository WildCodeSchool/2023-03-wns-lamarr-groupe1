import FormSignUp from "../components/common/FormSignUp";
import Layout from "../components/common/layouts/Layout";

const SignUpPage = () => {
  return (
    <>
      <Layout>
        <div className="container-page-signin">
          <FormSignUp />
        </div>
      </Layout>
    </>
  );
};

export default SignUpPage;

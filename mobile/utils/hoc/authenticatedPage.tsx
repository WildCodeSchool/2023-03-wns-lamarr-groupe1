import { useEffect } from "react"

type ReactComponent = () => JSX.Element

const AuthenticatedPage = (Page: ReactComponent) => {
  function MyComponent() {

    useEffect(() => {
      const isAuthenticated = localStorage.getItem("token")

      if (!isAuthenticated) {
        // Redirect to the sign-in page
      }
    }, [])

    return <Page />
  }

  return MyComponent
}

export default AuthenticatedPage

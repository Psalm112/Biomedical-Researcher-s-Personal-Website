import React, { useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminOutlet from "./Dashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

function Admin() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    // if (loading) {
    //   // maybe trigger a loading screen
    //   return;
    // }
    const origin = `${window.location.origin}/`;
    if (window.location.href === origin) {
      if (user) navigate("/");
    }
  }, [user, loading]);

  return <>{!loading && (!user ? <AdminLogin /> : <AdminOutlet />)}</>;
}

export default Admin;

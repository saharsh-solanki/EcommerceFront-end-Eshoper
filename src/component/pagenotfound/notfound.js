import React from "react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  React.useEffect(() => {
    return navigate("/user/login");
  }, []);

  navigate("/user/login");
  return <div>Page not found</div>;
}

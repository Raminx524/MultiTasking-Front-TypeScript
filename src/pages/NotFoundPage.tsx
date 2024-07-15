import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate(-1), 2000);
  }, []);
  return (
    <div className="text-xl font-semibold m-auto">
      Error 404, Page not found! Redirecting...
    </div>
  );
}

export default NotFoundPage;

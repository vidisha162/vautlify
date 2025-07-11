import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddSecrets = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirects to vault page
    navigate("/vault");
  }, [navigate]);

  return null;
};

export default AddSecrets;

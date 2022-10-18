import { errorSelector, successSelector } from "@/state/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Modal({ children }) {
  const [show, setShow] = useState([false, null]);
  const error = useSelector(errorSelector);
  const success = useSelector(successSelector);
  useEffect(() => {
    if (error || success) {
      clearTimeout(show[1]);
      setShow([
        true,
        setTimeout(() => {
          setShow([false, null]);
        }, 1200),
      ]);
    }
  }, [error, success]);

  const handleHide = () => {
    setShow([false, null]);
  };

  return (
    <div
      className={`m-4 position-fixed bottom-0 end-0  alert-dismissible  fade ${
        show[0] ? "show" : null
      }`}
    >
      <div
        className="alert alert-warning"
        style={{ width: "fit-content" }}
        role="alert"
      >
        <span>{success.message ? success.message : error.message}</span>
        <button
          onClick={handleHide}
          type="button"
          className="btn-close btn-sm"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}

export default Modal;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { appActions, appSelectors } from "../../estado/appSlice";

export default function Ingresar() {
  const dispatch = useDispatch();
  const [reg, setReg] = useState(false);
  const error = useSelector(appSelectors.error);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    getValues,
    setError,
    watch,
  } = useForm();

  const password = watch("password_check", false);
  const rePassword = watch("rePassword_check", false);

  useEffect(() => {
    if (isSubmitted) {
      if (error.name === "user_email")
        setError("email", { message: "Este email ya esta registrado" });
      if (error.name === "user_name")
        setError("name", { message: "Este usuario ya esta registrado" });
      if (error.name === "user")
        setError("password", { message: "usuario y/o contraseña incorrecta" });
    }
  }, [error, isSubmitted]);

  async function onSubmit({ name, password, rePassword, email }) {
    if (!password === rePassword)
      errors["password"].message = "Las contraseñas no coinciden";
    if (reg) return dispatch(appActions.reg({ name, password, email }));
    dispatch(appActions.login({ name, password, email }));
  }

  const handleReg = () => {
    setReg(!reg);
    setError("password", {});
    setError("email", {});
    setError("name", {});
  };

  return (
    <div className="register p-3">
      <div className="d-flex justify-content-center gap-4 py-3">
        <button className="btn btn-dark" type="button" onClick={handleReg}>
          Login
        </button>
        <button className="btn btn-dark" type="button" onClick={handleReg}>
          Registro
        </button>
      </div>
      <form
        name="access"
        className=" d-grid gap-3 container justify-content-center form-switch"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <label className="form-label">
          Nombre de usuario*
          <input
            {...register("name", {
              minLength: {
                value: 5,
                message: "Debe tener 5 o mas letras",
              },
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
            type="text"
            placeholder="User/user@example.com"
            className="form-control form-control-md"
          />
          <span className=" text-danger">{errors["name"]?.message}</span>
        </label>
        <label className="form-label">
          Contraseña*
          <span className="d-flex position-relative">
            <input
              {...register("password", {
                required: { value: true, message: "Ingrese una contraseña!" },
                minLength: {
                  value: 8,
                  message: "Debe tener al menos 8 caracteres",
                },
                maxLength: {
                  value: 18,
                  message: "Debe tener maximo 18 caracteres",
                },
              })}
              type={password ? "text" : "password"}
              placeholder="contraseña"
              className="form-control form-control-md"
              spellCheck={false}
            />
            <input
              role="button"
              className="position-absolute end-0 translate-middle-y form-check-input"
              type="checkbox"
              {...register("password_check")}
            />
          </span>
          <span className=" text-danger">{errors["password"]?.message}</span>
        </label>
        {reg && (
          <>
            <label className="form-label">
              Reescribir Contraseña*
              <span className="d-flex position-relative">
                <input
                  {...register("rePassword", {
                    required: {
                      value: true,
                      message: "Reescriba la contraseña",
                    },
                    validate: (val) =>
                      val === getValues("password") ||
                      "Las contraseñas deben coincidir",
                  })}
                  type={rePassword ? "text" : "password"}
                  spellCheck={false}
                  placeholder="contraseña"
                  className="form-control form-control-md"
                />
                <input
                  role="button"
                  className="position-absolute  end-0 translate-middle-y form-check-input"
                  type="checkbox"
                  {...register("rePassword_check")}
                />
              </span>
              {!Boolean(errors["password"]?.message) && (
                <span className=" text-danger">
                  {errors["rePassword"]?.message}
                </span>
              )}
            </label>

            <label className="form-label">
              Mail
              <input
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Ingrese un email valido",
                  },
                })}
                type="email"
                placeholder="email"
                className="form-control form-control-md"
              />
              <span className=" text-danger">{errors["email"]?.message}</span>
            </label>
          </>
        )}
        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>
    </div>
  );
}

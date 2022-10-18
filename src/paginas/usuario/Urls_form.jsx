import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { appActions } from "../../estado/appSlice";

export default function Urls_form() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = ({ origin }) => {
    dispatch(appActions.add({ origin }));
  };

  return (
    <form className="d-grid gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="url"
        placeholder="https://www.example.com"
        autoComplete="off"
        className="form-control"
        {...register("origin")}
      />
      {false ? <p className="alert alert-danger">a</p> : null}
      <button type="submit" className="btn btn-primary w-100">
        Agregar
      </button>
    </form>
  );
}

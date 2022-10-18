import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../comps/Loading";
import { appActions, appSelectors } from "../../estado/appSlice";
import "./usuario.scss";

function UrlCard({ url }) {
  const [state, setState] = useState({ editing: false, origin: url.origin });
  const dispatch = useDispatch();
  const loading = useSelector(appSelectors.loading);
  const ref = useRef();

  const { origin, short, id } = url;

  useEffect(() => {
    setState({ ...state, editing: false, origin });
  }, [origin]);

  const handleDelete = () => {
    dispatch(appActions.del({ id }));
  };
  const saveChanges = () => {
    dispatch(appActions.edit({ id, origin: state.origin }));
  };
  const handleEdit = (e) => {
    if (state.editing) return saveChanges();
    setState({ ...state, editing: true });
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setState({ ...state, origin, editing: false });
      }}
      className="editing_card"
      editing={state.editing ? "" : undefined}
    >
      <div
        className="card-body text-center url_card p-3"
        onClick={(e) => e.stopPropagation()}
      >
        {(state.editing && (
          <input
            ref={ref}
            type="url"
            value={state.origin}
            onChange={({ target }) =>
              setState({ ...state, origin: target.value })
            }
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                if (origin === state.origin)
                  return setState({ ...state, editing: false });
                saveChanges();
              }
            }}
          />
        )) || (
          <span href={origin} onDoubleClick={handleEdit}>
            {state.origin}
          </span>
        )}
        <p>{short}</p>
        {loading === id && (
          <span className="url_card_loading">
            <Loading />
          </span>
        )}
        <button className="btn btn-danger" onClick={handleDelete}>
          Eliminar
        </button>
        <button className="btn btn-warning" type="button" onClick={handleEdit}>
          {state.editing ? "Guardar" : "Editar"}
        </button>
        <button
          className="btn btn-info"
          onClick={() => {
            navigator.clipboard.writeText(
              document.location.origin + "/" + short
            );
          }}
        >
          Copiar
        </button>
      </div>
    </div>
  );
}

export default UrlCard;

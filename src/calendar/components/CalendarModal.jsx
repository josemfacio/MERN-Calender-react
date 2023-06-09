import { addHours, differenceInSeconds } from "date-fns";
import { useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
export const CalendarModal = () => {
  Modal.setAppElement("#root");
  const [isOpen, setIsOpen] = useState(true);
  const [formValues, setFormValues] = useState({
    title: "Jose",
    notes: "Facio",
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const onDateChanged = (event, chaging) => {
    setFormValues({
      ...formValues,
      [chaging]: event,
    });
  };
  const onCloseModal = () => {
    console.log("cerrando modal");
    setIsOpen(false);
  };
  const onSubmit = (event) => {
    //Detiene toda la accion event,preventDefault
    event.preventDefault();
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      console.log("Error en Fechas");
      return;
    }
    if (formValues.title.length <= 0) return;
    console.log(formValues);
    // TODO:
    // Remover errores en pantalla
  };
  registerLocale("es", es);
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Example Modal"
      onRequestClose={onCloseModal}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(event) => onDateChanged(event, "start")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(event) => onDateChanged(event, "end")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>
        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

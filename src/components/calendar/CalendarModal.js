import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
//import DateTimePicker from "react-datetime-picker";
import { uiCloseModal } from "../../actions/ui";
import moment from "moment";
import Swal from "sweetalert2";
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from "../../actions/events";

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


Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus1.toDate(),
}
export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);
  const dispatch = useDispatch();
  const [formvalues, setFormvalues] = useState(initEvent);

  const { notes, title, start, end } = formvalues;


  useEffect(() => {
    if ( activeEvent ){

      setFormvalues(activeEvent)
    }else {
      setFormvalues(initEvent)
    }
    
  }, [activeEvent])


  const handleInputChange = ({ target }) => {
    setFormvalues({
      ...formvalues,
      [target.name]: target.value,
    });
  };
  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent())
    setFormvalues(initEvent)
  };

  const handleStartDateChange = (e) => {
    setDateStart(e.target.value);
    setFormvalues({
      ...formvalues,
      start: e.target.value,
    });
  };
  const handleEndDateChange = (e) => {
    setDateEnd(e.target.value);
    setFormvalues({
      ...formvalues,
      end: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (start >= end) {
      console.log("error fecha");
      Swal.fire({
        icon: "error",
        title: "Error en las fechas",
        text: "La fecha incial no puede ser mayor a la fecha final",
        //footer: '<a href="">Why do I have this issue?</a>'
      });
    }
    if (title.trim().length < 2) {
      setTitleValid(false);
    }
    if (activeEvent) {
      dispatch( eventStartUpdate( formvalues))
    } else {

      dispatch(eventStartAddNew(formvalues))
    }
    //Realizar la grabacion en la base de datos.
    setTitleValid(true);
    closeModal();

  };

  return (
    <Modal
      isOpen={modalOpen}
      //onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      style={customStyles}
      className="modal"
      overlayClassName=" modal-fondo"
    >
      <h1> {activeEvent? 'Editar evento': 'Nuevo evento'} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <input
            type="datetime-local"
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control react-datetime-picker"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <input
            type="datetime-local"
            onChange={handleEndDateChange}
            //disabled = {dateStart > dateEnd? true:false}
            value={dateEnd}
            className="form-control react-datetime-picker"
            style={dateStart > dateEnd ? { color: "red" } : null}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid === true && "is-invalid"}`}
            //className='form-control is-valid'
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
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

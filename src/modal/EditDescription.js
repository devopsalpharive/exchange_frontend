import React from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import { IoClose } from "react-icons/io5";
import ModalInput from "../components/ModalInput";

const EditDescription = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.editDesc}
        onHide={props.handleEditDescClose}
        className="custom_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={props.handleEditDescClose}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Edit Description</h5>
        </Modal.Header>
        <Modal.Body>
          <div
            className="
          "
          >
            <div className="d-flex flex-column align-items-start gap-3">
              <label>Enter your description</label>
              <textarea name="" id="" className="custom_textarea">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
              </textarea>
            </div>

            <div>
              <button
                className="grad_btn grad_btn2 mt-4"
                onClick={props.handleEditDescClose}
              >
                Update
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditDescription;

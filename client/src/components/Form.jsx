import React from "react";

function Form(props) {
  return (
    <div className="container my-4 form-outline w-25">
      <form className=" g-3">
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            {props.country}
          </label>
          <input
            type="text"
            className="input-sm form-control"
            id="exampleInputEmail1"
            onChange={props.handleChange}
            name="country"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            {props.capital}
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            onChange={props.handleChange}
            name="capital"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Upload Flag Image
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={props.imageUpload}
            name="file"
          />
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-success"
            onClick={props.handleClick}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;

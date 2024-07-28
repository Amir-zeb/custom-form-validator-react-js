function InputField({ ...props }) {
    const isInvalid = props.errorMessage ? "is-invalid" : ""
    return (
        <div className="input_container">
            <label htmlFor={props.name} className="form-label">{props.label}</label>
            <input id={props.name} className={`form-control ${isInvalid}`} type={props.type || "text"} {...props} />
            <span className="invalid-feedback">{props.errorMessage}</span>
        </div>
    );
}

export default InputField;
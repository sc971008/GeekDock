import React, { forwardRef } from "react";

const FloatInput = forwardRef(({ id, label, onChange, type, placeholder }, ref) => {
    return (
        <div className="form-floating py-1">
            <input
                id={id}
                className="form-control"
                type={type}
                ref={ref} // Attach the forwarded ref to the input
                onChange={onChange}
                placeholder={placeholder}
                required
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
});

FloatInput.displayName = "FloatInput";

export default FloatInput;

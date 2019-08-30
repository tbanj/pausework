import React from 'react';
const Input = ({ name, label, error, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {/*  {...rest} is use to contenate other properties of the props object */}
            <input id={name} name={name}  {...rest} className="form-control" aria-describedby="textHelp" placeholder={`Input ${name}`} />
            {/* <small id="textHelp" className="form-text text-muted">We'll never share your username with anyone else.</small> */}


            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Input;
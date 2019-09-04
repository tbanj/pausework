import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input.jsx';
class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validateProperty = ({ name, value }) => {
        // es6 computed property is use when name of data will picked from
        // a form that have multiple name fields
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }



    validate = () => {
        /* joi terminates errors as soon as it encounter 1, so other parts of the code is not being run
            either they contain error or not */
        const option = { abortEarly: false };
        const result = Joi.validate(this.state.data, this.schema, option);

        if (!result.error) return null;
        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    };

    handleSubmit = (e) => {

        // is use to prevent the form from sending detail to server
        e.preventDefault();
        const errors = this.validate();;
        this.setState({ errors: errors || {} });
        if (errors) return;
        this.doSubmit();
    };


    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };

        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];


        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors })
    };

    handleChanger = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };

        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];


        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors })
    };

    renderButton(label, classType = "btn btn-primary", styleType = {}) {
        return (
            <button disabled={this.validate()}
                // className="btn btn-primary"
                className={classType} style={styleType}
            >
                {label}</button>
        );
    }

    renderDropdown(name, label, gen) {
        const { genres, errors } = this.state;
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <select value={this.state.data.genreId} className="form-control select2" onChange={this.handleChange} id={name} name={name} >
                    {genres.map((data, key) => (
                        <option value={data._id} key={key}>{data.name}</option>
                    )

                    )}


                </select>
                {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
            </div>

        )
    }

    renderDropdownGeneral(name, label, gen) {
        const { errors, cinemaList } = this.state;
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <select className="form-control select2" onChange={this.handleChanger} id={name} name={name} >
                    {cinemaList.map((data, key) => (
                        <option value={data._id} key={key}>{data.name}</option>
                    )

                    )}


                </select>
                {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
            </div>

        )
    }

    renderInput(name, label, type = "text", autoFocus = false) {
        const { data, errors } = this.state;
        return (<Input type={type} name={name} autoFocus={autoFocus} value={data[name]} label={label}
            onChange={this.handleChange}
            error={errors[name]} />)
    }
}

export default Form;
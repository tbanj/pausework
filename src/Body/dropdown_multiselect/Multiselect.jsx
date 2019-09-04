import React, { Component } from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';

import "./multiselect.css";


class View extends Component {
    state = {
        selectedValue: [],
        classText: {},
    }


    handleDeselect(index) {
        var selectedValue = this.state.selectedValue.slice();
        selectedValue.splice(index, 1)
        this.setState({ selectedValue });
    }
    handleSelectionChange = (selectedValue) => {
        this.setState({ selectedValue })
    }

    handleChecker = () => {
        let classText = {
            button: `FilteredMultiSelect__button btn btn-block ${this.props.disableButtonClassName}`,
            // Used when at least one <option> is selected
            buttonActive: `FilteredMultiSelect__button--active btn btn-block form-control ${this.props.activeButtonClassName}`,
            filter: `FilteredMultiSelect__filter form-control ${this.props.filterClassName}`,
            select: `FilteredMultiSelect__select form-control ${this.props.selectClassName}`
        }
        this.setState({ classText });
    }



    componentDidMount() {
        this.handleChecker();
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.onMultiplySelect(this.state.selectedValue)

    }

    handleMultiselectt = () => {
    }


    render() {
        const { serverData } = this.props;
        var { selectedValue } = this.state
        return (
            <React.Fragment>

                {/* <div>{match.params.id}</div> */}
                {/* <img className="img-responsive" alt="dummy word" height="200px" src={"https://res.cloudinary.com/dr9bbyvab/v1566495925/Krystal/user-unisex-512.png"} />
             */}

                <div className="mx-2">
                    <FilteredMultiSelect
                        onChange={this.handleSelectionChange}
                        options={serverData}
                        selectedOptions={selectedValue}
                        textProp="name"
                        valueProp="id"
                        placeholder={'Get the fuck out'}
                        buttonText={"Select Now"}
                        className={'FilteredMultiSelect'}
                        classNames={this.state.classText}
                    />
                    {selectedValue.length === 0 && <div className="clearfix"><p className="">(Nothing selected yet)</p></div>}
                    {selectedValue.length > 0 &&
                        <div className={` ${this.props.selectedUserClass} removePad`} >
                            <span className="spanParent" >
                                <ul className="list-inline addMargin" >
                                    {selectedValue.map((value, i) => <li className={`list-inline-item addMarginTop`} key={value.id}>
                                        <span className="clickable innerSpanUl" onClick={() => this.handleDeselect(i)}>
                                            {`${value.name} `} <i className="fa fa-remove"></i>
                                        </span>
                                    </li>)}
                                </ul>
                            </span>
                        </div>}
                </div>

            </React.Fragment>
        );
    }
}

export default View;
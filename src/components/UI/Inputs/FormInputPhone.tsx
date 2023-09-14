import React, {HTMLInputTypeAttribute, useState} from "react";
import {useNavigate, useNavigation} from "react-router-dom";
import PhoneInput, {CountryData} from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css';
// import 'react-phone-input-2/lib/bootstrap.css';
import classes from "./FormInputPhone.module.css";


interface FormInputPhoneProps {
    id: string;
    name: string;
    type?: HTMLInputTypeAttribute;
    locked?: boolean;
    active?: boolean;
    value?: string;
    error?: string;
    label?: string;
    predicted?: string;
    className?: string;
}

const FormInputPhone: React.FC<FormInputPhoneProps> = ({ id, name, type = "text", locked: propLocked = false, active: propActive = false, value: propValue = '', error: propError = '', label: propLabel = 'Label', predicted: propPredicted = 'Hallo', className="" }) => {
    const [inputValue, setInputValue] = useState(propValue);
    const [hasValue, setHasValue] = useState(false);
    const [inputError, setInputError] = useState(propError);
    const [inputLabel, setInputLabel] = useState(propLabel);
    const [isActive, setIsActive] = useState((propLocked && propActive) || false);
    const isVibrationSupported = 'vibrate' in navigator;
    const handleInputBlur = () => {
        if (!propLocked) {
            setIsActive(false)
        }

    }

    const changeValue = (text: string, data: CountryData) => {
        if (data.dialCode === text) {
            setInputValue("")
            setHasValue(false)
        } else {
            // setInputValue(text);
            setHasValue(true)
        }
        setInputError('');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.which === 13) {
            setInputValue(propPredicted);
        }
    };

    const fieldClassName = `${classes.field} ${(propLocked ? isActive : isActive || hasValue) && classes.active} ${propLocked && !isActive ? classes.locked : ""}`;
    // const fieldClassName = ``;

    return (
        <div className={fieldClassName}>
            {/*<div className="phone-input-container"></div>*/}
            {/*<input type="text" />*/}
            {/*{isActive && inputValue && propPredicted && propPredicted.includes(inputValue) && <p className={classes.predicted}>{propPredicted}</p>}*/}
            <PhoneInput
                inputClass={classes.input}
                countryCodeEditable={false}
                // containerClass={}
                // id={id}
                // name={name}
                // type={type}
                // key={"1"}
                // value={inputValue}
                placeholder={inputLabel}
                // onChange={(e) => console.log(e)}
                specialLabel=""
                // isValid={true}
                country="pl"
                inputProps={{
                    required: true,
                    id: id,
                    name: name
                }}

                buttonClass={classes.button}
                dropdownClass={`${classes["countries-container"]}`}
                onChange={changeValue}
                onFocus={() => !propLocked && setIsActive(true)}
                onBlur={() => handleInputBlur()}
            />
            <label htmlFor={id} className={inputError && classes.error}>
                {inputError || inputLabel}
            </label>
        </div>
    );
};

export default FormInputPhone;
import React, {HTMLInputTypeAttribute, useState} from "react";


import classes from "./FormInput.module.css";

interface FormInputProps {
    id: string;
    name: string;
    type?: HTMLInputTypeAttribute;
    required?: boolean;
    value?: string;
    isActive?: boolean;
    isTouched?: boolean;
    hasError?: boolean;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => unknown;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => unknown;
    className?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, name, type = "text", required=false, isActive = false, isTouched=false, value="", hasError=false, label = 'Label', onChange, onBlur, onFocus, className="" }) => {
    const [wasVibrated, setWasVibrated] = useState(false);
    const isVibrationSupported = 'vibrate' in navigator;

    let errorMessage = ""

    if (required && value.trim() === "" && isTouched) {
        errorMessage = "wymagane pole"
    }
    else if (hasError) {
        errorMessage = "nie poprawna wartość"
    }

    let fieldClassName = classes.field;

    if (isActive || value) {
        fieldClassName += ` ${classes.active}`;
    }

    if (errorMessage) {
        fieldClassName += ` ${classes.error}`;
        if (!wasVibrated) {
            if (isVibrationSupported) {
                navigator.vibrate(200);
            }
            setWasVibrated(true);
        }
    }

    return (
        <div className={fieldClassName}>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                placeholder={label}
                required={required}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <label htmlFor={id} className={errorMessage ? classes.error : undefined}>
                {required ? "*" : ""}{label}{errorMessage ? " - " + errorMessage : ""}
            </label>
        </div>
    );
};

export default FormInput;
import React, {HTMLInputTypeAttribute, useCallback, useEffect, useRef, useState} from "react";


import classes from "./FormInput.module.css";
import {useNavigate, useNavigation} from "react-router-dom";


interface FormInputProps {
    id: string;
    name: string;
    type?: HTMLInputTypeAttribute;
    required?: boolean;
    locked?: boolean;
    active?: boolean;
    value?: string;
    error?: string;
    label?: string;
    predicted?: string;
    validate?: (value: string) => boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
    className?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, name, type = "text", required=false, locked: propLocked = false, active: propActive = false, value: propValue = '', error: propError = '', label: propLabel = 'Label', predicted: propPredicted = 'Hallo', validate = undefined, onChange = undefined, className="" }) => {
    const [inputValue, setInputValue] = useState(propValue);
    const [inputError, setInputError] = useState(propError);
    const [inputLabel, setInputLabel] = useState(propLabel);
    const [isActive, setIsActive] = useState((propLocked && propActive) || false);
    const isVibrationSupported = 'vibrate' in navigator;
    const validationTimeout = useRef<NodeJS.Timeout | null>(null);

    const runVibration = useCallback(() => {
        if (isVibrationSupported && !inputError) {
            navigator.vibrate(200);
        }
    }, [inputError, isVibrationSupported])
    
    // useEffect(() => {
    //     if (propError && propError !== inputError && inputError === "") {
    //         setInputError(propError);
    //         runVibration();
    //         // return;
    //     }
    // }, [inputError, propError, runVibration])

    const checkValidationInput = (newValue: string) => {
        // if (propError !== inputError && inputError === "") {
        //     return;
        // }
        if (required && newValue.length === 0) {
            setInputError("pole jest wymagane")
            runVibration();
            return;
        }
        if (validate) {
            const isValidate = validate(newValue);
            if (!isValidate) {
                setInputError("nie poprawna wartość");
                runVibration();
                return;
            }
        }
        setInputError('');
    }

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (!propLocked) {
            setIsActive(false)
        }

        if (validationTimeout.current) {
            clearTimeout(validationTimeout.current);
        }

        checkValidationInput(newValue);
    }

    const handleInputFocus = () => {
        if (!propLocked) {
            setIsActive(true)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (onChange) {
            onChange(event);
        }

        setInputValue(newValue);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.which === 13) {
            setInputValue(propPredicted);
        }
    };


    // const fieldClassName = `${classes.field} ${(propLocked ? isActive : isActive || inputValue) && classes.active} ${propLocked && !isActive && classes.locked}`;

    let fieldClassName = classes.field;

    if (isActive || (!propLocked && inputValue)) {
        fieldClassName += ` ${classes.active}`;
    }

    if (propLocked && !isActive) {
        fieldClassName += ` ${classes.locked}`;
    }

    if (!propLocked && inputError) {
        fieldClassName += ` ${classes.error}`;
    }

    return (
        <div className={fieldClassName}>
            {isActive && inputValue && propPredicted && propPredicted.includes(inputValue) && <p className={classes.predicted}>{propPredicted}</p>}
            <input
                id={id}
                name={name}
                type={type}
                value={inputValue}
                placeholder={inputLabel}
                required={required}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                // onBlur={() => !propLocked && setIsActive(false)}
            />
            <label htmlFor={id} className={inputError && classes.error}>
                {required ? "*" : ""}{inputLabel}{inputError ? " - " + inputError : ""}
            </label>
        </div>
    );
};

export default FormInput;
import React, {Reducer, useReducer} from "react";

interface InputState {
    value: string;
    isTouched: boolean;
}

type InputAction =
    | { type: "CHANGE"; value: string }
    | { type: "BLUR" }
    | { type: "RESET" };

const inputStateReducer: Reducer<InputState, InputAction> = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return { value: action.value, isTouched: state.isTouched };
        case "BLUR":
            return { isTouched: true, value: state.value };
        case "RESET":
            return { value: "", isTouched: false };
        default:
            return state;
    }
};

const useInput = (initialValue: string, validateValue?: (value: string) => boolean) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, { value: initialValue, isTouched: false });

    let valueIsValid = true;
    if (validateValue) {
        valueIsValid = validateValue(inputState.value);
    }

    const hasError = !valueIsValid && inputState.isTouched;

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "CHANGE", value: event.target.value });
    };

    const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        dispatch({ type: "BLUR" });
    };

    const reset = () => {
        dispatch({ type: "RESET" });
    };

    return {
        value: inputState.value,
        isTouched: inputState.isTouched,
        isValid: valueIsValid,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        reset
    };

};

export default useInput;
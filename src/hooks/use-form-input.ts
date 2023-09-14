import React, {useReducer} from "react";

export interface UseFormInputProps {
    initialValue?: string;
    validateValue?: (value: string) => boolean;
}

export interface UseFormInputInterface {
    (props: UseFormInputProps): {
        value: string;
        isTouched: boolean;
        isActive: boolean;
        isValid: boolean;
        hasError: boolean;
        handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleInputBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
        handleInputFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
        reset: () => void;
    };
}

interface InitialStateInterface {
    value: string;
    isTouched: boolean;
    isActive: boolean;
}


const initialState: InitialStateInterface = {
    value: "",
    isTouched: false,
    isActive: false,
}

interface ActionStateInterface extends Partial<InitialStateInterface> {
    type: string;
}

const inputStateReducer = (state: InitialStateInterface, action: ActionStateInterface): InitialStateInterface => {
    switch (action.type) {
        case "CHANGE":
            return { ...state, value: action.value || "", isActive: true};
        case "BLUR":
            return { ...state, isTouched: true, isActive: false}
        case "FOCUS":
            return { ...state, isActive: true}
        case "RESET":
            return { ...initialState }
        default:
            return { ...state }
    }
}

const useFormInput: UseFormInputInterface = ({initialValue="", validateValue}) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, { ...initialState, value: initialValue });

    let valueIsValid = true;
    if (validateValue) {
        valueIsValid = validateValue(inputState.value);
    }

    const hasError = !valueIsValid && inputState.isTouched;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "CHANGE", value: event.target.value})
    }

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        dispatch({ type: "BLUR" })
    }

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        dispatch({ type: "FOCUS" })
    }

    const reset = () => {
        dispatch({ type: "RESET" })
    }

    return {
        value: inputState.value,
        isTouched: inputState.isTouched,
        isActive: inputState.isActive,
        isValid: valueIsValid,
        hasError,
        handleInputChange,
        handleInputBlur,
        handleInputFocus,
        reset,
    }
}

export default useFormInput
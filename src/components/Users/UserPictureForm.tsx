import React, {Suspense, useRef, useState} from "react";
import {Form, useSubmit} from "react-router-dom";
import UserPicture from "./UserPicture";
import FormButton from "../UI/Buttons/FormButton";
import SVGUpload from "../Icons/Upload";

import classes from "./UserPictureForm.module.css";
import SVGRemove from "../Icons/Remove";
import IconButton from "../UI/Buttons/IconButton";

interface UserPictureFormProps {
    username: string;
    profileUrl?: string;
}

const UserPictureForm: React.FC<UserPictureFormProps> = ({username, profileUrl}) => {
    const [file, setFile] = useState<File | null>(null);  // Stan dla pliku
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);  // Stan dla podglądu

    const filePickerRef = useRef<HTMLInputElement>(null);

    const pickImageHandler = () => {
        filePickerRef.current!.click();
    };

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let pickedFile;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result as string);
            };
            fileReader.readAsDataURL(pickedFile!);
        }
    };

    const fileRemoveHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFile(null);
        setPreviewUrl(null);
    }

    let displayButtons;

    if (file) {
        displayButtons = <>
            <FormButton onClick={fileRemoveHandler}>Usuń zdjęcie</FormButton>
            <FormButton type="submit" name="intent" value="picture">Zapisz</FormButton>
        </>
    } else {
        displayButtons = <>
            <FormButton onClick={pickImageHandler}>Wyślij zdjęcie</FormButton>
            <FormButton type="submit" name="intent" value="picture">Pomiń</FormButton>
        </>
    }

    return <Form
        method="POST"
        className={classes["form-elements"]}
    >
        <div className={classes["picture-wrapper"]}>
            <UserPicture className={classes.picture} username={username} pictureUrl={previewUrl || profileUrl}/>
            {/*<IconButton className={classes["button-remove"]}><SVGRemove/></IconButton>*/}
            <input
                ref={filePickerRef}
                name="file"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: 'none' }}
                onChange={fileChangeHandler}
            />
        </div>
        {displayButtons}
    </Form>;
}

export default UserPictureForm;
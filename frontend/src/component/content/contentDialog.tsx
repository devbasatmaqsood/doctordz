import Button from "@/extra/Button";
import { ExInput } from "@/extra/Input";
import Title from "@/extra/Title";
import {  useAppDispatch } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { closeDialog } from "@/store/dialogSlice";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { createContent, updateContent } from "@/store/contentSlice";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface ErrorState {
    name: string;
    title: string;
    image: string
    description: string
}

const ContentDialog = () => {

    const { dialogueData } = useSelector((state: any) => state.dialogue);
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<any>();
    const [name, setName] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [imagePath, setImagePath] = useState<any>();
    const [image, setImage] = useState<any>();
    const [error, setError] = useState<any>({
        name: "",
        title: "",
        image: "",
        description: ""
    });



    useEffect(() => {
        setName(dialogueData?.name)
        setTitle(dialogueData?.title || "");
        setValue(dialogueData?.description)
        setImage((prev) => prev || dialogueData?.icon);
        setImagePath((prev) => prev || dialogueData?.icon);
    }, [dialogueData]);

  
      


    const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            if (file instanceof Blob) {
                // Revoke previous image URL to free memory
                if (imagePath) {
                    URL.revokeObjectURL(imagePath);
                }

                const imageUrl = URL.createObjectURL(file);

                setImage(file);
                setImagePath(imageUrl);
                setError((prev) => ({ ...prev, image: "" }));
            } else {
                console.error("Invalid file format.");
            }
        } else {
            console.error("No file selected.");
        }
    };

    const handleChange = (content: string) => {
        setValue(content);
        if (!content || content === '<p><br></p>') {
            return setError({
                ...error,
                description: "Description is required",
            });
        } else {
            return setError({
                ...error,
                description: "",
            });
        }
    };


    const handleSubmit = (e: any) => {
        if (
            !name ||
            !title ||
            !value
        ) {
            let error = {} as ErrorState;
            const nameRegex = /^[a-zA-Z0-9_-]*$/; // allows only letters, numbers, underscore, and hyphen
            if (!name) {
                error.name = "Name is required";
            } else if (!nameRegex.test(name)) {
                error.name = "Name must not contain spaces or special characters";
            }
                
            if (!title) error.title = "Email is required";
            if (!nameRegex.test(value))   error.name = 
               
                  `Name must not contain spaces or special characters`;
             
              
            if (!value) error.description = "Description is required";


            return setError({ ...error });
        } else {
            const formData = new FormData();
            if (!dialogueData) {
                formData.append("name", name);
            }
            formData.append("title", title);
            formData.append("icon", image);
            formData.append("description", value);

            let payload: any = { contentId: dialogueData?._id, data: formData };
            if (dialogueData) {
                dispatch(updateContent(payload))
            } else {
                dispatch(createContent(formData));
            }
            dispatch(closeDialog());
        }
    };

    return (
        <div className="p-3">

            {
                dialogueData ?
                    <Title name="Update Content" /> :
                    <Title name="Add Content" />

            }

            <div className="card">
                <div className="card-body">
                    <div className="">
                        <div className="row align-items-start formBody">
                            <div className="col-12">
                                <h2 className="fw-bolder mb-0" style={{ fontSize: "22px" }}>
                                        Content information
                                </h2>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <ExInput
                                    type={`text`}
                                    id={`name`}
                                    name={`name`}
                                    value={name}
                                    label="Name"
                                    defaultValue={dialogueData && dialogueData?.name}
                                    disabled={dialogueData?.name ? true : false}
                                    placeholder="Name"
                                    errorMessage={error?.name && error?.name}
                                    onChange={(e: any) => {
                                        const value = e.target.value;
                                        setName(value);
                                      
                                        const nameRegex = /^[a-zA-Z0-9_-]*$/; // allows only letters, numbers, underscore, and hyphen
                                      
                                        if (!value) {
                                          setError({
                                            ...error,
                                            name: "Name is required",
                                          });
                                        } else if (!nameRegex.test(value)) {
                                          setError({
                                            ...error,
                                            name: "Name must not contain spaces or special characters",
                                          });
                                        } else {
                                          setError({
                                            ...error,
                                            name: "",
                                          });
                                        }
                                      }}
                                      
                                />
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <ExInput
                                    type={`text`}
                                    id={`title`}
                                    name={`title`}
                                    value={title}
                                    label="Title"
                                    defaultValue={dialogueData && dialogueData?.title}
                                    placeholder="Title"
                                    errorMessage={error?.title && error?.title}
                                    onChange={(e: any) => {
                                        setTitle(e.target.value);
                                        if (!e.target.value) {
                                            return setError({
                                                ...error,
                                                title: "Title is required",
                                            });
                                        } else {
                                            return setError({
                                                ...error,
                                                title: "",
                                            });
                                        }
                                    }}
                                />
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <ExInput
                                    type={"file"}
                                    label="Icon"
                                    accept={"image/png, image/jpeg"}
                                    errorMessage={error?.image && error?.image}
                                    onChange={handleInputImage}

                                />

                                {imagePath && (
                                    <>
                                        <img
                                            src={imagePath}
                                            className="mt-3 rounded float-left mb-2"
                                            alt="image"
                                            style={{ width: "100px", height: "100px" }}
                                        />
                                    </>
                                )}
                            </div>



                            <div className="mt-2 inputData">
                                <label>Description"</label>
                                <div className="mt-2">
                                    <div className="mt-2">
                                        <ReactQuill
                                            value={value}
                                            onChange={handleChange}
                                            theme="snow"
                                            placeholder="Write something amazing..."
                                            modules={{
                                                toolbar: [
                                                    [{ header: [1, 2, 3, false] }],
                                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                                    ['link', 'image'],
                                                    ['clean'],
                                                ],
                                            }}
                                        />
                                        <p className="fs-16" style={{ color: "red" }}>{error?.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row  formFooter">
                            <div className="col-12 text-end m0">
                                <Button
                                    className={`bg-gray text-light`}
                                    text="Cancel"
                                    type={`button`}
                                    onClick={() => dispatch(closeDialog())}
                                />
                                <Button
                                    type={`submit`}
                                    className={` text-white m10-left`}
                                    style={{ backgroundColor: "#1ebc1e" }}
                                    text="Submit"
                                    onClick={(e: any) => handleSubmit(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default ContentDialog;

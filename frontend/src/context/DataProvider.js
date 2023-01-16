import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [isGenderEditModal, setIsGenderEditModal] = useState(false)
    const [gender, setGender] = useState()
    const [imagePreview, setImagePreview] = useState()
    const [userPostsLength, setUserPostsLength] = useState(0)
    const [file, setFile] = useState(null)
    return <DataContext.Provider value={{isGenderEditModal,setIsGenderEditModal,gender
    ,setGender,file,setFile,imagePreview,setImagePreview,userPostsLength,setUserPostsLength}}>
        {children}
    </DataContext.Provider>
}
import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [isGenderEditModal, setIsGenderEditModal] = useState(false)
    const [gender, setGender] = useState()
    const [imagePreview, setImagePreview] = useState()
    const [file, setFile] = useState(null)
    const [reload, setReload] = useState(false)
    return <DataContext.Provider value={{isGenderEditModal,setIsGenderEditModal,gender
    ,setGender,file,setFile,imagePreview,setImagePreview}}>
        {children}
    </DataContext.Provider>
}
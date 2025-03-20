import { createContext,useState, useContext } from "react";

const FormContext = createContext({
    formData: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    setFormData: (value: any) => { },
});

export function FormContextProvider({ children }: { children: React.ReactNode }) {
    const [formData, setFormData] = useState({});

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
}
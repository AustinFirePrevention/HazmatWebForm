import { createContext, useContext, useState } from "react";
import { Material as MaterialBase } from "./FeeProcessor";

export type Material = {
    id: number;
    name?: string;
    location?: string;
} & Partial<MaterialBase>;


const MaterialsContext = createContext({ materials: [] as Array<Material>, setMaterials: (_: Array<Material>) => { } });


export function MaterialsProvider({ children }: { children: React.ReactNode }) {
    const [materials, setMaterials] = useState([] as Array<Material>);
    return (
        <MaterialsContext.Provider value={{ materials, setMaterials }}>
            {children}
        </MaterialsContext.Provider>
    );
}

export function useMaterials() {
    const context = useContext(MaterialsContext);
    if (context === undefined) {
        throw new Error("useMaterials must be used within a MaterialsProvider");
    }
    return context;
}
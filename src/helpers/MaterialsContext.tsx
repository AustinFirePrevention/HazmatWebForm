/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from "react";
import { Material as MaterialBase } from "./FeeProcessor";
import { Unit } from '../helpers/FeeProcessor';

export type Material = {
    id: number;
    name?: string;
    location?: string;
} & Partial<MaterialBase>;

export type CommonChemical = {
    name: string,
    label: string,
    label_es?: string,
    unit: Unit,
    health_hazard: string,
    fire_hazard: string,
    instability_hazard: string,
    minimumReportableAmount: string
}


const MaterialsContext = createContext({
    materials: [] as Array<Material>,
    setMaterials: (_: Array<Material>) => { },
    collapsedMaterials: [] as boolean[],
    setCollapsedMaterials: (_: boolean[]) => { },
    toggleCollapseState: (_: number, __?: boolean) => { },
    removeMaterial: (_: number) => { },
    appendMaterial: (_: CommonChemical) => { },
    uncollapseIncompleteMaterialsAndThrow: () => { }
});

export function MaterialsProvider({ children }: { children: React.ReactNode }) {
    const [materials, setMaterials] = useState([] as Array<Material>);
    const [collapsedMaterials, setCollapsedMaterials] = useState<boolean[]>([]);

    const toggleCollapseState = (index: number, forceOpen?: boolean) => {
        setCollapsedMaterials(collapsedMaterials.map((isCollapsed, i) => i === index ? (forceOpen !== undefined ? !forceOpen : !isCollapsed) : isCollapsed));
    };

    const removeMaterial = (id: number) => {
        setMaterials(materials.filter(material => material.id !== id));
        setCollapsedMaterials(collapsedMaterials.filter((_, i) => i !== materials.findIndex(material => material.id === id)));
    };

    const appendMaterial = (material: CommonChemical) => {
        const { minimumReportableAmount, name, label, ...mat } = material;
        setMaterials([...materials, { id: Date.now(), ...{ name: label, ...mat } }]);
        setCollapsedMaterials(Array(collapsedMaterials.length).fill(true).concat(false));
    };

    const getIncompleteFieldsCount = (material: Material) => {
        const requiredFields: (keyof Material)[] = ['name', 'location', 'health_hazard', 'fire_hazard', 'instability_hazard'];
        const missingFields = requiredFields.filter(field => !material[field]).length;
        const quantityMissing = !material.quantity || material.quantity === "0" ? 1 : 0;
        return missingFields + quantityMissing;
    };


    const uncollapseIncompleteMaterialsAndThrow = () => {
        materials.forEach((material, index) => {
            if (getIncompleteFieldsCount(material) > 0) {
                toggleCollapseState(index, true);
            }
        });
        if (materials.some(mat => getIncompleteFieldsCount(mat) > 0)) {
            throw new IncompleteMaterialsError();
        }
    };

    return (
        <MaterialsContext.Provider value={{ materials, setMaterials, collapsedMaterials, setCollapsedMaterials, toggleCollapseState, removeMaterial, appendMaterial, uncollapseIncompleteMaterialsAndThrow }}>
            {children}
        </MaterialsContext.Provider>
    );
}

export class IncompleteMaterialsError extends Error {
    constructor() {
        super('Incomplete materials');
        this.name = 'IncompleteMaterials';
    }
}

export function useMaterials() {
    const context = useContext(MaterialsContext);
    if (context === undefined) {
        throw new Error("useMaterials must be used within a MaterialsProvider");
    }
    const newSetMaterials = (materials: Array<Material>) => {
        context.setMaterials(materials);
    }
    return { ...context, setMaterials: newSetMaterials };
}
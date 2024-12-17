import { useState } from "react";
import FormSection from "./FormSection";
import { MaterialCard } from "./MaterialCard";
import { HazardousMaterialsPreamble } from "./HazardousMaterialsPreamble";

export function HazardousMaterials({ show = true }: { show?: boolean }) {
    const [materials, setMaterials] = useState([{ id: Date.now() }]);
    const [collapsedMaterials, setCollapsedMaterials] = useState<boolean[]>([false]);

    const appendMaterial = (material: any) => {
        setMaterials([...materials, {id: Date.now(), ...material}]);
        setCollapsedMaterials(Array(collapsedMaterials.length).fill(true).concat(false));
    }

    const addMaterial = () => {
        const newMaterial = { id: Date.now(),};
        setMaterials([...materials, newMaterial]);
        setCollapsedMaterials(Array(collapsedMaterials.length).fill(true).concat(false));
    };

    const removeMaterial = (id: number) => {
        setMaterials(materials.filter(material => material.id !== id));
        setCollapsedMaterials(collapsedMaterials.filter((_, i) => i !== materials.findIndex(material => material.id === id)));
    };

    const toggleCollapseState = (index: number) => {
        setCollapsedMaterials(collapsedMaterials.map((isCollapsed, i) => i === index ? !isCollapsed : isCollapsed));
    };

    if (!show) return null;

    return (
        <FormSection title='Hazardous Materials'>
            <HazardousMaterialsPreamble appendMaterial={appendMaterial} />
            <h3>Hazardous Materials List</h3>
            {materials.map((material, index) => (
                <div key={material.id}>
                    <MaterialCard setMaterials={setMaterials} toggleCollapseState={() => toggleCollapseState(index)} isCollapsed={collapsedMaterials[index]} material={material} index={index} removeMaterial={removeMaterial} />
                </div>
            ))}
            <button type="button" className="btn btn-primary" onClick={addMaterial}>Add Another Material</button>
        </FormSection>
    );
}

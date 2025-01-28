import { useTranslation } from 'react-i18next';
import FormSection from "./FormSection";
import { MaterialCard } from "./MaterialCard";
import { HazardousMaterialsPreamble } from "./HazardousMaterialsPreamble";
import { useMaterials } from "../helpers/MaterialsContext";

export function HazardousMaterials({ show = true }: { show?: boolean }) {
    const { t } = useTranslation();
    const { materials, appendMaterial, collapsedMaterials } = useMaterials();
    console.log(collapsedMaterials, materials)

    if (!show) return null;

    return (
        <FormSection title={t('hazardous_materials.title')}>
            <HazardousMaterialsPreamble appendMaterial={appendMaterial} />
            <h3>{t('hazardous_materials.list_title')}</h3>
            {materials.map((material, index) => (
                <div key={material.id}>
                    <MaterialCard isCollapsed={collapsedMaterials[index]} material={material} index={index}/>
                </div>
            ))}
        </FormSection>
    );
}

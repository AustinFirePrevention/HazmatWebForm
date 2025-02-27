import { useTranslation } from 'react-i18next';
import FormSection from "./FormSection";
import { MaterialCard } from "./MaterialCard";
import { HazardousMaterialsPreamble } from "./HazardousMaterialsPreamble";
import { useMaterials } from "../helpers/MaterialsContext";
import { useState } from 'react';

export function HazardousMaterials({ show = true }: { show?: boolean }) {
    const { t } = useTranslation();
    const { materials, appendMaterial, collapsedMaterials } = useMaterials();
    const [isSpreadsheetMode, setIsSpreadsheetMode] = useState(false);
    console.log(collapsedMaterials, materials)

    if (!show) return null;

    return (
        <FormSection title={t('hazardous_materials.title')}>
            <div style={{ marginBottom: '1rem' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={isSpreadsheetMode}
                        onChange={(e) => setIsSpreadsheetMode(e.target.checked)}
                        style={{ marginRight: '0.5rem' }}
                    />
                    {t('hazardous_materials.spreadsheet_mode')}
                </label>
                <div style={{ marginTop: '0.5rem' }}>
                    <a href="/src/assets/ChemicalSpreadsheet.xlsx" download className="btn btn-secondary">
                        {t('hazardous_materials.download_spreadsheet')}
                    </a>
                </div>
            </div>
            <HazardousMaterialsPreamble 
                appendMaterial={appendMaterial} 
                isSpreadsheetMode={isSpreadsheetMode}
            />
            {!isSpreadsheetMode && (
                <>
                    <h3>{t('hazardous_materials.list_title')}</h3>
                    {materials.map((material, index) => (
                        <div key={material.id}>
                            <MaterialCard isCollapsed={collapsedMaterials[index]} material={material} index={index}/>
                        </div>
                    ))}
                </>
            )}
        </FormSection>
    );
}

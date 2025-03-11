import { useTranslation } from 'react-i18next';
import FormSection from "./FormSection";
import { MaterialCard } from "./MaterialCard";
import { HazardousMaterialsPreamble } from "./HazardousMaterialsPreamble";
import { useMaterials } from "../helpers/MaterialsContext";

export function HazardousMaterials({ show = true, isSpreadsheetMode, setIsSpreadsheetMode }: { show?: boolean, isSpreadsheetMode: boolean, setIsSpreadsheetMode: (isSpreadsheetMode: boolean) => void }) {
    const { t } = useTranslation();
    const { materials, appendMaterial, collapsedMaterials } = useMaterials();

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
                    <a href="/HazmatWebForm/ChemicalSpreadsheet.xlsx" download className="btn btn-secondary">
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

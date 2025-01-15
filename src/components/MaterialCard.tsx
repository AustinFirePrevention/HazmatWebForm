/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import { Material } from '../helpers/MaterialsContext';

export function MaterialCard({ material, setMaterials, index, removeMaterial, isCollapsed, toggleCollapseState }: { material: Material; setMaterials: (obj: any) => void; index: number; removeMaterial: (id: number) => void; isCollapsed: boolean; toggleCollapseState: () => void; }) {
    const { t } = useTranslation();
    const materialSummary = `${index + 1}. ${material.name || t("material_card.material")} - ${material.quantity || 0} ${material.unit || t("material_card.units")}`;

    const updateMaterial = (field: string, value: any) => {
        setMaterials((prevMaterials: any) => {
            return prevMaterials.map((m: any) => {
                if (m.id === material.id) {
                    return { ...m, [field]: value };
                }
                return m;
            });
        });
    };

    const getIncompleteFieldsCount = () => {
        const requiredFields: (keyof Material)[] = ['name', 'location', 'health_hazard', 'fire_hazard', 'instability_hazard'];
        const missingFields = requiredFields.filter(field => !material[field]).length;
        // Count quantity as missing if it's 0 or undefined
        const quantityMissing = !material.quantity || material.quantity === "0" ? 1 : 0;
        return missingFields + quantityMissing;
    };

    const hasZeroHazardRatings = () => {
        return material.health_hazard === "0" &&
            material.fire_hazard === "0" &&
            material.instability_hazard === "0";
    };

    return (
        <div className="card mb-4">
            <div className="card-header d-flex align-items-center">
                <button type="button" className="btn btn-primary" onClick={() => toggleCollapseState()}>
                    {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                </button>
                <h4 className="card-title ms-3 text-truncate">{isCollapsed ? materialSummary : `${index + 1}. ${material.name || t("material_card.material")}`}</h4>
                {isCollapsed && (
                    <>
                        {getIncompleteFieldsCount() > 0 ?
                            <span className="badge bg-danger ms-2">{t('material_card.fields_missing', { count: getIncompleteFieldsCount() })}</span> :
                            <span className="badge bg-success ms-2">{t('material_card.material_complete')}</span>
                        }
                        {hasZeroHazardRatings() &&
                            <span className="badge bg-danger ms-2">{t('material_card.all_hazards_zero')}</span>
                        }
                    </>
                )}
                <span className="badge badge-diamond rounded bg-primary ms-auto"><span className=''>{material.health_hazard}</span></span>
                <span className="badge badge-diamond bg-danger"><span>{material.fire_hazard}</span></span>
                <span className="badge badge-diamond bg-warning"><span>{material.instability_hazard}</span></span>
                <button type="button" className="btn btn-danger ms-2" onClick={() => removeMaterial(material.id)}>{t("material_card.remove")}</button>
            </div>
            <Collapse in={!isCollapsed}>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label required">{t("material_card.material_name")}:</label>
                        <input
                            type="text"
                            className="form-control"
                            name={`material_name_${material.id}`}
                            value={material.name || ''}
                            onChange={(e) => updateMaterial('name', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">{t("material_card.location")}:</label>
                        <input type="text" className="form-control" name={`material_location_${material.id}`} value={material.location || ''} onChange={(e) => updateMaterial('location', e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">{t("material_card.health_hazard")}:</label>
                        <input type="number" value={material.health_hazard || 0} className="form-control" name={`material_health_hazard_${material.id}`} min="0" max="4" onChange={(e) => updateMaterial('health_hazard', parseInt(e.target.value))} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">{t("material_card.fire_hazard")}:</label>
                        <input type="number" value={material.fire_hazard || 0} className="form-control" name={`material_fire_hazard_${material.id}`} min="0" max="4" onChange={(e) => updateMaterial('fire_hazard', parseInt(e.target.value))} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">{t("material_card.instability_hazard")}:</label>
                        <input type="number" value={material.instability_hazard || 0} className="form-control" name={`material_instability_hazard_${material.id}`} min="0" max="4" onChange={(e) => updateMaterial('instability_hazard', parseInt(e.target.value))} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">{t("material_card.units")}:</label>
                        <select className="form-select" value={material.unit || 'gallons'} name={`material_units_${material.id}`} onChange={(e) => updateMaterial('units', e.target.value)} required>
                            <option value="gallons">{t("material_card.gallons")}</option>
                            <option value="cubic_feet">{t("material_card.cubic_feet")}</option>
                            <option value="pounds">{t("material_card.pounds")}</option>
                            <option value="kilowatt_hours">{t("material_card.kilowatt_hours")}</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">{t("material_card.quantity")}:</label>
                        <input type="number" value={material.quantity || 0} className="form-control" name={`material_quantity_${material.id}`} step="1" min="1" onChange={(e) => updateMaterial('quantity', parseInt(e.target.value))} required />
                    </div>
                </div>
            </Collapse>
        </div>
    );
}
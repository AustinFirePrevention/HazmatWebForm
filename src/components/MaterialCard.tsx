/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import { Material } from '../helpers/MaterialsContext';

export function MaterialCard({ material, setMaterials, index, removeMaterial, isCollapsed, toggleCollapseState }: { material: Material; setMaterials: (obj: any) => void; index: number; removeMaterial: (id: number) => void; isCollapsed: boolean; toggleCollapseState: () => void; }) {
    console.log(material);
    const materialSummary = `${index + 1}. ${material.name || "Material"} - ${material.quantity || 0} ${material.unit || 'units'}`;

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

    return (
        <div className="card mb-4">
            <div className="card-header d-flex align-items-center">
                <button type="button" className="btn btn-primary" onClick={() => toggleCollapseState()}>
                    {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                </button>
                <h4 className="card-title ms-3 text-truncate">{isCollapsed ? materialSummary : `${index + 1}. ${material.name || "Material"}`}</h4>
                <span className="badge badge-diamond rounded bg-primary ms-auto"><span className=''>{material.health_hazard}</span></span>
                <span className="badge badge-diamond bg-danger"><span>{material.fire_hazard}</span></span>
                <span className="badge badge-diamond bg-warning"><span>{material.instability_hazard}</span></span>
                <button type="button" className="btn btn-danger ms-2" onClick={() => removeMaterial(material.id)}>Remove</button>
            </div>
            <Collapse in={!isCollapsed}>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label required">Material Name:</label>
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
                        <label className="form-label required">Location:</label>
                        <input type="text" className="form-control" name={`material_location_${material.id}`} value={material.location || ''} onChange={(e) => updateMaterial('location', e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">NFPA 704 Health Hazard Rating (0-4):</label>
                        <input type="number" value={material.health_hazard || 0} className="form-control" name={`material_health_hazard_${material.id}`} min="0" max="4" onChange={(e) => updateMaterial('health_hazard', parseInt(e.target.value))} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">NFPA 704 Fire Hazard Rating (0-4):</label>
                        <input type="number" value={material.fire_hazard || 0} className="form-control" name={`material_fire_hazard_${material.id}`} min="0" max="4" onChange={(e) => updateMaterial('fire_hazard', parseInt(e.target.value))} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">NFPA 704 Instability Hazard Rating (0-4):</label>
                        <input type="number" value={material.instability_hazard || 0} className="form-control" name={`material_instability_hazard_${material.id}`} min="0" max="4" onChange={(e) => updateMaterial('instability_hazard', parseInt(e.target.value))} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Units:</label>
                        <select className="form-select" value={material.unit || 'gallons'} name={`material_units_${material.id}`} onChange={(e) => updateMaterial('units', e.target.value)} required>
                            <option value="gallons">Gallons</option>
                            <option value="cubic_feet">Cubic Feet</option>
                            <option value="pounds">Pounds</option>
                            <option value="kilograms">Kilograms</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Quantity:</label>
                        <input type="number" value={material.quantity || 0} className="form-control" name={`material_quantity_${material.id}`} step="1" min="1" onChange={(e) => updateMaterial('quantity', parseInt(e.target.value))} required />
                    </div>
                </div>
            </Collapse>
        </div>
    );
}
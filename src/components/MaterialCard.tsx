/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';

export function MaterialCard({ material, setMaterials, index, removeMaterial, isCollapsed, toggleCollapseState }: { material: any; setMaterials: (obj: any) => void; index: number; removeMaterial: (id: number) => void; isCollapsed: boolean; toggleCollapseState: () => void; }) {
    const materialSummary = `${index + 1}. ${material.name || "Material"} - ${material.location || 'Unknown Location'} - ${material.quantity || 0} ${material.units || 'units'}`;

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
                <h3 className="card-title ms-2">{isCollapsed ? materialSummary : `${index + 1}. ${material.name || "Material"}`}</h3>
                <button type="button" className="btn btn-danger ms-auto" onClick={() => removeMaterial(material.id)}>Remove</button>
            </div>
            <Collapse in={!isCollapsed}>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label required">Material Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name={`material_name_${material.id}`}
                            value={material.name}
                            onChange={(e) => updateMaterial('name', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Location:</label>
                        <input type="text" className="form-control" name={`material_location_${material.id}`} value={material.location} onChange={(e) => updateMaterial('location', e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">NFPA 704 Health Hazard Rating (0-4):</label>
                        <input type="number" value={material.health_hazard} className="form-control" name={`material_health_hazard_${material.id}`} min="0" max="4" onChange={(e) => updateMaterial('health_hazard', parseInt(e.target.value))} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">NFPA 704 Fire Hazard Rating (0-4):</label>
                        <input type="number" value={material.fire_hazard} className="form-control" name={`material_fire_hazard_${material.id}`} min="0" max="4" onChange={(e) => updateMaterial('fire_hazard', parseInt(e.target.value))} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">NFPA 704 Instability Hazard Rating (0-4):</label>
                        <input type="number" value={material.instability_hazard} className="form-control" name={`material_instability_hazard_${material.id}`} min="0" max="4" onChange={(e) => updateMaterial('instability_hazard', parseInt(e.target.value))} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Units:</label>
                        <select className="form-select" value={material.unit} name={`material_units_${material.id}`} onChange={(e) => updateMaterial('units', e.target.value)} required>
                            <option value="gallons">Gallons</option>
                            <option value="cubic_feet">Cubic Feet</option>
                            <option value="pounds">Pounds</option>
                            <option value="kilograms">Kilograms</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Quantity:</label>
                        <input type="number" value={material.quantity } className="form-control" name={`material_quantity_${material.id}`} step="0.01" onChange={(e) => updateMaterial('quantity', parseInt(e.target.value))} required />
                    </div>
                </div>
            </Collapse>

        </div>
    );
}
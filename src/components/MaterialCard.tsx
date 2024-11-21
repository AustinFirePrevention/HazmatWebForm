import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export function MaterialCard({ material, index, removeMaterial, isCollapsed, toggleCollapseState }: { material: any; index: number; removeMaterial: (id: number) => void; isCollapsed: boolean; toggleCollapseState: () => void; }) {
    const [materialName, setMaterialName] = useState(material.name || '');
    const materialSummary = `${index + 1}. ${materialName} - ${material.location || 'Unknown Location'} - ${material.quantity || 0} ${material.units || 'units'}`;

    return (
        <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title">{isCollapsed ? materialSummary : `${index + 1}. ${materialName || "Material"}`}</h3>
                <button type="button" className="btn btn-primary" onClick={() => toggleCollapseState()}>
                    {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                </button>
            </div>
            {isCollapsed ? (
                <></>
            ) : (
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Material Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name={`material_name_${material.id}`}
                            value={materialName}
                            onChange={(e) => {
                                setMaterialName(e.target.value);
                                material.name = e.target.value;
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Location:</label>
                        <input type="text" className="form-control" name={`material_location_${material.id}`} onChange={(e) => material.location = e.target.value} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">NFPA 704 Health Hazard Rating (0-4):</label>
                        <input type="number" className="form-control" name={`material_health_hazard_${material.id}`} min="0" max="4" onChange={(e) => material.health_hazard = e.target.value} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">NFPA 704 Fire Hazard Rating (0-4):</label>
                        <input type="number" className="form-control" name={`material_fire_hazard_${material.id}`} min="0" max="4" onChange={(e) => material.fire_hazard = e.target.value} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">NFPA 704 Instability Hazard Rating (0-4):</label>
                        <input type="number" className="form-control" name={`material_instability_hazard_${material.id}`} min="0" max="4" onChange={(e) => material.instability_hazard = e.target.value} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Units:</label>
                        <select className="form-select" name={`material_units_${material.id}`} onChange={(e) => material.units = e.target.value}>
                            <option value="gallons">Gallons</option>
                            <option value="liters">Liters</option>
                            <option value="pounds">Pounds</option>
                            <option value="kilograms">Kilograms</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity:</label>
                        <input type="number" className="form-control" name={`material_quantity_${material.id}`} step="0.01" onChange={(e) => material.quantity = e.target.value} />
                    </div>
                    <button type="button" className="btn btn-danger" onClick={() => removeMaterial(material.id)}>Remove Material</button>
                </div>
            )}
        </div>
    );
}
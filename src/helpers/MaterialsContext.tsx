import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Material } from './types';

export type { Material };

interface MaterialsContextType {
  materials: Material[];
  setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
  uncollapseIncompleteMaterialsAndThrow: () => void;
}

const MaterialsContext = createContext<MaterialsContextType | undefined>(undefined);

export class IncompleteMaterialsError extends Error {
  constructor() {
    super('Materials are incomplete');
    this.name = 'IncompleteMaterialsError';
  }
}

export function MaterialsProvider({ children }: { children: ReactNode }) {
  const [materials, setMaterials] = useState<Material[]>([]);

  const uncollapseIncompleteMaterialsAndThrow = () => {
    // This function is a placeholder for future validation logic
    // Currently it just ensures all required fields are present
    const hasIncompleteMaterials = materials.some(material => 
      !material.name ||
      !material.unit ||
      !material.health_hazard ||
      !material.fire_hazard ||
      !material.instability_hazard ||
      !material.quantity ||
      !material.location
    );

    if (hasIncompleteMaterials) {
      throw new IncompleteMaterialsError();
    }
  };

  return (
    <MaterialsContext.Provider
      value={{
        materials,
        setMaterials,
        uncollapseIncompleteMaterialsAndThrow
      }}
    >
      {children}
    </MaterialsContext.Provider>
  );
}

export function useMaterials() {
  const context = useContext(MaterialsContext);
  if (context === undefined) {
    throw new Error('useMaterials must be used within a MaterialsProvider');
  }
  return context;
}

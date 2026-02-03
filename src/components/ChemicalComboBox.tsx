import { useTranslation } from 'react-i18next';
import CreatableSelect from 'react-select/creatable';
import commonChemicals from '../../commonchemicals/commonChem.json';
import { Unit } from '../helpers/types';
import { CommonChemical } from '../helpers/MaterialsContext';
import { useState } from 'react';

type Option = {
    value: string;
    label: string;
    chemical?: CommonChemical;
};

export default function ChemicalComboBox({ appendMaterial }: { appendMaterial: (chemical: CommonChemical) => void }) {
    const { t, i18n } = useTranslation();
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const options: Option[] = (commonChemicals as CommonChemical[]).map(chemical => ({
        value: chemical.name,
        label: i18n.language === 'es' ? chemical.label_es || chemical.label : chemical.label,
        chemical: chemical
    }));

    const handleSelect = (option: Option | null) => {
        setSelectedOption(option);
        if (option?.chemical) {
            const enhancedMaterial = {...option.chemical, isDefaultChemical: true}
            appendMaterial(enhancedMaterial);
        } else if (option?.value) {
            const newChemical: CommonChemical = {
                name: option.value,
                label: option.value,
                unit: "gallons" as Unit,
                health_hazard: '',
                fire_hazard: '',
                instability_hazard: '',
                minimumReportableAmount: '',
                isDefaultChemical: false
            };
            appendMaterial(newChemical);
        }
        setSelectedOption(null);
    };

    return (
        <div className="chemical-combo-box mb-3">
            <h3>{t("common_hazmat_cards.title")}</h3>
            <CreatableSelect
                aria-label='Chemical Search'
                isClearable
                isSearchable
                options={options}
                placeholder={t("common_hazmat_cards.search_chemicals")}
                onChange={handleSelect}
                value={selectedOption}
            />
        </div>
    );
}

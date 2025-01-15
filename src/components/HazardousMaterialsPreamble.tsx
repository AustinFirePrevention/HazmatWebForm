import { useTranslation } from 'react-i18next';
import CommonHazmatCards from "./CommonHazmatCards"

export function HazardousMaterialsPreamble({ appendMaterial }: { appendMaterial: (chemical: any) => void }) {
    const { t } = useTranslation();

    return (<>
        <p>{t("hazardous_materials_preamble.intro")}</p>
        <div className="text-center">
            <img className="img-fluid" src="/HazmatWebForm/reportable.png" alt={t("hazardous_materials_preamble.table_alt")} />
        </div>
        <p>{t("hazardous_materials_preamble.hazard_ratings")}</p>
        <h3>{t("hazardous_materials_preamble.min_quantity_title")}</h3>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>{t("chemical")}</th>
                    <th>{t("quantity")}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{t("hazardous_materials_preamble.compressed_gases")}</td>
                    <td>{t("hazardous_materials_preamble.compressed_gases_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.co2_systems")}</td>
                    <td>{t("hazardous_materials_preamble.co2_systems_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.cryogenic_fluids")}</td>
                    <td>{t("hazardous_materials_preamble.cryogenic_fluids_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.indoor_diesel_tanks")}</td>
                    <td>{t("hazardous_materials_preamble.indoor_diesel_tanks_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.outdoor_diesel_tanks")}</td>
                    <td>{t("hazardous_materials_preamble.outdoor_diesel_tanks_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.sulfuric_acid_battery")}</td>
                    <td>{t("hazardous_materials_preamble.sulfuric_acid_battery_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.sulfuric_acid_pool")}</td>
                    <td>{t("hazardous_materials_preamble.sulfuric_acid_pool_qty")}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th>{t("hazardous_materials_preamble.ess_stationary_mobile")}</th>
                    <th>{t("hazardous_materials_preamble.ess_stationary_mobile_qty")}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{t("hazardous_materials_preamble.ess_capacitor")}</td>
                    <td>{t("hazardous_materials_preamble.ess_capacitor_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.ess_flow_batteries")}</td>
                    <td>{t("hazardous_materials_preamble.ess_flow_batteries_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.ess_lithium_ion")}</td>
                    <td>{t("hazardous_materials_preamble.ess_lithium_ion_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.ess_nickel_metal_hydride")}</td>
                    <td>{t("hazardous_materials_preamble.ess_nickel_metal_hydride_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.ess_other_battery")}</td>
                    <td>{t("hazardous_materials_preamble.ess_other_battery_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.ess_other_electrochemical")}</td>
                    <td>{t("hazardous_materials_preamble.ess_other_electrochemical_qty")}</td>
                </tr>
                <tr>
                    <td>{t("hazardous_materials_preamble.ess_lead_acid")}</td>
                    <td>{t("hazardous_materials_preamble.ess_lead_acid_qty")}</td>
                </tr>
            </tbody>
        </table>
        <p><small>{t("hazardous_materials_preamble.aboveground_inventory_note")}</small></p>
        <div className='alert alert-warning'><small>
            {t("hazardous_materials_preamble.underground_storage_note_part1")}
            <a href="https://www.austintexas.gov/page/environmental-inspections#hazardous-materials-storage-permit" target="_blank" rel="noopener noreferrer">
                {t("hazardous_materials_preamble.underground_storage_note_part2")}
            </a>
            {t("hazardous_materials_preamble.underground_storage_note_part3")}
        </small></div>
        <CommonHazmatCards appendMaterial={appendMaterial} />
        <div className="alert alert-info mt-3">
            {t("hazardous_materials_preamble.add_chemicals_note")}
        </div>
    </>
    )
}
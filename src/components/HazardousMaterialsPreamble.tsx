import { useTranslation, Trans } from 'react-i18next';
import CommonHazmatCards from "./CommonHazmatCards"
import { FaChevronDown } from 'react-icons/fa';

export function HazardousMaterialsPreamble({ appendMaterial }: { appendMaterial: (chemical: any) => void }) {
    const { t } = useTranslation();

    return (<>
        <p>{t("hazardous_materials_preamble.intro")}</p>
        <div className="text-center">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th/>
                        <th>{t("hazardous_materials_preamble.4")}</th>
                        <th>{t("hazardous_materials_preamble.3")}</th>
                        <th>{t("hazardous_materials_preamble.2")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-info'>
                        <td>{t("hazardous_materials_preamble.health")}</td>
                        <td>0.35 OZ. OR 0.3 FL. OZ</td>
                        <td>10 LBS. OR 1 GAL</td>
                        <td>110 LBS. OR 55 GAL</td>
                    </tr>
                    <tr className='table-danger'>
                        <td>{t("hazardous_materials_preamble.flammability")}</td>
                        <td>0.5 LBS. OR 5 GAL</td>
                        <td>12 LBS. OR 10 GAL</td>
                        <td>160 LBS. OR 120 GAL</td>
                    </tr>
                    <tr className='table-warning'>
                        <td>{t("hazardous_materials_preamble.instability")}</td>
                        <td>0.35 OZ. OR 0.3 FL. OZ</td>
                        <td>10 LBS. OR 1 GAL</td>
                        <td>110 LBS. OR 55 GAL</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p>{t("hazardous_materials_preamble.hazard_ratings")} <a href='mailto:afdhazmat@austintexas.gov'>afdhazmat@austintexas.gov</a>.</p>
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
        <div className='alert alert-warning'>
          <small>
            <Trans i18nKey="hazardous_materials_preamble.underground_storage_note">
              Report underground storage...
              <a href="https://www.austintexas.gov/page/environmental-inspections#hazardous-materials-storage-permit" target="_blank" rel="noopener noreferrer">
                Hazardous Materials Storage Permit Application
              </a>
              from the Development Services Department...
            </Trans>
          </small>
        </div>
        <div className="alert alert-info mt-3">
            <Trans i18nKey="hazardous_materials_preamble.add_chemicals_note">
                You can add common chemicals using the cards above or add blank chemicals below. Use the blue button <FaChevronDown /> to expand and collapse the materials.
            </Trans>
        </div>
        <CommonHazmatCards appendMaterial={appendMaterial} />
        
    </>
    )
}
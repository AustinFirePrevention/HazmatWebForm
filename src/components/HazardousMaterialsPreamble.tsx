export function HazardousMaterialsPreamble() {
    return (<>
        <p>Hazardous materials stored or used aboveground in aggregate quantities greater than that required for reporting by International Fire Code Section 105.5.22 must be listed in the application. The reportable quantities are based on NFPA 704:</p>
        <div className="text-center">
            <img className="img-fluid" src="/pages/AFDPreventionDevTeam/hazmat/reportable.png" alt="Table of reportable chemicals" />
        </div>
        <p>Hazard Ratings are determined using criteria outlined in NFPA Standard No. 704. The ratings range from "0" for little hazard, to "4" for extreme hazard, and are assigned for health, flammability, and reactivity or instability. Many products will have ratings in two or more hazard categories. These ratings are usually found on the Safety Data Sheet (SDS) for each product. If no ratings are given, they can be determined from lethal dose, flashpoint, and stability information shown on the SDS. If difficulty is encountered in determining hazard ratings, e-mail us at afdhazmat@austintexas.gov.</p>
        <div>
            <div>
                <p className="text-center"><strong>MINIMUM AGGREGATE <u>QUANTITY</u></strong></p>
            </div>
            <table className="table table-hover">
                <tbody>
                    <tr>
                        <td>COMPRESSED AND LIQUIFIED GASES INCLUDING OXYGEN</td>
                        <td>100 CUBIC FEET</td>
                    </tr>
                    <tr>
                        <td>CARBON DIOXIDE (C02) SYSTEMS</td>
                        <td>101LB</td>
                    </tr>
                    <tr>
                        <td>CRYOGENIC FLUIDS</td>
                        <td>1 GAL</td>
                    </tr>
                    <tr>
                        <td>INDOOR DIESEL TANKS</td>
                        <td>125 GAL</td>
                    </tr>
                    <tr>
                        <td>OUTDOOR DIESEL TANKS</td>
                        <td>275 GAL</td>
                    </tr>
                    <tr>
                        <td>SULFURIC ACID - BATTERY ELECTROLYTE</td>
                        <td>15 GAL</td>
                    </tr>
                    <tr>
                        <td>SULFURIC ACID - POOL MAINTENANCE</td>
                        <td>4 GAL</td>
                    </tr>
                    <tr>
                        <td>Stationary and Mobile Energy Storage System (ESS)</td>
                        <td>Energy Capacity or Quantity</td>
                    </tr>
                    <tr>
                        <td>Capacitor ESS – nameplate rating</td>
                        <td>3 kWh </td>
                    </tr>
                    <tr>
                        <td>Flow batteries – nameplate rating</td>
                        <td>20 kWh</td>
                    </tr>
                    <tr>
                        <td>Lithium ion ESS – nameplate rating</td>
                        <td>20 kwh</td>
                    </tr>
                    <tr>
                        <td>Nickel metal hydride – nameplate rating</td>
                        <td>70 kWh</td>
                    </tr>
                    <tr>
                        <td>Other battery technologies – nameplate rating</td>
                        <td>10 kWh</td>
                    </tr>
                    <tr>
                        <td>Other electrochemical ESS technologies – nameplate rating</td>
                        <td>3 kWh</td>
                    </tr>
                    <tr>
                        <td>Stationary lead-acid batteries - flooded and valve regulated, and
                            Nickel-Cadmium ESS. Mobile ESS utilizing lead acid battery technology are exempt.</td>
                        <td>15 gallons</td>
                    </tr>
                </tbody>
            </table>
            <div><span className="small">The aboveground inventory must include reportable quantities at the site both
                indoors and outdoors.</span></div>
            <div className="my-3"></div>
            <div><span className="small">Underground storage of flammable and combustible liquids must be reported
                separately to the City of Austin Watershed Protection Department.</span></div>
        </div>
    </>
    )
}
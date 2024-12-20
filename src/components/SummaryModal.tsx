export function SummaryModalContent({ totals }: { totals: any }) {
    return (
        <div className='summary-tables'>
            <div className='table-container summary-tables'>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Hazard Type</th>
                            <th>Total Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        </tr>
                        <tr>
                            <td>Fire Hazard (Liquid)</td>
                            <td>{totals.aggregateAmounts.fireLiquid} Gallons</td>
                        </tr>
                        <tr>
                            <td>Instability Hazard (Liquid)</td>
                            <td>{totals.aggregateAmounts.instabilityLiquid} Gallons</td>
                        </tr>
                        <tr>
                            <td>Health Hazard (Liquid)</td>
                            <td>{totals.aggregateAmounts.healthLiquid} Gallons</td>
                        </tr>
                        <tr>
                            <td>Fire Hazard (Gas)</td>
                            <td>{totals.aggregateAmounts.fireGas} Cubic Feet</td>
                        </tr>
                        <tr>
                            <td>Instability Hazard (Gas)</td>
                            <td>{totals.aggregateAmounts.instabilityGas} Cubic Feet</td>
                        </tr>
                        <tr>
                            <td>Health Hazard (Gas)</td>
                            <td>{totals.aggregateAmounts.healthGas} Cubic Feet</td>
                        </tr>
                        <tr>
                            <td>Fire Hazard (Solid)</td>
                            <td>{totals.aggregateAmounts.fireSolid} Pounds</td>
                        </tr>
                        <tr>
                            <td>Instability Hazard (Solid)</td>
                            <td>{totals.aggregateAmounts.instabilitySolid} Pounds</td>
                        </tr>
                        <tr>
                            <td>Health Hazard (Solid)</td>
                            <td>{totals.aggregateAmounts.healthSolid} Pounds</td>
                        </tr>
                        <tr>
                            <td>ESS</td>
                            <td>{totals.aggregateAmounts.ESS} KWH</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='table-container'>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Fee Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Fire Hazard (Liquid)</td>
                            <td>${totals.fees.fireLiquid}</td>
                        </tr>
                        <tr>
                            <td>Instability Hazard (Liquid)</td>
                            <td>${totals.fees.instabilityLiquid}</td>
                        </tr>
                        <tr>
                            <td>Health Hazard (Liquid)</td>
                            <td>${totals.fees.healthLiquid}</td>
                        </tr>
                        <tr>
                            <td>Fire Hazard (Gas)</td>
                            <td>${totals.fees.fireGas}</td>
                        </tr>
                        <tr>
                            <td>Instability Hazard (Gas)</td>
                            <td>${totals.fees.instabilityGas}</td>
                        </tr>
                        <tr>
                            <td>Health Hazard (Gas)</td>
                            <td>${totals.fees.healthGas}</td>
                        </tr>
                        <tr>
                            <td>Fire Hazard (Solid)</td>
                            <td>${totals.fees.fireSolid}</td>
                        </tr>
                        <tr>
                            <td>Instability Hazard (Solid)</td>
                            <td>${totals.fees.instabilitySolid}</td>
                        </tr>
                        <tr>
                            <td>Health Hazard (Solid)</td>
                            <td>${totals.fees.healthSolid}</td>
                        </tr>
                        <tr>
                            <td>ESS</td>
                            <td>${totals.fees.ESS}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>${totals.total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};
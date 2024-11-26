import {Table } from 'react-bootstrap';

export function SummaryModalContent({ totals }: { totals: any }) {
    return (
        <>
            <Table striped hover>
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
                        <td>{totals.aggregateAmounts.fireLiquid}</td>
                    </tr>
                    <tr>
                        <td>Instability Hazard (Liquid)</td>
                        <td>{totals.aggregateAmounts.instabilityLiquid}</td>
                    </tr>
                    <tr>
                        <td>Health Hazard (Liquid)</td>
                        <td>{totals.aggregateAmounts.healthLiquid}</td>
                    </tr>
                    <tr>
                        <td>Fire Hazard (Gas)</td>
                        <td>{totals.aggregateAmounts.fireGas}</td>
                    </tr>
                    <tr>
                        <td>Instability Hazard (Gas)</td>
                        <td>{totals.aggregateAmounts.instabilityGas}</td>
                    </tr>
                    <tr>
                        <td>Health Hazard (Gas)</td>
                        <td>{totals.aggregateAmounts.healthGas}</td>
                    </tr>
                    <tr>
                        <td>Fire Hazard (Solid)</td>
                        <td>{totals.aggregateAmounts.fireSolid}</td>
                    </tr>
                    <tr>
                        <td>Instability Hazard (Solid)</td>
                        <td>{totals.aggregateAmounts.instabilitySolid}</td>
                    </tr>
                    <tr>
                        <td>Health Hazard (Solid)</td>
                        <td>{totals.aggregateAmounts.healthSolid}</td>
                    </tr>
                    <tr>
                        <td>ESS</td>
                        <td>{totals.aggregateAmounts.ESS}</td>
                    </tr>
                </tbody>
            </Table>
            <Table striped hover>
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
            </Table>
        </>

    )
};
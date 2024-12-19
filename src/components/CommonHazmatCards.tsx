import { Card, Button, Row, Col } from 'react-bootstrap';
import commonChemicals from '../../commonchemicals/commonChem.json';
import { Unit } from '../helpers/FeeProcessor';

export type CommonChemical = {
    name: string,
    label: string,
    unit: Unit,
    health_hazard: string,
    fire_hazard: string,
    instability_hazard: string,
    minimumReportableAmount: string

}

export default function CommonHazmatChemicals({ appendMaterial }: { appendMaterial: (chemical: CommonChemical) => void }) {
    return (
        <div className="common-chemicals">
            <h3>Quick Add Chemicals</h3>
            <Row>
                {(commonChemicals as CommonChemical[]).map((chemical, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-2">
                        <Card style={{ height: '100%' }}>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{chemical.label}</Card.Title>
                                <Card.Text className="flex-grow-1"></Card.Text>
                                <Button variant="primary" onClick={() => appendMaterial(chemical)}>Add to List</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
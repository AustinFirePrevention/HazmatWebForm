import { Card, Button, Row, Col } from 'react-bootstrap';
import commonChemicals from '../../commonchemicals/commonChem.json';

export default function CommonHazmatChemicals() {
    return (
        <div className="common-chemicals">
            <h3>Quick Add Chemicals</h3>
            <Row>
                {commonChemicals.map((chemical, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-2">
                        <Card style={{ height: '100%' }}>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{chemical.label}</Card.Title>
                                <Card.Text className="flex-grow-1"></Card.Text>
                                <Button variant="primary" onClick={() => addMaterial(chemical)}>Add to List</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
import { useTranslation } from 'react-i18next';
import { Card, Button, Row, Col } from 'react-bootstrap';
import commonChemicals from '../../commonchemicals/commonChem.json';
import { Unit } from '../helpers/types';

type CommonChemical = {
    name: string,
    label: string,
    label_es?: string,
    unit: Unit,
    health_hazard: string,
    fire_hazard: string,
    instability_hazard: string,
    minimumReportableAmount: string
}

export default function CommonHazmatChemicals({ appendMaterial }: { appendMaterial: (chemical: CommonChemical) => void }) {
    const { t, i18n } = useTranslation();

    const handleAppendMaterial = (chemical: CommonChemical) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { label_es, ...material } = chemical;
        appendMaterial(material);
    };

    return (
        <div className="common-chemicals">
            <h3>{t("common_hazmat_cards.title")}</h3>
            <Row>
                {(commonChemicals as CommonChemical[]).map((chemical, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-2">
                        <Card style={{ height: '100%' }}>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{i18n.language === 'es' ? chemical.label_es : chemical.label}</Card.Title>
                                <Card.Text className="flex-grow-1"></Card.Text>
                                <Button variant="primary" onClick={() => handleAppendMaterial(chemical)}>{t("common_hazmat_cards.add_to_list")}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
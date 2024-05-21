import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

function SingleSubmission() {
    const { id } = useParams();
    const allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
    const [singleEntry, setSingleEntry] = useState({ 'name': '', 'email': '', 'phone': '', 'checkbox_values': [] });

    useEffect(() => {
        const entry = allEntries.find(item => parseInt(item.id) === parseInt(id));
        if (entry) {
            setSingleEntry(entry);
        }
    }, [id, allEntries]);

    const feedback_type = {
        'qos': 'Please rate the quality of the service you received from your host.',
        'qob': 'Please rate the quality of your beverage.',
        'roc': 'Was our restaurant clean?',
        'exp': 'Please rate your overall dining experience.'
    };

    const handleCheckVal = (ty, entry) => {
        let val = '';
        if (entry['checkbox_values'].length > 0) {
            val = entry['checkbox_values'].find(item => item.split('_')[0] === ty) || '';
            val = val.split('_')[1];
        }
        return val;
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <cite title="Source Title">Feedback Details</cite>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>Customer Name</Col>
                        <Col>{singleEntry['name']}</Col>
                    </Row>
                    <Row>
                        <Col>Email</Col>
                        <Col>{singleEntry['email']}</Col>
                    </Row>
                    <Row>
                        <Col>Phone</Col>
                        <Col>{singleEntry['phone']}</Col>
                    </Row>
                    {Object.keys(feedback_type).map(ty => (
                        <Row key={ty}>
                            <Col>{feedback_type[ty]}</Col>
                            <Col>{handleCheckVal(ty, singleEntry)}</Col>
                        </Row>
                    ))}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SingleSubmission;
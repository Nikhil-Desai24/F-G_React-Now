// src/components/Submissions.js
import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Table, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Submissions() {
    const [allEntries, setAllEntries] = useState(JSON.parse(localStorage.getItem("allEntries")) || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEntries, setSelectedEntries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setAllEntries(JSON.parse(localStorage.getItem("allEntries")) || []);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleRefresh = () => {
        setAllEntries(JSON.parse(localStorage.getItem("allEntries")) || []);
    };

    const handleAddNew = () => {
        navigate('/');
    };

    const handleDelete = () => {
        const updatedEntries = allEntries.filter(entry => !selectedEntries.includes(entry.id.toString()));
        setAllEntries(updatedEntries);
        localStorage.setItem("allEntries", JSON.stringify(updatedEntries));
        setSelectedEntries([]);
    };

    const handleCheckboxChange = (id) => {
        if (selectedEntries.includes(id)) {
            setSelectedEntries(selectedEntries.filter(entryId => entryId !== id));
        } else {
            setSelectedEntries([...selectedEntries, id]);
        }
    };

    const filteredEntries = allEntries.filter(entry =>
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const feedbackType = {
        'qos': 'Please rate the quality of the service you received from your host.',
        'qob': 'Please rate the quality of your beverage.',
        'roc': 'Was our restaurant clean?',
        'exp': 'Please rate your overall dining experience.'
    };

    const handleCheckVal = (ty, entry) => {
        let val = '';
        if (entry.checkbox_values.length > 0) {
            val = entry.checkbox_values.find(item => item.split('_')[0] === ty);
            if (val) val = val.split('_')[1];
        }
        return val;
    };

    return (
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Aromatic Bar</h2>
                </Col>
                <Col className="text-right">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-secondary" onClick={handleRefresh}>
                            &#8634;
                        </Button>
                        <Button variant="success" onClick={handleAddNew}>
                            Add New
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th><Form.Check type="checkbox" /></th>
                        <th>Form details</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        {Object.keys(feedbackType).map(ty => (
                            <th key={ty}>{feedbackType[ty]}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredEntries.map(entry => (
                        <tr key={entry.id}>
                            <td>
                                <Form.Check
                                    type="checkbox"
                                    checked={selectedEntries.includes(entry.id.toString())}
                                    onChange={() => handleCheckboxChange(entry.id.toString())}
                                />
                            </td>
                            <td><a href={`/submission/${entry.id}`} target="_blank" rel="noopener noreferrer">View details</a></td>
                            <td>{entry.name}</td>
                            <td>{entry.email}</td>
                            <td>{entry.phone}</td>
                            {Object.keys(feedbackType).map(ty => (
                                <td key={ty}>{handleCheckVal(ty, entry)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="danger" onClick={handleDelete} disabled={selectedEntries.length === 0}>
                Delete
            </Button>
        </Container>
    );
}

export default Submissions;

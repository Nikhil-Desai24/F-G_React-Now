// src/components/StickyHeader.js
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function StickyHeader() {
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="/" className="aromatic-bar">Aromatic Bar</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default StickyHeader;

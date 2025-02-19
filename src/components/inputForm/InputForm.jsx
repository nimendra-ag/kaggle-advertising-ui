import axios from 'axios';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const InputForm = () => {
    const [formData, setFormData] = useState({
        tv: "",
        radio: ""
    });

    const [responseMessage, setResponseMessage] = useState("");

    const handleChanges = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            tv: parseFloat(formData.tv),
            radio: parseFloat(formData.radio)
        };

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formattedData);
            setResponseMessage(`Prediction: ${response.data.prediction.toFixed(2)}`);
        } catch (error) {
            setResponseMessage(`Error: ${error.response?.data?.error || error.message}`);
            console.error("Error:", error);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>TV</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="tv"
                        value={formData.tv}
                        onChange={handleChanges}
                        placeholder='Enter TV spend'
                        required
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Radio</Form.Label>
                    <Form.Control
                        type='number'
                        step="0.01"
                        name="radio"
                        value={formData.radio}
                        onChange={handleChanges}
                        placeholder='Enter Radio spend'
                        required
                    />
                </Form.Group>

                <Button variant='primary' type='submit'>Submit</Button>
            </Form>

            {responseMessage && <p className="mt-3">{responseMessage}</p>}
        </Container>
    );
};

export default InputForm;

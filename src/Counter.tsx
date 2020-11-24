import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import CSS from 'csstype';

type CounterState = {
    counter: number
  }

class Counter extends React.Component<{}, CounterState> {

    constructor(props: {}) {
        super(props);
        this.state = { counter: 0 };
    }

    increment() {
        this.setState((state) => {
            return {counter: state.counter + 1};
        });
    }

    render() {
        const CounterStyles: CSS.Properties = {
            fontSize: '24px'
        }
        return (
            <Container>
                <Row>
                    <Col xs="auto"><Button variant="primary" type="button" onClick={() => this.increment()} data-testid="increment">Increment</Button></Col>
                    <Col xs="auto"><span style={CounterStyles} data-testid="counter">{this.state.counter}</span></Col>
                </Row>
            </Container>
        );
    }
}

export default Counter;
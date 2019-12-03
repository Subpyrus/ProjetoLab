import React from 'react'
import { Col, Row, Alert } from 'reactstrap';

const Notifications = (props) => {
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    return (
        <Alert color="info" isOpen={visible} toggle={onDismiss}>
            I am an alert and I can be dismissed!
      </Alert>
    );
}

export default Notifications;

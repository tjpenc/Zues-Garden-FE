import { Button, Card } from 'react-bootstrap';

export default function SmallTaskCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Task Name</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Task Deadline</Card.Subtitle>
        <Card.Text>
          Task Description
        </Card.Text>
        <Button variant="success">Completed</Button>
        <Button variant="danger">Delete</Button>
        <Button variant="primary">View</Button>
        <Button variant="dark">Edit</Button>
      </Card.Body>
    </Card>
  );
}

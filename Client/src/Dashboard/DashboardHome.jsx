import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaShoppingCart, FaUsers, FaDollarSign } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardHome = () => {
  const data = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4000 },
  ];

  const name = localStorage.getItem("admin");

  return (
    <>
      <Container className="my-5">
        <Row className="mb-4">
  <Col md={12}>
    <h1 className="display-4 text-center" style={{ color: "#f8f9fa" }}>Welcome to Admin Dashboard</h1>
    <h2 className="text-center" style={{ color: "#d1d1d1" }}>
      Hello, <span style={{ color: "#f7c948" }}>{name}</span>
    </h2>
  </Col>
</Row>


        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-white bg-primary p-3">
              <Card.Body>
                <Card.Title>Total Sales</Card.Title>
                <Card.Text className="fs-3">$25,400</Card.Text>
                <FaDollarSign size={32} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-white bg-success p-3">
              <Card.Body>
                <Card.Title>Orders</Card.Title>
                <Card.Text className="fs-3">1,250</Card.Text>
                <FaShoppingCart size={32} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-white bg-warning p-3">
              <Card.Body>
                <Card.Title>Customers</Card.Title>
                <Card.Text className="fs-3">850</Card.Text>
                <FaUsers size={32} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card className="p-3">
              <Card.Body>
                <Card.Title>Monthly Sales</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#007bff" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardHome;

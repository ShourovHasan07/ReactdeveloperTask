import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../api/productApi';
import { Button, Card, Image } from 'antd';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Card title={data.title} style={{ width: 600 }}>
        <Image width={250} src={data.thumbnail} />
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Price:</strong> ${data.price}</p>
        <p><strong>Category:</strong> {data.category}</p>
        <p><strong>Brand:</strong> {data.brand}</p>
        <p><strong>Rating:</strong> {data.rating}</p>
        <p><strong>Stock:</strong> {data.stock}</p>

        <div style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={() => navigate(`/products/${id}/edit`)}>
            Edit Product
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;

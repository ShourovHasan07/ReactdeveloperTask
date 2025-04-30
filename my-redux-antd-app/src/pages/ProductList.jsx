import { Table, Button, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../api/productApi';
import { useState } from 'react';

const ProductList = () => {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data, isLoading } = useGetProductsQuery({
    limit: pagination.pageSize,
    skip: (pagination.current - 1) * pagination.pageSize,
  });

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail', // Ensure the thumbnail key exists in the data
      render: (src, record) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/products/${record.id}`)} // Navigate to the product details page
        >
          <Image
            width={60}
            src={src}
            alt="Product"
            style={{ objectFit: 'cover', borderRadius: 4 }}
          />
        </div>
      ),
    },
    { title: 'ID', dataIndex: 'id' },
    { title: 'Title', dataIndex: 'title' },
    { title: 'Category', dataIndex: 'category' },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
    },
    { title: 'Price', dataIndex: 'price', render: (price) => `$${price}` },
    {
      title: 'Action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={() => navigate(`/products/${record.id}`)}>View Details</Button>
          <Button onClick={() => navigate(`/products/${record.id}/edit`)} type="primary">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const handleTableChange = (paginationInfo) => {
    setPagination({
      ...pagination,
      current: paginationInfo.current,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product List</h1>
      <Table
        columns={columns}
        dataSource={data?.products || []}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.total || 0,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ProductList;

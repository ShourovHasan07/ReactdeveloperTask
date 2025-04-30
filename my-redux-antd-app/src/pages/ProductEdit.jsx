import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery, useGetCategoriesQuery, useUpdateProductMutation } from '../api/productApi';
import { Form, Input, Button, Select, notification } from 'antd';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProductByIdQuery(id);
  const { data: categories } = useGetCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [form] = Form.useForm();

  if (isLoading) return <p>Loading...</p>;

  const onFinish = async (values) => {
    try {
      await updateProduct({ id, body: values }).unwrap();

      notification.success({
        message: 'Success',
        description: 'Product updated successfully!',
        placement: 'topRight',
      });

      // Notification দেখানোর পর 0.5 সেকেন্ড delay দিয়ে navigate 
      setTimeout(() => {
        navigate('/products');
      }, 500);
    } catch (error) {
      notification.error({
        message: 'Update failed',
        description: 'Something went wrong while updating the product.',
        placement: 'topRight',
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Product</h1>
      <Form
        form={form}
        layout="vertical"
        initialValues={product}
        onFinish={onFinish}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Select
            options={categories?.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }))}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductEdit;

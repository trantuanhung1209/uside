import { Layout } from '../components/layout';
import { Button, Input } from '../components/ui';
import { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Implement form submission logic
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Liên hệ với chúng tôi
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Địa chỉ:</h3>
                  <p className="text-gray-600">123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
                </div>
                <div>
                  <h3 className="font-medium">Email:</h3>
                  <p className="text-gray-600">contact@uside.com</p>
                </div>
                <div>
                  <h3 className="font-medium">Điện thoại:</h3>
                  <p className="text-gray-600">+84 123 456 789</p>
                </div>
                <div>
                  <h3 className="font-medium">Giờ làm việc:</h3>
                  <p className="text-gray-600">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Gửi tin nhắn</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Họ và tên"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tin nhắn
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Gửi tin nhắn
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ContactPage;

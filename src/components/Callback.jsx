import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/userinfo", {
          method: "GET",
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error("Không xác thực được người dùng");
        }

        const data = await response.json();

        if (data && data.email) {
          onLoginSuccess(data);  // Gửi thông tin user lên App
          navigate("/");         // Chuyển về trang chính sau khi login
        } else {
          console.error("Không có dữ liệu người dùng");
        }
      } catch (err) {
        console.error("Lỗi xác thực:", err);
        navigate("/"); // Quay về trang chính nếu lỗi
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <p className="text-lg">Đang xử lý đăng nhập, vui lòng chờ...</p>
    </div>
  );
};

export default Callback;

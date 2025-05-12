import axios from 'axios';

export const loginUser = async (email, password, role) => {
  try {
    const response = await axios.post('http://localhost:5000/api/user/login', {
      email,
      password,
      role,
    });

    return {
      success: true,
      user: {
        id: response.data.id,
        email: email,
        role: response.data.role,
        username: response.data.name
      },
    };
  } catch (error) {
    console.error('Login error:', error?.response?.data || error.message);

    return {
      success: false,
      message:
        error?.response?.data?.message || 'Server error. Please try again.',
    };
  }
};
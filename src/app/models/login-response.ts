export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface User {
  _id: string;
  fullName: string; 
  email: string;
  phone: string;
  role: string;
  designation: string;
  department: string;
  employeeId: string;
  isActive: boolean;
}
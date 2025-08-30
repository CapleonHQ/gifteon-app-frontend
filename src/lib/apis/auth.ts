import { customAxios } from './'

interface LoginUserRequest {
  email: string
}

export const loginUser = async (data: LoginUserRequest) => {
  try {
    const response = await customAxios.post('/auth/login', data)
    return response.data
  } catch (error) {
    throw error
  }
}
interface RegisterUserRequest {
  email: string
  firstName: string
  lastName: string
}

export const registerUser = async (data: RegisterUserRequest) => {
  try {
    const response = await customAxios.post('/auth/register', data)
    return response.data
  } catch (error) {
    throw error
  }
}

interface VerifyOtpRequest {
  email: string
  otp: string
}
export const verifyOtp = async (data: VerifyOtpRequest) => {
  try {
    const response = await customAxios.post('/auth/verify-otp', data)
    return response.data
  } catch (error) {
    throw error
  }
}

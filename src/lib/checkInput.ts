export const validateFormSignup = (name: string, email: string, password: string) => {
    // ตรวจสอบชื่อ
    if (name.length < 4 || name.length > 20) {
        throw new Error('Invalid name: must contain at least 4 letters and no more than 20 letters');
    }

    // ตรวจสอบอีเมล
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        throw new Error('Invalid email format');
    }

    // ตรวจสอบรหัสผ่าน
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }

   
};
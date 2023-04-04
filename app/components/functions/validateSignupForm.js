export default function validateSignupForm(userAt, name, registerEmail, image, registerPassword) {
    const errors = {};
  
  // Check if username is empty
    if (!userAt.trim()) {
      errors.userAt = "Username is required";
    }
  
    // Check if name is empty
    if (!name.trim()) {
      errors.name = "Name is required";
    }
  
    // Check if email is empty
    if (!registerEmail.trim()) {
      errors.registerEmail = "Email is required";
    } else {
      // Check if email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerEmail)) {
        errors.registerEmail = "Invalid email address";
      }
    }
  
    // Check if image is empty
    if (!image) {
      errors.image = "Image is required";
    }
  
    // Check if password is empty
    if (!registerPassword) {
      errors.registerPassword = "Password is required";
    } else {
      // Check if password meets requirements
      const passwordRegex = /^.{6,}$/;
      if (!passwordRegex.test(registerPassword)) {
        errors.registerPassword =
          "Password must be at least 6 characters long";
      }
    }
  

  
    return errors;
  }
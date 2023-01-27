export const loginform = async (creds: {
    email: string;
    password: string;
  }): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (creds.email === "abc@gmail.com" && creds.password === "password") {
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  };
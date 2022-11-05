class TokenService {
    getUser() {
      return localStorage.getItem("token")
    }
    setUser(token:string) {
      localStorage.setItem("token", token);
    }
    removeUser() {
      localStorage.removeItem("token");
    }
  }
  export default new TokenService();
  
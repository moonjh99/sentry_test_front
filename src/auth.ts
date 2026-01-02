export const auth = {
  getMemberId(): string | null {
    return localStorage.getItem("id");
  },

  login(id: string) {
    localStorage.setItem("id", id);
  },

  logout() {
    localStorage.removeItem("id");
  },
};

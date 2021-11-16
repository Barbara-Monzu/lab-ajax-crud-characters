class APIHandler {
  constructor (baseUrl) {
    // this.BASE_URL = baseUrl;
    this.axiosApp = axios.create({
      baseURL: baseUrl
  })
  }

  getFullList = () => this.axiosApp.get("/characters")

  getOneRegister = (id) => this.axiosApp.get(`/characters/${id}`)

  createOneRegister = (info) => this.axiosApp.post("/characters", info)

  updateOneRegister = (id, info) => this.axiosApp.put(`/characters/${id}`, info)

  deleteOneRegister = (id, info) => this.axiosApp.delete(`/characters/${id}`, info)

}

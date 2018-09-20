const login = {
  url: '/admin/login',
  model: {
    name: {
      need: true,
      type: String
    },
    age: {
      need: false,
      type: Number
    },
    gender: {
      need: true,
      type: [String, Number]
    },
    mess: {
      need: true,
      type: Object,
      children: {
        pic: {
          need: true,
          type: String
        }
      }
    },
    list: {
      need: true,
      type: Array,
      children: {
        type: String
      }
    }
  }
}
const getBook = {
  url: '/v2/book/1220562',
  model: {}
}

module.exports = {
  login,
  getBook
}

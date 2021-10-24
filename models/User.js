const { model, Schema } = require('mongoose')

const User = new Schema ({
  username: {
    type: String,
    unique: true
  },
  transactions: [
    { 
      type: Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ]
}, {timestamps: true})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)
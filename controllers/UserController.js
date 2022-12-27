const middleware = require('../middleware')
const { User } = require('../models')
const { Op } = require('sequelize')

const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll({})

    res.send(users)
  } catch (error) {
    throw error
  }
}

const GetUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (error) {
    throw error
  }
}

const RegisterUser = async (req, res) => {
  try {
    const { userName, image, password } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({
      userName,
      image,
      passwordDigest
    })
    res.send(user)
  } catch (error) {
    res.status(500).send({ err: error })
  }
}

const CreateUser = async (req, res) => {
  try {
    let userBody = {
      ...req.body
    }
    const createdUser = await User.create(userBody)
    res.send(createdUser)
  } catch (error) {
    throw error
  }
}

const LoginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        userName: req.body.userName
      },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user.id,
        userName: user.userName
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const DeleteUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.id)
    await User.destroy({ where: { id: userId } })
    res.send({ message: `Deleted user with an id of ${userId}` })
  } catch (error) {
    throw error
  }
}

const CheckSession = (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

const UpdateUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let updatedUser = await User.update(req.body, {
      where: { id: userId },
      returning: true
    })
    res.send(updatedUser)
  } catch (error) {
    throw error
  }
}

// const UpdatePassword = async (req, res) => {
//   try {
//     let userId = parseInt(req.params.user_id)
//     const { oldPassword, newPassword } = req.body
//     const user = await User.findByPk(userId)
//     console.log(user)
//     console.log(oldPassword)
//     console.log(newPassword)
//     if (
//       user &&
//       (await middleware.comparePassword(
//         user.dataValues.passwordDigest,
//         await middleware.hashPassword(oldPassword)
//       ))
//     ) {
//       let passwordDigest = await middleware.hashPassword(newPassword)
//       await user.update({ passwordDigest })
//       return res.send({ status: 'Ok', payload: user })
//     }
//     res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
//   } catch (error) {}
// }
const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    let userId = parseInt(req.params.user_id)
    const user = await User.findByPk(userId)
    const oldPasswordDigest = await middleware.hashPassword(oldPassword)
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        oldPasswordDigest
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      await user.update({ passwordDigest })
      return res.send({ status: 'Ok', payload: user })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {}
}

module.exports = {
  GetUsers,
  GetUserById,
  RegisterUser,
  CreateUser,
  LoginUser,
  DeleteUser,
  CheckSession,
  UpdatePassword,
  UpdateUser
}

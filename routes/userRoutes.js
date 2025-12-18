const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
router.post('/register', async (req,res)=>{
  const {name,email,password,amount_available} = req.body
  const u = new User({name,email,password,amount_available})
  await u.save()
  res.json({message:'ok'})
})
router.post('/login', async (req,res)=>{
  const {email,password} = req.body
  const user = await User.findOne({email})
  if(!user) return res.status(400).json({message:'invalid'})
  const ok = await user.comparePassword(password)
  if(!ok) return res.status(400).json({message:'invalid'})
  const token = jwt.sign({userId:user._id,email:user.email}, process.env.JWT_SECRET || 'secret',{expiresIn:'7d'})
  res.json({token})
})
router.put('/updateAllAmount', async (req,res)=>{
  const amt = Number(req.body.amount) || 0
  await User.updateMany({},{$set:{amount_available:amt}})
  res.json({message:'updated'})
})
module.exports = router

const express = require('express')
const gra = require('../models/gra')
const router = express.Router()
const Gra = require('../models/gra')

// Getting all
router.get('/', async (req, res) => {
  try {
    const gry = await Gra.find()
    res.json(gry)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getGra, (req, res) => {
  res.json(res.gra)
})

// Creating one
router.post('/', async (req, res) => {
  const gra = new Gra({
    name: req.body.name,
    playing: req.body.playing
  })
  try {
    const newGra = await gra.save()
    res.status(201).json(newGra)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getGra, async (req, res) => {
  if (req.body.name != null) {
    res.gra.name = req.body.name
  }
  if (req.body.playing != null) {
    res.gra.playing = req.body.playing
  }
  try {
    const updatedgra = await res.gra.save()
    res.json(updatedgra)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getGra, async (req, res) => {
  try {
    await res.gra.remove()
    res.json({ message: 'Deleted Gra' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getGra(req, res, next) {
  let gra
  try {
    gra = await Gra.findById(req.params.id)
    if (gra == null) {
      return res.status(404).json({ message: 'Cannot find gra' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.gra = gra
  next()
}

module.exports = router
const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// GET todas las películas
router.get('/', async (req, res) => {
  try { //Manejamos los errores con los try/catch
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET por título
router.get('/title/:title', async (req, res) => {
  try { 
    const movie = await Movie.find({ title: req.params.title });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET por género
router.get('/genre/:genre', async (req, res) => {
  try { 
    const movie = await Movie.find({ genre: req.params.genre });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET por año >=
router.get('/year/:year', async (req, res) => {
  try {
    const movie = await Movie.find({ year: { $gte: req.params.year } });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET por ID
router.get('/:id', async (req, res) => {
  try { //Manejo de error
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//A partir de aquí añado los métodos extra que pide el proyecto:

// Método .post para crear una nueva película. Requiere un JSON con title, director, year y genre
router.post('/', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Método .put para modificar una película por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Método .delete para eliminar una película por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

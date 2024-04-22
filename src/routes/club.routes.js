const express = require('express')
const router = express.Router()
const Club = require('../models/club.model')

// Middleware
const getClub = async(req, res, next) => {
    let club;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) { // Significa 24 números y letras de la A a la F
        return res.status(404).json({
            message: 'El ID del club no es válido'
        })
    }

    try {
        club = await Club.findById(id)
        if (!club) {
            return res.status(404).json({
                message: 'El club no fue encontrado'
            })
        }
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }

    res.club = club;
    next()
} 

// Eliminar un Club que contenga cierta palabra
router.delete('/delete/:name', async (req, res) => {
    try {
        console.log('Eliminando el club en BD...');
        const clubs = await Club.deleteOne({name: req.params.name});
        if (clubs.deletedCount) {
            console.log(`${clubs.deletedCount} Registro eliminado satisfactoriamente.`);
        }
        if (!clubs.deletedCount) {
            res.status(204).json([])
        }
        res.json(clubs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Obtener un Club que contenga cierta palabra
router.get('/:name', async (req, res) => {
    try {
        console.log('Consultando el club en BD...');
        const keyword = req.params.name;
        const clubs = await Club.find({name: {$regex: keyword, $options: 'i'}});
        if (clubs) {
            console.log(`${clubs.length} Resultado encontrado:`);
        }
        console.log(clubs);
        if (!clubs.length) {
            res.status(204).json([])
        }
        res.json(clubs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Obtener todos los Clubs
router.get('/', async (req, res) => {
    try {
        const clubs = await Club.find();
        console.log(clubs.length);
        if (!clubs.length) {
            res.status(204).json([])
        }
        res.json(clubs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Agregar un Club
router.post('/', async (req, res) => {
    try {
        const {
            name,
            country,
            city,
            champions,
        } = req?.body
        if (!name || !country || !city) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            })
        }

        const club = new Club(
            {
                name,
                country,
                city,
                champions,
            }
        )

        const newClub = await club.save()
        console.log(newClub)
        res.status(201).json(newClub)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Modificar un Club
router.patch('/modify/:name', async (req, res) => {
    if (!req.body.name && !req.body.country && !req.body.city && !req.body.champions) {
        res.status(400).json({
            message: 'Debe enviar al menos uno de los campos para modificar (name, country, city, champions).'
        })
    }
    try {
        const clubs = await Club.find({name: req.params.name});
        let modifiedClub = {};
        if (clubs) {
            console.log('Modificando el registro en BD...');
            modifiedClub.name = req.body.name || clubs.name;
            modifiedClub.country = req.body.country || clubs.country;
            modifiedClub.city = req.body.city || clubs.city;
            modifiedClub.champions = req.body.champions || clubs.champions;
        }
        if (!clubs.length) {
            res.status(204).json([])
        }
        const updatedClub = await Club.updateOne({name: req.params.name}, modifiedClub);
        if (updatedClub.modifiedCount) {
            console.log(`${updatedClub.modifiedCount} Registro modificado satisfactoriamente.`)
        } else {
            res.status(400).json({ message: 'No se encontraron registros realacionados a modificar.' })
        }
        res.status(201).json(updatedClub)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router
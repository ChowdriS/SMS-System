import db from '../config/database.js';

export const addSchool = (req, res) => {
    // console.log("inside addSchool")
    // console.log(req)
    const { name, address, latitude, longitude } = req.body;


    // Validating all required fields are present
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).send({ error: 'All fields (name, address, latitude, longitude) are required' });
    }

    // Validating the data types: latitude and longitude should be numbers
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).send({ error: 'Latitude and Longitude must be numbers' });
    }

    // Validating latitude and longitude are within valid ranges
    if (latitude < -90 || latitude > 90) {
        return res.status(400).send({ error: 'Latitude must be between -90 and 90' });
    }

    if (longitude < -180 || longitude > 180) {
        return res.status(400).send({ error: 'Longitude must be between -180 and 180' });
    }

    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).send({ error: 'Invalid input data' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Database error' });
        }
        res.status(201).send({ message: 'School added successfully' });
    });
};


// distance between two schools
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (deg) => deg * (Math.PI / 180);
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    // Ensuring latitude and longitude are present and valid numbers
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).send({ error: 'Latitude and longitude must be provided and must be valid numbers' });
    }
    
    const query = 'SELECT * FROM schools';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Database error' });
        }

        const sortedSchools = results.map((school) => ({
            ...school,
            distance: calculateDistance(+latitude, +longitude, school.latitude, school.longitude),
        })).sort((a, b) => a.distance - b.distance);

        res.status(200).send(sortedSchools);
    });
};

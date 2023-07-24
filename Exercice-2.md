# Création de la base de données et de la collection

Créez une base de données `sample_db` et une collection appelée `salles`.

## Insertion des documents

Insérez les documents suivants dans la collection `salles` :

```json
[
  {
    "_id": 1,
    "nom": "AJMI Jazz Club",
    "adresse": {
      "numero": 4,
      "voie": "Rue des Escaliers Sainte-Anne",
      "codePostal": "84000",
      "ville": "Avignon",
      "localisation": {
        "type": "Point",
        "coordinates": [43.951616, 4.808657]
      }
    },
    "styles": ["jazz", "soul", "funk", "blues"],
    "avis": [{
      "date": new Date('2019-11-01'),
      "note": NumberInt(8)
    },
      {
        "date": new Date('2019-11-30'),
        "note": NumberInt(9)
      }
    ],
    "capacite": NumberInt(300),
    "smac": true
  }, {
    "_id": 2,
    "nom": "Paloma",
    "adresse": {
      "numero": 250,
      "voie": "Chemin de l'Aérodrome",
      "codePostal": "30000",
      "ville": "Nîmes",
      "localisation": {
        "type": "Point",
        "coordinates": [43.856430, 4.405415]
      }
    },
    "avis": [{
      "date": new Date('2019-07-06'),
      "note": NumberInt(10)
    }
    ],
    "capacite": NumberInt(4000),
    "smac": true
  },
  {
    "_id": 3,
    "nom": "Sonograf",
    "adresse": {
      "voie": "D901",
      "codePostal": "84250",
      "ville": "Le Thor",
      "localisation": {
        "type": "Point",
        "coordinates": [43.923005, 5.020077]
      }
    },
    "capacite": NumberInt(200),
    "styles": ["blues", "rock"]
  }
]

```

## Réponse : 

### 1

``
db.salles.find({ "smac": true }, { "_id": 1, "nom": 1 })
``

### 2
``
db.salles.find({ "capacite": { $gt: 1000 } }, { "nom": 1 })
``

### 3

``
db.salles.find({ "adresse.numero": { $exists: false } }, { "_id": 1 })
``
### 4

``
db.salles.find({ "avis": { $size: 1 } }, { "_id": 1, "nom": 1 })
``
### 5
``
db.salles.find({ "styles": "blues" }, { "styles": 1 })
``
### 6
``
db.salles.find({ "styles.0": "blues" }, { "styles": 1 })
``

### 7
``
db.salles.find({ "adresse.codePostal": /^84/, "capacite": { $lt: 500 } }, { "adresse.ville": 1 })
``

### 8
``
db.salles.find({ $or: [{ "_id": { $mod: [2, 0] } }, { "avis": { $exists: false } }] }, { "_id": 1 })
``

### 9
``
db.salles.find({ "avis.note": { $gte: 8, $lte: 10 } }, { "nom": 1 })
``

### 10
``
db.salles.find({ "avis.date": { $gt: new Date('2019-11-15') } }, { "nom": 1 })
``

### 11
``
db.salles.find({ $expr: { $gt: [{ $multiply: ["$_id", 100] }, "$capacite"] } }, { "nom": 1, "capacite": 1 })
``

### 12
``
db.salles.find({ $where: "this.styles.length > 2 && this.smac == true" }, { "nom": 1, "styles": 1 })
``

### 13
``
db.salles.distinct("adresse.codePostal")
``

### 14
``
db.salles.updateMany({}, { $inc: { "capacite": 100 } })
``

### 15
``
db.salles.updateMany({ "styles": { $ne: "jazz" } }, { $push: { "styles": "jazz" } })
``

### 16
``
db.salles.updateMany({ "_id": { $nin: [2, 3] } }, { $pull: { "styles": "funk" } })
``

### 17
``
db.salles.updateOne({ "_id": 3 }, { $push: { "styles": { $each: ["techno", "reggae"] } } })
``

### 18
``
db.salles.updateMany({ "nom": { $regex: /^P/i } }, { $inc: { "capacite": 150 }, $set: { "contact": { "telephone": "04 11 94 00 10" } } })
``

### 19
``
db.salles.updateMany({ "nom": { $regex: /^[aeiou]/i } }, { $push: { "avis": { "date": new Date(), "note": 10 } } })
``

### 20
``
db.salles.updateMany({ "nom": { $regex: /^z/i } }, { $set: { "nom": "Pub Z", "capacite": 50, "smac": false } }, { upsert: true })
``

### 21
``
db.salles.count({ "_id": { $type: "objectId" } })
``

### 22
``
db.salles.find({ "_id": { $not: { $type: "objectId" } } }, { "nom": 1, "capacite": 1 }).sort({ "capacite": -1 }).limit(1)
``

### 23
``
db.salles.replaceOne({ "_id": ObjectId("object_id") }, { "nom": "Pub Z", "capacite": 60 })
``

Remplacer "object_id" dans l'Exercice 23 par l'identifiant souhaité

### 24
``
db.salles.deleteOne({ "_id": { $type: "objectId" }, "capacite": { $lte: 60 } })
``

### 25
``
db.salles.findOneAndUpdate({ "nom": { $regex: /^[Zz]/ } }, { $inc: { "capacite": -15 } })
``
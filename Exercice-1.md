# Création de la base de données et de la collection

Créez une base de données `sample_db` et une collection appelée `employees`.

## Insertion des documents

Insérez les documents suivants dans la collection `employees` :

```json
[
  {
    "name": "John Doe",
    "age": 35,
    "job": "Manager",
    "salary": 80000
  },
  {
    "name": "Jane Doe",
    "age": 32,
    "job": "Developer",
    "salary": 75000
  },
  {
    "name": "Jim Smith",
    "age": 40,
    "job": "Manager",
    "salary": 85000
  }
]

```

* J'ai mis entre crochet car le code est en format Json (pas de format Bson sur l'éditeur)

### Écrivez une requête MongoDB pour trouver tous les documents dans la collection "employees".

### Écrivez une requête pour trouver tous les documents où l'âge est supérieur à 33.

### Écrivez une requête pour trier les documents dans la collection "employees" par salaire décroissant.

### Écrivez une requête pour sélectionner uniquement le nom et le job de chaque document.

### Écrivez une requête pour compter le nombre d'employés par poste.

### Écrivez une requête pour mettre à jour le salaire de tous les développeurs à 80000

## Réponse : 

#### 1. db.employees.find()

#### 2. db.employees.find({ age: { $gt: 33 } })

#### 3. db.employees.find().sort({ salary: -1 })

#### 4. db.employees.find({}, { name: 1, job: 1, _id: 0 })


#### 5. db.employees.find({ job: "Developer" }).count()
#### ou alors j'ai trouvé ça, qui est beaucoup mieux selon moi :

```
db.employees.aggregate([
  {
    $group: {
      _id: "$job",
      count: { $sum: 1 }
    }
  }
])
```

#### 6.

```
db.employees.updateMany(
  { job: "Developer" },
  { $set: { salary: 80000 } }
)
```

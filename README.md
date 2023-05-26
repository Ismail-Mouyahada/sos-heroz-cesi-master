
### Vue de l'application

![screencapture-127-0-0-1-63176-2023-05-25-22_28_18](https://github.com/Ismail-Mouyahada/sos-heroz-cesi-master/assets/66369128/acff5a4c-669d-47e1-944c-c6dfff32dc78)

L'objectif de cette application est de permettre aux super-héros de s'inscrire et d'être géolocalisés à l'aide d'OpenStreetMap. Les citoyens et les communes peuvent également signaler des incidents nécessitant l'intervention des super-héros.

### Diagramme UML

[UML-Diagramme-cas-d'activité.pdf](https://github.com/Ismail-Mouyahada/sos-heroz-cesi-master/files/11570295/UML-Diagramme-cas-d.activite.pdf)

[UML-Diagramme-cas-des-classes.pdf](https://github.com/Ismail-Mouyahada/sos-heroz-cesi-master/files/11570296/UML-Diagramme-cas-des-classes.pdf

[UML-Diagramme-cas-d'-usage.pdf](https://github.com/Ismail-Mouyahada/sos-heroz-cesi-master/files/11570297/UML-Diagramme-cas-d.-usage.pdf)

### Modelisation MCD 

![Untitled](https://github.com/Ismail-Mouyahada/sos-heroz-cesi-master/assets/66369128/4c4b20e2-67ed-419c-b3a9-8f7db6942547)

## Étape 1 : Installation d'AdonisJS 5

Pour commencer, nous devons installer AdonisJS 5 en exécutant la commande suivante dans notre terminal :

```
npm i -g @adonisjs/cli

```

## Étape 2 : Création du projet SOS Heroz

Une fois AdonisJS 5 installé, nous pouvons créer notre projet SOS Heroz en exécutant la commande suivante :

```
adonis new sos-heroz --api-only --typescript

```

Cette commande crée un projet API-only avec TypeScript.

## Étape 3 : Configuration de la base de données

Notre application nécessite une base de données pour stocker les informations sur les super-héros et les incidents signalés. Nous pouvons utiliser SQLite pour le développement en exécutant la commande suivante :

```
npm install @adonis/lucid @adonis/shield @adonis/auth 

```

Ensuite, nous devons configurer notre base de données dans le fichier `.env` :

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=sos_heroz

```

## Étape 4 : Création des migrations

Nous allons maintenant créer les migrations pour créer les tables `superheroes` et `incidents` dans notre base de données. Exécutez la commande suivante pour créer une migration pour la table `superheroes` :

```
adonis make:migration create_superheroes_table --create superheroes

```

Ensuite, exécutez la commande suivante pour créer une migration pour la table `incidents` :

```
adonis make:migration create_incidents_table --create incidents

```

## Étape 5 : Définition des modèles

Nous allons maintenant définir nos modèles `Superhero` et `Incident` dans le dossier `app/Models` :

```
// app/Models/Superhero.ts

import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Superhero extends BaseModel {
  public static table = 'superheroes'

  // Columns
  public id: number
  public name: string
  public latitude: number
  public longitude: number
}

// app/Models/Incident.ts

import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Incident extends BaseModel {
  public static table = 'incidents'

  // Columns
  public id: number
  public title: string
  public description: string
  public latitude: number
  public longitude: number
  public status: 'pending' | 'in_progress' | 'resolved'
  public superhero_id: number
}

```

## Étape 6 : Création des contrôleurs

Nous allons maintenant créer nos contrôleurs `SuperheroController` et `IncidentController` pour gérer les requêtes HTTP pour les super-héros et les incidents :

```
// app/Controllers/Http/SuperheroController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Superhero from 'App/Models/Superhero'

export default class SuperheroController {
  public async index({ response }: HttpContextContract) {
    const superheroes = await Superhero.all()

    return response.status(200).json(superheroes)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'latitude', 'longitude'])

    const superhero = await Superhero.create(data)

    return response.status(201).json(superhero)
  }

  public async show({ params, response }: HttpContextContract) {
    const superhero = await Superhero.findOrFail(params.id)

    return response.status(200).json(superhero)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['name', 'latitude', 'longitude'])

    const superhero = await Superhero.findOrFail(params.id)

    superhero.name = data.name
    superhero.latitude = data.latitude
    superhero.longitude = data.longitude

    await superhero.save()

    return response.status(200).json(superhero)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const superhero = await Superhero.findOrFail(params.id)

    await superhero.delete()

    return response.status(204)
  }
}

// app/Controllers/Http/IncidentController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Incident from 'App/Models/Incident'

export default class IncidentController {
  public async index({ response }: HttpContextContract) {
    const incidents = await Incident.all()

    return response.status(200).json(incidents)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['title', 'description', 'latitude', 'longitude', 'superhero_id'])

    const incident = await Incident.create(data)

    return response.status(201).json(incident)
  }

  public async show({ params, response }: HttpContextContract) {
    const incident = await Incident.findOrFail(params.id)

    return response.status(200).json(incident)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['title', 'description', 'latitude', 'longitude', 'status', 'superhero_id'])

    const incident = await Incident.findOrFail(params.id)

    incident.title = data.title
    incident.description = data.description
    incident.latitude = data.latitude
    incident.longitude = data.longitude
    incident.status = data.status
    incident.superhero_id = data.superhero_id

    await incident.save()

    return response.status(200).json(incident)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const incident = await Incident.findOrFail(params.id)

    await incident.delete()

    return response.status(204)
  }
}

```

## Étape 7 : Définition des routes

Nous allons maintenant définir nos routes pour les super-héros et les incidents dans le fichier `start/routes.ts` :

```
// start/routes.ts

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('superheroes', 'SuperheroController').apiOnly()
  Route.resource('incidents', 'IncidentController').apiOnly()
}).middleware('api')

```

## Étape 8 : Géolocalisation avec OpenStreetMap

Pour géolocaliser les super-héros et les incidents avec OpenStreetMap, nous devons utiliser une bibliothèque JavaScript appelée Leaflet. Nous pouvons l'installer à l'aide de la commande suivante :

```
npm install leaflet

```

Ensuite, nous devons ajouter la bibliothèque à notre fichier `public/index.html` :

```
<!-- public/index.html -->

<!DOCTYPE html>
<html>
  <head>
    <title>SOS Heroz</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Leaflet CSS -->
    <link
      rel="stylesheet"
      href="<https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css>"
      integrity="sha512-oPc5+GqIzrGjXj+iw8yI3+KxH2aQ4x4A5qXjHk5qJQjQf5n9Kw+U8mKJ1PcYf85vTg3QV6LzJYsZiGwBtG+JBA=="
      crossorigin=""
    />

    <!-- Leaflet JavaScript -->
    <script
      src="<https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.js>"
      integrity="sha512-+Fz/H8q7s4hC7Wv5+5JqOjvP73J8cI+KZ0Bfg8ak9VJbNwGKwU1zQyJx6VTVb2U+V7Df9JrJ8tK9fXe/n7G7Jg=="
      crossorigin=""
    ></script>
  </head>

  <body>
    <div id="map" style="height: 500px;"></div>

    <script>
      const map = L.map('map').setView([0, 0], 1)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)
    </script>
  </body>
</html>

```

Nous pouvons maintenant afficher une carte OpenStreetMap sur notre page d'accueil en visitant `http://localhost:3333`.

 

 
## Étape 11 : Utilisation des événements WebSocket dans les contrôleurs

Nous allons maintenant utiliser nos événements WebSocket dans les contrôleurs pour signaler des incidents en temps réel.

Modifiez le contrôleur `IncidentController` pour envoyer un événement WebSocket lorsqu'un nouvel incident est créé :

```
// app/Controllers/Http/IncidentController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ws from 'App/Services/Ws'
import Incident from 'App/Models/Incident'

export default class IncidentController {
  public async index({ response }: HttpContextContract) {
    const incidents = await Incident.all()

    return response.status(200).json(incidents)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['title', 'description', 'latitude', 'longitude', 'superhero_id'])

    const incident = await Incident.create(data)

    Ws.io.emit('incident:create', incident)

    return response.status(201).json(incident)
  }

  public async show({ params, response }: HttpContextContract) {
    const incident = await Incident.findOrFail(params.id)

    return response.status(200).json(incident)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['title', 'description', 'latitude', 'longitude', 'status', 'superhero_id'])

    const incident = await Incident.findOrFail(params.id)

    incident.title = data.title
    incident.description = data.description
    incident.latitude = data.latitude
    incident.longitude = data.longitude
    incident.status = data.status
    incident.superhero_id = data.superhero_id

    await incident.save()

    return response.status(200).json(incident)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const incident = await Incident.findOrFail(params.id)

    await incident.delete()

    return response.status(204)
  }
}

```

## Étape 12 : Conclusion

Nous avons créé une application SOS Heroz qui permet aux super-héros de s'inscrire et d'être géolocalisés à l'aide d'OpenStreetMap. Les citoyens et les communes peuvent également signaler des incidents nécessitant l'intervention des super-héros en temps réel .

### Remerciement

+ Je tiens à remercier tous les pilots, intervenants qui m'ont inspiré avec leurs idées et le savoir faire.

### Pour faire des remarques ou poser des questions veuillez utiliser cette formulaire : 
des observations , des critiques , des commentaires ou des conseils sont toujours la bienvenue pour m'améliorer.

    
    https://public.zenkit.com/f/hw9-w2Yuo/observation-conseils-des-membre-de-la-jury-cesi?v=oxV0VZiUW  

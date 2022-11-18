# Locate me

Mini-projet réalisé comme test technique pour l'obtention d'un stage dans le développement Web.

Dépendances :
- ***NodeJS***

Le projet est completement compatible linux et windows.

- **Soyez sur que le port 8080 n'est pas déja utilisé sur votre machine**
- **Vous avez besoin de renseigner un token MapBox valide dans le fichier token_mapbox.ts**

## Installer le projet et installer les dépendances :

```bash
git clone https://github.com/GraberThomas/locateMeV2
cd locateMeV2
npm i
```

```bash
npm run install-all-deps
```

## Pour tester la version Build : 

Build le projet :
```bash
npm run build
```

Lancer le serveur :
```bash
npm run server
```

Rendez vous sur **http://localhost:8080/**

## Pour rentrer dans le mode Developpement :

***Sur deux terminaux différent :***

Lancer le serveur :
```bash
npm run server
```

Lancer le serveur vite :
```bash
npm run dev
```

Le terminal du serveur vite donnera le port utilisé. Habituellement **http://localhost:5173**, mais cela peut varier si le port est déja utilisé sur votre machine.



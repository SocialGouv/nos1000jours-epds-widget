# nos1000jours-blues-epds-widget

## Lancer le projet

Cloner le repo, puis :

```bash
yarn
yarn dev
```

## Lancer les test

Cloner le repo, puis :

```bash
yarn test
```

## Comment intégrer le widget

L’équipe de 1000jours Blues vous propose d’intégrer son questionnaire EPDS sur votre site grâce à un module (widget).

Il est important de rensigner les informations suivantes dans l'url :
- source (obligatoire) : qui sera généralement le nom de votre site web. Si la source n'est pas renseigner, le bouton "Commencer le test" ne sera pas actif.

Avec l’iframe, il suffit d’ajouter le code suivant à l’endroit où vous souhaitez voir apparaître le module :
```
<iframe src="https://nos1000jours-blues-epds-widget.fabrique.social.gouv.fr?source=monsiteweb" width="100%" height="430px"></iframe>
```

## Autre

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

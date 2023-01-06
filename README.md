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

## Lib
Utilisation de la lib du DSFR pour l'UI
- https://react-dsfr-components.etalab.studio
- https://react-dsfr.etalab.studio/mui
- Liste de icons : https://remixicon.com/ (si un carré apparaît à la place de l'icon, relancer l'app : `yarn dev`)


## Comment intégrer le widget

L’équipe de 1000jours Blues vous propose d’intégrer son questionnaire EPDS sur votre site grâce à un module (widget).

Il est important de rensigner les informations suivantes dans l'url :
- source (obligatoire) : qui sera généralement le nom de votre site web. Si la source n'est pas renseigner, le bouton "Commencer le test" ne sera pas actif.

Avec l’iframe, il suffit d’ajouter le code suivant à l’endroit où vous souhaitez voir apparaître le module :
```
<iframe src="https://nos1000jours-blues-epds-widget.fabrique.social.gouv.fr?source=monsiteweb" width="100%" height="600px" style="border: none"></iframe>
```

## Affichage de certains labels stockés dans le Back Office
Certain labels ont besoin d'être traduit ou récupéré dans le BO. Dans le code du projet, ces labels sont appellés via des clées. 

Voici la liste :
- `slogan` ou `slogan_monsiteweb`: phrase d'accroche sur le 1er écran 
- `bouton_commencer` : texte du bouton *Commencer* sur le 1er écran 
- `consigne` : explications située au-dessus des questions pour aider à bien compléter le questionnaire

## AB testing

Dans le cas où l'on souhaite avoir l'AB testing sur les intentions, il faut ajoute un `useEffect` dans `MeasuringIntentions.js`
```
  // Utile uniquement lors de l'AB testing
  
  useEffect(() => {
    const id = getInLocalStorage(STORAGE_TEST_ABC) ?? generateRandomTest()
    setTest(id)
    localStorage.setItem(STORAGE_TEST_ABC, id)
    track(CATEG.test, `${ACTION.parcours}${id}`)
  }, [])
```

## Vous êtes arrivés là par hasard (ou presque 😉)
Plus d'explications ici : https://1000jours-blues.fabrique.social.gouv.fr/integration-widget

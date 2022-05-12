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
<iframe src="https://nos1000jours-blues-epds-widget.fabrique.social.gouv.fr?source=monsiteweb" width="100%" height="600px" style="border: none"></iframe>
```

## Utilisation du chat

Pastek utilise Zammad chat : https://admin-docs.zammad.org/en/latest/channels/chat.html

## Affichage de certains labels stockés dans le Back Office
Certain labels ont besoin d'être traduit ou récupéré dans le BO. Dans le code du projet, ces labels sont appellés via des clées. 

Voici la liste :
- `slogan` ou `slogan_monsiteweb`: phrase d'accroche sur le 1er écran 
- `bouton_commencer` : texte du bouton *Commencer* sur le 1er écran 
- `consigne` : explications située au-dessus des questions pour aider à bien compléter le questionnaire

# Documentation des corrections

---

## Problème 1 : Navigation incorrecte

**Nature du problème**  
Certains liens utilisaient la balise `<a href="...">`, ce qui provoquait un rechargement complet de la page au lieu d'utiliser le routeur Angular. Cela dégradait l'expérience utilisateur et faisait perdre l'état de l'application.

**Solution technique**  
Remplacement des attributs `href` par la directive Angular `routerLink` dans les balises `<a>`.  
Exemple :
```html
<a routerLink="/books">Ma Bibliothèque</a>
```

**Concepts Angular utilisés**  
- **RouterLink** : Directive permettant de naviguer entre les routes Angular sans recharger la page.
- **Single Page Application (SPA)** : Utilisation du routeur Angular pour une navigation fluide côté client.

---

## Problème 2 : Besoin de formatage de texte

**Nature du problème**  
Les catégories de livres étaient affichées avec des underscores et sans formatage, rendant l'affichage peu esthétique.

**Solution technique**  
Création d'un pipe personnalisé `FormatPipe` pour :
- Remplacer les underscores par des espaces
- Mettre la première lettre en majuscule et le reste en minuscule

Utilisation du pipe dans les templates avec :  
```html
{{ book.category | format }}
```

**Concepts Angular utilisés**  
- **Pipe personnalisé** : Permet de transformer l'affichage d'une donnée dans le template.
- **Standalone Pipe** : Pipe déclaré avec `standalone: true` pour une utilisation directe dans les imports de composants.

---

## Problème 3 : Structure de page incomplète

**Nature du problème**  
L'application manquait de modularité : des éléments communs comme l'en-tête (header) et le pied de page (footer) étaient dupliqués dans plusieurs fichiers de composants, ce qui compliquait la maintenance et l'évolution du code.

**Solution technique**  
J'ai extrait les parties communes (header et footer) dans des composants Angular réutilisables :  
- Création d'un composant `HeaderComponent` pour l'en-tête de l'application.
- Création d'un composant `FooterComponent` pour le pied de page.
- Remplacement du code dupliqué dans les templates par l'utilisation des sélecteurs `<app-header></app-header>` et `<app-footer></app-footer>`.

Cela permet de centraliser la gestion de ces éléments et de garantir la cohérence de l'interface sur toutes les pages.

**Concepts Angular utilisés**  
- **Composant réutilisable** : Extraction de parties d'interface en composants Angular dédiés.
- **Encapsulation** : Chaque composant gère son propre template, style et logique.
- **Sélecteur de composant** : Utilisation des balises personnalisées pour intégrer les composants dans d'autres templates.

---

## Problème 5 : Route manquante

**Nature du problème**  
La page de détail d'un livre n'était pas accessible car la route correspondante n'existait pas dans la configuration du routeur Angular.

**Solution technique**  
Ajout d'une route dynamique dans le fichier `app.routes.ts` :
```typescript
{ path: 'books/:id', component: BookDetailComponent }
```
Cela permet d'accéder à la page de détail d'un livre via une URL du type `/books/1`.

**Concepts Angular utilisés**  
- **Routing dynamique** : Utilisation de paramètres de route (`:id`) pour accéder à des ressources spécifiques.
- **Composant de détail** : Affichage des informations d'un élément sélectionné via un composant dédié.

---
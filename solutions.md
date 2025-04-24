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

## Problème 6 : Formulaire incomplet

**Nature du problème**  
Le formulaire d'ajout de livre n'était pas implémenté, empêchant les utilisateurs d'ajouter de nouveaux livres à la bibliothèque.

**Solution technique**  
J'ai créé un formulaire réactif dans le composant `AddBookComponent` avec les champs nécessaires (`title`, `author`, `description`, `category`).  
Aucune validation n'a été ajoutée à ce stade (voir problème 7 pour les validations).

Exemple d'implémentation :
```typescript
this.bookForm = this.fb.group({
  title: [''],
  author: [''],
  description: [''],
  category: ['']
});
```

**Concepts Angular utilisés**  
- **Formulaires réactifs** : Utilisation de `FormBuilder` et `FormGroup` pour gérer l'état du formulaire dans le composant.
- **Binding de formulaire** : Liaison du formulaire Angular avec le template via `[formGroup]` et `formControlName`.

---

## Problème 7 : Validations manquantes

**Nature du problème**  
Le formulaire d'ajout de livre acceptait des données incomplètes ou incorrectes, car aucune validation n'était appliquée aux champs.

**Solution technique**  
J'ai ajouté des validateurs Angular (`Validators.required`, `Validators.minLength`) sur chaque champ du formulaire dans `AddBookComponent` :
```typescript
this.bookForm = this.fb.group({
  title: ['', Validators.required],
  author: ['', Validators.required],
  description: ['', [Validators.required, Validators.minLength(10)]],
  category: ['', Validators.required]
});
```
Cela empêche la soumission du formulaire si un champ est vide ou si la description est trop courte.

**Concepts Angular utilisés**  
- **Validators Angular** : Utilisation de `Validators.required` et `Validators.minLength` pour contrôler la validité des champs.
- **Validation de formulaire réactif** : Empêche la soumission tant que le formulaire n'est pas valide.

---

## Problème 8 : Navigation manquante

**Nature du problème**  
Impossible de revenir à la page précédente depuis la page de détail d'un livre, ce qui bloque l'utilisateur sur cette vue.

**Solution technique**  
J'ai implémenté la méthode `goBack()` dans le composant `BookDetailComponent` pour permettre la navigation vers la page précédente.  
La méthode utilise le routeur Angular pour revenir à la route parente :
```typescript
goBack(): void {
  this.router.navigate(['../'], { relativeTo: this.route });
}
```
On peut aussi utiliser `window.history.back()` pour un vrai retour historique si besoin.

**Concepts Angular utilisés**  
- **Router Angular** : Utilisation de la méthode `navigate` avec `relativeTo` pour naviguer dans l'arborescence des routes.
- **Navigation utilisateur** : Amélioration de l'expérience utilisateur en permettant un retour simple.

---

## Problème 9 : Erreur dans la console

**Nature du problème**  
Une erreur "Cannot read properties of undefined" apparaissait dans la console lorsque les données du livre n'étaient pas encore chargées (accès à `book.title` alors que `book` est `undefined`).

**Solution technique**  
J'ai modifié le template du composant de détail (`book-detail.component.html`) pour n'afficher les propriétés du livre que lorsque l'objet `book` est défini, en enveloppant tout le contenu avec `*ngIf="book"` :
```html
<div class="book-detail-container" *ngIf="book">
  <!-- ... -->
</div>
```
Cela évite tout accès à une propriété d'un objet non initialisé.

**Concepts Angular utilisés**  
- **Gestion de l'asynchronisme** : Utilisation de `*ngIf` pour attendre que les données soient chargées avant d'accéder à leurs propriétés.
- **Sécurité d'accès aux propriétés** : Prévention des erreurs d'accès à des objets non initialisés dans le template.

---

## Problème 10 : Directive non appliquée

**Nature du problème**  
Certains éléments importants (comme le titre du livre) n'étaient pas mis en évidence visuellement, car la directive `highlight` n'était pas appliquée.

**Solution technique**  
J'ai appliqué la directive `appHighlight` sur le titre du livre dans le template du composant de détail (`book-detail.component.html`) :
```html
<h1 class="book-title" [appHighlight]="book.isFavorite">{{ book.title }}</h1>
```
Cela permet de mettre en évidence le titre si le livre est favori.

**Concepts Angular utilisés**  
- **Directive personnalisée** : Utilisation d'une directive Angular pour modifier dynamiquement l'apparence d'un élément.
- **Binding d'attribut** : Passage d'une valeur dynamique à la directive via `[appHighlight]`.

---

## Problème 13 : Descriptions trop longues

**Nature du problème**  
Les descriptions des livres prenaient trop de place dans la liste, rendant l'interface encombrée et moins lisible.

**Solution technique**  
J'ai limité l'affichage de la description à 20 caractères dans le template de la liste des livres (`book-list.component.html`) en utilisant le pipe Angular `slice` et en ajoutant des points de suspension si la description est plus longue :
```html
{{ book.description | slice:0:20 }}<span *ngIf="book.description.length > 20">...</span>
```

**Concepts Angular utilisés**  
- **Pipe Angular `slice`** : Permet de tronquer une chaîne de caractères à une longueur donnée dans le template.
- **Affichage conditionnel** : Utilisation de `*ngIf` pour afficher les points de suspension uniquement si la description dépasse 20 caractères.

---

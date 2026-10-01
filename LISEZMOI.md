# Daila Boutique

Site vitrine statique en français, conçu pour GitHub Pages.

## Modifier les textes

Modifiez les textes de la page principale dans `index.html`, ceux des mentions dans `mentions-legales.html`, et le message d’erreur dans `404.html`. Les textes alternatifs des photos se règlent dans `images.js`.

## Ajouter des photos

Déposez les photos nommées `hero.jpg` et/ou `galerie-1.jpg` à `galerie-6.jpg` dans `images/boutique/`. Les emplacements sans fichier gardent leur composition CSS de secours. Privilégiez une largeur de 1600 px et un poids inférieur à 300 Ko, en JPG ou WebP (si vous utilisez WebP, adaptez l’extension dans `images.js`). Pour donner une description à une image, utilisez la forme `{ src: 'images/boutique/hero.jpg', alt: 'Description de la photo' }`. L’ancien format avec une simple chaîne de chemin reste accepté.

## Tester en local

Depuis ce dossier, lancez `python3 -m http.server 8000`, puis ouvrez `http://localhost:8000`.

## Publier sur GitHub Pages

1. Ajoutez les fichiers au dépôt GitHub et envoyez-les sur la branche choisie.
2. Dans le dépôt, ouvrez **Settings → Pages**.
3. Dans **Build and deployment**, choisissez **Deploy from a branch**, puis la branche et le dossier racine (`/`).
4. Enregistrez et attendez la publication indiquée par GitHub Pages. Le fichier `.nojekyll` est déjà à la racine.

## À faire après la publication

Quand l’adresse définitive du site est connue, ajoutez-la comme URL canonique et dans les métadonnées `og:url` de `index.html`. Créez une image de partage Open Graph au format 1200 × 630 px, ajoutez-la au dépôt et renseignez `og:image` avec son adresse publique. Créez ensuite un `sitemap.xml` contenant les URL publiques finales, puis ajoutez sa véritable adresse à `robots.txt` à la place du commentaire indicatif.

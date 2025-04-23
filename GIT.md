# jak commitować?

### 1. aby zamknąć commita przy mergowaniu nazywamy go zaczynając:
```Fixes [numer commita/ numery commitów] ...```
np:
```Fixes #34```
```Fixes #34 #35 #36```

### 2. feat - gdy dodajemy jakąś funkcję:
```feat([nazwa funkcji]): opis```
np:
```feat(logInViaGoogle): logowanie```

### 3. fix - gdy robimy fixa: 
```fix([nazwa funkcji]): opis```
np:
```fix(logInViaGoogle): logowanie```

### 4. chore - gdy dodajemy dependencję, optymalizujemy kod, podnosimy wersję i wszystko inne co wpływa na kod, ale nie zmienia jego zachowania:
```chore([dependencja / konfiguracja / optymalizacja]): opis```
np:
```chore(deps): install node modules```
```chore(structure): reorganize project folder structure```
```chore(deps): update project dependencies```
```chore(cleanup): remove deprecated functions```
```chore(imports): update import paths for components```
```chore(config): update ESLint config to enforce stricter rules```

### 5. doc - dodawanie lub zmiany w dokumentacji:
```doc([nazwa pliku]): opis```
np:
```docs(readme): add usage examples for new API methods```
ps. polecam do dokumentacji dodatek: 'Markdown Preview Enhanced'

## 6. łączenie poleceń
aby połączyć poszczególne polecenia każde musi się znajdować w nowej linii:
```
feat(auth): add OAuth support

Implemented OAuth 2.0 authentication.
Users can now sign in using Google and Facebook.

Fixes #123, #124
```
czyli z konsoli wpisujemy:
```
git commit -m "feat(auth): add OAuth support\n\nImplemented OAuth 2.0 authentication.\nUsers can now sign in using Google and Facebook.\n\nFixes #123"

```
lub
```
git commit -m "feat(auth): add OAuth support" \
           -m "Implemented OAuth 2.0 authentication." \
           -m "Users can now sign in using Google and Facebook." \
           -m "Fixes #123"
```
albo przez:
```git add .``` - dodaje wszystkie pliki do commita
```git commit```
i edytujemy w vimie
wychodzimy przez ```[esp]:wq``` - zapis i wyjście z edycji


feat(generator): new generator
feat(generator.aggregateFiles): using cheerio
chore(cheerio)
feat(generator.minify)
feat(generator.aggregateCss)
feat(generator.putSvgToHtmlFile)
feat(generator.changePathsImagesAtCssClass)
feat(generator.start)
chore(chokidar)
feat(init): using chokidar
feat(configuration): at ./gConfig.js
Fixes #687

git commit Fixes #687
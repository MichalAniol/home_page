# HTML Generator

Generator składa pliki ```.html``` i ```.css``` z folderu ```src``` do ```temp``` łącząc je. Łączenie plików odbywa się za pomocą:
```<file src="path_of_partial.html"></file>```

Pozostałe pliki  z ```src``` są kopiowane do ```temp``` wraz z strukturą. Ścieżki elementów z atrybutami ```src``` i ```href``` w plikach ```.html``` są podmieniane na elementy skopiowane do ```temp```. Nazwy w plikach ```.css``` powinny być unikatowe we wszystkich plikach, ponieważ generator nie sprawdza czy już się pojawiły, tylko je skleja w jeden plik.

w ```gConfig.js``` w root projektu zdefiniowane są foldery wejść i wyjścia, rozszerzenia plików w które są monitorowane zmiany i boolean czy w plikach wyjściowych mają być usuwane spacje i entery.

## przykład:

### stan początkowy:

struktura plików:
```
┗━ src ┓
       ┣━ deep ┓
       ┃       ┣━ veryDeep ┓
       ┃       ┃           ┣━ veryDeep.html
       ┃       ┃           ┣━ veryDeep.css
       ┃       ┃           ┗━ veryDeep.js
       ┃       ┣━ deep.html
       ┃       ┣━ deep.css
       ┃       ┗━ deep.js
       ┣━ index.html
       ┣━ style.css
       ┗━ index.js
```

index.html
```
<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>
        test
        <file src="deep/deep.html"></file>
    </h1>

    <script src="./index.js" type="module" defer></script>
</body>

</html>
```

style.css
```
body {
    color: red;
}
```

deep.html
```
<link rel="stylesheet" href="deep.css">
<div>
    <file src="veryDeep/veryDeep.html"></file>
</div>
```

deep.css
```
div {
    color: blue;
}
```

veryDeep.html
```
<link rel="stylesheet" href="veryDeep.css">
<p>test</p>
```

veryDeep.css
```
p {
    color: black;
}
```
### stan wyjściowy

struktura plików:
```
┗━ temp ┓
        ┣━ deep ┓
        ┃       ┣━ veryDeep ┓
        ┃       ┃           ┗━ veryDeep.js
        ┃       ┗━ deep.js
        ┣━ index.html
        ┣━ style.css
        ┗━ index.js
```
index.html
```
<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>
        test
        <div>
            <p>test</p>
        </div>
    </h1>

    <script src="./index.js" type="module" defer></script>
</body>

</html>
```

style.css
```
body {
    color: red;
}

div {
    color: blue;
}

p {
    color: black;
}
```
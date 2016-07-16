# molsketch-ts
A reimplementation of molsketch-cljs in TypeScript.

# Hacking on molsketch-ts
First install TypeScript, `npm install -g typescript`, then

```bash
tsc -w
python3 -m http.server
```

and go to `localhost:8000`.

To run unit tests
```bash
cd test
tsc -w
python3 -m http.server   # if not already running in parent folder
```

Happy hacking!
# License
MIT
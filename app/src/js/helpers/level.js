export function loadLevel(name) {
    return fetch(`/levels/${name}.json`)
        .then(r => r.json());
};

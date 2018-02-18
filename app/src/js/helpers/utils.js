export function loadImage(url) {
    return new Promise((resolve, reject) => {

        const image = new Image();

        image.addEventListener('load', () => {
            resolve(image);
        }, false)

        image.addEventListener('error', (e) => {
            reject('Image was not loaded!');
        }, false)

        image.src = url;
    })
};

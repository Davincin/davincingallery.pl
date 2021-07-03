'use strict'

let images;
let galleryImg;
let gallerySolo;
let exitButton;
let nextButton;
let previousButton;
let playButton;
let autoPlay;

const prepareGallery = () => {
    let i = 0;
    for (let image of images) {
        image.setAttribute('data-image-index', i);
        i++;
        image.addEventListener('click', () => {
            let imgIndex = parseInt(image.dataset.imageIndex);
            let img = images[imgIndex];
            let imgSrc = `${img.getAttribute('src').slice(0, -10)}.jpg`;
            galleryImg.setAttribute('src', imgSrc);
            galleryImg.setAttribute('data-gallery-solo-index', imgIndex);
            galleryImg.onload = () => {
                openGallery();
            };
        });
    };
};

const openGallery = () => {
    gallerySolo.classList.add('gallery-solo--active');
};

const closeGallery = () => {
    gallerySolo.classList.remove('gallery-solo--active');
    autoPlayGallery();
};

const nextImage = () => {
    let nextImgIndex;
    let imgIndex = parseInt(galleryImg.getAttribute('data-gallery-solo-index'));
    
    if(imgIndex === images.length - 1) {
        nextImgIndex = 0;
    } else {
        nextImgIndex = imgIndex + 1;
    };
    
    let nextImg = images[nextImgIndex];
    let nextSrc = `${nextImg.getAttribute('src').slice(0, -10)}.jpg`;
    
    galleryImg.classList.add('gallery__img--transparent');
    setTimeout(() => {
        galleryImg.setAttribute('src', nextSrc);
        galleryImg.setAttribute('data-gallery-solo-index', nextImgIndex);
    }, 310);
    galleryImg.onload = () => {
        galleryImg.classList.remove('gallery__img--transparent')
    };
};

const previousImage = () => {
    let previousImgIndex;
    let imgIndex = parseInt(galleryImg.getAttribute('data-gallery-solo-index'));
    
    if(imgIndex === 0) {
        previousImgIndex = images.length - 1;
    } else {
        previousImgIndex = imgIndex - 1;
    };
    
    let previousImg = images[previousImgIndex];
    let previousSrc = `${previousImg.getAttribute('src').slice(0, -10)}.jpg`;
    
    galleryImg.classList.add('gallery__img--transparent');
    setTimeout(() => {
        galleryImg.setAttribute('src', previousSrc);
        galleryImg.setAttribute('data-gallery-solo-index', previousImgIndex);

    }, 310);
    galleryImg.onload = () => {
        galleryImg.classList.remove('gallery__img--transparent');
    };
};

const autoPlayGallery = () => {
    if (!playButton.classList.contains('gallery-solo__play-button--active') && gallerySolo.classList.contains('gallery-solo--active')) {
        playButton.classList.add('gallery-solo__play-button--active');
            autoPlay = setInterval(() => {
            nextImage();
        }, 4000);
    } else {
        playButton.classList.remove('gallery-solo__play-button--active');
        window.clearInterval(autoPlay);
    };
};

const prepareDOMElements = () => {
    galleryImg = document.querySelector('.gallery-solo__img');
    images = document.querySelectorAll('.gallery__img');
    gallerySolo = document.querySelector('.gallery-solo');
    exitButton = document.querySelector('.gallery-solo__exit-button');
    nextButton = document.querySelector('.gallery-solo__next-button');
    previousButton = document.querySelector('.gallery-solo__previous-button');
    playButton = document.querySelector('.gallery-solo__play-button');
};

const prepareDOMEvents = () => {
    prepareGallery();
    exitButton.addEventListener('click', closeGallery);
    nextButton.addEventListener('click', nextImage);
    previousButton.addEventListener('click', previousImage);
    playButton.addEventListener('click', autoPlayGallery);
    document.addEventListener('keyup', (e) => {
        if(gallerySolo.classList.contains('gallery-solo--active') && e.key === 'Escape') {
            closeGallery();
        } else if(gallerySolo.classList.contains('gallery-solo--active') && e.key === 'ArrowRight') {
            nextImage();
        } else if(gallerySolo.classList.contains('gallery-solo--active') && e.key === 'ArrowLeft') {
            previousImage();
        };
    });
};

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

document.addEventListener('DOMContentLoaded', main);
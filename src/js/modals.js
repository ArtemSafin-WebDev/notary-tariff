import { lockScroll, unlockScroll } from './scrollBlocker';
import jump from 'jump.js';

export default function() {
    const menuBurger = document.querySelector('.js-burger');
    const menuScrollingContainer = document.querySelector('.main-nav__inner');
    const menuOverlay = document.querySelector('.overlay');
    const anchors = Array.from(document.querySelectorAll('.js-anchor-link'));
    let menuOpen = false;

    function openMenu() {
        document.body.classList.add('menu-open');
        menuOpen = true;
        lockScroll(menuScrollingContainer, window.matchMedia(`(max-width: 768px)`).matches);
    }

    function closeMenu() {
        document.body.classList.remove('menu-open');
        menuOpen = false;
        unlockScroll(menuScrollingContainer);
    }

    function handleMenu() {
        if (!menuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }

    menuBurger.addEventListener('click', event => {
        event.preventDefault();
        handleMenu();
    });

    menuOverlay.addEventListener('click', closeMenu);

    

    const modals = Array.from(document.querySelectorAll('.js-modal'));
    let activeModal = null;

    document.addEventListener('click', event => {
        if (event.target.matches('.js-modal-open') || event.target.closest('.js-modal-open')) {
            event.preventDefault();

            const link = event.target.matches('.js-modal-open') ? event.target : event.target.closest('.js-modal-open');
            if (link.classList.contains('is-disabled')) return;
            const hash = link.hash;

            if (hash) {
                const modal = document.querySelector(hash);
                if (modal) {
                    closeMenu();
                    modal.classList.add('shown');
                    lockScroll(modal.querySelector('.js-modal-scroll-wrapper'), window.matchMedia(`(max-width: 768px)`).matches);
                    activeModal = modal;
                }
            }
        }
    });

    document.addEventListener('click', event => {
        if (event.target.matches('.js-modal-close') || event.target.closest('.js-modal-close')) {
            event.preventDefault();
            const closeBtn = event.target.matches('.js-modal-close') ? event.target : event.target.closest('.js-modal-close');
            const modal = closeBtn.closest('.js-modal');
            if (modal) {
                modal.classList.remove('shown');

                unlockScroll(modal.querySelector('.js-modal-scroll-wrapper'));
                activeModal = null;
            }
        }
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (this === event.target) {
                modal.classList.remove('shown');
                unlockScroll(modal.querySelector('.js-modal-scroll-wrapper'));
                activeModal = null;
            }
        });
    });

    document.addEventListener('keyup', function(event) {
        if (event.key === 'Escape' && activeModal) {
            activeModal.classList.remove('shown');
            unlockScroll(activeModal.querySelector('.js-modal-scroll-wrapper'));
            activeModal = null;
        }
    });



    anchors.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            closeMenu();
            if (activeModal) {
                activeModal.classList.remove('shown');
                unlockScroll(activeModal.querySelector('.js-modal-scroll-wrapper'));
                activeModal = null;
            }
            const hash = link.hash;
            const element = document.querySelector(hash);
            if (element) {
                jump(element);
            }
        });
    });
}

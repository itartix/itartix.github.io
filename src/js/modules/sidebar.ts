import {enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';
import {Detector} from '../helper/detector';

export class Sidebar {
    private readonly buttonList: HTMLElement[] ;
    private readonly buttonSelector: string  = '.js-sidebar-button';
    private readonly buttonOpenClass: string = 'sidebar-button--open';

    private readonly sidebar: HTMLElement | null;
    private readonly sidebarSelector: string = '.js-sidebar';
    private readonly sidebarOpenClass: string = 'sidebar--open';

    private isOpen: boolean = false;

    constructor() {
        this.buttonList = Array.from(document.querySelectorAll<HTMLElement>(this.buttonSelector));
        this.sidebar = document.querySelector<HTMLElement>(this.sidebarSelector);

        if (!this.buttonList.length || !this.sidebar) {
            return;
        }

        this.init();
    }

    /**
     * Инициализация
     */
    private init(): void {
        this.buttonList.forEach((button) => button.addEventListener('click', this.buttonClickHandler));

        window.addEventListener('resize', this.windowResizeHandler);
        window.addEventListener('click', this.windowClickHandler);
    }

    /**
     * Обработчик клика по кнопке открытия/закрытия
     * Стрелочная функция позволяет избежать использования bind
     * @param event
     */
    private buttonClickHandler = (event: Event): void => {
        event.preventDefault();

        this.toggle(!this.isOpen);
    }

    /**
     * Следим за ресайзом окна, чтобы закрыть боковое меню на десктопе (убираем блокировку скролла)
     */
    private windowResizeHandler = (): void => {
        if (this.isOpen && !Detector.isLayoutMobile) {
            this.toggle(false);
        }
    }

    /**
     * Закрываем меню по клику мимо на планшетах
     */
    private windowClickHandler = (event: Event): void => {
        if (!this.isOpen) return;

        if (this.sidebar?.contains(event.target as HTMLElement)) return;
        if (this.buttonList.some((button) => button.contains(event.target as HTMLElement))) return;

        this.toggle(false);
    }

    /**
     * Открыть / закрыть боковое меню
     * Навешивает нужные классы + блокирует / разблокирует скролл
     * @param state
     * @private
     */
    private toggle(state: boolean): void {
        this.isOpen = state;

        this.sidebar?.classList.toggle(this.sidebarOpenClass, state);
        this.buttonList.forEach((button) => {
            button.classList.toggle(this.buttonOpenClass, state);
            button.setAttribute('aria-expanded', String(state));
        });

        if (state) {
            disableBodyScroll(this.sidebar, {
                allowTouchMove: (el: HTMLElement | Element) => !!this.sidebar?.contains(el), // fix на некоторых мобилках с ios отваливается скролл у дочерних элементов
            });
        } else {
            enableBodyScroll(this.sidebar);
        }
    }

    /**
     * Удаление обработчиков
     */
    public destroy(): void {
        this.buttonList.forEach((button) => button.removeEventListener('click', this.buttonClickHandler));

        window.removeEventListener('resize', this.windowResizeHandler);
        window.removeEventListener('click', this.windowClickHandler);

        clearAllBodyScrollLocks();
    }
}
interface ICardList {
    el: HTMLElement;
}

export class CardList {
    private readonly el: HTMLElement;

    private readonly cardList: HTMLElement[];
    private readonly cardSelector: string  = '.card-list__card';
    private readonly hiddenCardClass: string  = 'card-list__card--hidden';

    private readonly resizeObserver: ResizeObserver;

    constructor({ el }: ICardList) {
        this.el = el;
        this.cardList = Array.from(this.el?.querySelectorAll<HTMLElement>(this.cardSelector));

        this.resizeObserver = new ResizeObserver(this.hideIncompleteLastRow.bind(this));

        if (!el) return;

        this.init();
    }

    /**
     * Инициализация
     */
    private init(): void {
        this.hideIncompleteLastRow();

        this.resizeObserver.observe(this.el);
    }

    /**
     * Скрываем незаполненную последнюю строку
     * @private
     */
    private hideIncompleteLastRow (): void  {
        this.cardList.forEach(card => card.classList.remove(this.hiddenCardClass));

        const firstCardTop = this.cardList[0]?.getBoundingClientRect().top ?? 0;
        const columnsCount = this.cardList.filter((card: HTMLElement) => card.getBoundingClientRect().top === firstCardTop).length;

        if (columnsCount <= 1) return;

        const remainder = this.cardList.length % columnsCount;

        if (remainder !== 0) {
            const cardsToHide = this.cardList.slice(-remainder);
            cardsToHide.forEach((card: HTMLElement) => card.classList.add(this.hiddenCardClass));
        }
    }


    /**
     * Удаление обработчиков
     */
    public destroy(): void {
        this.resizeObserver?.unobserve(this.el);
    }
}
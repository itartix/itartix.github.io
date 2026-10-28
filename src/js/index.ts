import 'virtual:svg-icons-register';
import '../css/style.less';

import { Sidebar } from './modules/sidebar.ts';
import { CardList} from './modules/card-list.ts';

document.addEventListener('DOMContentLoaded', () => {
    new Sidebar()

    document.querySelectorAll<HTMLElement>('.js-card-list').forEach((cardList: HTMLElement) => new CardList({ el: cardList }));
});
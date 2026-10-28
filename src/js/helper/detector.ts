import { BREAKPOINTS } from './const';

export const Detector = {
    get isXs(): boolean {
        return this.windowWidth < BREAKPOINTS.xs;
    },

    get isSm(): boolean {
        return this.windowWidth < BREAKPOINTS.sm;
    },

    get isMd(): boolean {
        return this.windowWidth < BREAKPOINTS.md;
    },

    get isLg(): boolean {
        return this.windowWidth < BREAKPOINTS.lg;
    },

    get isXl(): boolean {
        return this.windowWidth < BREAKPOINTS.xl;
    },

    get isLayoutMobile(): boolean {
        return this.isMd;
    },

    get windowHeight(): number {
        return window.innerHeight;
    },

    get windowWidth(): number {
        return window.innerWidth;
    },
};

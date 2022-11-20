import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import * as ScrollMagic from 'scrollmagic';
import { Controller, Scene } from 'scrollmagic';
import { ScrollMagicPluginIndicator } from 'scrollmagic-plugins';

ScrollMagicPluginIndicator(ScrollMagic);

@Component({
    selector: 'app-root',
    templateUrl: './SceneComponent.html',
    styleUrls: ['./SceneComponent.scss'],
    host: {
        class: 'scene block h-auto w-auto overflow-hidden'
    },
    encapsulation: ViewEncapsulation.None
})
export class SceneComponent implements AfterViewInit {
    @ViewChildren('blockElement')
    readonly blockElements: QueryList<ElementRef>;

    @ViewChildren('blockImageWrapperElement')
    readonly blockImageWrapperElements: QueryList<ElementRef>;

    @ViewChildren('blockContentElement')
    readonly blockContentElements: QueryList<ElementRef>;

    private controller?: Controller;

    constructor() {
    }

    ngAfterViewInit() {
        this.initControllerAndScenes();
    }

    private initControllerAndScenes(): void {
        this.controller = new Controller();

        this.blockImageWrapperElements.forEach((contentElementRef: ElementRef<HTMLElement>) => {
            new Scene({
                triggerElement: contentElementRef.nativeElement,
                triggerHook: 0.8,
                offset: 100,
                reverse: false
            })
                .setClassToggle(contentElementRef.nativeElement, 'block__image-wrapper--visible')
                .addTo(this.controller);
        });

        this.blockContentElements.forEach((contentElementRef: ElementRef<HTMLElement>) => {
            new Scene({
                triggerElement: contentElementRef.nativeElement,
                triggerHook: 0.8,
                offset: 100,
                reverse: false
            })
                .setClassToggle(contentElementRef.nativeElement, 'block__content--visible')
                .addTo(this.controller);
        });
    }
}

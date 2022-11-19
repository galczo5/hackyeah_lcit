import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: { class: 'relative' },
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hackyeah_lcit';

  @ViewChild('fruits', { read: ElementRef, static: true })
  fruits: ElementRef | undefined;

  @ViewChild('trash', { read: ElementRef, static: true })
  trash: ElementRef | undefined;

  bioActualTopPosition: number = 0;
  recalculatingBIOActualTopPosition: boolean = true;

  constructor(private readonly renderer2: Renderer2,
              private readonly elementRef: ElementRef) {
  }

  ngOnInit() {
    fromEvent(window, 'scroll')
      .subscribe(() => {
        const portViewHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        if (this.recalculatingBIOActualTopPosition) {
          this.bioActualTopPosition = scrollTop % portViewHeight;
          this.renderer2.setStyle(this.fruits?.nativeElement, 'top', this.bioActualTopPosition + 'px');
        }

        const pxLeftToTheEndOfThePageForTrash = window.document.body.offsetHeight - window.scrollY - portViewHeight;
        if (pxLeftToTheEndOfThePageForTrash <= 600) {
          this.renderer2.setStyle(this.trash?.nativeElement, 'bottom', (600 - pxLeftToTheEndOfThePageForTrash) + 'px');
        } else {
          this.renderer2.setStyle(this.trash?.nativeElement, 'bottom', 0);
        }

        console.log(this.bioActualTopPosition);
        const pxLeftToTheEndOfThePageForBIO = window.document.body.offsetHeight - (window.scrollY + this.bioActualTopPosition);
        const heightOfTheBIOContainer = 200;
        if ((pxLeftToTheEndOfThePageForBIO - heightOfTheBIOContainer) < 600) {
          this.renderer2.setStyle(this.fruits?.nativeElement, 'display', 'none');
          this.recalculatingBIOActualTopPosition = false
        } else {
          this.renderer2.removeStyle(this.fruits?.nativeElement, 'display');
          this.recalculatingBIOActualTopPosition = true;
        }

      });
  }
}

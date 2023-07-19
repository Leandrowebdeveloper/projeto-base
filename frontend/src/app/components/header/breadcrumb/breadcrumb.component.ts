import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { BreadcrumbService } from './service/breadcrumb.service';
import { Breadcrumb } from './breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  public breadcrumbs$: Observable<Breadcrumb[]>;
  public hasIos!: boolean;
  @ViewChild('breadcrumb', { static: true }) breadcrumb!: any;

  private $breadcrumb!: Subscription;
  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private plt: Platform
  ) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
    this.isPlatformIos();
  }

  ngOnDestroy(): void {
    this.$breadcrumb.unsubscribe();
  }

  ngOnInit(): void {
    this.update();
  }

  private isPlatformIos(): boolean {
    return (this.hasIos = this.plt.is('ios'));
  }

  private update() {
    this.$breadcrumb = this.breadcrumbService.getEvent().subscribe({
      next: (url: string | void) => {
        if (url) {
          this.breadcrumbService.update(url);
        }
      },
    });
  }
}

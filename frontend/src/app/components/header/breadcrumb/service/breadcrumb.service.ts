import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../breadcrumb';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService implements OnDestroy {
  private breadcrumbEvent = new EventEmitter<string | void>(undefined);
  private breadcrumb = new BehaviorSubject<Breadcrumb[]>([]);
  private readonly breadcrumb$ = this.breadcrumb.asObservable();
  private $router!: Subscription;

  constructor(private router: Router) {
    this.init();
  }

  public get breadcrumbs$(): Observable<Breadcrumb[]> {
    return this.breadcrumb$;
  }

  ngOnDestroy(): void {
    this.$router.unsubscribe();
  }

  public getEvent(): Observable<string | void> {
    return this.breadcrumbEvent.asObservable();
  }

  public setEvent(value: string): void {
    this.breadcrumbEvent.emit(value);
  }

  public update(url: string): void {
    return this.createBreadcrumbs(url);
  }

  private convertUrlToArray(url: string): string[] {
    const size = this.urlSize(url);
    const result = url.split(/[\/]/g).splice(1, size);
    return result;
  }

  private urlSize(url: string): number {
    return url.length - 1;
  }

  private breadcrumbs(value: Breadcrumb[]): void {
    this.breadcrumb.next(value);
  }

  private convertUrlSlugToPhrase(url: string): void | (string | void)[] {
    const result = this.convertUrlToArray(url).map((item: string) =>
      item.replace(/[-]/g, ' ')
    );
    if (result) return this.convertSlugEndTitle(result);
  }

  private init(): void {
    this.$router = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe({
        next: (activeRoute: NavigationEnd) => this.start(activeRoute),
      });
  }

  private start(activeRoute: NavigationEnd): void {
    if (activeRoute instanceof NavigationEnd) {
      this.createBreadcrumbs(activeRoute.url);
    }
  }

  private convertSlugEndTitle(slug: string[]): (string | void)[] | void {
    const result: (string | void)[] = slug
      .map(this.filterSlug())
      .filter((item) => item !== undefined);
    if (result) return this.title(result);
  }

  private title(result: (string | void)[]): (string | void)[] {
    if (result && result.length > 0 && result.includes('')) {
      result.pop();
    }
    return result;
  }

  private filterSlug(): (
    value: string,
    index: number,
    array: string[]
  ) => string | void {
    return (item, i): string | void => {
      if (item && i && i > -1) {
        if (/[0-9]/g.test(item)) {
          const rejected = item.split(' ').pop();
          if (rejected) item = item.replace(rejected, '').trim();
        }
      }
      return item;
    };
  }

  private createBreadcrumbs(url: string): void {
    const breadcrumb: Breadcrumb[] = [];
    this.convertUrlSlugToPhrase(url)?.forEach((item, i, array) => {
      if (item)
        breadcrumb.push({
          label: this.filterLabel(item),
          link: this.buildLink(url, i, array),
        });
    });

    breadcrumb.splice(3, 1);
    this.breadcrumbs(breadcrumb);
  }

  private filterLabel(label: string): string {
    switch (label) {
      case 'usuario':
        return 'usuário';
      case 'usuarios':
        return 'usuários';
      case 'anuncio':
        return 'anúncio';
      case 'inicio':
        return 'Início';
      case 'erro':
        return 'Erro';
      default:
        return decodeURI(label);
    }
  }

  private buildLink(
    url: string,
    index: number,
    array: (string | void)[]
  ): string {
    let result: string;
    const URL = url.split('/');
    if (URL.includes('')) {
      URL.shift();
    }

    if (array) {
      if (array.length === 1) {
        return `/${URL[0]}`;
      } else if (array.length > 1 && array.length <= 2) {
        return `/${URL[0]}/${URL[1]}`;
      }
    }

    switch (index) {
      case 1:
        result = `/${URL[0]}/${URL[1]}`;
        break;
      case 2:
        result = `/${URL[0]}/${URL[1]}/${URL[2]}`;
        break;
      default:
        result = `/${this.convertUrlToArray(url)[index]}`;
    }
    return result;
  }
}

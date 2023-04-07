import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiCallService, Article } from '../providers/api-call.service';
import { CommonModule } from '@angular/common';
import { DetailPagePage } from '../detail-page/detail-page.page';
import { BehaviorSubject, catchError, of, take, tap, throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,],
})
export class Tab1Page implements OnInit {

  showSkeleton: boolean = true
  articles$ = new BehaviorSubject<Article[]>([]);
  page: number = 1
  pageSize: number = 10
  noMoreNews: boolean = false;
  constructor(private api: ApiCallService, private modalCtrl: ModalController, private toastController: ToastController) { }

  ngOnInit(): void {
    this.api.getData(this.pageSize, this.page).pipe(
      take(1),
      tap((response: Article[]) => {
        this.noMoreNews = response.length == 0 ? true : false
        this.articles$.next(response);
        this.showSkeleton = false;
      }),
      catchError(async (error) => {
        console.error('An error occurred:', error);
        this.showSkeleton = false;
        this.showToast('Something went wrong. Please try again later.');
        return throwError('Something went wrong. Please try again later.');
      })
    ).subscribe();
  }

  async openmodel(article: Article) {
    const modal = await this.modalCtrl.create({
      component: DetailPagePage,
      componentProps: {
        Data: article,
      },
    });
    modal.present();
  }

  onIonInfinite(infiniteScroll: any) {
    this.Loadmore();
    infiniteScroll.target.complete();
  }

  Loadmore() {
    this.page++;
    this.api.getData(this.pageSize, this.page)
      .pipe(
        take(1),
        tap((response: Article[]) => {
          this.noMoreNews = response.length == 0 ? true : false;
          const currentArticles = this.articles$.getValue();
          this.articles$.next([...currentArticles, ...response]);
        }),
        catchError((error) => {
          this.showToast('Error loading more news. Please try again.');
          return of(error);
        })
      )
      .subscribe();
  }

  handleRefresh(event: any) {
    this.page++;
    this.api.getData(this.pageSize, this.page)
      .pipe(
        take(1),
        tap((response: Article[]) => {
          this.noMoreNews = response.length == 0 ? true : false;
          this.articles$.next(response);
          event.target.complete();
        }),
        catchError((error) => {
          this.showToast('Error refreshing news. Please try again.');
          event.target.complete();
          return of(error);
        })
      )
      .subscribe();
  }

  async showToast(message: string) {
    const toast = this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });
    (await toast).present();
  }

}

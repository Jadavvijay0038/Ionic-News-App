import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiCallService, Article } from '../providers/api-call.service';
import { CommonModule } from '@angular/common';
import { DetailPagePage } from '../detail-page/detail-page.page';
import { BehaviorSubject, take, tap } from 'rxjs';


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
  constructor(private api: ApiCallService, private modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.api.getData(this.pageSize, this.page).pipe(take(1), tap((response: Article[]) => {
      this.articles$.next(response);
      this.showSkeleton = false;
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
    this.api.getData(this.pageSize, this.page).pipe(take(1), tap((response: Article[]) => {
      const currentArticles = this.articles$.getValue();
      this.articles$.next([...currentArticles, ...response]);
    })
    ).subscribe();
  }

  handleRefresh(event: any) {
    this.page++;
    this.api.getData(this.pageSize, this.page).pipe(take(1), tap((response: Article[]) => {
      this.articles$.next(response);
      event.target.complete();
    })
    ).subscribe();
  }
}

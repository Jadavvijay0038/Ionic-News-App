import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule, ModalController } from '@ionic/angular';
import { ApiCallService, Article } from '../providers/api-call.service';
import { CommonModule } from '@angular/common';
import { DetailPagePage } from '../detail-page/detail-page.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab1Page implements OnInit {

  showskelton: boolean = true
  Articals: Article[] = [];
  page: number = 1
  pageSize: number = 10
  constructor(private api: ApiCallService, private modalCtrl: ModalController) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.api.getdata(this.pageSize, this.page).subscribe((Response: any) => {
        this.Articals = Response
        this.showskelton = false
      })
    }, 2000);
  }

  async openmodel(_t79: Article) {
    const modal = await this.modalCtrl.create({
      component: DetailPagePage,
      componentProps: {
        Data: _t79
      }
    });

    modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log(_t79);
  }

  onIonInfinite(infiniteScroll: any) {
    setTimeout(() => {
      this.Loadmore();
      (infiniteScroll as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }


  Loadmore() {
    this.page++
    this.api.getdata(this.pageSize, this.page).subscribe((Response: Article[]) => {
      console.log(Response)
      this.Articals.push(...Response)
    })
  }

  handleRefresh(event: any) {
    this.page++
    setTimeout(() => {
      this.api.getdata(this.pageSize, this.page).subscribe((Response: Article[]) => {
        console.log(Response)
        this.Articals = Response
      })
      event.target.complete();
    }, 2000);
  };
}

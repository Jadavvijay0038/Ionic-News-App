import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
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
    this.api.getdata(this.pageSize, this.page).subscribe((Response: any) => {
      this.Articals = Response
      this.showskelton = false
    })
  }

  async openmodel(_t79: Article) {
    const modal = await this.modalCtrl.create({
      component: DetailPagePage,
      componentProps:{
        Data:_t79
      }
    });
    
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log(_t79);
  }

  onIonInfinite(event:any) {
    console.log("Infinity")
  }

}

import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Article } from '../providers/api-call.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DetailPagePage {
  public Data!: Article;
  constructor(private readonly modalCtrl: ModalController) { }

  public cancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  public NewsUrl(): void {
    window.open(this.Data.url, '_system', 'location=yes');
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Article } from '../providers/api-call.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailPagePage implements OnInit {
  Data: any
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.Data)
  }

  NewsUrl() {
    window.open(this.Data.url, '_system', 'location=yes');
  }
}

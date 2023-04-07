import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ApiCallService, Article } from '../providers/api-call.service';
import { BehaviorSubject, catchError, debounceTime, finalize, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DetailPagePage } from '../detail-page/detail-page.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FormsModule]
})
export class Tab2Page implements OnInit {
  SearchText = new FormControl('');
  articles$ = new BehaviorSubject<Article[]>([]);
  showoptions = false;
  isLoading = false;
  constructor(private api: ApiCallService, private modalCtrl: ModalController, private toastController: ToastController) { }

  ngOnInit(): void {
    this.SearchText.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => this.isLoading = true),
        tap((rep) => {
          this.api.searchNews(rep)
            .pipe(
              take(1),
              tap((response: Article[]) => {
                this.articles$.next(response);
              }),
              catchError((error) => {
                console.log('Error searching news:', error);
                this.showToast('Error searching news..');
                return [];
              }),
              finalize(() => this.isLoading = false)
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  async openmodel(article: Article) {
    try {
      const modal = await this.modalCtrl.create({
        component: DetailPagePage,
        componentProps: {
          Data: article,
        },
      });
      await modal.present();
    } catch (error) {
      console.log('Error opening modal:', error);
    }
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

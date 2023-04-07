import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiCallService, Article } from '../providers/api-call.service';
import { BehaviorSubject, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DetailPagePage } from '../detail-page/detail-page.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule,FormsModule]
})
export class Tab2Page implements OnInit {
  presentPopover($event: MouseEvent) {
    throw new Error('Method not implemented.');
  }

  SearchText!: FormControl
  articles$ = new BehaviorSubject<Article[]>([]);
  showoptions:boolean = false;
  constructor(private api: ApiCallService, private modalCtrl: ModalController) {
    this.SearchText = new FormControl('', Validators.required)
  }

  ngOnInit(): void {
    this.SearchText.valueChanges.subscribe(rep => {
      this.api.searchNews(rep).pipe(take(1), tap((response: Article[]) => {
        this.articles$.next(response);
      })
      ).subscribe();
    })
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
}

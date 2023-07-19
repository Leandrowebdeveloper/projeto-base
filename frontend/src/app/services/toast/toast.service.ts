import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  async show(
    message: string,
    position: 'bottom' | 'middle' | 'top',
    icon: 'thumbs-up' | 'thumbs-down' | 'warning',
    duration: 1000 | 1500 | 2000 | 2500 | 3000,
    color = 'light'
  ): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      message,
      icon,
      duration,
      position,
      color,
      buttons: [
        {
          side: 'end',
          icon: 'add-circle-outline',
          handler: () => this.toastController.dismiss(),
        },
      ],
    });
    toast.present();
    return toast;
  }

  public async loading(
    message: string,
    position: 'bottom' | 'middle' | 'top',
    icon?: string
  ): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      message,
      position,
      color: 'light',
      icon,
    });
    toast.present();
    return toast;
  }
}

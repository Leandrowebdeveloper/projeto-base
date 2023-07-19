import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
/**
 * @class AlertService
 */
export class AlertService {
  constructor(public alertController: AlertController) {}

  public async alert(header: string, message: string): Promise<HTMLIonAlertElement>{
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
    return alert;
  }
}

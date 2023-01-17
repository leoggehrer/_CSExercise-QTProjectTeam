import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  DialogCloseResult,
  DialogService,
  DialogSettings,
} from '@progress/kendo-angular-dialog';
import {
  Animation,
  NotificationService,
  NotificationSettings,
  Position,
} from '@progress/kendo-angular-notification';

export enum DefaultToastMessageTypes {
  SaveSuccess,
  SaveError,
  UpdateSuccess,
  UpdateError,
  DeleteSuccess,
  DeleteError,
}

export enum DefaultDialogTypes {
  Info,
  Error,
  Success,
  Warning,
}

export class InfoDialogOptions {
  type: DefaultDialogTypes;
  title: string;
  text?: string;
  useTranslation: boolean;
  titleParams?: any;
  textParams?: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserNotificationService {
  private toastPosition = {
    horizontal: 'right',
    vertical: 'top',
  } as Position;

  private toastAnimation = {
    type: 'fade',
    duration: 500,
  } as Animation;

  constructor(
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private dialogService: DialogService
  ) {}

  public showDefaultToast(toastMessageType: DefaultToastMessageTypes) {
    var contentTranslationKey = '';

    switch (toastMessageType) {
      case DefaultToastMessageTypes.SaveError:
        contentTranslationKey = 'Toasts.SaveError';
        break;
      case DefaultToastMessageTypes.SaveSuccess:
        contentTranslationKey = 'Toasts.SaveError';
        break;
      case DefaultToastMessageTypes.UpdateError:
        contentTranslationKey = 'Toasts.UpdateError';
        break;
      case DefaultToastMessageTypes.UpdateSuccess:
        contentTranslationKey = 'Toasts.UpdateSuccess';
        break;
      case DefaultToastMessageTypes.DeleteError:
        contentTranslationKey = 'Toasts.DeleteError';
        break;
      case DefaultToastMessageTypes.DeleteSuccess:
        contentTranslationKey = 'Toasts.DeleteSuccess';
        break;
    }

    var style = 'success';

    if (
      toastMessageType === DefaultToastMessageTypes.UpdateError ||
      toastMessageType === DefaultToastMessageTypes.SaveError ||
      toastMessageType === DefaultToastMessageTypes.DeleteError
    ) {
      style = 'error';
    }

    this.showTranslatedToast(contentTranslationKey, style);
  }

  public showTranslatedToast(
    contentTranslationKey: string,
    style?: string,
    params?: any
  ) {
    const content = this.translateService.instant(
      contentTranslationKey,
      params
    );
    this.showToast(content, style);
  }

  public showToast(content: string, style?: string) {
    var options = this.getDefaultToast(style);
    options.content = content;
    this.notificationService.show(options);
  }

  public showTranslatedConfirmDialog(
    contentTranslationKey: string,
    titleTranslationKey?: string,
    contentParams?: any
  ): Promise<boolean> {
    const c = this.translateService.instant(
      contentTranslationKey,
      contentParams
    );
    const t = titleTranslationKey
      ? this.translateService.instant(titleTranslationKey)
      : null;

    return this.showConfirmDialog(c, t);
  }

  public showConfirmDialog(content?: string, title?: string): Promise<boolean> {
    var prom = new Promise<boolean>((resolve, reject) => {
      const options = this.getDefaultConfirmDialog(content, title);
      const dialog = this.dialogService.open(options);

      dialog.result.subscribe((res) => {
        if (
          res instanceof DialogCloseResult ||
          (res as any)['action'] === 'no'
        ) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });

    return prom;
  }

  public showInformationDialog(dialogOptions: InfoDialogOptions) {
    var prom = new Promise<boolean>((resolve, reject) => {
      const content = dialogOptions.useTranslation
        ? this.translateService.instant(
            dialogOptions.text,
            dialogOptions.textParams
          )
        : dialogOptions.text;

      const title = dialogOptions.useTranslation
        ? this.translateService.instant(
            dialogOptions.title,
            dialogOptions.titleParams
          )
        : dialogOptions.title;

      const options = this.getDefaultInformationDialog(
        dialogOptions.type,
        content,
        title
      );
      const dialog = this.dialogService.open(options);

      dialog.result.subscribe((res) => {
        if (
          res instanceof DialogCloseResult ||
          (res as any)['action'] === 'no'
        ) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });

    return prom;
  }

  private getDefaultToast(style: string = 'info') {
    return {
      position: this.toastPosition,
      animation: this.toastAnimation,
      type: { style: style, icon: true },
      hideAfter: 2000,
    } as NotificationSettings;
  }

  private getDefaultConfirmDialog(content?: string, title?: string) {
    const t = title ?? this.translateService.instant('Common.Confirm.Title');
    const c =
      content ?? this.translateService.instant('Common.Confirm.Content');
    const yes = this.translateService.instant('Common.Yes');
    const no = this.translateService.instant('Common.No');

    return {
      title: t,
      content: c,
      actions: [
        { text: no, action: 'no' },
        { text: yes, action: 'yes', themeColor: 'primary' },
      ],
      width: 300,
      height: 200,
    } as DialogSettings;
  }

  private getDefaultInformationDialog(
    dialogType: DefaultDialogTypes,
    content?: string,
    title?: string
  ) {
    const t = title ?? this.translateService.instant('Common.Confirm.Title');
    const c =
      content ?? this.translateService.instant('Common.Confirm.Content');
    const ok = this.translateService.instant('Common.Ok');

    var cssClass = 'dialog-info';

    if (dialogType === DefaultDialogTypes.Success) {
      cssClass = 'dialog-success';
    } else if (dialogType === DefaultDialogTypes.Warning) {
      cssClass = 'dialog-warning';
    } else if (dialogType === DefaultDialogTypes.Error) {
      cssClass = 'dialog-error';
    }

    return {
      title: t,
      content: c,
      cssClass: cssClass,
      actions: [{ text: ok, action: 'yes', themeColor: 'primary' }],
      width: 300,
      height: 200,
    } as DialogSettings;
  }
}

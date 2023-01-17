import '@progress/kendo-angular-intl/locales/bg/all';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputsModule } from '@progress/kendo-angular-inputs';
import {
  FloatingLabelModule,
  LabelModule,
} from '@progress/kendo-angular-label';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { TranslateModule } from '@ngx-translate/core';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PopupModule } from '@progress/kendo-angular-popup';
//IMPORTANT: add imports to exports too, so we do not need to inject those modules in every child module which the appshared is using already
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    InputsModule,
    FloatingLabelModule,
    ReactiveFormsModule,
    ButtonsModule,
    LabelModule,
    LayoutModule,
    IndicatorsModule,
    NavigationModule,
    PopupModule,
  ],
  exports: [
    // export the imports from above
    TranslateModule,
    CommonModule,
    InputsModule,
    FloatingLabelModule,
    ReactiveFormsModule,
    ButtonsModule,
    LayoutModule,
    LabelModule,
    IndicatorsModule,
    NavigationModule,
    PopupModule,
  ],
})
export class AppSharedModule {}

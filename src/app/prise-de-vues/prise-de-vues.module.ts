import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera/camera.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PrisesDeVuesRoutingModule } from './prise-de-vues-routing.module';



@NgModule({
  declarations: [CameraComponent, ConditionsComponent, InstructionsComponent],
  imports: [
    CommonModule,
    WebcamModule, HttpClientModule, FormsModule,
    PrisesDeVuesRoutingModule
  ]
})
export class PriseDeVuesModule { }

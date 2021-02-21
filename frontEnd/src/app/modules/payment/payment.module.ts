import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentService } from './services/payment.service';
import { PaymentCreateComponent } from './pages/payment-create/payment-create.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentProcessingComponent } from './pages/payment-processing/payment-processing.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PaymentCreateComponent,
    PaymentProcessingComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    PaymentService
  ]
})
export class PaymentModule { }

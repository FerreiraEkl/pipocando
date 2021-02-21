import { PaymentProcessingComponent } from './pages/payment-processing/payment-processing.component';
import { PaymentCreateComponent } from './pages/payment-create/payment-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const paymentRoutes: Routes = [
  {
    path: '',children: [
      { path:'',component:PaymentCreateComponent},
      { path:'processing',component:PaymentProcessingComponent},
      { path:'check', component:PaymentProcessingComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(paymentRoutes)],
  exports: [RouterModule]
})

export class PaymentRoutingModule { }

import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.css']
})
export class PaymentProcessingComponent implements OnInit {

  constructor(private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.paymentService.checkPayment().then(result=>{
      console.log(result);
    })
  }
}

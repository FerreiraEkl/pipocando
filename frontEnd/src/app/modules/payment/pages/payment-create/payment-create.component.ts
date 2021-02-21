import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {

  }
  takePayment() {
    this.paymentService.makePayment({ plan: 1 }).then(result => {
      if (result.success) {
        window.location = (result.message);
      }
      else {
        M.toast({ html: result.message });
      }
    })
  }
}

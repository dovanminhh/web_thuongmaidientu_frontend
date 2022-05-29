import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  id!: number;
  order = new Order();
  customeres!: Customer[] | []; 
  orders ?: Array<any>;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.orderService.getOrderById(this.id).subscribe(data =>{
      this.order = data;
    })

    this.getOrderByCustomer(this.id);  
  }

  onSubmit(){
   
  }

  getOrderByCustomer(id: number){
    this.orderService.getOrderByCustomerId(id).subscribe(
      (response : Order[]) => {
        this.orders = response;
      }
      
    )
    
  }


}

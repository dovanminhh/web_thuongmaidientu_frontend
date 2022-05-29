import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getListOrder();
  }

  getListOrder(){
    this.orderService.getOrderList().subscribe(
      (response : Order[]) => {
        this.orders = response;
      }
    )
  }

  detailOrder(id: number){
    this.router.navigate(['admin/order/detail-order', id]);
  }
  
}

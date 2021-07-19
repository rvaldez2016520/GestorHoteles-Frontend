import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';

@Component({
  selector: 'app-piechart-graphic',
  templateUrl: './piechart-graphic.component.html',
  styleUrls: ['./piechart-graphic.component.css']
})
export class PiechartGraphicComponent implements OnInit {

  constructor(private restHotel: RestHotelService) { }

  ngOnInit(): void {
    this.restHotel.getHotelsNames().subscribe((resp: any) => {
      let dataForGraphics: Array<number>= [];
      resp.hotelsGraphic.forEach(hotel => {
        if(hotel.count_reservations != 0){
          this.pieChartLabels.push(hotel.hotelName);
        this.pieChartData.push(hotel.count_reservations);
        }
      });

      if(this.pieChartData.length != 0){
        for (let iterator = 0; iterator < this.pieChartData.length; iterator++) {
          this.pieChartColors[0].backgroundColor.push(this.getRandomColor());
        }
      }
    })
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}

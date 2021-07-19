import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { RestHotelService } from '../../services/restHotel/rest-hotel.service';
@Component({
  selector: 'app-bar-graphic',
  templateUrl: './bar-graphic.component.html',
  styleUrls: ['./bar-graphic.component.css']
})
export class BarGraphicComponent implements OnInit {

  constructor(private restHotel: RestHotelService) { }

  ngOnInit(): void {
    this.restHotel.getHotelsNames().subscribe((resp: any) => {
      let dataForGraphics: Array<number>= [];
      resp.hotelsGraphic.forEach(hotel => {
        this.barChartLabels.push(hotel.hotelName);
        if(hotel.count_reservations != 0){
          dataForGraphics.push(hotel.count_reservations);
        }
      });
      this.barChartData[0].data = dataForGraphics;
      if(this.barChartData[0].data.length != 0){
         for (let iterator = 0; iterator < this.barChartData[0].data.length; iterator++) {
           this.barChartColor[0].backgroundColor.push(this.getRandomColor());
       }
      }
    })
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{stacked: true}], yAxes: [{stacked: true}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartColor = [
    {
      backgroundColor: [],
    },
  ];

  public barChartData: ChartDataSets[] = [
    { data: [], 
      
      label: 'Cantidad de Reservaciones', 
      minBarLength: -1,
    }
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

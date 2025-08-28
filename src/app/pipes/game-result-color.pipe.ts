import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'resultColor',
    standalone: false
})
export class GameResultColorPipe implements PipeTransform {
  transform(points: number | undefined): string | undefined {
    const pointsString = points?.toString();
    switch (pointsString) {
      case '3':
      case '2':
        return 'green';
      case '1':
        return 'blue';
      case '0':
        return 'red';
      default:
        return undefined;
    }
  }
}

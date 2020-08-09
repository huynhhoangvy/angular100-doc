import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'adult'
})

export class AdultPipe implements PipeTransform {
    transform(value) {
        return value.filter(x => x.age > 18);
    }
}

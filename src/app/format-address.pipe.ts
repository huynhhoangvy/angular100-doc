import {Pipe, PipeTransform} from '@angular/core';

interface AddressLike {
    add1: string;
    add2: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
}

@Pipe({
    name: 'formatAddress'
})

export class FormatAddressPipe implements PipeTransform {
    transform(addr: AddressLike, para1?: string) {
        console.log('pipe run: ', addr, para1);
        return (
            addr.add1 + ' ' + addr.add2 + ', ' + addr.city + ', ' + addr.state + ', ' + addr.zip + ', ' + addr.country
        );
    }

}

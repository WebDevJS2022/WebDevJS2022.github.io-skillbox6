// вывод числа для цены в форматированном состоянии (18900 -> 18 900)
export default function numberFormat(value){
    return new Intl.NumberFormat().format(value);
}